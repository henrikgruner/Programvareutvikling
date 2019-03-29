import config from "./config";
import "whatwg-fetch";

// Helper functions
export class HttpError extends Error {
  response: Response;
}

function timeoutPromise(ms = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  }).then(() => {
    throw new Error("HTTP request timed out.");
  });
}

async function parseResponseBody(response) {
  const textString = await response.text();
  const contentType =
    response.headers.get("content-type") || "application/json";

  if (contentType.includes("application/json") && textString) {
    response.jsonData = JSON.parse(textString);
  }

  response.textString = textString;
  return response;
}

function rejectOnHttpErrors(response) {
  if (response.ok) return response;

  const error = new HttpError(`HTTP ${response.status}`);
  error.response = response;
  throw error;
}

// The real MVP - Does the talking with the backend API
const callApi = async (
  url,
  {
    method = "GET",
    body = null,
    token = null,
    contentType = "application/json"
  } = {}
) => {
  var headers = {
    Accept: "application/json",
    Authorization: token ? "Token " + token : ""
  };
  if (contentType) {
    headers["Content-Type"] = contentType;
  }

  const request = new Request(`${config.API_URL}${url}`, {
    method,
    headers: new Headers(headers),
    redirect: "manual",
    // IE doesn't support body equal to null
    ...(body ? { body } : {})
  });
  const res = await Promise.race([timeoutPromise(50000), fetch(request)]);
  if (res.status === 401) {
    window.location = `/login/?next=${window.location.pathname}`;
    throw res;
  }
  if (res.status === 404) {
    window.location = `/404-page-not-found/`;
    throw res;
  }

  return parseResponseBody(res).then(rejectOnHttpErrors);
};

export default (...input) => callApi(...input);
