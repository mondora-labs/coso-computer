import { createStore } from "easy-peasy";

import { user } from "./user";
import { macs } from "./macs";
import { logs } from "./logs";
import { upcycled } from "./upcycled";

const store = createStore(
  {
    user,
    macs,
    logs,
    upcycled
  },
  {
    disableImmer: true
  }
);

export default store;
