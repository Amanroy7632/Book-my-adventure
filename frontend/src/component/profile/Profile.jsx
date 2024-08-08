// import React, { useEffect, useState } from "react";
// import Modal from "react-modal";
// import { useCurrentUser } from "../../context/userContext";
// import { useNavigate } from "react-router-dom";
// import { BiLaptop, BiKey, BiBrush } from "react-icons/bi";
// import { MdStorage } from "react-icons/md";
// import { HiInformationCircle } from "react-icons/hi";
// Modal.setAppElement("#root"); // This is important for screen readers

// const Profile = () => {
//   const [user, setUser] = useState({
//     avatar: "https://via.placeholder.com/150", // Placeholder image URL
//     name: "John Doe",
//     email: "john.doe@example.com",
//     phone: "123-456-7890",
//     bio: "Software Developer at ABC Corp. Passionate about coding and coffee.",
//   });
//   const { currentUser, logoutCurrentUser } = useCurrentUser();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate();
//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setUser({ ...user, avatar: e.target.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

  // const viewImage = () => {
  //   window.open(user.avatar, "_blank");
  //   closeModal();
  // };
//   useEffect(() => {
//     if (!currentUser) {
//       navigate("/");
//     }
//   }, [currentUser]);
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className=" flex justify-center items-center">
//         <div className="left-side  border flex justify-center items-center">
//           <div className="container border drop-shadow-md  bg-white">
//             <div className=" flex items-center gap-3 hover:bg-gray-100  p-1">
//               {" "}
//               <BiLaptop /> General
//             </div>
//             <div className=" flex items-center gap-3 hover:bg-gray-100  p-1">
//               {" "}
//               <BiKey /> Account
//             </div>
//             <div className=" flex items-center gap-3 hover:bg-gray-100  p-1">
//               {" "}
//               <BiBrush /> Personalization
//             </div>
//             <div className=" flex items-center gap-3 hover:bg-gray-100  p-1">
//               {" "}
//               <MdStorage /> Storage
//             </div>
//             <div className=" flex items-center gap-3 hover:bg-gray-100 w-fit p-1">
//               {" "}
//               <HiInformationCircle /> Help
//             </div>
//           </div>
//         </div>
//         <div className="bg-white shadow-md rounded-lg max-w-sm w-full p-6 sm:max-w-md md:max-w-lg lg:max-w-xl">
//           <div className="flex flex-col items-center">
//             <div className="relative">
//               <img
//                 className="w-24 h-24 rounded-full shadow-md cursor-pointer"
//                 src={user.avatar}
//                 alt="Profile"
//                 onClick={openModal}
//               />
//             </div>
//             <h2 className="mt-4 text-xl font-semibold text-gray-800">
//               {currentUser?.fullname}
//             </h2>
//             <p className="text-gray-600">{currentUser?.email}</p>
//             <p className="text-gray-600">{currentUser?.phone}</p>
//             <p className="mt-4 text-gray-700 text-center">{user.bio}</p>
//           </div>
//           <div className="mt-6 flex justify-around w-full">
//             <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
//               Edit Profile
//             </button>
//             <button
//               onClick={logoutCurrentUser}
//               className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         <Modal
//           isOpen={isModalOpen}
//           onRequestClose={closeModal}
//           className="flex justify-center items-center h-full"
//           overlayClassName="fixed inset-0 bg-black bg-opacity-50"
//         >
//           <div className="bg-white p-4 rounded-lg shadow-lg w-80">
//             <h2 className="text-lg font-semibold mb-4">Profile Image</h2>
//             <button
//               onClick={() => document.getElementById("fileInput").click()}
//               className="block w-full mb-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
//             >
//               Edit Image
//             </button>
//             <button
//               onClick={viewImage}
//               className="block w-full px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
//             >
//               View Image
//             </button>
//             <button
//               onClick={closeModal}
//               className="block w-full mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
//             >
//               Cancel
//             </button>
//             <input
//               type="file"
//               id="fileInput"
//               accept="image/*"
//               className="hidden"
//               onChange={handleImageChange}
//             />
//           </div>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default Profile;

// import React, { useState } from "react";
// import {
//   BiLaptop,
//   BiKey,
//   BiBrush,
//   BiStore,
//   BiInfoCircle,
//   BiUser,
//   BiSolidPaste,
//   BiSticker,
// } from "react-icons/bi";
// import { FaPencilAlt } from "react-icons/fa";
// import { MdAirplaneTicket, MdSdStorage } from "react-icons/md";
// import { useCurrentUser } from "../../context/userContext";
// import { Input } from "../commonUi";

