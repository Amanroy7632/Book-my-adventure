import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button } from "../commonUi/index.js";
import { BiCheckCircle, BiEnvelope } from "react-icons/bi";
import { AiOutlineEye, AiFillEyeInvisible } from "react-icons/ai";
import Logo from "../logo/Logo.jsx";
import Cookies from "js-cookie";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance.js";
import { useCurrentUser } from "../../context/userContext.jsx";
import Alert from "../CustomAlert/Alert.jsx";
import Loader from "../loader/Loader.jsx"
import Spinner from "../loader/Spinner.jsx";
function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const [isLoading,setIsLoading] =useState(false)
  const {
    currentUser,
    setCurrentUser,
    alertMessage,
    onCloseHandler,
    setAlertMessage,
  } = useCurrentUser();
  const navigate = useNavigate();
  const handleLogin = async (userInfo) => {
    try {
      setIsLoading(true)
      const response = await axios.post(
        "https://book-my-adventure.onrender.com/api/v1/users/login",
        userInfo
      );
      const { accessToken, refreshToken, user } = response.data.data;
      Cookies.set(
        "accessToken",
        accessToken,
        { expires: 7 },
        { httpOnly: true, secure: true }
      );
      Cookies.set(
        "refreshToken",
        refreshToken,
        { expires: 7 },
        { httpOnly: true, secure: true }
      );
      setCurrentUser(user)  
      console.log(user);
      setTimeout(() => {
        setIsLoading(false)
      }, 1000);
      setAlertMessage("Welcome "+user.fullname);
      // alert("Login successful");
      navigate("/");
    } catch (error) {
        if (error.code ==="ERR_NETWORK") {
            
            alert("Login failed \nInternet connection not found");
        }
        setIsLoading(false)
      setAlertMessage("Login failed");
      console.error("Login error:", error);
    } finally {
      // setAlertMessage("");
    }
  };
  const login = (data) => {
    console.log(data);
    try {
      fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            //   console.log(data?.data.accessToken);
            const { accessToken } = data?.data;
            Cookies.set(
              `accessToken`,
              accessToken,
              { expires: 7 },
              { httpOnly: true, secure: true }
            );
            setCurrentUser(data?.data);
            alert("User logged in successfully");
            navigate("/");
            reset();
          } else {
            alert("Something went wrong with the login");

            return;
          }
        })
        .catch((err) => {
          alert("Error: " + err.message);
          console.log(err.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  const passwordToggleHandler = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  useEffect(()=>{
    //   const fetchUserData = async () => {
    //       try {
    //         const response = await axiosInstance.get('/users/profile');
    //       //   setUserData(response.data);
    //       console.log(response.data);
    //       setCurrentUser(response.data)

    //       } catch (error) {
    //         console.error('Error fetching user data:', error);
    //       }
    //     }
    //     if(currentUser.email){
    //       navigate("/")
    //     }
    //   if (!currentUser._id) {

    //       fetchUserData()
    //   }
    if (currentUser) {
        console.log("useEffect wala navigate");
        
        navigate("/")
    }
  },[currentUser,navigate])
  return (
    <div className=" flex items-center justify-center w-full  pt-[12vh]">
      <div
        className={`mx-auto w-full max-w-lg shadow-md rounded-xl p-10 border border-black/10 `}
      >
        <div className=" mb-2 flex justify-center">
          <Logo className=" bg-blend-multiply" />
          {/* <div><p className=' text-2xl font-bold'><span className=' text-red-500'>F</span><span className=' text-blue-500'>E</span><span className=' text-green-500'>E</span><span className=' text-orange-500'>D</span></p></div> */}
        </div>
        <h2 className=" text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className=" mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to={"/register"}
            className=" font-medium text-pretty transition-all duration-200 hover:underline "
          >
            Sign Up
          </Link>
        </p>
        {isLoading &&  <Spinner/>}
        {/* {errorMessage && <p className=" text-red-600 mt-8 text-center" >{errorMessage}</p>} */}
        <form onSubmit={handleSubmit(handleLogin)} className=" mt-8 ">
          <div className=" space-y-5">
            <Input
              label="Email"
              icon={<BiEnvelope />}
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                // validate:{
                //   matchPatern:(value)=>/^/.test(value) || "Email address must be a valid address"
                // }
              })}
            />
            <Input
              label="Password"
              type={isPasswordVisible ? "text" : "password"}
              icon={
                isPasswordVisible ? (
                  <AiOutlineEye
                    onClick={passwordToggleHandler}
                    className=" cursor-pointer"
                  />
                ) : (
                  <AiFillEyeInvisible
                    onClick={passwordToggleHandler}
                    className=" cursor-pointer"
                  />
                )
              }
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className=" w-full">
              Log in
            </Button>
          </div>
        </form>
      </div>
      {alertMessage && (
        <Alert message={alertMessage} onClose={onCloseHandler} />
      )}
    </div>
  );
}

export default Login;
