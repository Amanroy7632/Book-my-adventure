import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie"
import axiosInstance from "../utils/axiosInstance.js";
import { useNavigate } from "react-router-dom";
const UserContext = createContext()
export const useCurrentUser=()=>{
    return useContext(UserContext)
}
export const UserProvider = ({children})=>{
    const [currentUser,setCurrentUser] = useState(null)
    const [alertMessage, setAlertMessage] = useState("");
    const onCloseHandler = ()=>{
        setAlertMessage('')
    }
    const logoutCurrentUser = ()=>{
        if (!currentUser) {
            return 
        }
        setCurrentUser(null)
        Cookies.remove("accessToken")
        Cookies.remove("refreshToken")
        setAlertMessage("Logout Successfully")
        // alert("Logout Successfully")
    }
    useEffect(()=>{
        const fetchUserData =async ()=>{
            try {
              const response = await axiosInstance.get("/users/profile")
            //   console.log(response.data);
              setCurrentUser(response.data?.data)
            } catch (error) {
              console.error('Error fetching user data:', error);
            }
          }
          fetchUserData()
        //   console.log(currentUser);
    },[])
    return <UserContext.Provider value={{currentUser,setCurrentUser,logoutCurrentUser,alertMessage,setAlertMessage,onCloseHandler}}>
        {children}
    </UserContext.Provider>
}