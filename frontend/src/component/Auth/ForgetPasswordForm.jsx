import React, { useEffect, useState } from "react";
import { MdClose, MdPassword } from "react-icons/md";
import { Button } from "../commonUi";
import axios from "axios";
import { BASE_URL } from "../../constraints";
import SpinnerSmall from "../loader/SpinnerSmall";
import { AiOutlineEye, AiFillEyeInvisible } from "react-icons/ai";
import { useCurrentUser } from "../../context/userContext";
import Alert from "../CustomAlert/Alert";
const ForgetPasswordForm = ({ isActiveForgotPassword, onClose }) => {
  const [forgetFormData, setForgetFormData] = useState({
    email: "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  });
  const {alertMessage,setAlertMessage,onCloseHandler} =useCurrentUser()
  const [freezeEmail, setFreezeEmail] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    message: "",
    type: "",
  });
  const [visiblePassword, setVisiblePassword] = useState({
    isActive: false,
    inputName: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForgetFormData({
      ...forgetFormData,
      [name]: value,
    });
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    console.log(forgetFormData);
    if (
      [
        forgetFormData.email,
        forgetFormData.code,
        forgetFormData.confirmPassword,
        forgetFormData.newPassword,
      ].some((field) => field.trim() === "")
    ) {
      // alert("All fields are required")
      setMessage({ message: "All fields are required", type: "error" });
      setAlertMessage({ message: "All fields are required", type:"warning"})
      return;
    }
    if (forgetFormData.newPassword !== forgetFormData.confirmPassword) {
      setMessage({
        message: "New Password does not match with confirm password",
        type: "error",
      });
      setAlertMessage({message:"New Password does not match with confirm password",type:"error"})
      // alert("New Password does not match with confirm password")
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_URL}/users/reset-password`,
        forgetFormData
      );
      if (response.status === 200) {
        console.log(response.data?.data);
        alert("Password reset successfully");
        setAlertMessage({message:"Password reset successfully" ,type:"success"})

        setForgetFormData({
          email: "",
          code: "",
          newPassword: "",
          confirmPassword: "",
        });
        onClose();
      }
      // setTimeout(()=>{
        setLoading(false)
      // },2000)
    } catch (error) {
      if(error.code==="ERR_BAD_REQUEST"){
        setAlertMessage({message:"Invalid verification code",type:"error"})
        setMessage({message:"Invalid verification code",type:"error"})
      }
      setLoading(false)
      
      // alert("Something went wrong" + error.message);
    }
  };

  // const onNext = () => {
  //   if (step < 2) {
  //     setStep((prev) => prev + 1);
  //     handleOtpGeneration();
  //   }
  // };

  const onPrevious = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };
  const handleOtpGeneration = async () => {
    if (!forgetFormData.email) {
      setMessage({ message: "All fields are required", type: "error" });
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_URL}/users/otp`,
        forgetFormData
      );
      console.log(response.status, response.statusText);

      if (response.status === 200) {
        console.log(response.data);
        setFreezeEmail(true);
        // alert("Otp sent successfully");
        setMessage({
          message: "Verification Code sent successfully",
          type: "success",
        });
      }
      if (step < 2) {
        setStep((prev) => prev + 1);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.code);
      if (error.code === "ERR_BAD_REQUEST") {
        setMessage({ message: "Invalid email", type: "error" });
        setAlertMessage({message: "Email doesn't registered.", type: "error" })
      }
      // alert("Something went wrong" + error);
    }
  };
  const handleResetPassword = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/users/reset-password`,
        forgetFormData
      );
      if (response.status === 200) {
        console.log(response.data?.data);
        alert("Password reset successfully");
      }
    } catch (error) {
      alert("Something went wrong" + error.message);
    }
  };
  const handleTogglePassword = (inputType) => {
    if (inputType === "newPassword") {
      if (
        visiblePassword.isActive &&
        visiblePassword.inputName === "newPassword"
      ) {
        setVisiblePassword({ isActive: false, inputName: "" });
      } else {
        setVisiblePassword({ isActive: true, inputName: "newPassword" });
      }
    }
    if (inputType === "confirmPassword") {
      if (
        visiblePassword.isActive &&
        visiblePassword.inputName === "confirmPassword"
      ) {
        setVisiblePassword({ isActive: false, inputName: "" });
      } else {
        setVisiblePassword({ isActive: true, inputName: "confirmPassword" });
      }
    }
  };
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage({ message: "", type: "" });
      }, 4000);
    }
  }, [message]);
  return (
    <div className="flex justify-center flex-col items-center bg-white relative p-4 shadow-md rounded-lg max-w-md w-full mx-auto">
      {alertMessage.message && <Alert message={alertMessage} onClose={onCloseHandler} />}
      <div className="absolute top-2 right-3 cursor-pointer" onClick={onClose}>
        <MdClose className=" text-xl" />
      </div>
      <form onSubmit={handleForgotPassword} className="w-full space-y-4">
        <div className=" heading font-semibold font-sans">
          Password Recovery
        </div>

        {/* Step 1: Email Input */}
        <div className={`flex flex-col ${step >= 1 ? "visible" : "hidden"}`}>
          <label htmlFor="email" className="text-gray-700">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            onChange={handleChange}
            value={forgetFormData.email}
            type="email"
            name="email"
            id="email"
            placeholder="Enter registered email"
            disabled={freezeEmail}
            className="w-full outline-none border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        {/* Step 2: OTP Input */}
        <div className={`flex flex-col ${step >= 2 ? "visible" : "hidden"}`}>
          <label htmlFor="code" className="text-gray-700">
            Verification Code
          </label>
          <input
            onChange={handleChange}
            value={forgetFormData.code}
            type="number"
            
            name="code"
            id="code"
            placeholder="Enter verification code"
            className="w-full outline-none border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        {/* Step 3: Password Inputs */}
        <div
          className={`flex flex-col space-y-4 ${
            step >= 2 ? "visible" : "hidden"
          }`}
        >
          <div className=" relative select-none">
            <label htmlFor="newPassword" className="text-gray-700">
              New Password
            </label>
            <input
              onChange={handleChange}
              value={forgetFormData.newPassword}
              type={
                !(visiblePassword.isActive &&
                visiblePassword.inputName === "newPassword")
                  ? "password"
                  : "text"
              }
              name="newPassword"
              id="newPassword"
              className="w-full outline-none border border-gray-300 px-3 py-2 rounded-md"
            />
            {
              <div onClick={() => handleTogglePassword("newPassword")}>
                {!(visiblePassword.isActive &&
                visiblePassword.inputName === "newPassword") ? (
                  <AiOutlineEye className=" absolute right-1 top-[55%]  text-xl z-10" />
                ) : (
                  <AiFillEyeInvisible className=" absolute right-1 top-[55%]  text-xl z-10" />
                )}
              </div>
            }
          </div>
          <div className=" relative  select-none">
            <label htmlFor="confirmPassword" className="text-gray-700">
              Confirm Password
            </label>
            <input
              onChange={handleChange}
              value={forgetFormData.confirmPassword}
              type={
                !(
                  visiblePassword.isActive &&
                  visiblePassword.inputName === "confirmPassword"
                )
                  ? "password"
                  : "text"
              }
              name="confirmPassword"
              id="confirmPassword"
              className="w-full outline-none border border-gray-300 px-3 py-2 rounded-md"
            />
            {
              <div onClick={() => handleTogglePassword("confirmPassword")}>
                {!(visiblePassword.isActive &&
                visiblePassword.inputName === "confirmPassword") ? (
                  <AiOutlineEye className=" absolute right-1 top-[55%]  text-xl z-10" />
                ) : (
                  <AiFillEyeInvisible className=" absolute right-1 top-[55%]  text-xl z-10" />
                )}
              </div>
            }
          </div>
        </div>
      </form>

      <div className="w-full flex flex-col gap-2 justify-between mt-4 duration-300 transition-all ease-in-out">
        {step > 1 && (
          <Button
            onClick={onPrevious}
            className="rounded-none bg-gray-300 text-gray-700"
          >
            Previous
          </Button>
        )}
        {step < 2 ? (
          <Button
            onClick={handleOtpGeneration}
            className="rounded-none w-full flex items-center gap-2 justify-center"
          >
            {loading ? (
              <div className=" flex items-center gap-2">
                Sending otp <SpinnerSmall />
              </div>
            ) : (
              "Send Otp"
            )}
          </Button>
        ) : (
          <Button
            onClick={handleForgotPassword}
            className="rounded-none w-full flex justify-center items-center"
          >
            {loading ? (
              <div className=" flex items-center gap-2">
                Submitting <SpinnerSmall />
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        )}
        {message.message && (
          <div
            className={`${
              message.type === "error" ? "text-red-500" : "text-green-500"
            } font-semibold text-center`}
          >
            {message.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
