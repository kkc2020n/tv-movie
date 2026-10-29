import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import "../styles/index.less";
import { Provider } from "react-redux";
import store from "./redux/store";

const container = document.getElementById("app-root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
