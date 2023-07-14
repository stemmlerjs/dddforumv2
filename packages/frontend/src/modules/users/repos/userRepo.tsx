import { CreateUserResponse } from '@dddforum/shared/src/users/dtos/usersDTOs.shared';
import axios from 'axios';

import { RegistrationForm } from '../../../pages/registrationPage/domainObjects/registrationForm';
import { GlobalCache, UsersState } from '../../../shared/persistence/globalState';

export class UserRepository {
  constructor(private cache: GlobalCache) {}

  public async createUser(
    registrationForm: RegistrationForm,
    onSuccess: (userState: UsersState) => void,
    onFailure: (err: unknown) => void,
  ) {
    // Make the request
    try {
      const response = await axios({
        method: 'POST',
        // TODO: Use config for this
        url: 'http://localhost:3000/users/new',
        data: registrationForm.toCreateUserDTO(),
      });

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
