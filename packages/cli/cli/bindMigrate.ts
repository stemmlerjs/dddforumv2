import { Command } from '@commander-js/extra-typings';

import { migrate } from '../src/commands/migrate';

export const bindMigrate = (program: Command) => {
  return program
    .command('migrate')
    .description('Migrate database')
    .requiredOption('-o <ormSchemaPath>', 'ORM schema file path')
    .action(async ({ o: ormSchemaPath }) => {
      await migrate({
        ormSchemaPath,
      });
    });
};
