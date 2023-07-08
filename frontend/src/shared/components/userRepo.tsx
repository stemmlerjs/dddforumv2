
import axios from 'axios';

export class UserRepository {
  async getUserData() {
    // Make an API request or fetch user data from a data source
    return await axios.get('/api/user');
  }
}