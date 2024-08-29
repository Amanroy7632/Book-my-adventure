import React from "react";
import { Button } from "../commonUi/index.js";
import Logo from "../logo/Logo.jsx";
import {
  MdCheck,
  MdCheckBox,
  MdCheckCircle,
  MdInfoOutline,
  MdOutlineClose,
} from "react-icons/md";
import {
  AiOutlineCheckCircle,
  AiOutlineWarning,
  AiOutlineCloseCircle,
} from "react-icons/ai";
const iconClass = "";
const icons = {
  success: <AiOutlineCheckCircle size={64} className=" text-blue-500" />,
  warning: <AiOutlineWarning size={64} className=" text-yellow-500" />,
  error: <AiOutlineCloseCircle size={64} className=" text-red-500" />,
  info: <MdInfoOutline size={64} className=" text-orange-400" />,
};
const Alert = ({ message, onClose }) => {
  const type = message?.type || "success"
  return (
    <div className="custom-alert-overlay z-50 fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
      <div className="custom-alert bg-white min-w-64 p-[20px] rounded-md text-center">
        {/* <div className=" flex items-center gap-1 text-xl font-semibold">
          <Logo /> <span className=" text-orange-500">B</span>{" "}
          <span className="">U</span> <span className=" text-green-500">S</span>{" "}
        </div> */}
        <div className=" flex items-center gap-3 text-2xl font-semibold">
          {icons[message?.type ? message.type : "success"]}
          {type === "success" && (
            <p> {message?.title ? message.title : "Congratulations"}</p>
          )}
          {type === "error" && (
            <p> {message?.title ? message.title : "Failed"}</p>
          )}
          {type === "info" && (
            <p> {message?.title ? message.title : "Information"}</p>
          )}
          {type === "warning" && (
            <p> {message?.title ? message.title : "Warning"}</p>
          )}
          {/* {type==="error"&&<div className=" flex items-center gap-3 text-2xl font-semibold"><MdOutlineClose size={64} className=" text-white border rounded-full bg-red-500"/>{title?title:"Failed"} </div>}
          {type==="success"&&<div className=" flex items-center gap-3 text-2xl font-semibold"><MdCheckCircle size={64} className=" text-blue-500"/> {title?title:"Congratulations"}</div>}
          {t
         ype==="info"&&<div className=" flex items-center gap-3 text-2xl font-semibold"><MdInfoOutline size={64} className=" text-yellow-500"/> {title?title:"Information"}</div>} */}
        </div>
        <p className="mb-[20px]">{message?.message}</p>
        <form onSubmit={onClose}>
          <Button
            type="submit"
            className=" px-[20px] py-[10px] border-none bg-[#007bff] text-white rounded-md cursor-pointer"
          >
            OK
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Alert;
