import type { JestConfigWithTsJest } from 'ts-jest';

export default async (): Promise<JestConfigWithTsJest> => ({
  displayName: 'Backend (infra)',
  testMatch: ['**/@(src|tests)/**/*.@(infra).*'],
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest', {}],
  },
  globalSetup: './tests/globalDevEnvTestsSetup.ts',
});
