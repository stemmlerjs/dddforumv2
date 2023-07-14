import { execSync } from 'child_process';
import * as path from 'path'

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

const build = () => {
  const envFile = getEnvFile();
  const packageRoot = path.resolve(__dirname);
  const execParams = {
    cwd: packageRoot,
    stdio: 'inherit',
  } as const;

  console.log(`Building using ${envFile}`)

  try {
    execSync(`dotenv -e ${envFile} cross-env react-scripts build`, execParams);
  } catch (error) {
    console.error('Error executing react-scripts build:', error);
    process.exit(1);
  }
  
}

build();
