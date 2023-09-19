import { traverse, types as t, NodePath } from "@babel/core";
import { TestCase } from "../testcase/TestCase";
import { ClassTestCase } from "./../testcase/ClassTestCase";

import { Statement } from "./statement/Statement";
import { MethodStatement } from "./statement/MethodStatement";
import { AssertionStatement } from "./statement/AssertionStatement";
import { ConstructorStatement } from "./statement/ConstructorStatement";
import { VariableStatement } from "./statement/VariableStatement";
import { StatementDescription } from "./StatementDescription";
import { RawDescriptionStructure } from "./RawDescriptionStructure";
import { method } from "lodash";

export class TestCaseDescription {
  private _testCase: TestCase;
  private _hasTryCatch: boolean;

  constructor(testCase: TestCase) {
    this._testCase = testCase;
    this._hasTryCatch = false;
  }

  /**
   * Convert the test case into a list of statements
   * @returns
   */
  extractStatements(): Statement[] {
    const ast = this._testCase.ast;
    const testCase = this._testCase;
    const variableMap: Map<string, t.Node> = this._testCase.getVariables();
    const methodList =
      this._testCase instanceof ClassTestCase
        ? this._testCase.getMethodCalls()
        : null;

    const statements: Statement[] = [];
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const classVisitor = {
      TryStatement(path: NodePath<t.TryStatement>) {
        if (path.isTryStatement()) {
          self._hasTryCatch = true;
        }
      },
      VariableDeclaration(path: NodePath<t.VariableDeclaration>) {
        path.traverse({
          NewExpression(subPath: NodePath<t.NewExpression>) {
            if (subPath.isNewExpression()) {
              statements.push(new ConstructorStatement(testCase, path.node));
            }
          },
          VariableDeclarator(subPath: NodePath<t.VariableDeclarator>) {
            if (
              subPath.isVariableDeclarator() &&
              subPath.node.init.type !== "NewExpression" &&
              subPath.node.init.type !== "CallExpression" &&
              subPath.node.init.type !== "AwaitExpression"
            ) {
              statements.push(new VariableStatement(testCase, path.node));
            }
          },

          // e.g.: const returnValue = await polygon.rotate(angle);
          MemberExpression(subPath: NodePath<t.MemberExpression>) {
            if (
              subPath.isMemberExpression() &&
              t.isIdentifier(subPath.node.property) &&
              methodList.includes(subPath.node.property.name)
            ) {
              statements.push(
                new MethodStatement(
                  testCase,
                  path.node,
                  subPath.node.property.name
                )
              );
            }
          },
        });
      },

      ExpressionStatement(path: NodePath<t.ExpressionStatement>) {
        path.traverse({
          // e.g.: await polygon.addVertex(vertex);
          //       polygon.addVertex(vertex);
          MemberExpression(subPath: NodePath<t.MemberExpression>) {
            if (
              subPath.isMemberExpression() &&
              t.isIdentifier(subPath.node.property) &&
              methodList.includes(subPath.node.property.name) &&
              path.node.start !== 0
            ) {
              statements.push(
                new MethodStatement(
                  testCase,
                  path.node,
                  subPath.node.property.name
                )
              );
            } else if (
              // condition for finding assertion
              subPath.isMemberExpression() &&
              subPath.node.property.type === "Identifier" &&
              subPath.node.property.name === "equal" &&
              path.node.start !== 0
            ) {
              statements.push(
                new AssertionStatement(
                  testCase,
                  path.node,
                  Array.from(variableMap.keys())
                )
              );
            }
          },
        });
      },
    };
    traverse(ast, classVisitor);

    this.buildStatementDependency(statements);
    return statements;
  }

  /**
   * Generate description candidates for the test case
   * @returns a list of description candidates
   */
  generateDescriptionCandidates(): string[] {
    const statementDescriptions = this.mapStatementsToDescriptions();
    return this._hasTryCatch
      ? this.handleTryCatchDescription(statementDescriptions)
      : this.handleNormalDescription(statementDescriptions);
  }

  private mapStatementsToDescriptions(): Map<
    Statement,
    RawDescriptionStructure
  > {
    const descriptions = new Map();
    for (const statement of this.extractStatements()) {
      const desc = new StatementDescription(statement);
      descriptions.set(statement, desc.generateElements());
    }
    return descriptions;
  }

