import React from "react";
import "./Spinner.css"
const Spinner = ({ message = "Please wait ...", className }) => {
  return (
    <div
      className={`${className} custom-alert-overlay z-50 fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center`}
    >
      <div className=" flex flex-col justify-center items-center select-none ">
        <div className=" flex flex-col items-center bg-white py-4 px-3 rounded-md min-w-40">
          {/* <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-700"></div> */}
          <div className="skype-loader flex items-center">
            <div className="dot">
              <div className="first"></div>
            </div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
          <h2>{message}</h2>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
