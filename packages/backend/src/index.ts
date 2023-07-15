import { config } from '@dddforum/shared/src/config/appConfig.shared';
import { ensureAndLoadEnv } from '@dddforum/shared/src/ensureAndLoadEnv';
import { logger } from '@dddforum/shared/src/logger';
import path from 'path';

import { UserController } from './modules/users/userController';
import { WebServer } from './shared/http/webServer';

const boot = async () => {
  logger.info('Starting backend');

  await ensureAndLoadEnv(path.resolve(__dirname, '..'));

  const userController = new UserController();

  new WebServer({ port: config.api.port }, userController).start();
};

boot();
