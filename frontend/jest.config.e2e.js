module.exports = {
  "setupFilesAfterEnv": ["./tests/testsSetup.ts"],
  preset: "jest-puppeteer",
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  roots: ['<rootDir>/src', '<rootDir>/tests',],
  testRegex: "(/tests/.*\\.e2e)\\.(jsx?|tsx?|ts?)$",
  testTimeout: 10000, 
};
