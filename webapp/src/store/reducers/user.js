import { userTypes, authTypes } from "../actions/actionTypes";

const initalState = {
  error: null,
  loading: false,
  profile: null
};

export default function (state = initalState, action) {
  switch (action.type) {
    case userTypes.INIT:
      return { ...state, loading: true };
    case userTypes.FAIL:
      return { ...state, error: action.error, loading: false };
    case userTypes.GET_USER_PROFILE:
      return {
        ...state,
        error: null,
        loading: false,
        profile: action.payload
      };
    case authTypes.LOGOUT:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
}
