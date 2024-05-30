type Response<Data extends any | undefined, Success extends boolean, Error extends null | string> = {
  data: Data;
  success: Success;
  error: Error;
};

export type CreateUserInput = {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
};

export type UserDTO = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
};

type CreateUserSuccess = Response<UserDTO, true, null>;

type AccountAlreadyExists = Response<undefined, false, 'Account already exists'>;
type UsernameTaken = Response<undefined, false, 'Username taken'>;

export type CreateUserResponse = CreateUserSuccess | AccountAlreadyExists | UsernameTaken;

