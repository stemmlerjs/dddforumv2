import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FrontPageContainerComponent from "./pages/frontPage/frontPageComponent";
import "react-toastify/dist/ReactToastify.css";
import RegistrationPageComponent from "./pages/registrationPage/registrationPageComponent";

import { menuPresenter } from "./shared/composition";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <FrontPageContainerComponent menuPresenter={menuPresenter} />
            }
          />
          <Route
            path="/register"
            element={
              <RegistrationPageComponent />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
