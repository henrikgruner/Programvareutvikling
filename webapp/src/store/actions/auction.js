import callApi from "../../utils/callApi";
import { auctionTypes } from "./actionTypes";
import { auctionsUrls } from "../../utils/apiUrls";

export const auctionInit = () => {
  return {
    type: auctionTypes.INIT
  };
};

export const auctionFail = error => {
  return {
    type: auctionTypes.FAIL,
    error: error
  };
};

const setAuction = payload => ({
  type: auctionTypes.GET_AUCTION,
  payload: payload
});

export const getAuction = auctionId => {
  return dispatch => {
    dispatch(auctionInit());
    const token = localStorage.getItem("token");

    callApi(`${auctionsUrls.AUCTIONS}${auctionId}/`, { token })
      .then(res => {
        dispatch(setAuction(res.jsonData));
      })
      .catch(err => {
        dispatch(auctionFail(err));
        console.log("Could not get auction " + auctionId, err);
      });
  };
};

export const createAuction = payload => {
  return dispatch => {
    dispatch(auctionInit());
    const token = localStorage.getItem("token");
    callApi(auctionsUrls.AUCTIONS, {
      method: "POST",
      body: JSON.stringify(payload),
      token
    })
      .then(res => {
        setAuction(res.jsonData);
        window.history.go(window.location.pathname);
      })
      .catch(err => {
        dispatch(auctionFail(err));
        console.log("Could not create auction", err);
      });
  };
};

const setAuctions = payload => ({
  type: auctionTypes.GET_AUCTIONS,
  payload: payload
});

export const getAuctions = () => {
  return dispatch => {
    dispatch(auctionInit());
    const token = localStorage.getItem("token");

    callApi(`${auctionsUrls.AUCTIONS}`, { token })
      .then(res => {
        dispatch(setAuctions(res.jsonData));
      })
      .catch(err => {
        dispatch(auctionFail(err));
        console.log("Could not get auctions", err);
      });
  };
};

export const createBid = payload => {
  return dispatch => {
    dispatch(auctionInit());
    const token = localStorage.getItem("token");

    callApi(auctionsUrls.BIDS, {
      method: "POST",
      body: JSON.stringify(payload),
      token
    })
      .then(res => {
        window.history.go(window.location.pathname);
      })
      .catch(err => {
        dispatch(auctionFail(err));
        console.log("Could not bid", err);
      });
  };
};
