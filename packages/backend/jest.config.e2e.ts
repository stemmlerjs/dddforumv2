import type { JestConfigWithTsJest } from 'ts-jest';

export default async (): Promise<JestConfigWithTsJest> => ({
  displayName: 'Backend (E2E)',
  testMatch: ['**/@(src|tests)/**/*.@(e2e).*'],
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest', {}],
  },
  globalSetup: './tests/globalDevEnvTestsSetup.ts',
});
