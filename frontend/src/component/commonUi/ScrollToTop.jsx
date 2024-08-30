import React from "react";
import { FaAngleUp } from "react-icons/fa";
import "./Scroll.css";
const ScrollToTop = () => {
  const handleScroll = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <a
      onClick={handleScroll}
      id="button"
      className=" flex justify-center items-center text-center fixed rounded-md bg-[#dc3545] text-white cursor-pointer hover:bg-[#333]"
    >
      <FaAngleUp size={28} />
    </a>
  );
};

export default ScrollToTop;
