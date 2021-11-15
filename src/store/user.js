import { action, thunk } from "easy-peasy";

import { login } from "../utils/firebase";

const defaultState = {
  isLogged: false,
  name: undefined,
  email: undefined,
  photo: undefined,
  permissions: {},
};

export const user = {
  ...defaultState,
  setPermissions: action((state, payload) => {
    return {
      ...state,
      permissions: payload,
    };
  }),
  updateLogin: action((state, payload) => {
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
