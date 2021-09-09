import {Config} from '@jest/types';

const config: Config.InitialOptions = {
  testEnvironment: `jsdom`,
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/?(*.)+(spec|test).[jt]s?(x)",
  ],
  moduleNameMapper: {
    "\\.scss$": "<rootDir>/__mocks__/styleMock.ts",
  },
};

export default config;
