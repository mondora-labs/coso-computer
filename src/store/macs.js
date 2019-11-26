import { action, thunk } from "easy-peasy";

import { upsertMac, getMacs, deleteMac } from "../utils/firebase";

const defaultState = {
  items: [],
  fetched: false
};

/**
 * Those are optimistic updates
 */
export const macs = {
  ...defaultState,
  updateItems: action((state, payload) => {
    return {
      ...state,
      fetched: true,
      items: payload
    };
  }),
  addMac: action((state, payload) => {
    upsertMac(payload);

    return {
      ...state,
      items: [...state.items.filter(mac => mac.id !== payload.id), payload]
    };
  }),
  removeMac: action((state, payload) => {
    deleteMac(payload);

    return {
      ...state,
      items: state.items.filter(x => x.id !== payload)
    };
  }),
  listMacs: thunk(async actions => {
    getMacs().then(items => actions.updateItems(items));
  })
};
