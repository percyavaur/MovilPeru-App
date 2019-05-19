import { _GetAsyncStorage } from "../utils/asyncStorage/getAsyncStorage";
import { _RemoveStorage } from "../utils/asyncStorage/removeAsyncStorage";

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

  var jwt = "";
  var user = "";

  if (typeof state === "undefined") {
    jwt = await _GetAsyncStorage("jwt");
    user = await fetchValidateToken(jwt)
      .then((response) => { return response.json() })
      .then(userJson => { return userJson.data });
    state = user ? user : null;
    return state;
  } else {
    switch (action.type) {

      case 'LOGIN':
        user = await fetchValidateToken(action.jwt)
          .then((response) => { return response.json() })
          .then(userJson => { return userJson.data });
        state = user ? user : null;
        return state;
        break;

      case 'LOGOUT':
        _RemoveStorage("jwt");
        state = null;
        return state;
        break;

      case 'UPDATE':
        jwt = await _GetAsyncStorage("jwt");
        user = await fetchValidateToken(jwt)
          .then((response) => { return response.json() })
          .then(userJson => { return userJson.data });
        state = user ? user : null;
        return state;
        break;

      default:
        return state;
        break;
    }
  }
};


fetchValidateToken = async (jwt) => {
  return await fetch('http://35.236.27.209/php_api_jwt/api/model/functions/validate_token.php', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ jwt: jwt })
  });
}