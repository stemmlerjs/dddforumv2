import React, { useEffect, useState } from 'react';
import { PostsPresenter } from './postsPresenter';
import { PostViewModel } from './postViewModel';

export const PostsView = ({ presenter }: { presenter: PostsPresenter }) => {
  let [posts, setPosts] = useState<PostViewModel[]>([]);

  useEffect(() => {
    presenter.loadPosts((postViewModels) => {
      setPosts(postViewModels as PostViewModel[]);
    });
  }, [presenter]);
  
  console.log(presenter.isLoadingPosts())

  if (presenter.isLoadingPosts()) return <div>Loading...</div>;
  if (presenter.hasLoadedPosts() && posts)
    return (
      <>
        {posts.map((post, key) => (
          <div key={key} className="post">
            {post.getTitle()}
          </div>
        ))}
      </>
    );

  return <div>{presenter.getPostLoadingError()}</div>;
};
