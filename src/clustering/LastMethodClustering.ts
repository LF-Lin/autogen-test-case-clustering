import { ClassTestCase } from "./../testcase/ClassTestCase";
import { TestCase } from "../testcase/TestCase";
import { Clustering } from "./Clustering";

export class LastMethodClustering extends Clustering {
  constructor(testCases: TestCase[]) {
    super(testCases);
  }

  clustering(): Map<string, string> {
    const results: Map<string, string> = new Map<string, string>();
    this._testCases.forEach((testCase) => {
      const key = this.getTestCaseLastMethodCall(testCase);
      if (results.has(key)) {
        results.set(key, results.get(key) + testCase.code);
      } else {
        results.set(key, testCase.code);
      }
    });
    return results;
  }

  getTestCaseLastMethodCall(testCase: TestCase): string {
    const method = (<ClassTestCase>testCase).getMethodCalls().slice(-1).pop();
    if (method === undefined) {
      return "constructor";
    }
    return method;
  }
}
