import React from "react";
import logo from "../../assets/red-bus-with-word-bus-it_600323-482.avif";
import { Link } from "react-router-dom";
function Logo({className=""}) {
  return (
    <Link className={`grid place-content-center ${className}`}>
      <img
        className="md:w-[4.5rem] md:h-auto w-12 h-10"
        src={logo}
        alt="busbook Logo"
      />
    </Link>
  );
}

export default Logo;
