import { PostsRepository } from '@dddforum/frontend/src/modules/posts/repos/postsRepo';
import { GlobalCache, PostsState } from '../../persistence/globalState';
import { PostViewModel } from './postViewModel';
import { LoadingState } from '../../loading/loadingState';

export class PostsPresenter {
  private vm: PostViewModel[] | undefined;
  private postsRepo: PostsRepository;
  private cache: GlobalCache;
  private loadingState: LoadingState;

  constructor(cache: GlobalCache, postsRepo: PostsRepository) {
    this.postsRepo = postsRepo;
    this.loadingState = new LoadingState();
    this.cache = cache;
    this.setupSubscriptions(cache);
    this.vm = undefined;
  }

  private setupSubscriptions(cache: GlobalCache) {
    cache.subscribe<PostsState>('users', PostsPresenter.name, (posts) => this.rebuildViewModel(posts as PostsState));
  }

  /**
   * @description It's the presenter's job to tell infrastructure that it's time to 
   * load objects from persistence. Therefore, it would only make sense for it to
   * be the presenter's responsibility to know the current status of loading, successful loading, failed
   * loading, and what the error could have been. We can abstract that work using a new construct
   * which I've just named LoadingState.
   * 
   * I've used composition here (which means adding it *to* the class rather than inheriting it).
   */

  async loadPosts(cb: (vms: PostViewModel[] | undefined) => void) {
    this.loadingState.setLoading();

    try {
      await this.postsRepo.loadAllPosts()
      this.rebuildViewModel(this.cache.get('posts') as PostsState);
      this.loadingState.setLoadSuccess();
    } catch (err) {
      this.loadingState.setLoadError('Uh oh')
    }

    cb(this.vm)
  }

  private rebuildViewModel(posts: PostsState) {
    this.vm = posts.allPosts.map((p) => new PostViewModel(p));
  }

  getPostLoadingError(): string {
    return this.loadingState.getLoadError();
  }

  isLoadingPosts(): boolean {
    return this.loadingState.isLoading()
  }

  hasLoadedPosts() {
    return this.loadingState.wasLoadSuccessful();
  }
}
