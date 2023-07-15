import { Command } from '@commander-js/extra-typings';

import { build } from '../src/commands/build/build';

export const bindBuild = (program: Command) => {
  return program
    .command('build')
    .description('Build TS files with respect of TS aliases')
    .requiredOption('-c <tsconfigPath>', 'tsconfig path')
    .action(async ({ c: tsconfigPath }) => {
      await build({ tsconfigPath });
    });
};
