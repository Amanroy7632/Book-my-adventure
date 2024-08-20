
import { useState } from "react";
import Sidebar from "./Sidebar";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import { BiUser } from "react-icons/bi";
import { useAuthContext } from "../context/userContext";
import { Navigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

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
        <button
          onClick={toggleSidebar}
          className="absolute top-12 left-4 z-50 text-black md:hidden "
        >
          {sidebarOpen ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} className="" />}
        </button>

        {/* Sidebar */}
        <Sidebar
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transform md:transform-none md:translate-x-0 transition-transform duration-300 ease-in-out fixed md:relative z-20`}
          title="Admin Dashboard"
          children={
            <ul>
              <li className="p-4 hover:bg-gray-700">
                <NavLink
                  to="/"
                  onClick={toggleSidebar}
                  className={({ isActive }) =>
                    `${isActive ? " text-orange-500" : ""}`
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              <li className="p-4 hover:bg-gray-700">
                <NavLink
                  to="/buses"
                  onClick={toggleSidebar}
                  className={({ isActive }) =>
                    `${isActive ? " text-orange-500" : ""}`
                  }
                >
                  Buses
                </NavLink>
              </li>
              <li className="p-4 hover:bg-gray-700">
                <NavLink
                  to="/add-buses"
                  onClick={toggleSidebar}
                  className={({ isActive }) =>
                    `${isActive ? " text-orange-500" : ""}`
                  }
                >
                  Add Bus
                </NavLink>
              </li>
              <li className="p-4 hover:bg-gray-700">
                <NavLink
                  to="/trips"
                  onClick={toggleSidebar}
                  className={({ isActive }) =>
                    `${isActive ? " text-orange-500" : ""}`
                  }
                >
                  Trips
                </NavLink>
              </li>
              <li className="p-4 hover:bg-gray-700">
                <NavLink
                  to="/add-trips"
                  onClick={toggleSidebar}
                  className={({ isActive }) =>
                    `${isActive ? " text-orange-500" : ""}`
                  }
                >
                  Add Trips
                </NavLink>
              </li>
              <li className="p-4 hover:bg-gray-700">
                <NavLink
                  to="/bookings"
                  onClick={toggleSidebar}
                  className={({ isActive }) =>
                    `${isActive ? " text-orange-500" : ""}`
                  }
                >
                  Bookings
                </NavLink>
              </li>
              <li className="p-4 hover:bg-gray-700">
                <NavLink
                  to="/users"
                  onClick={toggleSidebar}
                  className={({ isActive }) =>
                    `${isActive ? " text-orange-500" : ""}`
                  }
                >
                  Users
                </NavLink>
              </li>
              <li className="p-4 hover:bg-gray-700">
                <NavLink
                  to="/reports"
                  onClick={toggleSidebar}
                  className={({ isActive }) =>
                    `${isActive ? " text-orange-500" : ""}`
                  }
                >
                  Reports
                </NavLink>
              </li>
              <li className="p-4 absolute bottom-9">
                <NavLink
                  to="/user"
                  onClick={toggleSidebar}
                  className={({ isActive }) =>
                    `${isActive ? " text-orange-500" : ""} flex items-center gap-2 border p-2 border-gray-600 rounded-md hover:bg-gray-700`
                  }
                >
                  <BiUser />
                  Profile
                </NavLink>
              </li>
            </ul>
          }
        />

        {/* Main Content */}
        <div className="flex-1 ">
          <Navbar />
          <div className="p-4">{children}</div>
        </div>
        {/* <Footer className="w-screen absolute bottom-0 flex justify-center items-center bg-gray-800 text-white py-2" /> */}
      </div>
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default AdminRoute;
