
import React, { useEffect } from 'react';
import { Layout } from '../../shared/components/layout/layout';
import { MenuView } from '../../shared/components/menu/menuView';
import { MenuPresenter } from '../../shared/components/menu/menuPresenter';

const FrontPageContainer = ({ menuPresenter }: { menuPresenter: MenuPresenter }) => {
  return (
    <Layout title="Front page">
      <MenuView presenter={menuPresenter} />
    </Layout>
  );
};

export default FrontPageContainer;