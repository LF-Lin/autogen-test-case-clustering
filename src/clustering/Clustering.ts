import { TestCase } from "../testcase/TestCase";

export abstract class Clustering {
  protected _testCases: TestCase[];

  protected constructor(testCases) {
    this._testCases = testCases;
  }

  abstract clustering(): Map<string, string>;
}
