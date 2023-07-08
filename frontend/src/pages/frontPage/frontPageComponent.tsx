import React, { useEffect } from 'react';
import { Layout } from '../../shared/components/layout';
import { MenuComponent } from '../../shared/components/menuComponent';
import { MenuPresenter } from '../../shared/components/menuPresenter';

const FrontPageContainerComponent = ({ menuPresenter }: { menuPresenter: MenuPresenter }) => {
  
  return (
    <Layout title="Front page">
      <MenuComponent presenter={menuPresenter} />
    </Layout>
  );
};

export default FrontPageContainerComponent;