import callApi from "../../utils/callApi";
import { userTypes } from "./actionTypes";
import { userUrls } from "../../utils/apiUrls";
import { logoutUser } from "./auth";

export const userInit = () => {
  return {
    type: userTypes.INIT
  };
};

export const userFail = error => {
  return {
    type: userTypes.FAIL,
    error: error
  };
};

const setUserProfile = payload => ({
  type: userTypes.GET_USER_PROFILE,
  payload: payload
});

export const getUserProfile = () => {
  return dispatch => {
    dispatch(userInit());
    const token = localStorage.getItem("token");

    callApi(userUrls.USER_PROFILE, { token })
      .then(res => {
        dispatch(setUserProfile(res.jsonData[0]));
      })
      .catch(err => {
        dispatch(userFail(err));
      });
  };
};

export const deleteUser = userId => {
  return dispatch => {
    dispatch(userInit());
    const token = localStorage.getItem("token");
    callApi(`${userUrls.DELETE_USER}${userId}/`, {
      method: "DELETE",
      token
    })
      .then(res => {
        dispatch(logoutUser());
      })
      .catch(err => {
        console.log("Could not delete user", err);
        dispatch(userFail(err));
      });
  };
};

export const updateUserProfile = payload => {
  const token = localStorage.getItem("token");
  return dispatch => {
    callApi(userUrls.USER_PROFILE, {
      method: "POST",
      body: JSON.stringify(payload),
      token
    })
      .then(res => {
        window.history.go(window.location.pathname);
      })
      .catch(err => {
        console.log("Could not update user profile", err);
      });
  };
};
