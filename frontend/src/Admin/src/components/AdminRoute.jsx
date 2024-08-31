import { useState } from "react";
import Sidebar from "./Sidebar";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuthContext } from "../context/userContext";
import { Navigate } from "react-router-dom";
import {
  FaRoute,
  FaUserFriends,
} from "react-icons/fa";
import {
  MdAddBusiness,
  MdAddLocationAlt,
  MdBookOnline,
  MdBusAlert,
  MdDashboard,
  MdReport,
} from "react-icons/md";

const AdminRoute = ({ children }) => {
  const { isAdmin } = useAuthContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return isAdmin ? (
    <>
      <div className="flex relative min-h-screen">

        {/* Sidebar */}
        <Sidebar
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transform transition-transform duration-300 ease-in-out fixed z-20 `}
          // className={`${
          //   sidebarOpen ? "translate-x-0" : "-translate-x-full"
          // } transform transition-transform duration-300 ease-in-out fixed z-20  w-64 bg-gray-800`}
          title="Admin Dashboard"
          toggleSidebar={toggleSidebar}
          children={
            <ul className=" px-2">
              <NavLink
                to="/"
                // onClick={toggleSidebar}
                className={({ isActive }) =>
                  `${
                    isActive ? " text-orange-500 bg-gray-700 " : ""
                  } p-4 py-3 flex items-center gap-3 rounded-md hover:bg-gray-700 mb-2`
                }
              >
                <MdDashboard size={20} />
                Dashboard
                {/* <li className="hover:bg-gray-700">Dashboard</li> */}
              </NavLink>

              <NavLink
                to="/buses"
                // onClick={toggleSidebar}
                className={({ isActive }) =>
                  `${
                    isActive ? " text-orange-500 bg-gray-700" : ""
                  } p-4 py-3 flex items-center gap-3 rounded-md hover:bg-gray-700 mb-2`
                }
              >
                <MdBusAlert size={20} /> Buses
              </NavLink>

              <NavLink
                to="/add-buses"
                // onClick={toggleSidebar}
                className={({ isActive }) =>
                  `${
                    isActive ? " text-orange-500 bg-gray-700" : ""
                  } p-4 py-3 flex items-center gap-3 rounded-md hover:bg-gray-700 mb-2`
                }
              >
                <MdAddBusiness size={20} /> Add Bus
              </NavLink>

              <NavLink
                to="/trips"
                // onClick={toggleSidebar}
                className={({ isActive }) =>
                  `${
                    isActive ? " text-orange-500 bg-gray-700" : ""
                  } p-4 py-3 flex items-center gap-3 rounded-md hover:bg-gray-700 mb-2`
                }
              >
                <FaRoute size={20} /> Trips
              </NavLink>

              <NavLink
                to="/add-trips"
                // onClick={toggleSidebar}
                className={({ isActive }) =>
                  `${
                    isActive ? " text-orange-500 bg-gray-700" : ""
                  } p-4 py-3 flex items-center gap-3 rounded-md hover:bg-gray-700 mb-2`
                }
              >
                <MdAddLocationAlt size={20} /> Add Trips
              </NavLink>

              <NavLink
                to="/bookings"
                // onClick={toggleSidebar}
                className={({ isActive }) =>
                  `${
                    isActive ? " text-orange-500 bg-gray-700" : ""
                  } p-4 py-3 flex items-center gap-3 rounded-md hover:bg-gray-700 mb-2`
                }
              >
                <MdBookOnline size={20} /> Bookings
              </NavLink>

              <NavLink
                to="/users"
                // onClick={toggleSidebar}
                className={({ isActive }) =>
                  `${
                    isActive ? " text-orange-500 bg-gray-700" : ""
                  } p-4 py-3 flex items-center gap-3 rounded-md hover:bg-gray-700 mb-2`
                }
              >
                <FaUserFriends size={20} /> Users
              </NavLink>

              <NavLink
                to="/reports"
                // onClick={toggleSidebar}
                className={({ isActive }) =>
                  `${
                    isActive ? " text-orange-500 bg-gray-700" : ""
                  } p-4 py-3 flex items-center gap-3 rounded-md hover:bg-gray-700 mb-2`
                }
              >
                <MdReport size={20} /> Reports
              </NavLink>

              {/* <li className="p-4 absolute bottom-9">
                <NavLink
                  to="/user"
                  onClick={toggleSidebar}
                  className={({ isActive }) =>
                    `${
                      isActive ? " text-orange-500" : ""
                    } flex items-center gap-2 border p-2 border-gray-600 rounded-md hover:bg-gray-700`
                  }
                >
                  <BiUser />
                  Profile
                </NavLink>
              </li> */}
            </ul>
          }
        />

        {/* Main Content */}
        <div 
        className={`flex-1 transition-all duration-300 ease-in-out ${
            sidebarOpen ? "ml-64" : "ml-0"
          } `}
        // className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? "ml-64" : "ml-0 md:ml-64"}`}
          
          >
          <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="p-4 ">{children}</div>
        </div>
      </div>
      <footer className="w-full  flex justify-center items-center z-20 bg-gray-800 text-white py-2">
        All rights reserved @ Book my adventure
      </footer>
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default AdminRoute;
