import { transformFromAstSync, traverse, types as t } from "@babel/core";
import { ClassTestCase } from "./../ClassTestCase";
import { TestCase } from "../TestCase";
import { TestSuiteParser } from "../../testsuite/TestSuiteParser";

export class Compressor {
  /**
   * Replace identifiers with their values
   * Remove temporal variable declarations
   *
   * @param testcase
   * @returns new testcase
   */
  static incorporateVariables(testcase: TestCase): TestCase {
    const argList = this.getAllArgs(testcase);
    const temporalVariables = this.getTemporalVariables(testcase, argList);

    const removedVariables = this.replaceIdentifiersWithValues(
      testcase,
      argList,
      temporalVariables
    );
    this.removeTemporalVariableDeclarations(
      testcase,
      temporalVariables,
      removedVariables
    );

    testcase.code = transformFromAstSync(testcase.ast).code;
    return testcase;
  }

  /**
   * Remove all assertions that are not related to the method calls
   *
   * @param testcase
   * @returns new testcase
   */
  static removeIrrelevantAssertions(
    testcase: TestCase,
    testSuiteParse: TestSuiteParser
  ): TestCase {
    const methodReturnValues = this.getMethodReturnValues(testcase);
    const nonReturnVariables = this.getNonReturnVariables(
      testcase,
      methodReturnValues
    );

    this.removeAssertionsForVariables(testcase, nonReturnVariables);
    this.removeAssertionsForInstanceVariables(testcase, testSuiteParse);

    testcase.code = transformFromAstSync(testcase.ast).code;
    return testcase;
  }

  // Helper methods

  private static getAllArgs(testcase: TestCase): string[] {
    return [
      ...(<ClassTestCase>testcase).getMethodArgs().flat(),
      ...testcase.getRootObjectArgs().flat(),
    ];
  }

  /**
   * get all intermediate/temporal variables
   * @param testcase
   * @returns
   */
  private static getTemporalVariables(
    testcase: TestCase,
    argList: string[]
  ): string[] {
    return Array.from(testcase.getVariables().keys()).filter(
      (v) => !argList.includes(v)
    );
  }

  private static replaceIdentifiersWithValues(
    testcase: TestCase,
    argList: string[],
    temporalVariables: string[]
  ): string[] {
    const removeList = [];
    const replaceVisitor = {
      Identifier(path) {
        if (
          path.parentPath.isVariableDeclarator() &&
          path.isIdentifier() &&
          argList.includes(path.node.name)
        ) {
          path.parentPath.traverse({
            Identifier(subPath) {
              if (
                subPath.isIdentifier() &&
                temporalVariables.includes(subPath.node.name)
              ) {
                removeList.push(subPath.node.name);
                subPath.replaceWith(
                  testcase.getVariables().get(subPath.node.name)
                );
              }
            },
          });
        }
      },
    };

    traverse(testcase.ast, replaceVisitor);
    testcase.code = transformFromAstSync(testcase.ast).code;

    return removeList;
  }

  private static removeTemporalVariableDeclarations(
    testcase: TestCase,
    temporalVariables: string[],
    removedVariables: string[]
  ): void {
    const removeVisitor = {
      VariableDeclarator(path) {
        if (
          path.isVariableDeclarator() &&
          removedVariables.includes(path.node.id.name)
        ) {
          path.remove();
        }
      },
    };
    traverse(testcase.ast, removeVisitor);
    testcase.code = transformFromAstSync(testcase.ast).code;
  }

  private static getMethodReturnValues(testcase: TestCase): string[] {
    const returnValList = [];
    const methodVisitor = {
      VariableDeclarator(path) {
        path.traverse({
          Identifier(subPath) {
            if (
              (<ClassTestCase>testcase)
                .getMethodCalls()
                .includes(subPath.node.name)
            ) {
              returnValList.push(path.node.id.name);
            }
          },
        });
      },
    };
    traverse(testcase.ast, methodVisitor);
    return returnValList;
  }

  private static getNonReturnVariables(
    testcase: TestCase,
    methodReturnValues: string[]
  ): string[] {
    return Array.from(testcase.getVariables().keys()).filter(
      (v) => !methodReturnValues.includes(v)
    );
  }

  /**
   * remove assertions by variable name
   * @param testcase testcase to remove assertions from
   * @param variables variables to remove assertions for
   */
  private static removeAssertionsForVariables(
    testcase: TestCase,
    variables: string[]
  ): void {
    const assertionVisitor = {
      ExpressionStatement(path) {
        if (t.isMemberExpression(path.node.expression.callee)) {
          let shouldRemove = false;
          path.traverse({
            Identifier(subPath) {
              if (variables.includes(subPath.node.name)) {
                shouldRemove = true;
              }
            },
          });
          if (shouldRemove) {
            path.remove();
          }
        }
      },
    };
    traverse(testcase.ast, assertionVisitor);
    testcase.code = transformFromAstSync(testcase.ast).code;
  }

  /**
   * Remove assertions for instance variables to reduce the length of the test case
   * If the last method invocation is a self-returning method, then keep the assertion
   * for its return value
   * @param testcase
   * @param testSuiteParse
   *
   * @beta
   */
  private static removeAssertionsForInstanceVariables(
    testcase: TestCase,
    testSuiteParse: TestSuiteParser
  ): void {
    const methodCalls = (<ClassTestCase>testcase).getMethodCalls();
    const methodsReturnInstance = testSuiteParse.getMethodReturnInstance();

    const variables: string[] = [];

    // get the names of all methods that are returning the instance variable
    const methodVisitor = {
      VariableDeclaration(path) {
        if (path.isVariableDeclaration()) {
          let isMethodReturnInstance = false;
          path.traverse({
            Identifier(subPath) {
              if (subPath.isIdentifier()) {
                if (methodsReturnInstance.includes(subPath.node.name)) {
                  isMethodReturnInstance = true;
                }
              }
            },
          });
          if (isMethodReturnInstance) {
            variables.push(path.node.declarations[0].id.name);
          }
        }
      },
    };

    traverse(testcase.ast, methodVisitor);

    if (methodsReturnInstance.includes(methodCalls[methodCalls.length - 1])) {
      variables.pop();
      this.removeAssertionsForVariables(testcase, variables);
    } else if (
      (<ClassTestCase>testcase).getAssertions().length - variables.length >
      0
    ) {
      this.removeAssertionsForVariables(testcase, variables);
    }
  }
}
