
import { UserController } from "./modules/users/userController";
import { WebServer } from "./shared/http/webServer";
import { config } from './shared/config/appConfig.shared'

let userController = new UserController()

new WebServer({ port: config.api.port }, userController).start();


