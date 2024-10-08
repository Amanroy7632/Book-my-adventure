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
import Alert from "../CustomAlert/Alert.jsx";
import { useCurrentUser } from "../../context/userContext.jsx";
import Spinner from "../loader/Spinner.jsx";
import { BASE_URL } from "../../constraints.js";
function Signup() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const { alertMessage, setAlertMessage, onCloseHandler, setCurrentUser } =
    useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // const handleLogin = async (userInfo) => {
  //   try {
  //     const response = await axios.post(
  //       "https://book-my-adventure.onrender.com/api/v1/users/login",
  //       userInfo
  //     );
  //     const { accessToken, refreshToken, user } = response.data.data;
  //     Cookies.set(
  //       "accessToken",
  //       accessToken,
  //       { expires: 7 },
  //       { httpOnly: true, secure: true }
  //     );
  //     Cookies.set(
  //       "refreshToken",
  //       refreshToken,
  //       { expires: 7 },
  //       { httpOnly: true, secure: true }
  //     );
  //     setCurrentUser(user)
  //     setAlertMessage("Login successful");
  //     alert("Login successful");
  //     navigate("/");
  //   } catch (error) {
  //     setAlertMessage("Login failed");
  //     console.error("Login error:", error);
  //   } finally {
  //     setAlertMessage("");
  //   }
  // };
  const createUser = async (userInfo) => {
    // console.log(userInfo);
    try {
      // throw new Error("Not implemented");
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/users/register`, userInfo);
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
      // console.log(user);

      if (!user) {
        // alert("User registration failed");
        setAlertMessage({ message: "User registration failed", type: "error" });
      }
      // alert("User registered successful");
      setAlertMessage({ message: "User registered successful." });
      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      if (error.response?.data?.statusCode === 409) {
        setAlertMessage({
          message: "User with email or phone already exists",
          type: "error",
          title: "Registration Failed",
        });
      } 
      else if (error.response?.data?.statusCode === 403) {
        setAlertMessage({
          message: "User with email or phone already exists",
          type: "error",
          title: "Registration Failed",
        });
      }else {
        setAlertMessage({
          message: "User Registration failed. Try again later",
          type: "error",
        });
      }
      setIsLoading(false);
      console.error("Login error:", error);
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
      {isLoading && <Spinner />}
      {alertMessage.message && (
        <Alert message={alertMessage} onClose={onCloseHandler} />
      )}
    </div>
  );
}

export default Signup;
