import React from 'react';

import { Layout } from '../../shared/components/layout/layout';
import { MenuPresenter } from '../../shared/components/menu/menuPresenter';
import { MenuView } from '../../shared/components/menu/menuView';

const FrontPageContainer = ({ menuPresenter }: { menuPresenter: MenuPresenter }) => {
  return (
    <Layout title="Front page">
      <MenuView presenter={menuPresenter} />
    </Layout>
  );
};

export default FrontPageContainer;
