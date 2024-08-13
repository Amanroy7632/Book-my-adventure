import React from "react";
import { Link } from "react-router-dom";

function Sidebar({className=""}) {
  return (
    <div className={`lg:w-64 ${className} bg-gray-800 text-white h-screen`}>
      <div className="p-4 text-lg font-bold">Admin Dashboard</div>
      <nav className="mt-4">
        <ul className=" max-sm:flex">
          <li className="p-4 hover:bg-gray-700">
            <Link to="/">Dashboard</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/buses">Buses</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/trips">Trips</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/add-trips">Add Trips</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/bookings">Bookings</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/users">Users</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/reports">Reports</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
