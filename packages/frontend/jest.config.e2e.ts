import type { JestConfigWithTsJest } from 'ts-jest';

export default async (): Promise<JestConfigWithTsJest> => ({
  displayName: 'Frontend (E2E)',
  testMatch: ['**/@(src|tests)/**/*.@(e2e).*'],
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest', {}],
  },
  globalSetup: './tests/globalTestEnvTestsSetup.ts',
  setupFilesAfterEnv: ['./tests/testsSetupAfterEnv.ts'],
});
