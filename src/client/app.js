import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import Home from "./pages/Home"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(55555555555555555555);
    return (
      <div><Home /></div>
    );
  }
}
export default hot(App);