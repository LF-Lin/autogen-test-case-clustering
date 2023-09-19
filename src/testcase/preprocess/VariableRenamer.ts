import { TestSuiteParser } from "../../testsuite/TestSuiteParser";
import { ClassTestCase } from "../ClassTestCase";
import { TestCase } from "../TestCase";
import {
  types as t,
  transformFromAstSync,
  transformSync,
  traverse,
} from "@babel/core";
import { defaultBabelOptions } from "../../config/DefaultBabelConfig";

export class VariableRenamer {
  /**
   * Rename variables based on source code information
   * @param testSuiteParser
   * @param testcase
   * @returns testcase with renamed variables
   */
  static renameBasedOnSourceCode(
    testSuiteParser: TestSuiteParser,
    testcase: TestCase
  ) {
    const replaceMap = new Map<string, string>();

    this.handleConstructorRenaming(testSuiteParser, testcase, replaceMap);
    this.handleMethodArgsRenaming(testSuiteParser, testcase, replaceMap);
    this.handleMethodReturnRenaming(testSuiteParser, testcase, replaceMap);

    return this.ensureUniqueNames(testcase, replaceMap);
  }

  /**
   * Ensure that all variable names are unique
   * @param testcase
   * @param replaceMap
   * @returns testcase with unique variable names
   *
   * @beta method that return this has some issues
   */
  static ensureUniqueNames(
    testcase: TestCase,
    replaceMap: Map<string, string>
  ) {
    const originalReplaceMap = new Map(replaceMap);
    const variableCount = new Map<string, number>();
    const classUnderTest = testcase.getRootObject();

    replaceMap.forEach((value, key) => {
      if (
        value ===
        classUnderTest.charAt(0).toLowerCase() + classUnderTest.slice(1)
      ) {
        return;
      }
      const count = variableCount.get(value) || 0;
      const updatedValue = `${value}${count + 1}`;
      variableCount.set(value, count + 1);
      replaceMap.set(key, updatedValue);
    });

    for (const [key, value] of originalReplaceMap.entries()) {
      if (variableCount.get(value) === 1) {
        replaceMap.set(key, replaceMap.get(key).slice(0, -1));
      }
    }

    replaceMap.forEach((value, key) => {
      testcase.code = testcase.code.replace(new RegExp(key, "g"), value);
    });
    testcase.ast = transformSync(
      testcase.code,
      defaultBabelOptions
    ).ast.program;

    return testcase;
  }

  // Helper methods

  private static handleConstructorRenaming(
    testSuiteParser: TestSuiteParser,
    testcase: TestCase,
    replaceMap: Map<string, string>
  ) {
    const sourceCodeMethodArgs = testSuiteParser.getSourceCodeMethodArgs();

    const visitor = {
      NewExpression(path) {
        if (path.isNewExpression() && path.node.arguments.length > 0) {
          const args = path.node.arguments;
          const methodArgs = sourceCodeMethodArgs.get("constructor");
          args.forEach((arg, index) => {
            if (t.isIdentifier(arg)) {
              replaceMap.set(arg.name, methodArgs[index]);
            }
          });
          const className = path.node.callee.name;
          replaceMap.set(
            path.parentPath.node.id.name,
            className.charAt(0).toLowerCase() + className.slice(1)
          );
        } else if (path.isNewExpression() && path.node.arguments.length === 0) {
          const className = path.node.callee.name;
          replaceMap.set(
            path.parentPath.node.id.name,
            className.charAt(0).toLowerCase() + className.slice(1)
          );
        }
      },
    };

    traverse(testcase.ast, visitor);
    testcase.code = transformFromAstSync(testcase.ast).code;
  }

  private static handleMethodArgsRenaming(
    testSuiteParser: TestSuiteParser,
    testcase: TestCase,
    replaceMap: Map<string, string>
  ) {
    const sourceCodeMethodArgs = testSuiteParser.getSourceCodeMethodArgs();
    const methodList = (<ClassTestCase>testcase).getMethodCalls();

    const visitor = {
      MemberExpression(path) {
        if (
          path.isMemberExpression() &&
          methodList.includes(path.node.property.name) &&
          path.parentPath.node.arguments.length > 0
        ) {
          const args = path.parentPath.node.arguments;
          const methodArgs = sourceCodeMethodArgs.get(path.node.property.name);
          args.forEach((arg, index) => {
            if (t.isIdentifier(arg)) {
              replaceMap.set(arg.name, methodArgs[index]);
            }
          });
        }
      },
    };

    traverse(testcase.ast, visitor);
    testcase.code = transformFromAstSync(testcase.ast).code;
  }

  private static handleMethodReturnRenaming(
    testSuiteParser: TestSuiteParser,
    testcase: TestCase,
    replaceMap: Map<string, string>
  ) {
    const methodReturnThis = testSuiteParser.getMethodReturnInstance();
    const classUnderTest = testSuiteParser.getClassUnderTest();
    const methodList = (<ClassTestCase>testcase).getMethodCalls();

    const visitor = {
      VariableDeclaration(path) {
        if (path.isVariableDeclaration()) {
          let isMethodCallStatement = false;
          let isMethodReturnThis = false;
          path.traverse({
            Identifier(subPath) {
              if (subPath.isIdentifier()) {
                if (methodList.includes(subPath.node.name)) {
                  isMethodCallStatement = true;
                }
                if (methodReturnThis.includes(subPath.node.name)) {
                  isMethodReturnThis = true;
                }
              }
            },
          });
          if (isMethodCallStatement && isMethodReturnThis) {
            //
            replaceMap.set(
              path.node.declarations[0].id.name,
              classUnderTest.charAt(0).toLowerCase() + classUnderTest.slice(1)
            );
            if (path.node.kind === "const") {
              path.replaceWith(
                t.expressionStatement(path.node.declarations[0].init)
              );
            }
          } else if (isMethodCallStatement) {
            replaceMap.set(path.node.declarations[0].id.name, "returnValue");
          }
        }
      },
    };

    traverse(testcase.ast, visitor);
    testcase.code = transformFromAstSync(testcase.ast).code;
  }
}
