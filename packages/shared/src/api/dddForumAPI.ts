
import { CreateUserInput } from '../users/dtos/usersDTOs.shared';
import { HTTP } from './protocols/http';

/**
 * This is the Protocol Driver
 */

export class DDDForumAPI {

  private http: HTTP;

  constructor () {
   this.http = new HTTP();
  }

  createNewUser (input: CreateUserInput) {
    return this.http.post('/users/new', input);
  }
}