// const Profile = () => {
//   const [user, setUser] = useState({
//     avatar: "https://via.placeholder.com/150",
//     name: "~Aman",
//     about: "See Everything, Say nothing",
//     phone: "+91 76329 76843",
//   });
//   const { currentUser, logoutCurrentUser } = useCurrentUser();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editable,setEditable] =useState(false)

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setUser({ ...user, avatar: e.target.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="flex h-[86vh]">
//       <div className="w-1/4 relative bg-gray-900 text-white p-4">
//         <div className="text-lg font-semibold mb-4">Settings</div>
//         <ul>
//           <li className="mb-2 hover:bg-gray-700 p-2 rounded flex items-center gap-2">
//             <BiLaptop />
//             General
//           </li>
//           <li className="mb-2 hover:bg-gray-700 p-2 rounded flex items-center gap-2">
//             <BiKey />
//             Account
//           </li>
//           <li className="mb-2 hover:bg-gray-700 p-2 rounded flex items-center gap-2">
//             <MdAirplaneTicket />
//             Bookings
//           </li>
//           {/* <li className="mb-2 hover:bg-gray-700 p-2 rounded">Video & voice</li> */}
//           {/* <li className="mb-2 hover:bg-gray-700 p-2 rounded">Notifications</li> */}
//           {/* <li className="mb-2 hover:bg-gray-700 p-2 rounded flex items-center gap-2"><BiBrush/>Personalization</li> */}
//           <li className="mb-2 hover:bg-gray-700 p-2 rounded flex items-center gap-2">
//             <MdSdStorage />
//             Storage
//           </li>
//           <li className="mb-2 hover:bg-gray-700 p-2 rounded flex items-center gap-2">
//             <BiSolidPaste />
//             History
//           </li>
//           <li className="mb-2 hover:bg-gray-700 p-2 rounded flex items-center gap-2">
//             <BiInfoCircle />
//             Help
//           </li>
//           <li className=" absolute bottom-3 mt-10 mb-2 bg-green-600 p-2 rounded flex items-center gap-2">
//             <BiUser />
//             Profile
//           </li>
//         </ul>
//       </div>
//       <div className="flex-1 bg-gray-800 text-white p-6">
//         <div className="flex flex-col gap-4">
//           <div className="relative">
//             <img
//               className="w-24 h-24 rounded-full shadow-md cursor-pointer"
//               src={user.avatar}
//               alt="Profile"
//               onClick={openModal}
//             />
//           </div>
//           <div className="">
//             <div className="flex items-center mt-2  gap-10">
//               {!editable&&<h2 className="text-2xl font-semibold">
//                 {currentUser?.fullname}
//               </h2>}
//               {editable&&<input type="text" className=" font-semibold text-gray-900 outline-none p-1 w-[25%] rounded-md" />}
//               <FaPencilAlt className="ml-2 cursor-pointer" onClick={()=>setEditable(!editable)} />
//             </div>
//             <div className="flex items-center mt-2 gap-10">
//               <p>About</p>
//               <FaPencilAlt className="ml-2 cursor-pointer" />
//             </div>
//             <p className="text-gray-400 mt-2 ">{user.about}</p>
//             <div className="flex items-center mt-2 gap-10">
//               <p>Phone number</p>
//               <FaPencilAlt className="ml-2 cursor-pointer" />
//             </div>
//             <p className="text-gray-400">+91{currentUser?.phone}</p>
//             <div className="flex items-center mt-2 gap-10">
//               <p>Email</p>
//             </div>
//             <p className="text-gray-400">{currentUser?.email}</p>
//           </div>
//         </div>
//         <button
//           onClick={logoutCurrentUser}
//           className="mt-10 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
//         >
//           Log out
//         </button>
//         <p className="mt-4 text-gray-400">
//           Chat history on this computer will be cleared when you log out.
//         </p>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-4 rounded-lg shadow-lg w-80 text-black">
//             <h2 className="text-lg font-semibold mb-4">Profile Image</h2>
//             <button
//               onClick={() => document.getElementById("fileInput").click()}
//               className="block w-full mb-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
//             >
//               Edit Image
//             </button>
//             <button
//               onClick={closeModal}
//               className="block w-full px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
//             >
//               Cancel
//             </button>
//             <input
//               type="file"
//               id="fileInput"
//               accept="image/*"
//               className="hidden"
//               onChange={handleImageChange}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;

import React, { useState } from "react";
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
import { useCurrentUser } from "../../context/userContext";

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
    window.open(user.avatar, "_blank");
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
    <div className="flex h-[86vh]">
      <div className="w-1/4 relative bg-gray-900 text-white p-4 select-none">
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
      </div>
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
    </div>
  );
};

export default Profile;
