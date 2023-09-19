export class RawDescriptionStructure {
  _basic: string[];
  _extended: string[];
  _detailed: string[];

  constructor(basic: string[], extended: string[], detailed: string[]) {
    this._basic = basic;
    this._extended = extended;
    this._detailed = detailed;
  }
}
