import React from "react";

import { Router } from "@reach/router";
import { StoreProvider } from "easy-peasy";

import PrivateRoute from "../components/private-route";

import Item from "./item";
import Landing from "./landing";
import List from "./list";
import Login from "./login";
import Logs from "./logs";

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
          <Landing path="/landing" />
          <Logs path="/logs" />
        </PrivateRoute>
      </Router>
    </StoreProvider>
  );
};

export default App;
