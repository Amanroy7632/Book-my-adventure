import React from "react";
import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Sparkles } from "./component/home/Animation/Sparkle";



// import MouseTracker from "./component/home/Animation/MouseTrack";
const Layout = () => {
  return (
    <>
      <Header />
      <Sparkles/>
      <Toaster position="bottom-right" reverseOrder={true} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
