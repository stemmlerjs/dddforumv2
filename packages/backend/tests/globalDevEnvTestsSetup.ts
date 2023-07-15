import { prepareEnv } from '@dddforum/build-tools/src/commands/prepareEnv';
import path from 'path';

export default async (): Promise<void> => {
  await prepareEnv({
    cwd: path.resolve(__dirname, '..'),
    relativeDockerComposeFilePath: './docker-compose.yml',
    relativeOrmSchemaPath: './src/shared/persistence/prisma/schema.prisma',
  });
};
