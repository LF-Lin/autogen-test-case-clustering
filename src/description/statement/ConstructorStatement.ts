import { NodePath, types as t, transformSync, traverse } from "@babel/core";
import { Statement, StatementType } from "./Statement";
import { TestCase } from "../../testcase/TestCase";
import generate from "@babel/generator";
import { defaultBabelOptions } from "../../config/DefaultBabelConfig";
import { RawDescriptionStructure } from "../RawDescriptionStructure";

export class ConstructorStatement implements Statement {
  _testCase: TestCase;
  _rawCode: string;
  _ast: t.Node;
  _returnValue: string;
  _statementType: StatementType;
  _argsMap: Map<string, t.Node>;
  _dependentVariables: Statement[];

  constructor(testCase: TestCase, node: t.Node) {
    this._testCase = testCase;
    this.parseNode(node);
    this._dependentVariables = [];
  }

  parseNode(node: t.Node) {
    this._rawCode = generate(node).code;
    this._ast = transformSync(this._rawCode, defaultBabelOptions).ast;
    this._returnValue = this.extractReturnVal();
    this._statementType = StatementType.Constructor;
    this._argsMap = this.getArgsMap();
  }

  generateStatementDescription(): RawDescriptionStructure {
    const className = this._testCase.getRootObject();
    return new RawDescriptionStructure([className], [], []);
  }

  private extractReturnVal(): string {
    let returnValName: string;

    traverse(this._ast, {
      VariableDeclarator(path: NodePath<t.VariableDeclarator>) {
        if (path.isVariableDeclarator() && t.isIdentifier(path.node.id)) {
          returnValName = path.node.id.name;
        }
      },
    });

    return returnValName;
  }

  private getArgsMap() {
    const constructorArgs = this._testCase.getRootObjectArgs();

    const variableMap: Map<string, t.Node> = this._testCase.getVariables();

    return new Map(
      Array.from(variableMap.entries()).filter(([key]) =>
        constructorArgs.includes(key)
      )
    );
  }
}
