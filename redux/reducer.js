import { _GetAsyncStorage } from "../utils/asyncStorage/getAsyncStorage";
export function counter(state, action) {
  if (typeof state === "undefined") {
    return 0;
  } else {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1;
        break;
      case 'DECREMENT':
        return state - 1;
        break;
      default:
        return state;
    }
  }
};

export async function currentUser(state, action) {
  if (typeof state === "undefined") {
    const username = await _GetAsyncStorage("username");
    const password = await _GetAsyncStorage("password");
    username && password ? state = true : state = false;
    return state;
  } else {
    switch (action.type) {
      case 'LOGIN':
        return true;
        break;
      case 'LOGOUT':
        return false;
        break;
      default:
        return state;
    }
  }
};

export function username(state, action) {
  if (typeof state === "undefined") {
    return null;
  } else {
    switch (action.type) {
      case 'addUsername':
        state = action.user.username;
        return state;
        break;
      case 'removeUsername':
        state = null;
        return state;
        break;
      default:
        return state;
    }
  }
};