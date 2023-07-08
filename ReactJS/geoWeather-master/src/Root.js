import React from "react";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import reducers from "./reducers";
export default props => {
  return (
    <Provider store={createStore(reducers, {}, applyMiddleware(reduxPromise))}>
      {props.children}
    </Provider>
  );
};
