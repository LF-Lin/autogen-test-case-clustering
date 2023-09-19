import { RawDescriptionStructure } from "./RawDescriptionStructure";
import { Statement } from "./statement/Statement";

export class StatementDescription {
  private _statement: Statement;

  constructor(statement: Statement) {
    this._statement = statement;
  }

  generateElements(): RawDescriptionStructure {
    const statement = this._statement;
    return statement.generateStatementDescription();
  }
}
