import { userTypes } from "../actions/actionTypes";

const initalState = {
  error: null,
  loading: false,
  myprofile: null
};

export default function(state = initalState, action) {
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
        myprofile: action.payload
      };
    default:
      return state;
  }
}
