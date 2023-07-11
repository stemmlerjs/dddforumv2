import { checkDocker } from '@dddforum/shared/dist/scripts/checkDocker';
import { execSync } from 'child_process';
import path from 'path';

export const prepareDev = (): void => {
  const packageRoot = path.resolve(__dirname);
  const execParams = {
    cwd: packageRoot,
    stdio: 'inherit',
  } as const;

  checkDocker();

  execSync('docker-compose up --build -d', execParams);
  execSync('prisma generate --schema src/shared/persistence/prisma/schema.prisma', execParams);
  execSync('dotenv -e .env.development -- npm run migrate', execParams);
};
