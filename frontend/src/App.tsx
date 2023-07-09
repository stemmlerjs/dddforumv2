

import React from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import {
  menuPresenter,
  routingService,
  registrationPageController
} from "./shared/composition";
import FrontPageContainerComponent from "./pages/frontPage/frontPage.container";
import RegistrationPageContainer from "./pages/registrationPage/registrationPage.container";

function App() {
  return (
    <div className="app">
      {routingService.createRoutes([
        { '/': <FrontPageContainerComponent menuPresenter={menuPresenter} /> },
        { '/register': <RegistrationPageContainer controller={registrationPageController} />}
      ])}
    </div>
  );
}

export default App;
