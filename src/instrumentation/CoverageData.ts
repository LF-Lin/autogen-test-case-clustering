export class CoverageData {
  static collectCoverageData(instrumentationData) {
    const overall = {
      branch: 0,
      statement: 0,
      function: 0,
    };

    let totalBranches = 0;
    let totalStatements = 0;
    let totalFunctions = 0;
    for (const file of Object.keys(instrumentationData)) {
      const data = instrumentationData[file];

      const summary = {
        branch: 0,
        statement: 0,
        function: 0,
      };

      for (const statementKey of Object.keys(data.s)) {
        summary["statement"] += data.s[statementKey] ? 1 : 0;
        overall["statement"] += data.s[statementKey] ? 1 : 0;
      }

      for (const branchKey of Object.keys(data.b)) {
        summary["branch"] += data.b[branchKey][0] ? 1 : 0;
        overall["branch"] += data.b[branchKey][0] ? 1 : 0;
        summary["branch"] += data.b[branchKey][1] ? 1 : 0;
        overall["branch"] += data.b[branchKey][1] ? 1 : 0;
      }

      for (const functionKey of Object.keys(data.f)) {
        summary["function"] += data.f[functionKey] ? 1 : 0;
        overall["function"] += data.f[functionKey] ? 1 : 0;
      }

      totalStatements += Object.keys(data.s).length;
      totalBranches += Object.keys(data.b).length * 2;
      totalFunctions += Object.keys(data.f).length;

      overall["statement"] /= totalStatements;
      overall["branch"] /= totalBranches;
      overall["function"] /= totalFunctions;
      console.log(`
            statement: ${summary["statement"]}/${Object.keys(data.s).length}, ${
        Math.round((summary["statement"] / Object.keys(data.s).length) * 100) /
        100
      },
            branch: ${summary["branch"]}/${Object.keys(data.b).length * 2}, ${
        Math.round(
          (summary["branch"] / (Object.keys(data.b).length * 2)) * 100
        ) / 100
      },
            function: ${summary["function"]}/${Object.keys(data.f).length}, ${
        Math.round((summary["function"] / Object.keys(data.f).length) * 100) /
        100
      },`);
    }
  }

  static resetInstrumentationData() {
    for (const key of Object.keys(global.__coverage__)) {
      for (const statementKey of Object.keys(global.__coverage__[key].s)) {
        global.__coverage__[key].s[statementKey] = 0;
      }
      for (const functionKey of Object.keys(global.__coverage__[key].f)) {
        global.__coverage__[key].f[functionKey] = 0;
      }
      for (const branchKey of Object.keys(global.__coverage__[key].b)) {
        global.__coverage__[key].b[branchKey] = [0, 0];
      }
    }
  }
}
