import { NodePath, types as t, transformSync, traverse } from "@babel/core";
import { Statement, StatementType } from "./Statement";
import generate from "@babel/generator";
import { defaultBabelOptions } from "../../config/DefaultBabelConfig";
import { TestCase } from "../../testcase/TestCase";
import { RawDescriptionStructure } from "../RawDescriptionStructure";

interface DescriptionStrategy {
  generateDescription(expectValue: string): RawDescriptionStructure;
}

class StringLiteralDescriptionStrategy implements DescriptionStrategy {
  generateDescription(expectValue: string): RawDescriptionStructure {
    const basic = ["string"];
    const extended: string[] = [];
    if (expectValue.length === 0) {
      extended.push(`empty string`);
    } else {
      extended.push(`non-empty string`);
    }
    const detailed = [expectValue];
    return new RawDescriptionStructure(basic, extended, detailed);
  }
}

class NumericLiteralDescriptionStrategy implements DescriptionStrategy {
  generateDescription(expectValue: string): RawDescriptionStructure {
    const basic = ["number"];
    const extended: string[] = [];
    const obj = eval(expectValue);
    if (obj > 0) {
      extended.push(`positive`);
    } else if (obj < 0) {
      extended.push(`negative`);
    } else {
      extended.push(`zero`);
    }
    const detailed = [expectValue];
    return new RawDescriptionStructure(basic, extended, detailed);
  }
}

class ArrayDescriptionStrategy implements DescriptionStrategy {
  generateDescription(expectValue: string): RawDescriptionStructure {
    const basic = ["array"];

    const extended: string[] = [];
    const obj = eval(expectValue);
    if (obj.length === 0) {
      extended.push(`empty array`);
    } else {
      extended.push(`array with length=${obj.length}`);
    }
    const detailed = [expectValue];
    return new RawDescriptionStructure(basic, extended, detailed);
  }
}

class BooleanLiteralDescriptionStrategy implements DescriptionStrategy {
  generateDescription(expectValue: string): RawDescriptionStructure {
    const basic = [];
    const obj = eval(expectValue);
    if (obj) {
      basic.push(`true`);
    } else {
      basic.push(`false`);
    }
    return new RawDescriptionStructure(basic, [], []);
  }
}

class NullLiteralDescriptionStrategy implements DescriptionStrategy {
  generateDescription(expectValue: string): RawDescriptionStructure {
    return new RawDescriptionStructure(["null"], [], []);
  }
}

class ObjectDescriptionStrategy implements DescriptionStrategy {
  generateDescription(expectValue: string): RawDescriptionStructure {
    const basic = ["object"];
    const extended: string[] = [];
    const obj = eval(`(${expectValue})`);
    if (Object.keys(obj).length === 0) {
      extended.push(`empty object`);
    } else if (Object.keys(obj).length === 1) {
      extended.push(`object with one property`);
    } else {
      extended.push(`object with ${Object.keys(obj).length} properties`);
    }
    const detailed = [expectValue];

    return new RawDescriptionStructure(basic, extended, detailed);
  }
}

class ArrayFunctionDescriptionStrategy implements DescriptionStrategy {
  generateDescription(expectValue: string): RawDescriptionStructure {
    return new RawDescriptionStructure(["arrow function"], [], [expectValue]);
  }
}

export class AssertionStatement implements Statement {
  _testCase: TestCase;
  _rawCode: string;
  _ast: t.Node;
  _returnValue: string;
  _statementType: StatementType;
  _argsMap: Map<string, t.Node>; // used for building variable dependencies
  _dependentVariables: Statement[];

  _target: string;
  private _expectValue: string;
  private _variables: string[];

  constructor(testCase: TestCase, node: t.Node, variables: string[]) {
    this._testCase = testCase;
    this._variables = variables;
    this.parseNode(node);
    this._dependentVariables = [];
  }

  parseNode(node: t.Node) {
    this._rawCode = generate(node).code;
    this._ast = transformSync(this._rawCode, defaultBabelOptions).ast;
    this._statementType = StatementType.Assertion;

    this._target = this.extractTarget();
    this._expectValue = this.extractResults();
  }

  generateStatementDescription(): RawDescriptionStructure {
    const descriptionStrategies: { [key: string]: DescriptionStrategy } = {
      StringLiteral: new StringLiteralDescriptionStrategy(),
      NumericLiteral: new NumericLiteralDescriptionStrategy(),
      BooleanLiteral: new BooleanLiteralDescriptionStrategy(),
      NullLiteral: new NullLiteralDescriptionStrategy(),
      ArrayExpression: new ArrayDescriptionStrategy(),
      ObjectExpression: new ObjectDescriptionStrategy(),
      ArrowFunctionExpression: new ArrayFunctionDescriptionStrategy(),
      // RegExpLiteral":
      // TemplateLiteral":
      // MemberExpression":
      // BigIntLiteral":
      // UnaryExpression":
    };

    let targetType: string;
    const assertionVisitor = {
      CallExpression(path: NodePath<t.CallExpression>) {
        if (
          path.isCallExpression() &&
          path.parentPath.isExpressionStatement() &&
          path.node.arguments.length > 0
        ) {
          targetType = path.node.arguments[0].type;
        }
      },
    };
    traverse(this._ast, assertionVisitor);

    const strategy = descriptionStrategies[targetType];
    if (strategy) {
      return strategy.generateDescription(this._expectValue);
    } else {
      return new RawDescriptionStructure(["default"], [], [this._expectValue]);
    }
  }

  private extractTarget(): string {
    let targetName: string;
    const variables = this._variables;

    traverse(this._ast, {
      Identifier(path: NodePath<t.Identifier>) {
        if (
          path.isIdentifier() &&
          variables.includes(path.node.name) &&
          path.parentPath.isCallExpression()
        ) {
          targetName = path.node.name;
        }
      },
    });

    return targetName;
  }

  private extractResults(): string {
    let code: string;
    traverse(this._ast, {
      CallExpression(path: NodePath<t.CallExpression>) {
        if (
          path.isCallExpression() &&
          path.parentPath.isExpressionStatement() &&
          path.node.arguments.length > 0
        ) {
          code = generate(path.node.arguments[0]).code;
        }
      },
    });

    return code;
  }
}
