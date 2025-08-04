/**
 * main.jsx
 * Entry point.
 * Sets up React root, Redux provider, and registers the PWA service worker.
 *
 * Author: Yumi Takuma
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { registerSW } from "virtual:pwa-register";
import App from "./App.jsx";
import "./index.css";
import { store } from "./redux/store";

registerSW();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
