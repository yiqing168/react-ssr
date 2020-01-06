import React from "react";
import { Route } from "react-router-dom";
import Home from "../client/pages/Home";
import Login from "../client/pages/Login";

const routes = [
  { path: "/login", component: Login, key: "login" },
  { path: "/", component: Home, loadData: Home.loadData, key: "home" }
];
export default routes;
