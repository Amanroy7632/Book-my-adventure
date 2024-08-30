import React, { useState, useTransition } from "react";
import { Link } from "react-router-dom";
import { FiFlag, FiMenu } from "react-icons/fi";
import { AiOutlineMenu, AiOutlineClose, AiOutlineEdit, AiOutlineMedium } from "react-icons/ai";
import { useAuthContext } from "../context/userContext";
import {
  MdArrowDropDown,
  MdChurch,
  MdEdit,
  MdFormatAlignCenter,
  MdFormatAlignLeft,
  MdKey,
  MdLanguage,
  MdLogout,
  MdMenuBook,
  MdMenuOpen,
  MdOutlineLogout,
  MdOutlineMenuOpen,
  MdSupervisorAccount,
  MdTempleHindu,
} from "react-icons/md";
import { FaAlignLeft, FaUserCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
function Navbar({ toggleSidebar, sidebarOpen }) {
  // const { i18n } = useTransition();
   const { t ,i18n} = useTranslation()
  const { isAdmin, setAdmin } = useAuthContext();
  const [openProfile, setOpenProfile] = useState(false);
  const handleProfileToggle = () => {
    console.log("working");
    setOpenProfile(!openProfile);
  };
  const [showLanguages, setShowLanguages] = useState(false);
  const handleToggleLanguages = () => {
    setShowLanguages(!showLanguages);
  };
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const handleLanguageChange = (language) => {
    console.log(language);
    if (language === "English") {
      i18n.changeLanguage("en");
    } else if (language === "Hindi") {
      i18n.changeLanguage("hi");
    }
    else if (language === "German") {
      i18n.changeLanguage("de");
    } else if (language === "French") {
      i18n.changeLanguage("fr");
    }
    setSelectedLanguage(language);
    setShowLanguages(false);
  };
  return (
    <nav
      className={` bg-gray-100 p-4  shadow-md flex justify-between items-center z-40 sticky top-0`}
    >
      <div className="text-lg font-bold">{t("title")}</div>

      <div className=" flex items-center gap-3">
        <div className="">
          {" "}
          <button
            onClick={handleToggleLanguages}
            className=" border rounded-md bg-cyan-100 p-1 px-2 flex items-center gap-1"
          >
            <MdLanguage />{" "}
            <span className=" max-sm:hidden">{selectedLanguage}</span>
          </button>
          {showLanguages && (
            <div className=" absolute bg-white  py-2 rounded-md">
              <ul className=" cursor-pointer">
                <li
                  onClick={() => handleLanguageChange("Hindi")}
                  className=" pb-1 flex items-center gap-2 hover:bg-gray-200 px-5 py-1"
                >
                  {" "}
                  <MdTempleHindu /> Hindi
                </li>
                <li
                  onClick={() => handleLanguageChange("English")}
                  className=" pb-1 flex items-center gap-2 hover:bg-gray-200 px-5 py-1"
                >
                  {" "}
                  <FiFlag /> English
                </li>
                <li
                  onClick={() => handleLanguageChange("German")}
                  className=" pb-1 flex items-center gap-2 hover:bg-gray-200 px-5 py-1"
                >
                  {" "}
                  <MdTempleHindu /> German
                </li>
                <li
                  onClick={() => handleLanguageChange("French")}
                  className=" pb-1 flex items-center gap-2 hover:bg-gray-200 px-5 py-1"
                >
                  {" "}
                  <MdChurch /> French
                </li>
              </ul>
            </div>
          )}
        </div>
        <button onClick={toggleSidebar} className=" focus:outline-none">
          {sidebarOpen ? (
            // <AiOutlineClose size={28} />
            <AiOutlineMenu size={28} className="" />
          ) : (
            <FaAlignLeft size={26}/>
          )}
        </button>
        {!isAdmin ? (
          <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
            Logout
          </button>
        ) : (
          <div
            onClick={handleProfileToggle}
            className=" cursor-pointer select-none flex items-center gap-2"
          >
            <div className="icon">
              {/* <FaUserCircle size={28} /> */}
              <img
                className=" w-10 rounded-md"
                src="https://demo.foodscan.xyz/images/default/profile.png"
                alt="iconimg"
              />
            </div>
            <div className="name-field">
              <p className=" text-sm">{t("hello")}</p>{" "}
              <p className=" font-semibold">Aman</p>
            </div>
            <MdArrowDropDown size={16} />
          </div>
        )}
      </div>
      {openProfile && (
        <div className=" profile-container absolute top-[10vh] right-3 border shadow-md rounded-b-2xl bg-white p-8">
          <div className="upper flex items-center flex-col justify-center px-3 py-2">
            <div>
              <div className=" relative border-2 border-red-500 rounded-full border-dashed">
                <img
                  src="https://demo.foodscan.xyz/images/default/profile.png"
                  className=" p-1 w-24 h-24 rounded-full"
                  alt=""
                />
                <AiOutlineEdit
                  size={38}
                  className=" absolute bottom-[-10px] left-[32%]  border-2 p-1 rounded-full bg-black text-white"
                />
              </div>
            </div>
            <div className=" text-center p-3">
              <h2 className=" font-bold">Aman</h2>
              <p className=" text-sm font-semibold text-gray-500">
                yadavaman7632@gmail.com
              </p>
              <p className=" text-sm font-semibold text-gray-500">
                +91 7632976843
              </p>
              <p>$789.80</p>
            </div>
          </div>
          <div className="lower-links px-3 py-3 flex flex-col gap-2">
            <Link className=" flex items-center gap-3 text-gray-600 hover:text-blue-500">
              <MdEdit /> Edit Profile
            </Link>
            <hr />
            <Link className=" flex items-center gap-3 text-gray-600 hover:text-blue-500">
              <MdKey /> Change Password
            </Link>
            <hr />
            <Link
              onClick={() => setAdmin(!isAdmin)}
              className=" flex items-center gap-3 text-gray-600 hover:text-blue-500"
            >
              <MdOutlineLogout className=" rotate-180" /> Logout
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
