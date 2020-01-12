import React from "react";
import { connect } from "react-redux";
import Header from "../../components/Header";
import { getUserData } from "@/store/redux/user.redux";

/**
 * 首页
 */
function Home(props) {
  const { userList } = props;
  return (
    <div>
      <Header />
      {userList.map(list => {
        return <div key={list.name}>{list.name}</div>;
      })}
    </div>
  );
}
Home.loadData = function({ dispatch }) {
  return dispatch(getUserData());
};
function mapStateToProps(state) {
  const { user } = state;
  return { userList: user.userList };
}

export default connect(mapStateToProps)(Home);
