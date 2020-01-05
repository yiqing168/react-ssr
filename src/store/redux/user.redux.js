import { handleActions, createAction } from "redux-actions";

const GET_USER_LIST = "@user/GET_USER_LIST";

export const getUser = createAction(GET_USER_LIST);

function getInitState() {
  return {
    userList: []
  };
}
//定义初始化状态
let defaultState = getInitState();

export default handleActions(
  {
    [GET_USER_LIST]: (state, data) => {
      return Object.assign({}, state, { userList: data.payload });
    }
  },
  defaultState
);
