import {
  traverse,
  types as t,
  NodePath,
  transformFromAstSync,
} from "@babel/core";
import { TestCaseDescription } from "./description/TestCaseDescription";
import path from "path";
import short from "short-uuid";

import { cloneDeep } from "lodash";
import { readFile, outputFile, remove, copy } from "fs-extra";
import { exec } from "child_process";

import { Instrumenter } from "./instrumentation/Instrumenter";
import { CoverageData as Cov } from "./instrumentation/CoverageData";
import { TestSuiteParser } from "./testsuite/TestSuiteParser";
import { TestSuiteBuilder } from "./testsuite/TestSuiteBuilder";
import { TestSuiteLinter } from "./testsuite/TestSuiteLinter";
import { TestSuiteRunner } from "./testsuite/TestSuiteRunner";
import { Compressor } from "./testcase/preprocess/Compressor";
import { VariableRenamer } from "./testcase/preprocess/VariableRenamer";
import { ClassTestCase } from "./testcase/ClassTestCase";
import { DescriptionUtils } from "./description/DescriptionUtils";
import { TestCase } from "./testcase/TestCase";

export default class Launcher {
  private config: any;
  private rawTestSuitePath: string;
  private processedTestSuitePath: string;
  private clusteredTestSuitePath: string;
  private sourceCodePath: string;
  private instrumentedSourceCodePath: string;
  private executionTracePath: string;
  private className: string;
  private descriptiveTestSuitePath: string;

  constructor(config) {
    this.setup(config);
    this.config = config;
  }

  setup(config) {
    this.className = config.classUnderTest.name;
    this.rawTestSuitePath = path.resolve(
      path.join(
        config.testSuite.rawTestSuiteDir,
        this.className + config.testSuite.rawTestSuiteFormat
      )
    );
    this.processedTestSuitePath = path.resolve(
      path.join(
        config.testSuite.processedTestSuiteDir,
        `${Date.now()}.${this.className}${
          config.testSuite.processedTestSuiteFormat
        }`
      )
    );
    this.descriptiveTestSuitePath = path.resolve(
      path.join(
        config.testSuite.processedTestSuiteDir,
        `${Date.now()}.${this.className}${
          config.testSuite.descriptiveTestSuitePath
        }`
      )
    );
    this.clusteredTestSuitePath = path.resolve(
      path.join(
        config.testSuite.clusteredTestSuiteDir,
        `${Date.now()}.${this.className}${
          config.testSuite.clusteredTestSuiteFormat
        }`
      )
    );
    this.sourceCodePath = path.resolve(
      path.join(config.classUnderTest.sourceCodeDir, this.className + ".js")
    );
    this.instrumentedSourceCodePath = path.resolve(
      path.join(
        config.classUnderTest.instrumentedSourceCodeDir,
        this.className + config.classUnderTest.instrumentedSourceCodeFormat
      )
    );
  }

  async instrumentSourceCode() {
    const instrumenter = new Instrumenter();
    const code = await readFile(this.sourceCodePath, "utf-8");
    const instrumentedSource = await instrumenter.instrument(
      code,
      this.sourceCodePath
    );
    await outputFile(this.instrumentedSourceCodePath, instrumentedSource);
  }

  async preprocessTestSuite() {
    const testSuiteParse = new TestSuiteParser(this.rawTestSuitePath);

    const classUnderTest = testSuiteParse.getClassUnderTest();
    const testCases = testSuiteParse.getTestCases();

    // preprocessing steps
    testCases.forEach((testCase) => {
      VariableRenamer.renameBasedOnSourceCode(
        testSuiteParse,
        Compressor.removeIrrelevantAssertions(
          Compressor.incorporateVariables(testCase),
          testSuiteParse
        )
      );
    });

    const dependencies = testSuiteParse.getDependencies();
    const dependenciesInst = testSuiteParse.replaceDependencies(dependencies);
    const builder = new TestSuiteBuilder(
      classUnderTest,
      testCases,
      dependenciesInst
    );
    const newTestSuite = builder.buildTestCaseTemplate();

    // write new test suite to file with eslint
    await outputFile(this.processedTestSuitePath, newTestSuite);
    await new TestSuiteLinter(this.processedTestSuitePath).lint();
  }

  /**
   * Generate test case description for each test case.
   */
  async testCaseDescription(): Promise<void> {
    const testSuiteParse = new TestSuiteParser(this.processedTestSuitePath);
    const testCases = testSuiteParse.getTestCases();

    const traces = JSON.parse(await readFile(this.executionTracePath, "utf8"));

    testCases.map((testCase, index) => {
      (<ClassTestCase>testCase)._executionTrace = traces[index]["Trace"];
    });

    const descriptionCandidates = testCases.map((testCase) => {
      const testCaseDescription = new TestCaseDescription(testCase);
      const des = testCaseDescription.generateDescriptionCandidates();
      return des;
    });
    const des = DescriptionUtils.selectUnique(descriptionCandidates);
    des.forEach((ele, idx) => {
      des[idx] = ele.replace(/\n/g, "");
    });
    console.log(des);

    this.replaceDescription(testCases, des);

    const classUnderTest = testSuiteParse.getClassUnderTest();
    const dependencies = testSuiteParse.getDependencies();
    const builder = new TestSuiteBuilder(
      classUnderTest,
      testCases,
      dependencies
    );
    const newTestSuite = builder.buildTestCaseTemplate();

    // write new test suite to file with eslint
    await outputFile(this.descriptiveTestSuitePath, newTestSuite);
    await new TestSuiteLinter(this.descriptiveTestSuitePath).lint();
  }

