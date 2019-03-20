import { auctionTypes } from "./actionTypes";
import callApi from "../../utils/callApi";
import { auctionsUrls } from "../../utils/apiUrls";

export const createAuction = payload => {
  const token = localStorage.getItem("token");
  return dispatch => {
    callApi(auctionsUrls.AUCTIONS, {
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

const setAuction = payload => ({
  type: auctionTypes.GET_AUCTION,
  payload: payload
});

export const getAuction = auctionId => {
  return dispatch => {
    const token = localStorage.getItem("token");

    callApi(`${auctionsUrls.AUCTIONS}${auctionId}/`, { token })
      .then(res => {
        dispatch(setAuction(res.data));
      })
      .catch(err => {
        console.log("Could not get Auction", err);
      });
  };
};

export const createBid = payload => {
  const token = localStorage.getItem("token");
  return dispatch => {
    callApi(auctionsUrls.BIDS, {
      method: "POST",
      body: JSON.stringify(payload),
      token
    })
      .then(res => {
        window.history.go(window.location.pathname);
      })
      .catch(err => {
        console.log("Could not bid", err);
      });
  };
};
