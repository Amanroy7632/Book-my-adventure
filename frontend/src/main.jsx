import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";

import { UserProvider } from "./context/userContext.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { BusContextProvider } from "./context/busContext.jsx";
import router from "./router.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-8wioxw6ecxqgcak0.us.auth0.com"
    clientId="HntH1pu0Ph9cfRWvPpzU0K9ReXPB98a8"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <UserProvider>
      {/* <MouseTrackerProvider> */}
      <BusContextProvider>
        <RouterProvider router={router} />
      </BusContextProvider>
      {/* </MouseTrackerProvider> */}
    </UserProvider>
  </Auth0Provider>
);
