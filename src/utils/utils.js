/**
 * 开发环境启用 reduxDevtool
 */
export function reduxDevtool() {
  if (process.env.NODE_ENV && process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    return true;
  }
  return false;
}
