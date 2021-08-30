import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { loadProgressBar } from "x-axios-progress-bar";
import { config } from "dotenv";
import "./index.css";
import RouteCenter from "./Router/route";
import { store } from "./redux/store";
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");

config();
loadProgressBar();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouteCenter />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
