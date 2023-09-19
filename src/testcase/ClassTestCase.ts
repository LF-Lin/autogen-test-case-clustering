import { MethodUnit } from "./preprocess/MethodUnit";
import { traverse, NodePath, types as t, Visitor } from "@babel/core";
import { TestCase } from "./TestCase";

export class ClassTestCase extends TestCase {
  private _methodUnits: MethodUnit[] = [];
  _executionTrace: object[];

  constructor(code: string) {
    super(code);
    this._classType = "ClassTestCase";
  }

  getRootObject(): string {
    let rootObject: string = null;
    const visitor: Visitor = {
      NewExpression(path: NodePath<t.NewExpression>) {
        if (path.isNewExpression() && path.node.callee.type === "Identifier") {
          rootObject = path.node.callee.name;
        }
      },
    };
    traverse(this.ast, visitor);
    return rootObject;
  }

  getRootObjectArgs(): string[] {
    const args: string[] = [];
    const visitor: Visitor = {
      NewExpression(path: NodePath<t.NewExpression>) {
        if (path.isNewExpression()) {
          path.node.arguments.forEach((arg) => {
            if (arg.type === "Identifier") {
              args.push(arg.name);
            }
          });
        }
      },
    };
    traverse(this.ast, visitor);
    return args;
  }

  /**
   * Return a map for variable name -> variable value
   * @returns variableMap
   */
  getVariables(): Map<string, t.Node> {
    const variableMap: Map<string, t.Node> = new Map<string, t.Node>();
    const variableVisitor: Visitor = {
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

  /**
   *
   * @returns
   */
  getMethodCalls(): string[] {
    const methods: string[] = [];
    const visitor: Visitor = {
      MemberExpression(path: NodePath<t.MemberExpression>) {
        if (
          (path.parentPath.parentPath.isVariableDeclarator() ||
            path.parentPath.parentPath.isAwaitExpression()) &&
          path.parentPath.isCallExpression() &&
          t.isIdentifier(path.node.property) &&
          t.isIdentifier(path.node.object)
        ) {
          methods.push(path.node.property.name);
        }
      },
    };
    traverse(this.ast, visitor);

    return methods;
  }

  getMethodArgs(): Array<string[]> {
    const args: Array<string[]> = [];
    const methods: string[] = this.getMethodCalls();

    const visitor: Visitor = {
      CallExpression(path: NodePath<t.CallExpression>) {
        if (
          path.isCallExpression() &&
          t.isMemberExpression(path.node.callee) &&
          t.isIdentifier(path.node.callee.property) &&
          methods.includes(path.node.callee.property.name)
        ) {
          const methodArgs: string[] = [];
          path.node.arguments.forEach((arg) => {
            if (arg.type === "Identifier") {
              methodArgs.push(arg.name);
            }
          });
          args.push(methodArgs);
        }
      },
    };
    traverse(this.ast, visitor);
    return args;
  }

  getMethodReturn(method): string {
    let methodReturn: string = null;
    const visitor: Visitor = {
      VariableDeclarator(path: NodePath<t.VariableDeclarator>) {
        let curName;
        if (path.isVariableDeclarator() && path.node.id.type === "Identifier") {
          curName = path.node.id.name;
        }
        path.traverse({
          Identifier(subPath: NodePath<t.Identifier>) {
            if (
              subPath.isIdentifier({ name: method }) &&
              subPath.parentPath.isMemberExpression()
            ) {
              methodReturn = curName;
            }
          },
        });
      },
    };
    traverse(this.ast, visitor);
    return methodReturn;
  }

  set methodUnits(methodUnits: MethodUnit[]) {
    this._methodUnits = methodUnits;
  }

  get methodUnits(): MethodUnit[] {
    return this._methodUnits;
  }

  getAssertions(): t.ExpressionStatement[] {
    const assertions: t.ExpressionStatement[] = [];
    const visitor: Visitor = {
      ExpressionStatement(path: NodePath<t.ExpressionStatement>) {
        if (
          path.isExpressionStatement() &&
          path.node.expression.type === "CallExpression" &&
          path.node.expression.callee.type === "MemberExpression" &&
          path.node.expression.callee.property.type === "Identifier" &&
          path.node.expression.callee.property.name === "equal"
        ) {
          assertions.push(path.node);
        }
      },
    };
    traverse(this.ast, visitor);
    return assertions;
  }
}
