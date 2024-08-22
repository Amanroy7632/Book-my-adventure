import React, { useState, useEffect } from "react";
import { useCurrentUser } from "../context/userContext";
import { NavLink, Outlet } from "react-router-dom";
import { MdAirplaneTicket, MdMyLocation, MdSdStorage, MdWallet } from "react-icons/md";
import {
  BiLaptop,
  BiKey,
  BiBrush,
  BiInfoCircle,
  BiUser,
  BiSolidPaste,
} from "react-icons/bi";
import { FaLocationArrow, FaPencilAlt } from "react-icons/fa";
const ProfilePage = () => {
  const [user, setUser] = useState({
    avatar: "https://via.placeholder.com/150",
    name: "~Aman",
    about: "See Everything, Say nothing",
    phone: "+91 76329 76843",
  });
  const { currentUser, setCurrentUser, logoutCurrentUser } = useCurrentUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableName, setEditableName] = useState(false);
  const [editableAbout, setEditableAbout] = useState(false);
  const [editablePhone, setEditablePhone] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCurrentUser({ ...currentUser, avatar: e.target.result });
      };
      reader.readAsDataURL(file);
    }
    closeModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const viewImage = () => {
    window.open(currentUser?.avatar, "_blank");
    closeModal();
  };

  const handleSave = (field, value) => {
    setCurrentUser({ ...currentUser, [field]: value });
    if (field === "fullname") setEditableName(false);
    if (field === "about") setEditableAbout(false);
    if (field === "phone") setEditablePhone(false);
  };
  const handleProfileImageError = () => {
    setCurrentUser({
      ...currentUser,
      avatar: "https://via.placeholder.com/150",
    });
  };
  return (
    <div className="flex h-[86vh]">
      <div className="w-1/4 relative bg-gray-900 text-white  p-4 select-none">
        <div className="text-lg font-semibold mb-4">Settings</div>
        <ul>
          <NavLink
            to={``}
            className={({ isActive }) =>
              `${
                isActive ? "bg-gray-700" : " hover:bg-gray-700  "
              } flex items-center gap-2 p-2 rounded mb-2`}
          >
            <BiLaptop />
            Dashboard
          </NavLink>
          <NavLink
            to={"/profile/trips"}
            className={({ isActive }) =>
              `${
                isActive ? "bg-gray-700" : " hover:bg-gray-700  "
              } flex items-center gap-2 p-2 rounded mb-2`}
          >
            <FaLocationArrow/>
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
            className={({ isActive }) =>
              `${
                isActive ? "bg-gray-700" : " hover:bg-gray-700  "
              } flex items-center gap-2 p-2 rounded mb-2`}
          >
            <MdWallet/>
            Wallet
          </NavLink>
          <li className="mb-2 hover:bg-gray-700 p-2 rounded flex items-center gap-2">
            <BiInfoCircle />
            Help
          </li>
          <li className=" absolute bottom-3 mt-10  mb-2 bg-gray-700 p-2 px-3 rounded flex items-center gap-2">
            <BiUser />
            Profile
          </li>
        </ul>
      </div>
      <Outlet />
      {/* <div className="flex-1 bg-gray-800 text-white p-6">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <img
            className="w-24 h-24 rounded-full shadow-md cursor-pointer"
            src={currentUser?.avatar}
            alt="Profile"
            onError={handleProfileImageError} 
            onClick={openModal}
          />
        </div>
        <div className="">
          <div className="flex items-center mt-2  gap-10">
            {editableName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  className=" font-semibold text-gray-900 outline-none p-1 rounded-md"
                  defaultValue={currentUser.fullname}
                  onBlur={(e) => handleSave('fullname', e.target.value)}
                />
                <button
                  className="text-white"
                  onClick={() => setEditableName(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-semibold">
                  {currentUser?.fullname}
                </h2>
                <FaPencilAlt
                  className="ml-2 cursor-pointer"
                  onClick={() => setEditableName(true)}
                />
              </>
            )}
          </div>
          <div className="flex items-center mt-2 gap-10">
            <p>About</p>
            <FaPencilAlt
              className="ml-2 cursor-pointer"
              onClick={() => setEditableAbout(true)}
            />
          </div>
          {editableAbout ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                className=" text-gray-900 outline-none p-1 rounded-md"
                defaultValue={currentUser?.about}
                onBlur={(e) => handleSave('about', e.target.value)}
              />
              <button
                className="text-white"
                onClick={() => setEditableAbout(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <p className="text-gray-400 mt-2 ">{currentUser?.about}</p>
          )}
          <div className="flex items-center mt-2 gap-10">
            <p>Phone number</p>
            <FaPencilAlt
              className="ml-2 cursor-pointer"
              onClick={() => setEditablePhone(true)}
            />
          </div>
          {editablePhone ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                className=" text-gray-900 outline-none p-1 rounded-md"
                defaultValue={user.phone}
                onBlur={(e) => handleSave('phone', e.target.value)}
              />
              <button
                className="text-white"
                onClick={() => setEditablePhone(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <p className="text-gray-400">+91{currentUser?.phone}</p>
          )}
          <div className="flex items-center mt-2 gap-10">
            <p>Email</p>
          </div>
          <p className="text-gray-400">{currentUser?.email}</p>
        </div>
      </div>
      <button
        onClick={logoutCurrentUser}
        className="mt-10 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
      >
        Log out
      </button>
      <p className="mt-4 text-gray-400">
      </p>
    </div> */}
      {/* Chat history on this computer will be cleared when you log out. */}
    </div>
  );
};

export default ProfilePage;