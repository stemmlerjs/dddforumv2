import { checkDocker } from '@dddforum/shared/dist/scripts/checkDocker';
import { execSync } from 'child_process';
import path from 'path';

const packageRoot = path.resolve(__dirname);
const execParams = {
  cwd: packageRoot,
  stdio: 'inherit',
} as const;

checkDocker();
execSync('docker-compose up --build -d', execParams);
execSync('prisma generate', execParams);
execSync('npm run migrate', execParams);
