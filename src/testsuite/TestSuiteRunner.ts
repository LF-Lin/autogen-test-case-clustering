require("@babel/register")({
  presets: ["@babel/preset-env"],
});

import * as path from "path";
import Mocha, { Runner } from "mocha";
import "regenerator-runtime/runtime.js";
import { SilentMochaReporter } from "@syntest/search-javascript";
import { cloneDeep } from "lodash";

import { Datapoint } from "@syntest/search";
import {
  InstrumentationData,
  MetaData,
} from "@syntest/instrumentation-javascript";

/**
 * source from JavaScriptRunner.ts in @syntest/search-javascript
 */
export class TestSuiteRunner {
  private _testSuitePath;

  constructor(path: string) {
    this._testSuitePath = path;
  }

  async run(filePath: any = null): Promise<Runner> {
    const argv: Mocha.MochaOptions = <Mocha.MochaOptions>(<unknown>{
      reporter: SilentMochaReporter,
    });

    const mocha = new Mocha(argv);

    if (filePath) {
      mocha.addFile(path.resolve(filePath));
    } else {
      mocha.addFile(path.resolve(this._testSuitePath));
    }

    let runner: Runner = null;

    await new Promise((resolve) => {
      runner = mocha.run((failures) => resolve(failures));
    });

    await mocha.dispose();
    return runner;
  }

  getTrace(): any {
    const instrumentationData = <InstrumentationData>(
      cloneDeep(
        (<{ __coverage__: InstrumentationData }>(<unknown>global)).__coverage__
      )
    );
    const metaData = <MetaData>(
      cloneDeep((<{ __meta__: MetaData }>(<unknown>global)).__meta__)
    );

    const traces: Datapoint[] = [];

    for (const key of Object.keys(instrumentationData)) {
      for (const functionKey of Object.keys(instrumentationData[key].fnMap)) {
        const function_ = instrumentationData[key].fnMap[functionKey];
        const hits = instrumentationData[key].f[functionKey];

        traces.push({
          id: function_.decl.id,
          type: "function",
          path: key,
          location: function_.decl,

          hits: hits,
        });
      }

      for (const statementKey of Object.keys(
        instrumentationData[key].statementMap
      )) {
        const statement = instrumentationData[key].statementMap[statementKey];
        const hits = instrumentationData[key].s[statementKey];

        traces.push({
          id: statement.id,
          type: "statement",
          path: key,
          location: statement,

          hits: hits,
        });
      }

      for (const branchKey of Object.keys(instrumentationData[key].branchMap)) {
        const branch = instrumentationData[key].branchMap[branchKey];
        const hits = <number[]>instrumentationData[key].b[branchKey];
        const meta =
          metaData === undefined ? undefined : metaData[key]?.meta?.[branchKey];

        traces.push({
          id: branch.locations[0].id,
          path: key,
          type: "branch",
          location: branch.locations[0],

          hits: hits[0],

          condition_ast: meta?.condition_ast,
          condition: meta?.condition,
          variables: meta?.variables,
        });

        if (branch.locations.length > 2) {
          // switch case
          for (const [index, location] of branch.locations.entries()) {
            if (index === 0) {
              continue;
            }
            traces.push({
              id: location.id,
              path: key,
              type: branch.type,
              location: branch.locations[index],

              hits: hits[index],

              condition_ast: meta?.condition_ast,
              condition: meta?.condition,
              variables: meta?.variables,
            });
          }
        } else if (branch.locations.length === 2) {
          // normal branch
          // or small switch
          traces.push({
            id: branch.locations[1].id,
            path: key,
            type: branch.type,
            location: branch.locations[1],

            hits: hits[1],

            condition_ast: meta?.condition_ast,
            condition: meta?.condition,
            variables: meta?.variables,
          });
        } else if (
          branch.locations.length === 1 &&
          branch.type === "default-arg"
        ) {
          // this is the default-arg branch it only has one location
          traces.push({
            id: branch.locations[0].id,
            path: key,
            type: "branch",
            location: branch.locations[0],

            hits: hits[0] ? 0 : 1,

            condition_ast: meta?.condition_ast,
            condition: meta?.condition,
            variables: meta?.variables,
          });
        } else {
          throw new Error(
            `Invalid number of locations for branch type: ${branch.type}`
          );
        }
      }
    }

    return traces;
  }
}
