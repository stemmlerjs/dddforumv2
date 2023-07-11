import { config } from '@dddforum/shared/dist/config/appConfig.shared';

import { UserController } from './modules/users/userController';
import { WebServer } from './shared/http/webServer';

const userController = new UserController();

new WebServer({ port: config.api.port }, userController).start();
