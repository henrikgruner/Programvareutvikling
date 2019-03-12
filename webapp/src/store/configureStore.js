import { createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const logger = createLogger();

export default () => {
  let store = createStore(
    persistedReducer,
    composeEnhances(applyMiddleware(thunk, logger))
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