  /**
   * replace the old `test for XX` with the new description
   * @param testCases original test cases
   * @param des test case description
   */
  private replaceDescription(testCases: TestCase[], des: string[]) {
    const className = this.className;
    testCases.forEach((testCase, idx) => {
      const stringVisitor = {
        StringLiteral(path: NodePath<t.StringLiteral>) {
          if (path.node.value === `test for ${className}`) {
            path.replaceWith(t.stringLiteral(des[idx]));
          }
        },
      };
      traverse(testCase.ast, stringVisitor);
      testCase.code = transformFromAstSync(testCase.ast).code;
    });
  }

  /**
   * Collects execution traces for each test case in the test suite.
   * So that we can find the objectives it covered to encode test cases.
   */
  async collectExecutionData() {
    const tempTestCaseDir = path.join(".", "results", "tmp");
    const tempClassUnderTestDir = path.join(".", "results", "classUnderTest");

    try {
      const suiteNameCodeMap = await this.generateTestCases(tempTestCaseDir);
      await copy(path.dirname(this.sourceCodePath), tempClassUnderTestDir);
      await this.collectAndOutputTraces(suiteNameCodeMap);
    } catch (error) {
      console.error("Error during test case encoding:", error);
    } finally {
      await remove(tempTestCaseDir);
      await remove(tempClassUnderTestDir);
    }
  }

  /**
   * Call python script to cluster test cases.
   * @returns labels for each test case
   */
  async clusteringUsingPython(): Promise<number[]> {
    const pythonEnvPath = path.resolve(this.config.python.envPath);
    const pythonScriptPath = path.resolve(this.config.python.scriptPath);

    return new Promise<number[]>((resolve, reject) => {
      exec(
        `${pythonEnvPath} ${pythonScriptPath} ${this.executionTracePath}`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            reject(error);
            return;
          }
          console.log(`Labels for test cases: ${stdout}`);
          const labels: number[] = stdout.split(",").map(Number);

          if (stderr) {
            console.error(`Python Error: ${stderr}`);
          }

          resolve(labels);
        }
      );
    });
  }

  /**
   * Generates a new test suite with clustered test cases.
   * @param labels
   */
  async generateClusteredTestSuite(labels: number[]) {
    const testSuiteParse = new TestSuiteParser(this.descriptiveTestSuitePath);
    const classUnderTest = testSuiteParse.getClassUnderTest();
    const testCases = testSuiteParse.getTestCases();
    const dependencies = testSuiteParse.getDependencies();

    const clusteredTestSuite = new TestSuiteBuilder(
      classUnderTest,
      testCases,
      dependencies
    ).buildClusteredTestCaseTemplate(labels);

    await outputFile(this.clusteredTestSuitePath, clusteredTestSuite);
    await new TestSuiteLinter(this.clusteredTestSuitePath).lint();
  }

  postprocess() {
    // clean instrumented source code
    remove(this.instrumentedSourceCodePath);
    // remove(path.dirname(this.instrumentedSourceCodePath));
  }

  /**
   * Generates multiple test suites for each test case in the test suite.
   * @param tempTestCaseDir
   * @returns
   */
  private async generateTestCases(tempTestCaseDir: string) {
    const testSuiteParse = new TestSuiteParser(this.processedTestSuitePath);
    const classUnderTest = testSuiteParse.getClassUnderTest();
    const testCases = testSuiteParse.getTestCases();
    const dependencies = testSuiteParse.getDependencies();

    const suiteNameCodeMap = new Map<string, string>();
    const writePromises: Promise<void>[] = testCases.map(async (testCase) => {
      const singleCaseSuiteBuilder = new TestSuiteBuilder(
        classUnderTest,
        [testCase],
        dependencies
      );
      const curTestSuite = singleCaseSuiteBuilder.buildTestCaseTemplate();
      const curTestSuitePath = path.join(
        tempTestCaseDir,
        `_${short.generate()}.js`
      );

      suiteNameCodeMap.set(curTestSuitePath, testCase.code);
      return outputFile(curTestSuitePath, curTestSuite);
    });
    await Promise.all(writePromises);

    return suiteNameCodeMap;
  }

  /**
   * Collect execution traces for each test case in the test suite.
   * @param suiteNameCodeMap
   */
  private async collectAndOutputTraces(suiteNameCodeMap: Map<string, string>) {
    const testSuiteRunner = new TestSuiteRunner(this.processedTestSuitePath);
    let runner;

    const testCaseExecutionTraces = [];
    const tmpTestSuitePaths = Array.from(suiteNameCodeMap.keys());
    for (const suitePath of tmpTestSuitePaths) {
      runner = await testSuiteRunner.run(suitePath);
      console.log(runner.currentRunnable.file);

      Cov.collectCoverageData(cloneDeep(global.__coverage__));
      testCaseExecutionTraces.push({
        Code: suiteNameCodeMap.get(suitePath),
        Trace: testSuiteRunner.getTrace(),
      });
      Cov.resetInstrumentationData();
    }

    runner = await testSuiteRunner.run(this.processedTestSuitePath);
    console.log(runner.currentRunnable.file);
    Cov.collectCoverageData(cloneDeep(global.__coverage__));
    Cov.resetInstrumentationData();

    this.executionTracePath = path.join(
      this.config.executionTraceDir,
      `${Date.now()}.${this.className}.executionTrace.json`
    );

    await outputFile(
      this.executionTracePath,
      JSON.stringify(testCaseExecutionTraces),
      "utf-8"
    );

    console.log(`FileName: ${this.executionTracePath}`);
  }
}
