import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const getPath = (c: RouteConfig) => Object.keys(c)[0];
const getElement = (c: RouteConfig) => c[getPath(c)];

type RouteConfig = { [key: string]: JSX.Element };

export class RoutingService {
  public createRoutes(routeConfigList: RouteConfig[]) {
    return (
      <div>
        <Router>
          <Routes>
            {routeConfigList.map((config) => (
              <Route path={getPath(config)} element={getElement(config)} />
            ))}
          </Routes>
        </Router>
      </div>
    );
  }
}
