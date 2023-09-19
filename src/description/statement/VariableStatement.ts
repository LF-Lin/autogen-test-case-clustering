import { NodePath, types as t, transformSync, traverse } from "@babel/core";
import { Statement, StatementType } from "./Statement";
import { TestCase } from "../../testcase/TestCase";
import generate from "@babel/generator";
import { defaultBabelOptions } from "../../config/DefaultBabelConfig";
import { RawDescriptionStructure } from "../RawDescriptionStructure";

export class VariableStatement implements Statement {
  _testCase: TestCase;
  _rawCode: string;
  _ast: t.Node;
  _returnValue: string; // variable name
  _statementType: StatementType;
  _argsMap: Map<string, t.Node>;
  _dependentVariables: Statement[];

  private _value: string; // value of the variable

  constructor(testCase: TestCase, node: t.Node) {
    this._testCase = testCase;
    this.parseNode(node);
    this._dependentVariables = [];
  }

  parseNode(node: t.Node) {
    this._rawCode = generate(node).code;
    this._ast = transformSync(this._rawCode, defaultBabelOptions).ast;
    [this._returnValue, this._value] = this.extractReturnVal();
    this._statementType = StatementType.VariableDeclaration;
  }

  generateStatementDescription(): RawDescriptionStructure {
    return new RawDescriptionStructure([this._returnValue], [], [this._value]);
  }

  private extractReturnVal(): [string, string] {
    let returnValName: string;
    let value: string;

    traverse(this._ast, {
      VariableDeclarator(path: NodePath<t.VariableDeclarator>) {
        if (path.isVariableDeclarator() && t.isIdentifier(path.node.id)) {
          returnValName = path.node.id.name;
        }
        value = generate(path.node.init).code;
      },
    });

    return [returnValName, value];
  }
}
