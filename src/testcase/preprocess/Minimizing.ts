import { transformFromAstSync, traverse } from "@babel/core";
import { ClassTestCase } from "../ClassTestCase";
import { TestCase } from "../TestCase";
import { MethodUnit } from "./MethodUnit";

export class Minimizing {
  static parseToMethodUnit(tc: TestCase): void {
    const units = [];
    const testcase = tc as ClassTestCase;
    const methodCalls = testcase.getMethodCalls();
    const methodArgs = testcase.getMethodArgs();

    methodCalls.forEach((method, idx) => {
      const arrange = [];
      let act;
      let assert;
      // console.log(`method: ${method}`);
      const curArgs = methodArgs[idx];
      const methodVisitor = {
        VariableDeclaration(path) {
          if (
            path.isVariableDeclaration() &&
            path.parentPath.isBlockStatement()
          ) {
            path.traverse({
              Identifier(subPath) {
                if (
                  subPath.isIdentifier({ name: method }) &&
                  subPath.parentPath.isMemberExpression()
                ) {
                  act = path;
                } else if (
                  subPath.isIdentifier() &&
                  subPath.parentPath.isVariableDeclarator() &&
                  curArgs.includes(subPath.node.name)
                ) {
                  arrange.push(path);
                }
              },
            });
          }
        },
      };
      traverse(testcase.ast, methodVisitor);

      const returnName = testcase.getMethodReturn(method);
      // console.log(returnName);
      const assertionVisitor = {
        ExpressionStatement(path) {
          if (
            path.isExpressionStatement() &&
            path.parentPath.isBlockStatement()
          ) {
            path.traverse({
              Identifier(subPath) {
                if (
                  subPath.isIdentifier({ name: returnName }) &&
                  subPath.parentPath.isCallExpression()
                ) {
                  assert = path;
                }
              },
            });
          }
        },
      };
      traverse(testcase.ast, assertionVisitor);
      units.push(new MethodUnit(arrange, act, assert));
    });

    testcase.methodUnits = units;
  }

  static randomMinimize(tc: TestCase): void {
    const testcase = tc as ClassTestCase;
    const randomIndex = Math.floor(Math.random() * testcase.methodUnits.length);
    const removeTarget = testcase.methodUnits[randomIndex];

    if (removeTarget.arrange.length > 0) {
      removeTarget.arrange.forEach((path) => path.remove());
    }
    if (removeTarget.act) {
      removeTarget.act.remove();
    }
    if (removeTarget.assert) {
      removeTarget.assert.remove();
    }

    const newCode = transformFromAstSync(tc.ast).code;
    tc.code = newCode;
  }
}
