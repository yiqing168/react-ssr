import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createClientStore } from "../store";
import routes from "../utils/Routes";
import "./index.less";

const clientStore = createClientStore();
ReactDom.hydrate(
  <Provider store={clientStore}>
    <BrowserRouter>
      <Switch>
        {routes.map(route => (
          <Route {...route} />
        ))}
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);
