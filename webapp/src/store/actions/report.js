import callApi from "../../utils/callApi";
import { reportsUrls } from "../../utils/apiUrls";

export const Report = report => {
  const token = localStorage.getItem("token");
  return dispatch => {
    callApi(reportsUrls.REPORT, {
      method: "POST",
      body: JSON.stringify(report),
      token
    })
      .then(res => {
        window.history.go(window.location.pathname);
      })
      .catch(err => {
        console.log("Could not report", err);
      });
  };
};
