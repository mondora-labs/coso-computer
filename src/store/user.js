import { action, thunk } from "easy-peasy";

import { login } from "../utils/firebase";

const defaultState = {
  isLogged: false,
};

export const user = {
  ...defaultState,
  updateLogin: action((state, payload) => {
    console.log(payload);
    return {
      ...state,
      isLogged: payload.isLogged,
      name: payload.user.displayName,
      email: payload.user.email,
      photo: payload.user.photoURL,
    };
  }),
  doLogin: thunk(async (actions) => {
    actions.updateLogin(await login());
  }),
};
