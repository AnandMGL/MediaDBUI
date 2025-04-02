import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import "react-tabs/style/react-tabs.css";
import "./assets/style/bootstrap.min.css";
import "tippy.js/dist/backdrop.css";
import "tippy.js/animations/scale.css";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";

import store from "./store";
import "./i18n";
import { AppProvider } from "./context/JobsFilterContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <AppProvider>
      <App />
    </AppProvider>
    {/* </React.StrictMode> */}
  </Provider>
);
