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
import Loader from "../loader/Loader.jsx";
import Spinner from "../loader/Spinner.jsx";
import { MdClose, MdKey } from "react-icons/md";
import Modal from "../modal/Modal.jsx";
import ForgetPasswordForm from "./ForgetPasswordForm.jsx";
import { BASE_URL } from "../../constraints.js";
function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isActiveForgotPassword, setIsActiveForgotPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [forgetFormData, setForgetFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
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
      setIsLoading(true);
      const response = await axios.post(
        `${BASE_URL}/users/login`,
        // "http://localhost:8000/api/v1/users/login",
        userInfo
      );
      const { accessToken, refreshToken, user } = response.data.data;
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
      setCurrentUser(user);
      // console.log(user);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      setAlertMessage({
        message: user.fullname,
        type: "success",
        title: "Welcome",
      });
      // alert("Login successful");
      navigate("/");
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        // alert("Login failed \nInternet connection not found");
        setAlertMessage({
          message: "Login failed. Internet connection not found",
          type: "error",
          title: "No Internet Connection",
        });
      }
      if (error.response?.data?.statusCode === 404) {
        setAlertMessage({message:"Invalid Username ! ",type:"warning",title:"Oops"});
      } else if (error.code === "ERR_BAD_REQUEST") {
        setAlertMessage({message:"Invalid Password",type:"warning"});
        setIsActiveForgotPassword(!isActiveForgotPassword);
      }
      setIsLoading(false);
      console.error("Login error:", error.response?.data);
    } finally {
      // setAlertMessage("");
    }
  };

  const passwordToggleHandler = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleForgotPasswordToggle = () => {
    // setIsActiveForgotPassword(!isActiveForgotPassword);
    setOpenModal(!openModal);
  };
  const handleForgotPassword = async (userInfo) => {
    console.log("working or not");

    console.log(userInfo);
  };
  useEffect(() => {
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

      navigate("/");
    }
  }, [currentUser, navigate]);
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
        {isLoading && <Spinner message="Logging in..." />}
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
            {isActiveForgotPassword && (
              <div className=" flex items-end justify-end">
                <Link
                  onClick={handleForgotPasswordToggle}
                  className="flex items-center gap-2 hover:text-blue-500 hover:underline duration-300"
                >
                  <MdKey /> Forget password
                </Link>
              </div>
            )}
            <Button type="submit" className=" w-full">
              Log in
            </Button>
          </div>
        </form>
      </div>
      {
        <Modal onClose={handleForgotPasswordToggle} isOpen={openModal} >
          
          <ForgetPasswordForm onClose={handleForgotPasswordToggle} />
        </Modal>
      }
      {alertMessage.message && (
        <Alert message={alertMessage} onClose={onCloseHandler} />
      )}
    </div>
  );
}

export default Login;
