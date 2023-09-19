import { NodePath } from "@babel/core";

export class MethodUnit {
  private _arrange: NodePath[];
  private _act: NodePath;
  private _assert: NodePath;

  constructor(arrange: NodePath[], act: NodePath, assert: NodePath) {
    this._arrange = arrange;
    this._act = act;
    this._assert = assert;
  }

  get arrange(): NodePath[] {
    return this._arrange;
  }

  get act(): NodePath {
    return this._act;
  }

  get assert(): NodePath {
    return this._assert;
  }
}
