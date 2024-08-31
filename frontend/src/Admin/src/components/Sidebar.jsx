import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../public/bus.png"
import { FaAlignLeft } from "react-icons/fa";

function Sidebar({ className = "", children,toggleSidebar }) {
  return (
    <div
      className={`w-64 ${className} bg-gray-800 text-white h-screen overflow-y-scroll`}
    >
      <div className="p-4 pb-0 text-lg font-bold relative">
        {/* <Logo className=" bg-blend-darken rounded-full overflow-hidden" /> */}
        <div  className=" w-20"><img src={Logo} alt="logo" /></div>
        <FaAlignLeft onClick={toggleSidebar} className=" hidden max-md:block absolute top-6 cursor-pointer right-1"/>
      </div>
      <nav className="mt-4">{children}</nav>
    </div>
  );
}

export default Sidebar;
