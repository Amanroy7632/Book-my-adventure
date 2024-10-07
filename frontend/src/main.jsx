import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";

import { UserProvider } from "./context/userContext.jsx";

import { BusContextProvider } from "./context/busContext.jsx";
import router from "./router.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    {/* <MouseTrackerProvider> */}
    <BusContextProvider>
      <RouterProvider router={router} />
    </BusContextProvider>
    {/* </MouseTrackerProvider> */}
  </UserProvider>
);
