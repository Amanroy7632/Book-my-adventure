import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button } from "../commonUi/index.js";
import { BiEnvelope } from "react-icons/bi";
import { BsMenuApp, BsPhone } from "react-icons/bs";
import {
  AiOutlineEye,
  AiFillEyeInvisible,
  AiOutlineGoogle,
  AiFillGoogleCircle,
} from "react-icons/ai";
import Logo from "../logo/Logo.jsx";
import axios from "axios";
import { useCurrentUser } from "../../context/userContext.jsx";
function Signup() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const {setAlertMessage,setCurrentUser} = useCurrentUser()
  const navigate = useNavigate()
  const handleLogin = async (userInfo) => {
    try {
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
      setAlertMessage("Login successful");
      alert("Login successful");
      navigate("/");
    } catch (error) {
      setAlertMessage("Login failed");
      console.error("Login error:", error);
    } finally {
      setAlertMessage("");
    }
  };
  const createUser = async(userInfo) => {
    console.log(userInfo);
    // try {
    //   fetch("http://localhost:8000/api/v1/users/register",
    //     {
    //       method:"POST",
    //       body:JSON.stringify(data),
    //       headers:{
    //         "Content-Type": "application/json"
    //       }
    //     }
    //   ).then((response)=>response.json()).then((data)=>{
    //     console.log(data);
    //     if (data.success) {
          
    //       alert("User registered successfully")
    //       reset()
    //     }else{
    //       alert("Something went wrong with the registration")
    //       return

    //     }
        
    //   }).catch((err)=>{
    //     alert("Error: " + err.message)
    //     console.log(err.message);
    //   })
    // } catch (error) {
    //   console.log(error.message);
    // }
    try {
      const response = await axios.post(
        "https://book-my-adventure.onrender.com/api/v1/users/register",
        userInfo
      );
      const { user } = response.data.data;
      // Cookies.set(
      //   "accessToken",
      //   accessToken,
      //   { expires: 7 },
      //   { httpOnly: true, secure: true }
      // );
      // Cookies.set(
      //   "refreshToken",
      //   refreshToken,
      //   { expires: 7 },
      //   { httpOnly: true, secure: true }
      // );
      // setCurrentUser(user)      
      // setAlertMessage("Login successful");
      console.log(user);
      
      if (!user) {
        alert("User registration failed");
      }
      alert("User registered successful");
      
      navigate("/login");
    } catch (error) {
      setAlertMessage("Login failed");
      console.error("Login error:", error);
    } finally {
      setAlertMessage("");
    }
  };
  const passwordToggleHandler = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <div className=" flex justify-center items-center ">
      <div
        className={` mx-auto w-full max-w-lg shadow-md rounded-xl p-10 border border-black/10`}
      >
        <div className=" mb-2 flex justify-center">
          <Logo />
        </div>
        
        <h2 className=" text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <div className=" flex justify-center items-center pt-2">
          <div className=" flex items-center gap-3 border px-2 py-1 rounded-xl hover:bg-gray-400 bg-gray-300 cursor-pointer">
            <div className=" text-3xl text-blue-950">
              <AiOutlineGoogle />
            </div>
            <div className=" font-semibold">Continue with Google</div>
          </div>
        </div>
        <p className=" mt-2 text-center text-base text-gray-500 ">
          Already hav an account?&nbsp;
          <Link
            to={"/login"}
            className=" font-medium text-pretty transition-all duration-200 hover:underline "
          >
            Sign in
          </Link>
        </p>
        {/* {err && <p className=" text-red-600 mt-8 text-center">{err}</p>} */}
        <form onSubmit={handleSubmit(createUser)}>
          <div className=" space-y-5">
            <Input
              label="Name"
              icon={<BsMenuApp />}
              placeholder="Enter your full name"
              {...register("fullname", {
                required: true,
              })}
            />
            <Input
              label="Email"
              type="email"
              icon={<BiEnvelope />}
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid email address",
                },
              })}
            />
            <Input
              label="Phone"
              type="number"
              icon={<BsPhone />}
              placeholder="Enter your phone number"
              {...register("phone", {
                required: true,
                // validate:{
                //     matchPatern:(value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||"Email address must be a valid email address"
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
            {/* <DropDown
              label={"Role"}
              icon={<AiFillControl/>}
              {...register("role", {
                required: true,
              })}
            /> */}

            <Button type="submit" className=" w-full">
              Submit
            </Button>
          </div>
        </form>
      </div>
      {/* {alertMessage && <Alert message={alertMessage} onClose={onClose} />} */}
    </div>
  );
}

export default Signup;
