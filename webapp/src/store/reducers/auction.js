import { auctionTypes } from "../actions/actionTypes";

const initalState = {
  error: null,
  loading: false,
  auction: null,
  auctions: []
};

export default function(state = initalState, action) {
  switch (action.type) {
    case auctionTypes.INIT:
      return { ...state, loading: true };
    case auctionTypes.FAIL:
      return { ...state, error: action.error, loading: false };
    case auctionTypes.GET_AUCTION:
      return {
        ...state,
        error: null,
        loading: false,
        auction: action.payload
      };
    case auctionTypes.GET_AUCTIONS:
      return {
        ...state,
        error: null,
        loading: false,
        auctions: action.payload
      };
    default:
      return state;
  }
}
