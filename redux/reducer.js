import { _GetAsyncStorage } from "../utils/asyncStorage/getAsyncStorage";
import { _RemoveStorage } from "../utils/asyncStorage/removeAsyncStorage";

export function currentTrip(state, action) {
  var trip = {};

  if (typeof state === "undefined") {
    state = trip;
    return state;
  } else {
    switch (action.type) {
      case 'SAVEIDORIGEN':
        return Object.assign({}, state, {
          idOrigen: action.idOrigen
        })
        break;
      case 'SAVEORIGEN':
        return Object.assign({}, state, {
          origen: action.origen
        })
        break;
      case 'SAVEIDDESTINO':
        return Object.assign({}, state, {
          idDestino: action.idDestino
        })
        break;
      case 'SAVEDESTINO':
        return Object.assign({}, state, {
          destino: action.destino
        })
        break;
      case 'CANTPASAJEROS':
        return Object.assign({}, state, {
          cantPasajeros: action.cantPasajeros
        })
        break;
      case 'DESCPASAJEROS':
        return Object.assign({}, state, {
          descPasajeros: action.descPasajeros
        })
        break;
      case 'FECHAIDA':
        return Object.assign({}, state, {
          fechaIda: action.fechaIda
        })
        break;
      case 'DATEIDA':
        return Object.assign({}, state, {
          dateIda: action.date
        })
        break;
      case 'FECHAVUELTA':
        return Object.assign({}, state, {
          fechaVuelta: action.fechaVuelta
        })
        break;
      case 'DATEVUELTA':
        return Object.assign({}, state, {
          dateVuelta: action.date
        })
        break;
      case 'TRIPTYPE':
        return Object.assign({}, state, {
          tripType: action.index
        })
        break;
      case 'IDIDA':
        return Object.assign({}, state, {
          idIda: action.idViaje
        })
        break;
      case 'IDVUELTA':
        return Object.assign({}, state, {
          idVuelta: action.idViaje
        })
        break;
      case 'DELETEALL':
        return state = {};
        break;
      default:
        return state
    }
  }
}

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
  return await fetch('http://35.236.27.209/movilPeru/api/model/functions/validate_token.php', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ jwt: jwt })
  });
}