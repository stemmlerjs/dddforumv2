import { MenuPresenter } from "../components/menuPresenter";
import { UserRepository } from "../components/userRepo";
import { GlobalCache } from "../persistence/globalState";

const userRepo = new UserRepository();
const cache = new GlobalCache()
const menuPresenter = new MenuPresenter(cache);

export {
  menuPresenter,
  cache
}