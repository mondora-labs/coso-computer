import { createStore, persist } from "easy-peasy";

import { user } from "./user";
import { macs } from "./macs";
import { logs } from "./logs";

const store = createStore(
  persist({
    user,
    macs,
    logs,
  }),
  {
    disableImmer: true,
  }
);

export default store;
