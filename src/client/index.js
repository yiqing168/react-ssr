import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createClientStore } from "../store";
import Routes from "../utils/Routes";
import "./index.less";

const clientStore = createClientStore();
ReactDom.hydrate(
  <Provider store={clientStore}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);
