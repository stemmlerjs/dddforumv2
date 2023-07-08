
import React from 'react';
import { UserDTO } from '../users/dtos/usersDTOs.shared';

export interface UsersState {
  me?: UserDTO
}

type GlobalState = {
  users: UsersState
}

type KeyInCache = 'users';

export class GlobalCache {
  
  private subscribers: any;
  private data: GlobalState;

  constructor () {
    this.subscribers = { users: {} };
    this.data = {
      users: { }
    }
  }

  subscribe (key: KeyInCache, subscriberName: string, cb: Function) {
    const alreadySubscribed = this.subscribers[key] && this.subscribers[key][subscriberName]
    if (alreadySubscribed) {
      console.log(`${subscriberName} already subscribed to ${key}, skipping.`)
    }
    
    this.subscribers[key][subscriberName] = cb;
  }

  get (key: KeyInCache) {
    return this.data[key];
  }

  set (key: KeyInCache, data: any) {
    this.data[key] = data;
    this.notify(key);
  }

  notify(key: KeyInCache) {
    let newState = this.get(key);
    let subscriberKeys = Object.keys(this.subscribers[key]);
    for (let subKey of subscriberKeys) {
      let subscriberCallback = this.subscribers[key][subKey];
      subscriberCallback(newState);
    }
  }
}
