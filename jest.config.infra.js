module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testEnvironment: 'node',
  testRegex: './(src|tests)/.*\\.(ispec)?\\.(ts|ts)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  globalSetup: './tests/infraDevTestSetup.ts'
};
