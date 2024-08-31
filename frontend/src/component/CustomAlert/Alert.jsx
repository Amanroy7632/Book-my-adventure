import React, { useState, useEffect } from "react";
import { Button } from "../commonUi/index.js";
import {
  AiOutlineCheckCircle,
  AiOutlineWarning,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { MdInfoOutline } from "react-icons/md";

const icons = {
  success: <AiOutlineCheckCircle size={64} className=" text-blue-500" />,
  warning: <AiOutlineWarning size={64} className=" text-yellow-500" />,
  error: <AiOutlineCloseCircle size={64} className=" text-red-500" />,
  info: <MdInfoOutline size={64} className=" text-orange-400" />,
};

const Alert = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false); // Cleanup on unmount
  }, []);

  const handleClose = (e) => {
    e.preventDefault();
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 400); // Wait for the animation to finish
  };

  const type = message?.type || "success";

  return (
    <div className="custom-alert-overlay z-50 fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
      <div
        className={`custom-alert bg-white min-w-64 p-[20px] rounded-md text-center transform transition-transform duration-300 ease-out ${
          isVisible ? "fade-in" : "fade-out"
        }`}
      >
        <div className="flex items-center gap-3 text-2xl font-semibold">
          {icons[type]}
          <p>
            {message?.title
              ? message.title
              : type === "success"
              ? "Congratulations"
              : type === "error"
              ? "Failed"
              : type === "info"
              ? "Information"
              : "Warning"}
          </p>
        </div>
        <p className="mb-[20px]">{message?.message}</p>
        <form onSubmit={handleClose}>
          <Button
            type="submit"
            className="px-[20px] py-[10px] border-none bg-[#007bff] text-white rounded-md cursor-pointer"
          >
            OK
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Alert;
