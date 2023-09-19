import { template, types as t } from "@babel/core";
import generate from "@babel/generator";
import { TestCase } from "../testcase/TestCase";
import LabelClustering from "../clustering/LabelClustering";

const testSuiteWrapper = template.program(`
%%dependencies%%
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const expect = chai.expect;
describe(%%classUnderTest%%, () => {
  %%testCases%%
})
`);

// const clusterWrapper = template.statement(`
//   describe(%%method%%, () => {
//     context("", () => {
//       %%testCases%%
//     })
//   })
// `);
const clusterWrapper = template.statement(`
  context(%%key%%, () => {
    %%testCases%%
  })
`);

const normalWrapper = template.statement(`
  %%testCases%%
`);

export class TestSuiteBuilder {
  protected _classUnderTest: string;
  protected _dependencies: t.ImportDeclaration;
  protected _testCases: TestCase[];

  constructor(
    classUnderTest: string,
    testCases: TestCase[],
    dependencies: t.ImportDeclaration
  ) {
    this._classUnderTest = classUnderTest;
    this._testCases = testCases;
    this._dependencies = dependencies;
  }

  buildTestCaseTemplate() {
    const testCases: t.Statement[] = [];
    this._testCases.forEach((testCase) => {
      testCases.push(normalWrapper({ testCases: template.ast(testCase.code) }));
    });

    const ast = testSuiteWrapper({
      dependencies: this._dependencies,
      classUnderTest: t.stringLiteral(this._classUnderTest),
      testCases: testCases,
    });

    return generate(ast).code;
  }

  buildClusteredTestCaseTemplate(clusterLabels) {
    const clusters: t.Statement[] = [];
    const clusteringApproach = new LabelClustering(
      this._testCases,
      clusterLabels
    );
    const clusteredTestCasesCode = clusteringApproach.clustering();
    clusteredTestCasesCode.forEach((code, key) => {
      clusters.push(
        clusterWrapper({
          key: t.stringLiteral(`Cluster: ${key}`),
          testCases: template.ast(code),
        })
      );
    });

    const ast = testSuiteWrapper({
      dependencies: this._dependencies,
      classUnderTest: t.stringLiteral(this._classUnderTest),
      testCases: clusters,
    });

    return generate(ast).code;
  }
}
