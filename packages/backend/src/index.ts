import { ensureAndLoadEnvSync } from '@dddforum/shared/src/ensureAndLoadEnv';
import { logger } from '@dddforum/shared/src/logger';
import path from 'path';

logger.info('Starting backend');

// Must go before any Prisma imports (including transitive ones)
ensureAndLoadEnvSync(path.resolve(__dirname, '..'));

import { config } from '@dddforum/shared/src/config/appConfig.shared';

import { UserController } from './modules/users/userController';
import { WebServer } from './shared/http/webServer';

const userController = new UserController();

new WebServer({ port: config.api.port }, userController).start();
