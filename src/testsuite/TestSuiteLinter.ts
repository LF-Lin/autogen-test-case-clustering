import { ESLint } from "eslint";
import { eslintConfig } from "../config/ESLintConfig";

export class TestSuiteLinter {
  private _testSuitePath;

  constructor(path: string) {
    this._testSuitePath = path;
  }

  async lint(): Promise<void> {
    const eslint = new ESLint({ baseConfig: eslintConfig, fix: true });
    const results = await eslint.lintFiles(this._testSuitePath);
    return await ESLint.outputFixes(results);
  }
}
