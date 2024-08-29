import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../component/logo/Logo";

function Sidebar({className="",children}) {
  return (
    <div className={`lg:w-64 ${className} bg-gray-800 text-white h-screen overflow-y-scroll`}>
      <div className="p-4 text-lg font-bold"><Logo className=" bg-blend-darken rounded-full overflow-hidden"/></div>
      <nav className="mt-4">
        {children}
      </nav>
    </div>
  );
}

export default Sidebar;
