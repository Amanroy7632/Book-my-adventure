

import React, { useState } from "react";
import {Outlet} from "react-router-dom"
import {
  BiLaptop,
  BiKey,
  BiBrush,
  BiInfoCircle,
  BiUser,
  BiSolidPaste,
} from "react-icons/bi";
import { FaPencilAlt } from "react-icons/fa";
import { MdAirplaneTicket, MdSdStorage } from "react-icons/md";
import { useCurrentUser } from "../../context/userContext.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
const uploadAvatar = async (filePath)=>{
  try {
    const response = await axiosInstance.patch("/users/upload-avatar",{avatar:filePath})
    if (response.status===200) {
      alert("Avtar uploaded successfully")
    }
    console.log(response);
    
  } catch (error) {
    alert("Something went wron"+error.message)
  }
}
const Profile = () => {
  const [user, setUser] = useState({
    avatar: "https://via.placeholder.com/150",
    name: "~Aman",
    about: "See Everything, Say nothing",
    phone: "+91 76329 76843",
  });
  const { currentUser,setCurrentUser, logoutCurrentUser } = useCurrentUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableName, setEditableName] = useState(false);
  const [editableAbout, setEditableAbout] = useState(false);
  const [editablePhone, setEditablePhone] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadAvatar(e.target.result)
        setCurrentUser({ ...currentUser, avatar: e.target.result });
      };
      reader.readAsDataURL(file);
    }
    closeModal()
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
    if (field === 'fullname') setEditableName(false);
    if (field === 'about') setEditableAbout(false);
    if (field === 'phone') setEditablePhone(false);
  };
const handleProfileImageError =()=>{
  setCurrentUser({
    ...currentUser,
    avatar:"https://via.placeholder.com/150"
  })
}
  return (
    <>
      {/* <div className="w-1/4 relative bg-gray-900 text-white p-4 select-none">
        <div className="text-lg font-semibold mb-4">Settings</div>
        <ul>
          <li className="mb-2 hover:bg-gray-700 p-2 rounded flex items-center gap-2">
            <BiLaptop />
            General
          </li>
          <li className="mb-2 hover:bg-gray-700 p-2 rounded flex items-center gap-2">
            <BiKey />
            Account
          </li>
          <li className="mb-2 hover:bg-gray-700 p-2 rounded flex items-center gap-2">
            <MdAirplaneTicket />
            Bookings
          </li>
          <li className="mb-2 hover:bg-gray-700 p-2 rounded flex items-center gap-2">
            <MdSdStorage />
            Storage
          </li>
          <li className="mb-2 hover:bg-gray-700 p-2 rounded flex items-center gap-2">
            <BiSolidPaste />
            History
          </li>
          <li className="mb-2 hover:bg-gray-700 p-2 rounded flex items-center gap-2">
            <BiInfoCircle />
            Help
          </li>
          <li className=" absolute bottom-3 mt-10  mb-2 bg-gray-700 p-2 px-3 rounded flex items-center gap-2">
            <BiUser />
            Profile
          </li>
        </ul>
      </div> */}
      <div className="flex-1 bg-gray-800 text-white p-6">
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
          {/* Chat history on this computer will be cleared when you log out. */}
        </p>
      </div>
      
{/* <Outlet/> */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center select-none">
          <div className="bg-white p-4 rounded-lg shadow-lg w-80 text-black relative">
            <h2 className="text-lg font-semibold mb-4">Profile Image</h2>
            <span className=" absolute cursor-pointer top-4 right-4 text-xl text-white px-2 rounded-full font-bold bg-orange-500 hover:bg-orange-600 duration-300" onClick={closeModal}>X</span>
            <button
              onClick={() => document.getElementById("fileInput").click()}
              className="block w-full mb-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
              Change image
            </button>
            <button
              onClick={viewImage}
              className="block w-full mb-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
            >
              View image
            </button>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
