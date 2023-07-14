import { Config } from 'jest';

export default async (): Promise<Config> => ({
  verbose: true,
  projects: ['./packages/backend/jest.config.unit.ts', './packages/frontend/jest.config.unit.ts'],
});
