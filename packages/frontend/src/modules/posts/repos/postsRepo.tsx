
import { GlobalCache, PostsState } from '../../../shared/persistence/globalState';

export class PostsRepository {
  constructor(private cache: GlobalCache) {}

  public async loadAllPosts() {
    // Make the request using the APIClient/Gateway
    // const response = await axios({
    //   method: 'POST',
    //   // TODO: Use config for this
    //   url: 'http://localhost:3000/users/new',
    //   data: registrationForm.toCreateUserDTO(),
    // });

    // Save the data somewhere shared so it can be accessed later
    // const createUserResponse: CreateUserResponse = response.data;

    this.cache.set('posts', {
      allPosts: [{ title: 'hi!'}]
    });

    return this.cache.get('posts') as PostsState
  }
}
