import React from "react";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createServerStore } from "../store";
import Routes from "../utils/Routes";

function App(props) {
  const { req } = props;
  const serverStore = createServerStore();
  return (
    <Provider store={serverStore}>
      <StaticRouter location={req.path} context={{}}>
        <Routes />
      </StaticRouter>
    </Provider>
  );
}

export default function(req) {
  return <App req={req} />;
}
