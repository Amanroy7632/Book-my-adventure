import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { useCurrentUser } from "../../context/userContext.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import Alert from "../CustomAlert/Alert.jsx";
import Spinner from "../loader/Spinner.jsx";
import { MdClose } from "react-icons/md";

const Profile = () => {
  const [user, setUser] = useState({
    avatar: "https://via.placeholder.com/150",
    name: "~Aman",
    about: "See Everything, Say nothing",
    phone: "+91 76329 76843",
  });
  const navigate = useNavigate();
  const {
    currentUser,
    setCurrentUser,
    logoutCurrentUser,
    alertMessage,
    setAlertMessage,
    onCloseHandler,
  } = useCurrentUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableName, setEditableName] = useState(false);
  const [editableAbout, setEditableAbout] = useState(false);
  const [editablePhone, setEditablePhone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadinMessage] = useState("Please wait...");
  const [viewImg, setViewImage] = useState(false);

  const uploadAvatar = async (filePath) => {
    try {
      setLoadinMessage("Uploading ...");
      setLoading(true);
      const response = await axiosInstance.patch(
        "/users/upload-avatar",
        filePath
      );
      if (response.status === 200) {
        setAlertMessage("Avtar uploaded successfully");
        console.log(response.data);
        setCurrentUser(response.data?.data);
      }
      // console.log(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      alertMessage("Error uploading avatar: " + error.message);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    // console.log(file);

    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);

      // Function to upload the avatar
      uploadAvatar(formData);

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
    // window.open(currentUser?.avatar, "_blank");
    setViewImage(true);
    // closeModal();
  };
  const closeImage = () => {
    setViewImage(false);
    setIsModalOpen(false);
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

  const handleLogOut = () => {
    logoutCurrentUser();
    navigate("/");
  };

  const handleDeleteProfileAvtar = async () => {
    try {
      setLoadinMessage("Removing ...");
      setLoading(true);
      if (!currentUser.avatar?.split("/")[7]?.split(".")[0]) {
        setLoading(false);
        setAlertMessage("Avtar is not uploaded");
        closeModal();
        return;
      }
      const response = await axiosInstance.delete(`/users/`);
      if (response.status === 200) {
        // console.log(response.data?.data);
        setAlertMessage("Avatar removed successfully");
        setCurrentUser({
          ...currentUser,
          avatar: "https://via.placeholder.com/150",
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setAlertMessage("Failed to remove the avatar " + error.message);
    } finally {
      closeModal();
    }
  };
  return (
    <>
      {loading && <Spinner message={loadingMessage} />}
      {alertMessage && (
        <Alert message={alertMessage} onClose={onCloseHandler} />
      )}
      <div className="flex-1 bg-gray-800 text-white p-6">
        <div className="flex flex-col gap-4">
          <div className="relative w-fit">
            <img
              className="w-24 h-24 rounded-full shadow-md cursor-pointer"
              src={currentUser?.avatar}
              alt="Profile"
              onError={handleProfileImageError}
              onClick={openModal}
            />
          {loading&&  <div className="absolute rounded-full top-0 w-full h-full bg-[rgba(0,0,0,0.7)]">
              <div className=" absolute top-[41%] left-[41%] w-6 h-6 rounded-full border-r-4 border-green-50 animate-spin"></div>
            </div>}
          </div>
          <div className="">
            <div className="flex items-center mt-2  gap-10">
              {editableName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    className=" font-semibold text-gray-900 outline-none p-1 rounded-md"
                    defaultValue={currentUser.fullname}
                    onBlur={(e) => handleSave("fullname", e.target.value)}
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
                  onBlur={(e) => handleSave("about", e.target.value)}
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
                  onBlur={(e) => handleSave("phone", e.target.value)}
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
          onClick={handleLogOut}
          className="mt-10 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
        >
          Log out
        </button>
        <p className="mt-4 text-gray-400">
          {/* Chat history on this computer will be cleared when you log out. */}
        </p>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center select-none">
          {!viewImg && (
            <div className="bg-white p-4 rounded-lg shadow-lg w-80 text-black relative">
              <h2 className="text-lg font-semibold mb-4">Profile Image</h2>
              <span
                className=" absolute cursor-pointer top-4 right-4 text-xl text-white px-2 rounded-full font-bold bg-orange-500 hover:bg-orange-600 duration-300"
                onClick={closeModal}
              >
                X
              </span>
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
              <button
                onClick={handleDeleteProfileAvtar}
                className="block w-full mb-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
              >
                Remove image
              </button>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          )}
          {viewImg && (
            <div className="image-container relative  sm:w-fit md:w-2/3 md:mt-10 lg:w-1/3 p-10">
              <img
                onMouseLeave={closeImage}
                src={currentUser?.avatar}
                alt="avatar"
                className=" w-fit"
              />
              <MdClose
                onClick={closeImage}
                className=" absolute z-20 text-3xl bg-red-500 duration-300 hover:bg-red-600 top-10 right-10 text-white rounded-b-sm"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
