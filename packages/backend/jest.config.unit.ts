import path from 'path';
import type { JestConfigWithTsJest } from 'ts-jest';
import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from '../../tsconfig.json';

export default async (): Promise<JestConfigWithTsJest> => ({
  displayName: 'Backend (unit)',
  testMatch: ['**/@(src|tests)/**/*.@(test|spec).*'],
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest', {}],
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: path.resolve(__dirname, '../../'),
  }),
});
