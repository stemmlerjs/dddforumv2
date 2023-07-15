import { ensureAndLoadEnv } from '@dddforum/shared/src/ensureAndLoadEnv';
import { logger } from '@dddforum/shared/src/logger';
import { exec } from 'child_process';
import path from 'path';
import util from 'util';

import { name } from './package.json';

const execAsync = util.promisify(exec);

const build = async () => {
  logger.info(`Building ${name}`);
  await ensureAndLoadEnv(path.resolve(__dirname));
  await execAsync(`react-scripts build`);
};

build();
