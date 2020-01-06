import React from "react";
import Header from "../../components/Header";

/**
 * 首页
 */
function Home(props) {
  return (
    <div>
      <Header />
    </div>
  );
}
Home.loadData = function() {
  return new Promise((resolve, reject) => {
    resolve(1);
  });
};
export default Home;
