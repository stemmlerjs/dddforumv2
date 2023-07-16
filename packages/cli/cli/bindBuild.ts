import { Command } from '@commander-js/extra-typings';

import { build } from '../src/commands/build/build';

export const bindBuild = (program: Command) => {
  return program
    .command('build')
    .description('Transpile TS files and post-process imports')
    .requiredOption('-c <tsconfigPath>', 'tsconfig path')
    .action(async ({ c: tsconfigPath }) => {
      await build({ tsconfigPath });
    });
};
