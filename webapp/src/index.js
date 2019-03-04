import React from "react";
import ReactDOM from "react-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import App from "./App";
import "./utils/global.css";

import store from "./store/configureStore";
const redux = store();

ReactDOM.render(
  <Provider store={redux.store}>
    <PersistGate persistor={redux.persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
