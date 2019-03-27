import { authTypes } from "../actions/actionTypes";

const initalState = {
  token: null,
  error: null,
  loading: false,
  authenticated: false
};

export default function(state = initalState, action) {
  switch (action.type) {
    case authTypes.INIT:
      return { ...state, error: null, loading: true };
    case authTypes.FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        authenticated: false,
        token: null
      };
    case authTypes.LOGIN:
      return {
        ...state,
        authenticated: true,
        token: action.token,
        error: null,
        loading: false
      };
    case authTypes.LOGOUT:
      return {
        ...state,
        authenticated: false,
        token: null
      };
    default:
      return state;
  }
}
