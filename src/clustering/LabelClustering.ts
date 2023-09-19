import { TestCase } from "../testcase/TestCase";
import { Clustering } from "./Clustering";

export default class LabelClustering extends Clustering {
  private _labels: number[];

  constructor(testCases: TestCase[], labels: number[]) {
    super(testCases);
    this._labels = labels;
  }

  clustering(): Map<string, string> {
    const results: Map<string, string> = new Map<string, string>();
    for (let i = 0; i < this._labels.length; i++) {
      const label = this._labels[i];
      if (results.has(label.toString())) {
        results.set(
          label.toString(),
          results.get(label.toString()) + this._testCases[i].code
        );
      } else {
        results.set(label.toString(), this._testCases[i].code);
      }
    }
    return results;
  }
}
