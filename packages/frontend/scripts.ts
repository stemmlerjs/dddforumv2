import { execSync } from 'child_process';
import * as path from 'path';

const envFile = getEnvFile();
const packageRoot = path.resolve(__dirname);
const execParams = {
  cwd: packageRoot,
  stdio: 'inherit',
} as const;

const build = () => {
  console.log(`Building using ${envFile}`);

  execSync(`dotenv -e ${envFile} vite build`, execParams);
};

const start = () => {
  console.log(`Starting using ${envFile}`);

  execSync(`dotenv -e ${envFile} vite`, execParams);
};

const scriptToRun = process.argv[2]?.trim();

switch (scriptToRun) {
  case 'build':
    build();
    break;
  case 'start':
    start();
    break;
  default:
    throw new Error(`Unknown script ${scriptToRun}`);
}

function getEnvFile(): string {
  const nodeEnv = process.env.NODE_ENV?.toLowerCase() || 'development';

  switch (nodeEnv) {
    case 'production':
      return '.env.production';
    case 'staging':
      return '.env.staging';
    default:
      return '.env.development';
  }
}
