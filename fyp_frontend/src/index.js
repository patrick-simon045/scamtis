import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import 'antd/dist/antd.css'
import store from "./state/reduxStore/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
