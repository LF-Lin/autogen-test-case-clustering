import { NodePath, types as t, transformSync, traverse } from "@babel/core";
import { Statement, StatementType } from "./Statement";
import nlp from "compromise";
import { defaultBabelOptions } from "../../config/DefaultBabelConfig";
import { TestCase } from "../../testcase/TestCase";
import generate from "@babel/generator";
import { RawDescriptionStructure } from "../RawDescriptionStructure";

export class MethodStatement implements Statement {
  _testCase: TestCase;
  _rawCode: string;
  _ast: t.Node;
  _returnValue: string;
  _statementType: StatementType;
  _argsMap: Map<string, t.Node>;
  _dependentVariables: Statement[];

  _arguments: string[];

  private _methodName: string;
  private _className: string;

  constructor(testCase: TestCase, node: t.Node, methodName: string) {
    this._testCase = testCase;
    this._methodName = methodName;
    this.parseNode(node);
    this._dependentVariables = [];
  }

  parseNode(node: t.Node) {
    this._rawCode = generate(node).code;
    this._ast = transformSync(this._rawCode, defaultBabelOptions).ast;
    this._returnValue = this.extractReturnVal(node);
    this._statementType = StatementType.VariableDeclaration;
    this._arguments = this.getArguments();
    this._className = this._testCase.getRootObject();
  }

  private getArguments(): string[] {
    const args: string[] = [];
    traverse(this._ast, {
      CallExpression(path: NodePath<t.CallExpression>) {
        if (path.isCallExpression()) {
          path.node.arguments.forEach((arg) => {
            if (t.isIdentifier(arg)) {
              args.push(arg.name);
            }
          });
        }
      },
    });
    return args;
  }

  generateStatementDescription(): RawDescriptionStructure {
    return new RawDescriptionStructure([this._methodName], [], []);
    // const taggedMethodName = this.tagMethodName(this._methodName);
    // const category = this.categorizeMethodName(taggedMethodName);
    // switch (category) {
    //   case "VB":
    //     return this.generateVBDescription(taggedMethodName);
    //   case "NN":
    //     return this.generateNNDescription(taggedMethodName);
    //   case "VB NN":
    //     return this.generateVBNNDescription(taggedMethodName);
    //   case "IN NN":
    //     return this.generateINNNDescription(taggedMethodName);
    //   case "OTHERS":
    //     return this.generateOthersDescription(taggedMethodName);
    //   default:
    //     return [];
    // }
  }

  private extractReturnVal(node: t.Node): string {
    if (!t.isVariableDeclaration(node)) {
      return (
        this._testCase.getRootObject().charAt(0).toLowerCase() +
        this._testCase.getRootObject().slice(1)
      );
    }

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

  private tagMethodName(methodName: string): Map<string, string[]> {
    const taggedMethodName = new Map();
    const splittedMethodName = methodName
      .replace(/([a-z])([A-Z])/g, "$1 $2") // convert camelCase to space-separated words
      .toLowerCase();
    const doc = nlp(splittedMethodName);
    Object.keys(doc.out("tags")[0]).forEach((key) => {
      taggedMethodName.set(key, doc.out("tags")[0][key]);
    });
    return taggedMethodName;
  }

  private categorizeMethodName(
    taggedMethodName: Map<string, string[]>
  ): string {
    const sz = taggedMethodName.size;
    const taggedMethodNameArray = Array.from(taggedMethodName.values());
    if (sz === 1 && taggedMethodNameArray[0].includes("Verb")) {
      return "VB";
    }
    if (sz === 1 && taggedMethodNameArray[0].includes("Noun")) {
      return "NN";
    }
    if (
      sz === 2 &&
      taggedMethodNameArray[0].includes("Verb") &&
      taggedMethodNameArray[1].includes("Noun")
    ) {
      return "VB NN";
    }
    if (
      sz === 2 &&
      taggedMethodNameArray[0].includes("Preposition") &&
      taggedMethodNameArray[1].includes("Noun")
    ) {
      return "IN NN";
    }
    return "OTHERS";
  }

  generateVBDescription(taggedMethodName: Map<string, string[]>) {
    const verb = Array.from(taggedMethodName.keys())[0];
    const temp1 = `${verb} ${this._className}`;
    const temp2 = `${verb} ${Array.from(this._argsMap.keys()).join(", ")} ${
      this._className
    }`;
    return [temp1, temp2];
  }

  generateNNDescription(taggedMethodName: Map<string, string[]>) {
    const noun = Array.from(taggedMethodName.keys())[0];
    const temp1 = `get ${noun} of ${this._className}`;
    return [temp1];
  }

  generateVBNNDescription(taggedMethodName: Map<string, string[]>) {
    const verb = Array.from(taggedMethodName.keys())[0];
    const noun = Array.from(taggedMethodName.keys())[1];
    const temp1 = `${verb} ${noun}`;
    const temp2 = `${verb} ${noun} for ${this._className}`;
    const temp3 = `${verb} ${noun} with ${Array.from(this._argsMap.keys()).join(
      ", "
    )}`;
    return [temp1, temp2, temp3];
  }

  generateINNNDescription(taggedMethodName: Map<string, string[]>) {
    const preposition = Array.from(taggedMethodName.keys())[0];
    const noun = Array.from(taggedMethodName.keys())[1];
    const temp1 = `create ${
      Array.from(this._returnValue)[0]
    } ${preposition} ${noun}`;
    return [temp1];
  }

  generateOthersDescription(taggedMethodName: Map<string, string[]>) {
    const temp1 = `call ${this._methodName}`;
    return [temp1];
  }
}
