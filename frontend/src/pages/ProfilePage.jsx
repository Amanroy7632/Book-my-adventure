// import { NavLink, Outlet } from "react-router-dom";
// import { MdAirplaneTicket, MdSdStorage, MdWallet } from "react-icons/md";
// import {
//   BiLaptop,
//   BiInfoCircle,
//   BiUser,
// } from "react-icons/bi";
// import { FaLocationArrow } from "react-icons/fa";
// const ProfilePage = () => {
//   return (
//     <div className="flex h-[86vh]">
//       <div className="w-1/4 relative bg-gray-900 text-white  p-4 select-none">
//         <div className="text-lg font-semibold mb-4">Settings</div>
//         <ul>
//           <NavLink
//             to={``}
//             className={({ isActive }) =>
//               `${
//                 isActive ? "bg-gray-700" : " hover:bg-gray-700  "
//               } flex items-center gap-2 p-2 rounded mb-2`}
//           >
//             <BiLaptop />
//             Dashboard
//           </NavLink>
//           <NavLink
//             to={"/profile/trips"}
//             className={({ isActive }) =>
//               `${
//                 isActive ? "bg-gray-700" : " hover:bg-gray-700  "
//               } flex items-center gap-2 p-2 rounded mb-2`}
//           >
//             <FaLocationArrow/>
//             My Trips
//           </NavLink>
//           <li className="mb-2 hover:bg-gray-700 p-2 rounded flex items-center gap-2">
//             <MdAirplaneTicket />
//             Bookings
//           </li>
//           <li className="mb-2 hover:bg-gray-700 p-2 rounded flex items-center gap-2">
//             <MdSdStorage />
//             Storage
//           </li>
//           <NavLink
//             to={"/profile/wallet"}
//             className={({ isActive }) =>
//               `${
//                 isActive ? "bg-gray-700" : " hover:bg-gray-700  "
//               } flex items-center gap-2 p-2 rounded mb-2`}
//           >
//             <MdWallet/>
//             Wallet
//           </NavLink>
//           <li className="mb-2 hover:bg-gray-700 p-2 rounded flex items-center gap-2">
//             <BiInfoCircle />
//             Help
//           </li>
//           <li className=" absolute bottom-3 mt-10  mb-2 bg-gray-700 p-2 px-3 rounded flex items-center gap-2">
//             <BiUser />
//             Profile
//           </li>
//         </ul>
//       </div>
//       <Outlet />
//     </div>
//   );
// };

// export default ProfilePage;

// import React, { useState } from "react";
// import { NavLink, Outlet } from "react-router-dom";
// import { MdAirplaneTicket, MdSdStorage, MdWallet } from "react-icons/md";
// import { BiLaptop, BiInfoCircle, BiUser } from "react-icons/bi";
// import { FaLocationArrow } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";

// const ProfilePage = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="flex h-[86vh]">
//       {/* Toggle Button */}
//       <button
//         onClick={toggleSidebar}
//         className="md:hidden text-white bg-gray-900 p-2 absolute top-4 left-4 z-20"
//       >
//         <FiMenu size={24} />
//       </button>

//       {/* Sidebar */}
//       <div
//         className={`${
//           isSidebarOpen ? "block" : "hidden"
//         } md:block w-3/4 md:w-1/4 bg-gray-900 text-white p-4 select-none transition-all duration-300 ease-in-out`}
//       >
//         <div className="text-lg font-semibold mb-4">Settings</div>
//         <ul>
//           <NavLink
//             to={``}
//             className={({ isActive }) =>
//               `${
//                 isActive ? "bg-gray-700" : "hover:bg-gray-700"
//               } flex items-center gap-2 p-2 rounded mb-2`
//             }
//           >
//             <BiLaptop />
//             Dashboard
//           </NavLink>
//           <NavLink
//             to={"/profile/trips"}
//             className={({ isActive }) =>
//               `${
//                 isActive ? "bg-gray-700" : "hover:bg-gray-700"
//               } flex items-center gap-2 p-2 rounded mb-2`
//             }
//           >
//             <FaLocationArrow />
//             My Trips
//           </NavLink>
//           <li className="mb-2 hover:bg-gray-700 p-2 rounded flex items-center gap-2">
//             <MdAirplaneTicket />
//             Bookings
//           </li>
//           <li className="mb-2 hover:bg-gray-700 p-2 rounded flex items-center gap-2">
//             <MdSdStorage />
//             Storage
//           </li>
//           <NavLink
//             to={"/profile/wallet"}
//             className={({ isActive }) =>
//               `${
//                 isActive ? "bg-gray-700" : "hover:bg-gray-700"
//               } flex items-center gap-2 p-2 rounded mb-2`
//             }
//           >
//             <MdWallet />
//             Wallet
//           </NavLink>
//           <li className="mb-2 hover:bg-gray-700 p-2 rounded flex items-center gap-2">
//             <BiInfoCircle />
//             Help
//           </li>
//           <li className="absolute bottom-3 mt-10 mb-2 bg-gray-700 p-2 px-3 rounded flex items-center gap-2">
//             <BiUser />
//             Profile
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="w-full md:w-3/4">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
// ye use kiya ja sakta hai 
import React, { useState } from "react";
import { NavLink,Link, Outlet, useLocation } from "react-router-dom";
import { MdAirplaneTicket, MdSdStorage, MdWallet, MdMenu, MdClose } from "react-icons/md";
import { BiLaptop, BiInfoCircle, BiUser } from "react-icons/bi";
import { FaChevronRight, FaLocationArrow } from "react-icons/fa";
import RouterCumb from "../component/routing/RouterCumb";

const ProfilePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location =useLocation()
  console.log(location.pathname);
  
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
        {/* <div className="text-lg font-semibold mb-4 flex items-center gap-1">
        <Link to={"/"}>Home</Link>
         
          {location.pathname.split("/").map((path,index)=><div className=" flex items-center gap-1" key={index}>
            <Link to={path!==location.pathname.split("/")[(location.pathname.split("/").length)-1]?``:path}>{path}</Link>
            {index<(location.pathname.split("/").length-1) &&<FaChevronRight/>}
          </div>)}
          </div> */}
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
    </div>
  );
};

export default ProfilePage;
// import React, { useState } from "react";
// import { NavLink, Outlet } from "react-router-dom";
// import { MdAirplaneTicket, MdSdStorage, MdWallet, MdMenu, MdClose } from "react-icons/md";
// import { BiLaptop, BiInfoCircle, BiUser } from "react-icons/bi";
// import { FaLocationArrow } from "react-icons/fa";

// const ProfilePage = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="flex h-[86vh] relative w-full">
//       {/* Toggle Button for Small Screens */}
//       <button
//         onClick={toggleSidebar}
//         className={`md:hidden sticky top-2 duration-300 z-20 text-lg p-2 bg-gray-700 rounded-full focus:outline-none ${
//           isSidebarOpen ? "left-[70%]" : "left-2"
//         }`}
//         style={{ position: "sticky", top: "0", zIndex: 50 }}
//       >
//         {!isSidebarOpen ? (
//           <MdMenu size={24} className="text-white" />
//         ) : (
//           <MdClose size={24} className="text-red-500" />
//         )}
//       </button>

//       {/* Sidebar */}
//       <div
//         className={`${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 transition-transform duration-300 ease-in-out w-3/4 md:w-1/4 h-[86vh] fixed md:relative bg-gray-900 text-white p-4 select-none z-10 md:z-0`}
//       >
//         <div className="text-lg font-semibold mb-4">Settings</div>
//         <ul>
//           <NavLink
//             to={``}
//             className={({ isActive }) =>
//               `${
//                 isActive ? "bg-gray-700" : "hover:bg-gray-700"
//               } flex items-center gap-2 p-2 rounded mb-2`}
//           >
//             <BiLaptop />
//             Dashboard
//           </NavLink>
//           <NavLink
//             to={"/profile/trips"}
//             className={({ isActive }) =>
//               `${
//                 isActive ? "bg-gray-700" : "hover:bg-gray-700"
//               } flex items-center gap-2 p-2 rounded mb-2`}
//           >
//             <FaLocationArrow />
//             My Trips
//           </NavLink>
//           <li className="mb-2 hover:bg-gray-700 p-2 rounded flex items-center gap-2">
//             <MdAirplaneTicket />
//             Bookings
//           </li>
//           <li className="mb-2 hover:bg-gray-700 p-2 rounded flex items-center gap-2">
//             <MdSdStorage />
//             Storage
//           </li>
//           <NavLink
//             to={"/profile/wallet"}
//             className={({ isActive }) =>
//               `${
//                 isActive ? "bg-gray-700" : "hover:bg-gray-700"
//               } flex items-center gap-2 p-2 rounded mb-2`}
//           >
//             <MdWallet />
//             Wallet
//           </NavLink>
//           <li className="mb-2 hover:bg-gray-700 p-2 rounded flex items-center gap-2">
//             <BiInfoCircle />
//             Help
//           </li>
//           <li className="absolute bottom-3 mt-10 mb-2 bg-gray-700 p-2 px-3 rounded flex items-center gap-2">
//             <BiUser />
//             Profile
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className={`flex-grow w-full ml-auto md:ml-0`}>
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
