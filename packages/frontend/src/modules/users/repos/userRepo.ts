import { CreateUserResponse } from '@dddforum/shared/src/users/dtos/usersDTOs.shared';

import { RegistrationForm } from '../../../pages/registrationPage/domainObjects/registrationForm';
import { GlobalCache, UsersState } from '../../../shared/persistence/globalState';

import { DDDForumAPI } from '@dddforum/shared/src/api/dddForumAPI'

export class UserRepository {
  constructor(private cache: GlobalCache, private api: DDDForumAPI) {}

  public async createUser(
    registrationForm: RegistrationForm,
    onSuccess: (userState: UsersState) => void,
    onFailure: (err: unknown) => void,
  ) {
    
    try {
      const response = await this.api.createNewUser(registrationForm.toCreateUserDTO());

      // Save the data somewhere shared so it can be accessed later
      const createUserResponse: CreateUserResponse = response.data;

      this.cache.set('users', {
        me: createUserResponse.data,
      });

      return onSuccess(this.cache.get('users'));
    } catch (err) {
      return onFailure(err);
    }
  }
}
