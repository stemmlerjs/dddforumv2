import { Command } from '@commander-js/extra-typings';

import { prepareEnv } from '../src/commands/prepareEnv';

export const bindPrepareEnv = (program: Command) => {
  return program
    .command('prepareEnv')
    .description('Prepare env e.g. for development')
    .requiredOption('-d <dockerComposePath>', 'docker-compose file path')
    .requiredOption('-o <ormSchemaPath>', 'orm schema file path')
    .action(async ({ d: dockerComposePath, o: ormSchemaPath }) => {
      await prepareEnv({
        relativeDockerComposeFilePath: dockerComposePath,
        relativeOrmSchemaPath: ormSchemaPath,
      });
    });
};
