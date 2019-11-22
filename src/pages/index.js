import React from "react";

import { Router } from "@reach/router";
import { StoreProvider } from "easy-peasy";

import PrivateRoute from "../components/private-route";

import Item from "./item";
import List from "./list";
import Login from "./login";

import store from "../store";

const App = () => {
  return (
    <StoreProvider store={store}>
      <Router>
        <Login default />

        <PrivateRoute path="/app">
          <List path="/list" />
          <Item path="/item/:itemId" />
          <Item path="/item" />
        </PrivateRoute>
      </Router>
    </StoreProvider>
  );
};

export default App;
