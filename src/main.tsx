import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./theme.css";
import App from "./App";
import { ThemeProvider } from "./contexts/ThemeProvider";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
