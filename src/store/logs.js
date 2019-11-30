import { action, thunk } from "easy-peasy";

import { getLogs } from "../utils/firebase";

const defaultState = {
  items: [],
  fetched: false
};

export const logs = {
  ...defaultState,
  updateItems: action((state, payload) => {
    return {
      ...state,
      fetched: true,
      items: payload
    };
  }),
  listLogs: thunk(async actions => {
    getLogs().then(items => actions.updateItems(items));
  })
};
