import React from "react";
import ReactDOM from "react-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import App from "./App";
import "./utils/global.css";
import { authSuccess } from "./store/actions/auth";

import store from "./store/configureStore";
const redux = store();

const token = localStorage.getItem("token");

if (token) {
  redux.store.dispatch(authSuccess(token));
}

ReactDOM.render(
  <Provider store={redux.store}>
    <PersistGate persistor={redux.persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root") || document.createElement('div') // for testing
);
