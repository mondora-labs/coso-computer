import { action, thunk } from "easy-peasy";

import { getUpcycled } from "../utils/firebase";

const defaultState = {
  items: [],
  fetched: false
};

export const upcycled = {
  ...defaultState,
  updateItems: action((state, payload) => {
    return {
      ...state,
      fetched: true,
      items: payload
    };
  }),
  listUpcycled: thunk(async actions => {
    getUpcycled().then(items => actions.updateItems(items));
  })
};
