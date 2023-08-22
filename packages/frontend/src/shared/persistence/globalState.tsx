import { UserDTO } from '@dddforum/shared/src/users/dtos/usersDTOs.shared';

export interface UsersState {
  me?: UserDTO;
}

export type PostDTO = {
  title: string;
}

export interface PostsState {
  allPosts: PostDTO[]
}

type GlobalState = {
  users: UsersState;
  posts: PostsState;
};

type State = GlobalState[keyof GlobalState];

type Callback = (data: State) => void;

type KeyInCache = 'users' | 'posts';

export class GlobalCache {
  private subscribers: { 
    users: { [key: string]: Callback | undefined },
    posts: { [key: string]: Callback | undefined } 
  };

  private data: GlobalState;

  constructor() {
    this.subscribers = { users: {}, posts: {} };
    this.data = {
      users: {},
      posts: { allPosts: [] }
    };
  }

  subscribe<T>(
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
    // @ts-ignore
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
