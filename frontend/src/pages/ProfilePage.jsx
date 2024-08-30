
import React, { useState } from "react";
import { NavLink,Link, Outlet, useLocation } from "react-router-dom";
import { MdAirplaneTicket, MdSdStorage, MdWallet, MdMenu, MdClose } from "react-icons/md";
import { BiLaptop, BiInfoCircle, BiUser } from "react-icons/bi";
import { FaChevronRight, FaLocationArrow } from "react-icons/fa";
import RouterCumb from "../component/routing/RouterCumb";
import { useCurrentUser } from "../context/userContext";
import ScrollToTop from "../component/commonUi/ScrollToTop";

const ProfilePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location =useLocation()

  // console.log(location.pathname);
  const {isScrollTopVisible} = useCurrentUser()
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-[86vh] relative w-full">
      {/* Toggle Button for Small Screens */}
      <button
        onClick={toggleSidebar}
        className={`md:hidden fixed ${!isSidebarOpen?"":"  left-[62%]"} duration-300 top-[12vh] left-2 z-20 text-lg  p-2 bg-gray-700 rounded-full focus:outline-none`}
      >
        {!isSidebarOpen?<MdMenu size={24} className=" text-white" />:<MdClose size={24} className=" text-red-500"/>} 
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out w-3/4 md:w-1/4 h-[86vh] fixed md:relative bg-gray-900 text-white p-4 select-none z-10 md:z-0`}
      >
        <RouterCumb />
        <ul>
          <NavLink
            to={``} onClick={toggleSidebar}
            className={({ isActive }) =>
              `${
                isActive ? "bg-gray-700" : "hover:bg-gray-700"
              } flex items-center gap-2 p-2 rounded mb-2`}
          >
            <BiLaptop />
            Dashboard
          </NavLink>
          <NavLink
            to={"/profile/trips"} onClick={toggleSidebar}
            className={({ isActive }) =>
              `${
                isActive ? "bg-gray-700" : "hover:bg-gray-700"
              } flex items-center gap-2 p-2 rounded mb-2`}
          >
            <FaLocationArrow />
            My Trips
          </NavLink>
          <li className="mb-2 hover:bg-gray-700 p-2 rounded flex items-center gap-2">
            <MdAirplaneTicket />
            Bookings
          </li>
          <li className="mb-2 hover:bg-gray-700 p-2 rounded flex items-center gap-2">
            <MdSdStorage />
            Storage
          </li>
          <NavLink
            to={"/profile/wallet"}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              `${
                isActive ? "bg-gray-700" : "hover:bg-gray-700"
              } flex items-center gap-2 p-2 rounded mb-2`}
          >
            <MdWallet />
            Wallet
          </NavLink>
          <li className="mb-2 hover:bg-gray-700 p-2 rounded flex items-center gap-2">
            <BiInfoCircle />
            Help
          </li>
          <Link to={"/profile"} className="absolute bottom-3 mt-10 mb-2 bg-gray-700 p-2 px-3 rounded flex items-center gap-2">
            <BiUser />
            Profile
          </Link>
        </ul>
      </div>

      {/* Main Content */}
      {/* <div className={`${isSidebarOpen?" ":""} flex-grow w-full ml-auto md:ml-0`}> */}
        <Outlet />
      {/* </div> */}
      {isScrollTopVisible && <ScrollToTop/>}
    </div>
  );
};

export default ProfilePage;
