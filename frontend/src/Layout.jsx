import React from "react";
import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";
import { Outlet } from "react-router-dom";
import { UserProvider } from "./context/userContext";
import { Toaster } from "react-hot-toast";
const Layout = () => {
  return (
    <>
      <Header />
      <Toaster position="bottom-right" reverseOrder={true} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
