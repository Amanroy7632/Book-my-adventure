import React from "react";
import { Link } from "react-router-dom";

function Sidebar({className="",children}) {
  return (
    <div className={`lg:w-64 ${className} bg-gray-800 text-white h-screen`}>
      <div className="p-4 text-lg font-bold">Admin Dashboard</div>
      <nav className="mt-4">
        {children}
      </nav>
    </div>
  );
}

export default Sidebar;
