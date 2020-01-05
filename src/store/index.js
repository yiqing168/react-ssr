import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { reduxDevtool } from "../utils/utils";
import reducers from "./reducer";

// redux中间件
const middleware = [thunkMiddleware];

/**
 * 创建 store  根据开发环境启用插件 开发环境
 */
export function createClientStore() {
  return createStore(
    reducers,
    reduxDevtool()
      ? compose(
          applyMiddleware(...middleware),
          window.__REDUX_DEVTOOLS_EXTENSION__()
        )
      : applyMiddleware(...middleware)
  );
}
/**
 * 创建服务器环境
 */
export function createServerStore() {
  return createStore(reducers, applyMiddleware(...middleware));
}
if (module.hot) {
  // module.hot.accept('./reducer', () => {
  //   const newReducers = require('./reducer').default;
  //   store.replaceReducer(newReducers);
  // })
}
