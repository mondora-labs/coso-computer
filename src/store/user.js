import { action, thunk } from "easy-peasy";

import { login } from "../utils/firebase";

const defaultState = {
  isLogged: false
};

export const user = {
  ...defaultState,
  updateLogin: action((state, payload) => {
    return {
      ...state,
      isLogged: payload
    };
  }),
  doLogin: thunk(async actions => {
    actions.updateLogin(await login());
  })
};
