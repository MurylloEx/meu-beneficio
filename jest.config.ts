import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: true,
  silent: true,
  preset: "ts-jest",
  moduleDirectories: ["src", "node_modules"],
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "./",
  modulePaths: ["<rootDir>"],
  testRegex: "(.*\\.spec\\.ts|.*\\.e2e-spec\\.ts)$",
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "tsconfig.json" }],
  },
  collectCoverageFrom: ["**/*.ts"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
};

export default config;
