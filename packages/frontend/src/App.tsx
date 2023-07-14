import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';

import FrontPageContainerComponent from './pages/frontPage/frontPage.container';
import RegistrationPageContainer from './pages/registrationPage/registrationPage.container';
import { menuPresenter, registrationPageController, routingService } from './shared/composition';

function App() {
  return (
    <div className="app">
      {routingService.createRoutes([
        { '/': <FrontPageContainerComponent menuPresenter={menuPresenter} /> },
        { '/register': <RegistrationPageContainer controller={registrationPageController} /> },
      ])}
    </div>
  );
}

export default App;
