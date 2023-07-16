import { ensureAndLoadEnv } from '@dddforum/shared/src/ensureAndLoadEnv';
import { logger } from '@dddforum/shared/src/logger';
import execSh from 'exec-sh';
import path from 'path';

const { promise: execShAsync } = execSh;

import { name } from './package.json';

const build = async () => {
  logger.info(`Building ${name}`);
  await ensureAndLoadEnv(path.resolve(__dirname));
  await execShAsync(`react-scripts build`);
};

build();