  private handleTryCatchDescription(
    statementDescriptions: Map<Statement, RawDescriptionStructure>
  ): string[] {
    const methodStatements = Array.from(statementDescriptions.keys()).filter(
      (statement) => statement instanceof MethodStatement
    );
    const exceptedMethod = <MethodStatement>(
      methodStatements[methodStatements.length - 1]
    );
    const methodDesc = statementDescriptions.get(exceptedMethod)._basic[0];
    const variableDesc = this.getVariableExceptionDescription(
      exceptedMethod,
      statementDescriptions
    );
    const conditionDesc = this.getExceptionDescription();
    return variableDesc
      .map((v) => `throws an error when calling ${methodDesc}${v}`)
      .concat([
        `throws an error when calling ${methodDesc}${conditionDesc}`,
        `throws an error when calling ${methodDesc}`,
      ]);
  }

  private getVariableExceptionDescription(
    exceptedMethod,
    statementDescriptions
  ): string[] {
    const variableStatements = exceptedMethod._dependentVariables;
    return variableStatements.map((v) => {
      const variableName = statementDescriptions.get(v)._basic[0];
      const variableValue = statementDescriptions.get(v)._detailed[0];

      return ` with ${variableName}=${variableValue}`;
    });
  }

  private handleNormalDescription(
    statementDescriptions: Map<Statement, RawDescriptionStructure>
  ): string[] {
    const methodDesc = this.methodDescGeneration(statementDescriptions);
    const assertionDesc = this.assertionDescGeneration(statementDescriptions);

    const methodDescStr =
      methodDesc === ""
        ? `creates an ${this._testCase.getRootObject()} instance`
        : `calls ${methodDesc}`;

    return assertionDesc.length === 0
      ? [methodDescStr]
      : assertionDesc.map((assert) => `${methodDescStr} and returns ${assert}`);
  }

  private methodDescGeneration(
    statementDescriptions: Map<Statement, RawDescriptionStructure>
  ): string {
    const methodStatements = Array.from(statementDescriptions.keys()).filter(
      (statement) => statement instanceof MethodStatement
    );

    if (methodStatements.length === 0) {
      return "";
    } else if (methodStatements.length === 1) {
      const methodStatement = methodStatements[0];
      const methodStatementDescription =
        statementDescriptions.get(methodStatement);
      return methodStatementDescription._basic[0];
    } else if (methodStatements.length === 2) {
      const methodStatement1 = methodStatements[0];
      const methodStatement2 = methodStatements[1];
      const methodStatementDescription1 =
        statementDescriptions.get(methodStatement1);
      const methodStatementDescription2 =
        statementDescriptions.get(methodStatement2);
      const basicDescription1 = methodStatementDescription1._basic[0];
      const basicDescription2 = methodStatementDescription2._basic[0];
      if (basicDescription1 === basicDescription2) {
        return basicDescription1;
      } else {
        return `${basicDescription2} after ${basicDescription1}`;
      }
    } else {
      const methodStatement = methodStatements[methodStatements.length - 1];
      const methodStatementDescription =
        statementDescriptions.get(methodStatement);
      return methodStatementDescription._basic[0];
    }
  }

  private assertionDescGeneration(
    statementDescriptions: Map<Statement, RawDescriptionStructure>
  ): string[] {
    const assertionStatements = Array.from(statementDescriptions.keys()).filter(
      (statement) => statement instanceof AssertionStatement
    );

    if (assertionStatements.length === 0) {
      return [];
    }

    const methodStatements = Array.from(statementDescriptions.keys()).filter(
      (statement) => statement instanceof MethodStatement
    );
    const finalMethod = methodStatements[methodStatements.length - 1];

    const assertionForFinalMethod = assertionStatements.filter(
      (st) =>
        (<AssertionStatement>st)._target ===
        (<MethodStatement>finalMethod)._returnValue
    );

    const rawDescription = statementDescriptions.get(
      assertionForFinalMethod[0]
    );

    return [
      rawDescription._extended,
      rawDescription._basic,
      rawDescription._detailed,
    ].flat();
  }

  /**
   * Build dependency between statements
   * @param statements
   */
  private buildStatementDependency(statements: Statement[]): void {
    statements.map((statement) => {
      if (statement instanceof AssertionStatement) {
        const dependency = statement._target;
        statement._dependentVariables.push(
          statements.find(
            (st) =>
              st instanceof MethodStatement && st._returnValue === dependency
          )
        );
      } else if (statement instanceof MethodStatement) {
        const dependency = statement._arguments;
        dependency.map((arg) => {
          statement._dependentVariables.push(
            statements.find(
              (st) => st instanceof VariableStatement && st._returnValue === arg
            )
          );
        });
      }
    });
  }

  private getExceptionDescription(): string {
    const traces = (<ClassTestCase>this._testCase)._executionTrace.filter(
      (trace) =>
        trace["type"] !== "statement" &&
        trace["type"] !== "function" &&
        trace["hits"] != 0
    );
    const trace = traces[0];
    return trace
      ? ` and ${trace["condition"]} is ${
          trace["type"] === "branch" ? "true" : "false"
        }`
      : "";
  }
}
