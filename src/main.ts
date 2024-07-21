import React from "react";
import { Provider as JotaiProvider } from "jotai";
import ReactDOM from "react-dom/client";

import "@fontsource-variable/inter";
import "./styles.css";

import App from "./app";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  React.createElement(JotaiProvider, {
    children: React.createElement(App),
  }),
);
