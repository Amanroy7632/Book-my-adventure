import { useState } from "react";
import Sidebar from "./Sidebar";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import { BiUser } from "react-icons/bi";
import { useAuthContext } from "../context/userContext";
import { Navigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaDashcube, FaRoute, FaStripe, FaTripadvisor, FaUserFriends } from "react-icons/fa";
import { MdAddBusiness, MdAddLocationAlt,MdBookOnline,MdBusAlert, MdDashboard, MdLocalMovies, MdReport, MdTripOrigin } from "react-icons/md";

const AdminRoute = ({ children }) => {
  const { isAdmin } = useAuthContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return isAdmin ? (
    <>
      <div className="flex relative min-h-screen">
        {/* Toggle Button */}
        {/* <button
          onClick={toggleSidebar}
          className="absolute top-12 left-4 z-50 text-black md:hidden "
        >
          {sidebarOpen ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} className="" />}
        </button> */}

        {/* Sidebar */}
        <Sidebar
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transform md:transform-none md:translate-x-0 transition-transform duration-300 ease-in-out fixed md:relative z-20`}
          title="Admin Dashboard"
          children={
            <ul className=" px-2">
              <NavLink
                to="/"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `${
                    isActive ? " text-orange-500 bg-gray-700 bg-gray-700" : ""
                  } p-4 py-3 flex items-center gap-3 rounded-md hover:bg-gray-700 mb-2`
                }
              >
                <MdDashboard />
                Dashboard
                {/* <li className="hover:bg-gray-700">Dashboard</li> */}
              </NavLink>

              <NavLink
                to="/buses"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `${
                    isActive ? " text-orange-500 bg-gray-700" : ""
                  } p-4 py-3 flex items-center gap-3 rounded-md hover:bg-gray-700 mb-2`
                }
              >
                <MdBusAlert/> Buses
              </NavLink>

              <NavLink
                to="/add-buses"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `${
                    isActive ? " text-orange-500 bg-gray-700" : ""
                  } p-4 py-3 flex items-center gap-3 rounded-md hover:bg-gray-700 mb-2`
                }
              >
               <MdAddBusiness/> Add Bus
              </NavLink>

              <NavLink
                to="/trips"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `${
                    isActive ? " text-orange-500 bg-gray-700" : ""
                  } p-4 py-3 flex items-center gap-3 rounded-md hover:bg-gray-700 mb-2`
                }
              >
                <FaRoute/> Trips
              </NavLink>

              <NavLink
                to="/add-trips"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `${
                    isActive ? " text-orange-500 bg-gray-700" : ""
                  } p-4 py-3 flex items-center gap-3 rounded-md hover:bg-gray-700 mb-2`
                }
              >
               <MdAddLocationAlt/> Add Trips
              </NavLink>

              <NavLink
                to="/bookings"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `${
                    isActive ? " text-orange-500 bg-gray-700" : ""
                  } p-4 py-3 flex items-center gap-3 rounded-md hover:bg-gray-700 mb-2`
                }
              >
               <MdBookOnline/> Bookings
              </NavLink>

              <NavLink
                to="/users"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `${
                    isActive ? " text-orange-500 bg-gray-700" : ""
                  } p-4 py-3 flex items-center gap-3 rounded-md hover:bg-gray-700 mb-2`
                }
              >
               <FaUserFriends/> Users
              </NavLink>

              <NavLink
                to="/reports"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `${
                    isActive ? " text-orange-500 bg-gray-700" : ""
                  } p-4 py-3 flex items-center gap-3 rounded-md hover:bg-gray-700 mb-2`
                }
              >
               <MdReport/> Reports
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
        <div className="flex-1 ">
          <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="p-4">{children}</div>
        </div>
      </div>
        <footer className="w-full  flex justify-center items-center z-20 bg-gray-800 text-white py-2" >
          All rights reserved @ Book my adventure
        </footer>
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default AdminRoute;
