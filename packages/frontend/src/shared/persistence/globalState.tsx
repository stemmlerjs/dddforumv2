import { UserDTO } from '@dddforum/shared/src/users/dtos/usersDTOs.shared';

export interface UsersState {
  me?: UserDTO;
}

type GlobalState = {
  users: UsersState;
};

type State = GlobalState[keyof GlobalState];

type Callback = (data: State) => void;

type KeyInCache = 'users';

export class GlobalCache {
  private subscribers: { users: { [key: string]: Callback | undefined } };
  private data: GlobalState;

  constructor() {
    this.subscribers = { users: {} };
    this.data = {
      users: {},
    };
  }

  subscribe(
    key: KeyInCache,
    subscriberName: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    cb: Callback,
  ) {
    const alreadySubscribed = this.subscribers[key] && this.subscribers[key][subscriberName];
    if (alreadySubscribed) {
      console.log(`${subscriberName} already subscribed to ${key}, skipping.`);
    }

    this.subscribers[key][subscriberName] = cb;
  }

  get(key: KeyInCache) {
    return this.data[key];
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  set(key: KeyInCache, data: State) {
    this.data[key] = data;
    this.notify(key);
  }

  notify(key: KeyInCache) {
    const newState = this.get(key);
    const subscriberKeys = Object.keys(this.subscribers[key]);
    for (const subKey of subscriberKeys) {
      const subscriberCallback = this.subscribers[key][subKey];
      subscriberCallback ? subscriberCallback(newState) : '';
    }
  }
}
