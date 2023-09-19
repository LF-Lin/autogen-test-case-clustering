import { traverse, NodePath, types as t } from "@babel/core";
import { TestCase } from "./TestCase";

export class FunctionTestCase extends TestCase {
  constructor(code: string) {
    super(code);
    this._classType = "FunctionTestCase";
  }

  getRootObject(): string {
    let rootObject: string = null;
    const visitor = {
      CallExpression(path: NodePath<t.CallExpression>) {
        if (
          (path.parentPath.isAwaitExpression() ||
            path.parentPath.isVariableDeclarator()) &&
          path.isCallExpression() &&
          path.node.callee.type === "Identifier"
        ) {
          rootObject = path.node.callee.name;
        }
      },
    };
    traverse(this.ast, visitor);

    return rootObject;
  }

  getRootObjectArgs(): string[] {
    const args: string[] = [];

    const visitor = {
      CallExpression(path: NodePath<t.CallExpression>) {
        if (
          (path.parentPath.isAwaitExpression() ||
            path.parentPath.isVariableDeclarator()) &&
          path.isCallExpression() &&
          path.node.callee.type === "Identifier" &&
          path.node.arguments !== undefined
        ) {
          args.push(
            ...path.node.arguments.map((ele) =>
              ele.type === "Identifier" ? ele.name : ""
            )
          );
        }
      },
    };
    traverse(this.ast, visitor);
    return args;
  }

  getVariables(): Map<string, t.Node> {
    const variableMap = new Map<string, t.Node>();
    const variableVisitor = {
      VariableDeclarator(path: NodePath<t.VariableDeclarator>) {
        if (
          path.isVariableDeclarator() &&
          path.parentPath.parentPath.isBlockStatement() &&
          path.node.id.type === "Identifier"
        ) {
          variableMap.set(path.node.id.name, path.node.init);
        }
      },
    };
    traverse(this.ast, variableVisitor);
    return variableMap;
  }
}
