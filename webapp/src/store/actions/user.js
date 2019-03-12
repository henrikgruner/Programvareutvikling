import { userTypes } from "./actionTypes";
import callApi from "../../utils/callApi";
import { userUrls } from "../../utils/apiUrls";

const setUserProfile = payload => ({
  type: userTypes.USER_PROFILE,
  payload: payload
});

export const getUserProfile = () => {
  return dispatch => {
    const token = localStorage.getItem("token");

    callApi(userUrls.USER_PROFILE, { token })
      .then(res => {
        dispatch(setUserProfile(res.data));
      })
      .catch(err => {
        console.log("Could not get user profile", err);
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
