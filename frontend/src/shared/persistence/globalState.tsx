import React from 'react';
import { createGlobalState } from 'react-hooks-global-state';

type Profile = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  id: string;
};

interface UsersState {
  me?: Profile
}

type GlobalState = {
  users: UsersState
}

const initialState: GlobalState = { 
  users: { }
};

const { useGlobalState } = createGlobalState(initialState);

export { useGlobalState };
