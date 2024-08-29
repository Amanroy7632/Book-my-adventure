import React from "react";
import "./loader.css";
const Loader = () => {
  return (
    <div className=" w-[70vw] h-[80vh] flex flex-col gap-3 items-center justify-center">
      <div className=" w-10 h-10 border-r-4 rounded-full border-l-4 animate-spin border-black"></div>
      <p className=" uppercase space-x-2 text-xl">Loading ...</p>
    </div>
  );
};

export default Loader;
