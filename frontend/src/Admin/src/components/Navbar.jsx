import React from "react";
import {FiMenu} from "react-icons/fi"
function Navbar({toggleSidebar,isSidebarOpen}) {
  return (
    <div className="bg-gray-100 p-4 shadow-md flex justify-between items-center z-40 sticky top-0">
      <div className="text-lg font-bold">Bus Booking System</div>
      {/* <button
        onClick={toggleSidebar}
        className="sm:hidden focus:outline-none"
      >
        <FiMenu className="text-2xl" />
      </button> */}
      <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
        Logout
      </button>
    </div>
  );
}

export default Navbar;
