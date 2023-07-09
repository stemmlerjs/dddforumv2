
import { UserRepository } from "../users/repos/userRepo";
import { GlobalCache } from "../persistence/globalState";
import { NotificationService } from "../notifications/notificationService";
import { RoutingService } from "../routing/routingService";
import { MenuPresenter } from "../components/menu/menuPresenter";
import { RegistrationPageController } from "../../pages/registrationPage/registrationPage.controller";

const cache = new GlobalCache()
const userRepo = new UserRepository(cache);
const menuPresenter = new MenuPresenter(cache);
const notificationsService = new NotificationService()
const routingService = new RoutingService();
const registrationPageController = new RegistrationPageController (notificationsService, userRepo)

export {
  userRepo,
  cache,
  menuPresenter,
  notificationsService,
  routingService,
  registrationPageController
}