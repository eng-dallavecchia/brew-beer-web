import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainScreen from "screens/MainScreen";
import LoginScreen from "screens/LoginScreen";
import GraphScreen from "screens/GraphScreen";
import CalibrationScreen from "screens/CalibrationScreen";

import DrawerGlobal from "routes/DrawerGlobal";
import { LoggedProvider } from "contexts/LoggedContext";
import { setBrowserRouter } from "routes/browserRouterService";

export const Routes = () => {
  return (
    <BrowserRouter ref={browserRouter => setBrowserRouter(browserRouter)}>
      <Switch>
        <Route path="/" exact component={LoginScreen} />
        <Route path="/brew">
          <LoggedProvider>
            <DrawerGlobal>
              <Route path="/brew/main" component={MainScreen} />
              <Route path="/brew/graph" component={GraphScreen} />
              <Route path="/brew/calibration" component={CalibrationScreen} />
            </DrawerGlobal>
          </LoggedProvider>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
