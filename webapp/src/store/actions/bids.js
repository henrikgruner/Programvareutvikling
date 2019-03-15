import callApi from "../../utils/callApi";
import { bidsUrls } from "../../utils/apiUrls";
import { bidTypes } from "./actionTypes";


export const updateBid = payload => {
    const token = localStorage.getItem("token");
    return dispatch => {
        callApi(bidsUrls.UPDATE_BID, {
            method: "POST",
            body: JSON.stringify(payload),
            token
        })
            .then(res => {
                window.history.go(window.location.pathname);
            })
            .catch(err => {
                console.log("Could not update bid", err);
            });
    };
};

