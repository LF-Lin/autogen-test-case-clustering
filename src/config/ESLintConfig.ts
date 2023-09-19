import { Linter } from "eslint";

export const eslintConfig: Linter.Config = {
  env: {
    es6: true,
    mocha: true,
    node: true,
  },
  extends: ["eslint:recommended"],
  rules: {
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: ["import"],
        next: ["expression"],
      },
      { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
      {
        blankLine: "any",
        prev: ["const", "let", "var"],
        next: ["const", "let", "var"],
      },
      {
        blankLine: "always",
        prev: ["multiline-expression"],
        next: ["multiline-expression"],
      },
    ],
  },
};
