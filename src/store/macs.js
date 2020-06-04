import { action, thunk } from "easy-peasy";
import { v4 as uuid } from "uuid";

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
    const id = payload.id || uuid();
    const mac = { ...payload, id };

    upsertMac(mac);

    return {
      ...state,
      items: [...state.items.filter(mac => mac.id !== payload.id), mac]
    };
  }),
  removeMac: action((state, payload) => {
    deleteMac(payload);

    return {
      ...state,
      items: state.items.filter(x => x.id !== payload.id)
    };
  }),
  listMacs: thunk(async actions => {
    getMacs().then(items => actions.updateItems(items));
  })
};
