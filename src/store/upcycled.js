import { action, thunk } from "easy-peasy";

import { upsertUpcycled, getUpcycled } from "../utils/firebase";

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
  addUpcycled: action((state, payload) => {
    upsertUpcycled(payload);
    return {
      ...state,
      items: [...state.items.filter(upcycled => upcycled.id !== payload.id), upcycled]
    };
  }),
  listUpcycled: thunk(async actions => {
    getUpcycled().then(items => actions.updateItems(items));
  })
};
