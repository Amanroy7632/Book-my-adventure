import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { Button } from "../commonUi";
import axios from "axios";
import { BASE_URL } from "../../constraints";
import SpinnerSmall from "../loader/SpinnerSmall";
const ForgetPasswordForm = ({ isActiveForgotPassword, onClose }) => {
  const [forgetFormData, setForgetFormData] = useState({
    email: "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [freezeEmail, setFreezeEmail] = useState(false);
  const [step, setStep] = useState(1);
  const [loading,setLoading] = useState(false)

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
    if ([forgetFormData.email, forgetFormData.code, forgetFormData.confirmPassword,forgetFormData.newPassword].some(field=>field.trim()==="")) {
      alert("All fields are required")
      return;
    }
    if (forgetFormData.newPassword!==forgetFormData.confirmPassword) {
      alert("New Password does not match with confirm password")
      return;
    }
    try {
      setLoading(true)
      const response = await axios.post(
        `${BASE_URL}/users/reset-password`,
        forgetFormData
      );
      if (response.status === 200) {
        console.log(response.data?.data);
        alert("Password reset successfully");

        setForgetFormData({
          email: "",
          code: "",
          newPassword: "",
          confirmPassword: "",
        });
        onClose();
      }
      setTimeout(()=>{
        setLoading(false)
      },2000)
    } catch (error) {
      alert("Something went wrong" + error.message);
    }
  };

  const onNext = () => {
    if (step < 2) {
      setStep((prev) => prev + 1);
      handleOtpGeneration();
    }
  };

  const onPrevious = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };
  const handleOtpGeneration = async () => {
    try {
      setLoading(true)
      const response = await axios.post(
        `${BASE_URL}/users/otp`,
        forgetFormData
      );
      if (response.status === 200) {
        console.log(response.data);
        setFreezeEmail(true);
        alert("Otp sent successfully");
      }
      setTimeout(()=>{
        setLoading(false)
      },2000)
      if (step < 2){
        setStep((prev) => prev + 1);
      }
    } catch (error) {
      setLoading(false)
      alert("Something went wrong" + error.message);
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

  return (
    <div className="flex justify-center flex-col items-center bg-white relative p-4 shadow-md rounded-lg max-w-md w-full mx-auto">
      <div className="absolute top-2 right-2 cursor-pointer" onClick={onClose}>
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
            disabled={freezeEmail}
            className="w-full outline-none border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        {/* Step 2: OTP Input */}
        <div className={`flex flex-col ${step >= 2 ? "visible" : "hidden"}`}>
          <label htmlFor="code" className="text-gray-700">
            OTP
          </label>
          <input
            onChange={handleChange}
            value={forgetFormData.code}
            type="number"
            name="code"
            id="code"
            className="w-full outline-none border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        {/* Step 3: Password Inputs */}
        <div
          className={`flex flex-col space-y-4 ${
            step >= 2 ? "visible" : "hidden"
          }`}
        >
          <div>
            <label htmlFor="newPassword" className="text-gray-700">
              New Password
            </label>
            <input
              onChange={handleChange}
              value={forgetFormData.newPassword}
              type="password"
              name="newPassword"
              id="newPassword"
              className="w-full outline-none border border-gray-300 px-3 py-2 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="text-gray-700">
              Confirm Password
            </label>
            <input
              onChange={handleChange}
              value={forgetFormData.confirmPassword}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="w-full outline-none border border-gray-300 px-3 py-2 rounded-md"
            />
          </div>
        </div>
      </form>

      <div className="w-full flex justify-between mt-4">
        {step > 1 && (
          <Button
            onClick={onPrevious}
            className="rounded-none bg-gray-300 text-gray-700"
          >
            Previous
          </Button>
        )}
        {step < 2 ? (
          <Button onClick={handleOtpGeneration} className="rounded-none w-full flex items-center gap-2 justify-center">
            {loading?<div className=" flex items-center gap-2">Sending otp <SpinnerSmall/></div>:"Send Otp"}
          </Button>
        ) : (
          <Button
            onClick={handleForgotPassword}
            className="rounded-none w-full"
          >
            
            {loading?<div className=" flex items-center gap-2">Submitting <SpinnerSmall/></div>:"Submit"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
