import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/base.css";
import "./styles/theme.css";
import "./styles/layout.css";
import "./styles/accessibility.css";
import "./styles/wizard.css";

const container = document.getElementById("root");

if (container) {
  createRoot(container).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}
