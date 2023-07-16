import { prepareEnv } from '@dddforum/cli/src/commands/prepareEnv';
import path from 'path';

export default async (): Promise<void> => {
  await prepareEnv({
    cwd: path.resolve(__dirname, '..'),
    dockerComposeFilePath: './docker-compose.yml',
    ormSchemaPath: './src/shared/persistence/prisma/schema.prisma',
  });
};
