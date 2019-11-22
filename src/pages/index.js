import React from "react";

import { Router } from "@reach/router";

import PrivateRoute from "../components/private-route";

import Item from "./item";
import List from "./list";
import Login from "./login";

const App = () => {
  return (
    <Router>
      <Login default />

      <PrivateRoute path="/app">
        <List path="/list" />
        <Item path="/item/:itemId" />
        <Item path="/item" />
      </PrivateRoute>
    </Router>
  );
};

export default App;
