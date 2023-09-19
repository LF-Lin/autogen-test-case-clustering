import { types as t } from "@babel/core";
import { TestCase } from "../../testcase/TestCase";
import { RawDescriptionStructure } from "../RawDescriptionStructure";

export enum StatementType {
  Assertion = "Assertion",
  Constructor = "Constructor",
  Method = "Method",
  VariableDeclaration = "VariableDeclaration",
}

export interface Statement {
  _testCase: TestCase;
  _rawCode: string;
  _ast: t.Node;
  _returnValue: string;
  _statementType: StatementType;
  _argsMap: Map<string, t.Node>; // used for building variable dependencies
  _dependentVariables: Statement[];

  generateStatementDescription(): RawDescriptionStructure;
}
