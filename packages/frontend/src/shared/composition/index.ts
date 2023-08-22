import { PostsRepository } from '../../modules/posts/repos/postsRepo';
import { UserRepository } from '../../modules/users/repos/userRepo';
import { RegistrationPageController } from '../../pages/registrationPage/registrationPage.controller';
import { MenuPresenter } from '../components/menu/menuPresenter';
import { PostsPresenter } from '../components/posts/postsPresenter';
import { NotificationService } from '../notifications/notificationService';
import { GlobalCache } from '../persistence/globalState';
import { RoutingService } from '../routing/routingService';

const cache = new GlobalCache();
const userRepo = new UserRepository(cache);
const postsRepo = new PostsRepository(cache);
const menuPresenter = new MenuPresenter(cache);
const postsPresenter = new PostsPresenter(cache, postsRepo);
const notificationsService = new NotificationService();
const routingService = new RoutingService();
const registrationPageController = new RegistrationPageController(notificationsService, userRepo);

export {
  cache,
  menuPresenter,
  postsPresenter,
  notificationsService,
  registrationPageController,
  routingService,
  userRepo,
};
