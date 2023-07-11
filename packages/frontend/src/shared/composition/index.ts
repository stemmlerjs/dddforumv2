import { RegistrationPageController } from '../../pages/registrationPage/registrationPage.controller';
import { MenuPresenter } from '../components/menu/menuPresenter';
import { NotificationService } from '../notifications/notificationService';
import { GlobalCache } from '../persistence/globalState';
import { RoutingService } from '../routing/routingService';
import { UserRepository } from '../users/repos/userRepo';

const cache = new GlobalCache();
const userRepo = new UserRepository(cache);
const menuPresenter = new MenuPresenter(cache);
const notificationsService = new NotificationService();
const routingService = new RoutingService();
const registrationPageController = new RegistrationPageController(notificationsService, userRepo);

export { cache, menuPresenter, notificationsService, registrationPageController, routingService, userRepo };
