import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axiosInstance from "../utils/axiosInstance.js";

const UserContext = createContext();

export const useCurrentUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    message: "",
    title: "",
    type: "",
  });

  const onCloseHandler = () => {
    setAlertMessage({
      message: "",
      type: "",
      title: "",
    });
  };

  const logoutCurrentUser = () => {
    if (!currentUser) {
      return;
    }
    setCurrentUser(null);
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setAlertMessage({
      message: "Logout Successfully",
      type: "success",
    });
    // alert("Logout Successfully")
  };

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get("/users/profile");
      //   console.log(response.data);
      setCurrentUser(response.data?.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsScrollTopVisible(true);
    } else {
      setIsScrollTopVisible(false);
    }
  };
  
  useEffect(() => {
    fetchUserData();

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    //   console.log(currentUser);
  }, []);
  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        logoutCurrentUser,
        alertMessage,
        setAlertMessage,
        onCloseHandler,
        isScrollTopVisible,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
