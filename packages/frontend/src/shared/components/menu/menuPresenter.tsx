import { GlobalCache, UsersState } from '../../persistence/globalState';
import { MenuViewModel } from './menuViewModel';

export class MenuPresenter {
  private vm: MenuViewModel | undefined;
  private cache: GlobalCache;

  constructor(cache: GlobalCache) {
    this.cache = cache;
    this.setupSubscriptions(cache);
    this.vm = undefined;
  }

  private setupSubscriptions(cache: GlobalCache) {
    cache.subscribe('users', MenuPresenter.name, (users: UsersState) => this.rebuildViewModel(users));
  }

  private rebuildViewModel(users: UsersState) {
    const usernameOrNone = users.me?.username;
    const loggedIn = usernameOrNone !== undefined;

    const vm = new MenuViewModel({
      username: usernameOrNone,
      isLoggedIn: loggedIn,
    });

    this.vm = vm;
  }

  async load(cb: (vm: MenuViewModel | undefined) => void) {
    this.rebuildViewModel(this.cache.get('users'));
    cb(this.vm);
  }
}
