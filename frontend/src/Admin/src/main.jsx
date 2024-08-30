import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import "./index.css";
import { AuthContextProvider } from "./context/userContext.jsx";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </I18nextProvider>
  </StrictMode>
);
