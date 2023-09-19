import * as path from "path";
import { transformFileSync, traverse, types as t, NodePath } from "@babel/core";
import generate from "@babel/generator";
import { defaultBabelOptions } from "../config/DefaultBabelConfig";
import { TestCase } from "../testcase/TestCase";
import { FunctionTestCase } from "../testcase/FunctionTestCase";
import { ClassTestCase } from "../testcase/ClassTestCase";

export class TestSuiteParser {
  protected _testSuitePath: string;

  constructor(path: string) {
    this._testSuitePath = path;
  }

  getTestCases() {
    const testCases: TestCase[] = [];
    const absolutePath = path.resolve(this._testSuitePath);

    const options = JSON.parse(JSON.stringify(defaultBabelOptions));
    const transResults = transformFileSync(absolutePath, options);
    const visitor = {
      Identifier(path: NodePath<t.Identifier>, state) {
        if (
          path.parentPath.parentPath.isExpressionStatement() &&
          path.parentPath.isCallExpression() &&
          path.isIdentifier({ name: "it" })
        ) {
          const code = generate(path.parentPath.parentPath.node).code;
          const isClass = state.scope.isClassTestCase(
            path.parentPath.parentPath
          );
          const testCase = isClass
            ? new ClassTestCase(code)
            : new FunctionTestCase(code);
          testCases.push(testCase);
        }
      },
    };
    traverse(transResults.ast, visitor, null, { scope: this });
    return testCases;
  }

  getClassUnderTest() {
    let classUnderTest: string;
    const absolutePath = path.resolve(this._testSuitePath);

    const options = JSON.parse(JSON.stringify(defaultBabelOptions));
    const transResults = transformFileSync(absolutePath, options);
    const visitor = {
      CallExpression(path: NodePath<t.CallExpression>) {
        if (
          path.node.callee.type === "Identifier" &&
          path.node.callee.name === "describe" &&
          path.node.arguments[0].type === "StringLiteral"
        ) {
          classUnderTest = path.node.arguments[0].value;
        }
      },
    };
    traverse(transResults.ast, visitor);

    return classUnderTest;
  }

  getDependencies(): t.ImportDeclaration {
    let dependencies = null;
    const absolutePath = path.resolve(this._testSuitePath);
    const options = JSON.parse(JSON.stringify(defaultBabelOptions));
    const transResults = transformFileSync(absolutePath, options);
    const visitor = {
      ImportDeclaration(path: NodePath<t.ImportDeclaration>) {
        if (path.node.source.value.includes(".js")) {
          dependencies = path.node;
        }
      },
    };
    traverse(transResults.ast, visitor);

    return dependencies;
  }

  replaceDependencies(dependencies: t.ImportDeclaration): t.ImportDeclaration {
    dependencies.source.value = dependencies.source.value.replace(
      this.getClassUnderTest(),
      `${this.getClassUnderTest()}.inst`
    );
    return dependencies;
  }

  getSourceCodeMethodArgs(): Map<string, string[]> {
    const methodArgs = new Map<string, string[]>();

    const sourceCode = path.resolve(
      path.dirname(this._testSuitePath),
      this.getDependencies().source.value
    );

    const ast = transformFileSync(sourceCode, defaultBabelOptions).ast;
    const Visitor = {
      ClassMethod(path: NodePath<t.ClassMethod>) {
        if (t.isIdentifier(path.node.key)) {
          const args = path.node.params.map((param) => {
            if (t.isIdentifier(param)) {
              return param.name;
            }
          });
          methodArgs.set(path.node.key.name, args);
        }
      },
    };

    traverse(ast, Visitor);

    return methodArgs;
  }

  isClassTestCase(path: NodePath<t.Statement>) {
    let isClass = false;
    path.traverse({
      NewExpression(path: NodePath<t.NewExpression>) {
        if (path.isNewExpression()) {
          isClass = true;
        }
      },
    });
    return isClass;
  }

  getMethodReturnInstance(): string[] {
    const methodReturnInstanceList = [];

    const sourceCodePath = path.resolve(
      path.dirname(this._testSuitePath),
      this.getDependencies().source.value
    );
    const options = JSON.parse(JSON.stringify(defaultBabelOptions));
    const ast = transformFileSync(sourceCodePath, options).ast;

    const visitor = {
      ClassMethod(path: NodePath<t.ClassMethod>) {
        if (t.isIdentifier(path.node.key)) {
          const methodName = path.node.key.name;
          path.traverse({
            ThisExpression(subPath) {
              if (subPath.parentPath.isReturnStatement()) {
                methodReturnInstanceList.push(methodName);
              }
            },
          });
        }
      },
    };
    traverse(ast, visitor);

    return Array.from(new Set(methodReturnInstanceList));
  }
}
