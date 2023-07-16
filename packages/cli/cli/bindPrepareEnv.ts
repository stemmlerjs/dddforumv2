import { Command } from '@commander-js/extra-typings';

import { prepareEnv } from '../src/commands/prepareEnv';

export const bindPrepareEnv = (program: Command) => {
  return program
    .command('prepareEnv')
    .description('Prepare env e.g. for development')
    .requiredOption('-d <dockerComposeFilePath>', 'docker-compose file path')
    .requiredOption('-o <ormSchemaPath>', 'ORM schema file path')
    .action(async ({ d: dockerComposeFilePath, o: ormSchemaPath }) => {
      await prepareEnv({
        dockerComposeFilePath,
        ormSchemaPath,
      });
    });
};
