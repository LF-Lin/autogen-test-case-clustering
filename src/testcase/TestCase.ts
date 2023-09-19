import { types as t, transformSync } from "@babel/core";
import { defaultBabelOptions } from "../config/DefaultBabelConfig";

export abstract class TestCase {
  protected _code: string;
  protected _ast: t.Program;
  protected _classType: string;

  constructor(code: string) {
    this._code = code;
  }

  set code(code: string) {
    this._code = code;
  }

  get code(): string {
    return this._code;
  }

  set ast(ast: t.Program) {
    this._ast = ast;
  }

  get ast(): t.Program {
    if (!this._ast) {
      const options = JSON.parse(JSON.stringify(defaultBabelOptions));
      this._ast = transformSync(this.code, options).ast.program;
    }
    return this._ast;
  }

  get classType(): string {
    return this._classType;
  }

  abstract getRootObject(): string;

  abstract getRootObjectArgs(): string[];

  abstract getVariables(): Map<string, t.Node>;
}
