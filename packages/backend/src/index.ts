import { config } from '@dddforum/shared/src/config/appConfig.shared';

import { UserController } from './modules/users/userController';
import { WebServer } from './shared/server/webServer';

const userController = new UserController();

new WebServer({ port: config.api.port }, userController).start();
