import callApi from "../../utils/callApi";
import { authTypes } from "./actionTypes";
import { authUrls } from "../../utils/apiUrls";
import { getUserProfile } from "./user";

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
        dispatch(getUserProfile());
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const logoutUser = () => {
  localStorage.removeItem("token");
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
        dispatch(getUserProfile());
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

export const changePassword = payload => {
  const token = localStorage.getItem("token");
  return dispatch => {
    callApi(authUrls.CHANGE_PASSWORD, {
      method: "POST",
      body: JSON.stringify(payload),
      token
    })
      .then(res => {
        window.history.go(window.location.pathname);
      })
      .catch(err => {
        console.log("Could not change password", err);
      });
  };
};

/*
export function changePassword(formValues, dispatch, props) {
  const changePasswordUrl = authUrls.CHANGE_PASSWORD;
  const token = getUserToken(store.getState());

  if (token) {
    return axios.post(changePasswordUrl, formValues, {
      headers: {
        authorization: 'Token ' + token
      }
    })
      .then((response) => {
        dispatch(notifSend({
          message: "Password has been changed successfully",
          kind: "info",
          dismissAfter: 5000
        }));
        // redirect to the route '/profile'
        history.push("/profile");
      })
      .catch((error) => {
        dispatch(authFail(err));
      });
  };
};
*/
