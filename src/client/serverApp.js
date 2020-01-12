import React from "react";
import { StaticRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { matchRoutes } from "react-router-config";
import { createServerStore } from "../store";
import routes from "../utils/Routes";

export default function(req) {
  return new Promise((resolve, reject) => {
    const serverStore = createServerStore();
    const promises = [];
    const branch = matchRoutes(routes, req.path);
    branch.forEach(list => {
      if (list.route.loadData) {
        promises.push(list.route.loadData(serverStore));
      }
    });
    Promise.all(promises).then(() => {
      resolve({
        component: (
          <Provider store={serverStore}>
            <StaticRouter location={req.path} context={{}}>
              <Switch>
                {routes.map(route => (
                  <Route {...route} />
                ))}
              </Switch>
            </StaticRouter>
          </Provider>
        ),
        store: serverStore
      });
    });
  });
}
