import { auctionTypes } from "./actionTypes";
import callApi from "../../utils/callApi";
import { auctionsUrls } from "../../utils/apiUrls";

export const createAuction = payload => {
  const token = localStorage.getItem("token");
  return dispatch => {
    callApi(auctionsUrls.CREATE_AUCTION, {
      method: "POST",
      body: JSON.stringify(payload),
      token
    })
      .then(res => {
        window.history.go(window.location.pathname);
      })
      .catch(err => {
        console.log("Could not create auction", err);
      });
  };
};
