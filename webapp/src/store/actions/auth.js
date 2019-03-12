import { authTypes } from "./actionTypes";
import callApi from "../../utils/callApi";
import { authUrls } from "../../utils/apiUrls";

export const authInit = () => {
  return {
    type: authTypes.INIT
  };
};

export const authFail = error => {
  return {
    type: authTypes.FAIL,
    error: error
  };
};

export const authSuccess = token => {
  return {
    type: authTypes.LOGIN,
    token: token
  };
};

export const loginUser = payload => {
  console.log("login", payload);
  return dispatch => {
    dispatch(authInit());
    callApi(authUrls.LOGIN, {
      method: "POST",
      body: JSON.stringify(payload)
    })
      .then(res => {
        const token = res.jsonData.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);

        dispatch(authSuccess(token));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("expirationDate");
  return {
    type: authTypes.LOGOUT
  };
};

export const signupUser = payload => {
  return dispatch => {
    dispatch(authInit());
    callApi(authUrls.SIGNUP, {
      method: "POST",
      body: JSON.stringify(payload)
    })
      .then(res => {
        const token = res.jsonData.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);

        dispatch(authSuccess(token));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      dispatch(logoutUser());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logoutUser());
      } else {
        dispatch(authSuccess(token));
      }
    }
  };
};
