import React from "react";

function Navbar() {
  return (
    <div className="bg-gray-100 p-4 shadow-md flex justify-between items-center">
      <div className="text-lg font-bold">Bus Booking System</div>
      <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
        Logout
      </button>
    </div>
  );
}

export default Navbar;
