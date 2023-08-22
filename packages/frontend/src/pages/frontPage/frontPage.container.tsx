import React from 'react';

import { Layout } from '../../shared/components/layout/layout';
import { MenuPresenter } from '../../shared/components/menu/menuPresenter';
import { MenuView } from '../../shared/components/menu/menuView';
import { PostsView } from '../../shared/components/posts/postsView';
import { PostsPresenter } from '../../shared/components/posts/postsPresenter';

interface FrontPageContainerProps {
  presenters: { menuPresenter: MenuPresenter, postsPresenter: PostsPresenter }
}

const FrontPageContainer = ({ presenters }: FrontPageContainerProps ) => {

  /**
   * Here on this frontpage, I need to ensure that I can load the list of posts,
   * and I need to ensure that as I load this list of posts, it's rendering as "loading"
   * and when they successfully load, they present themselves to me
   */

  return (
    <Layout title="Front page">
      <div>
        <MenuView presenter={presenters.menuPresenter} />
        <PostsView presenter={presenters.postsPresenter}/>
      </div>
    </Layout>
  );
};

export default FrontPageContainer;
