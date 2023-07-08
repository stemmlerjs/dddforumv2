
type Response<Data extends any | undefined, Success extends boolean, Error extends null | string> = {
  data: Data,
  success: Success,
  error: Error
}

export type CreateUserInput = {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
}

type CreateUserSuccess = Response<{
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
}, true, null>;

type AccountAlreadyExists = Response<undefined, false, 'Failure'>;
type UsernameTaken = Response<undefined, false, 'Failure'>;

export type CreateUserResponse = CreateUserSuccess | AccountAlreadyExists | UsernameTaken;