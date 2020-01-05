import React from "react";
import { Route } from "react-router-dom"
import Home from "../client/pages/Home"
import Login from "../client/pages/Login"

export default function () {
  return (
    <div>
      <Route component={Home} path="/" exact={true}  ></Route>
      <Route component={Login} path="/login" ></Route>
    </div>
  )
}