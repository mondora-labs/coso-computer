import React from "react";

import { Router } from "@reach/router";

import Item from "./item";
import List from "./list";
import Login from "./login";

const App = () => {
  return (
    <Router>
      <List path="/list" />
      <Login path="/" />
      <Item path="/item/:itemId" />
      <Item path="/item" />
    </Router>
  );
};

export default App;
