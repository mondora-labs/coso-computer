import { createStore } from "easy-peasy";

import { user } from "./user";
import { macs } from "./macs";

const store = createStore(
  {
    user,
    macs
  },
  {
    disableImmer: true
  }
);

export default store;
