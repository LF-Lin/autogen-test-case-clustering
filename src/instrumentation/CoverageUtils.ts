import { cloneDeep } from "lodash";
import { TestSuiteRunner } from "../testsuite/TestSuiteRunner";
import { CoverageData as Cov } from "./CoverageData";
import { JavaScriptObjective } from "../testcase/preprocess/JavaScriptObjective";
import { setupLogger } from "@syntest/logging";

export class CoverageUtils {
  static async compareTwoSuiteCoverage(suite1, suite2) {
    const testSuiteRunner = new TestSuiteRunner(suite1);
    const runner = await testSuiteRunner.run(suite1);
    console.log(runner.currentRunnable.file);
    Cov.collectCoverageData(cloneDeep(global.__coverage__));
    Cov.resetInstrumentationData();

    const testSuiteRunner2 = new TestSuiteRunner(suite2);
    const runner2 = await testSuiteRunner2.run(suite2);
    console.log(runner2.currentRunnable.file);
    Cov.collectCoverageData(cloneDeep(global.__coverage__));
    Cov.resetInstrumentationData();
  }

  static getObjectives(sourceCodePath) {
    setupLogger("", [], "info");
    const objectiveManager = new JavaScriptObjective(sourceCodePath);
    const cfg = objectiveManager.getCfg();
    const objs = objectiveManager.getObjectives(cfg.functions);
    // console.log(`#objectives: ${[...objs.keys()].length}`);
    return objs;
  }
}
