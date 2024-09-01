import React from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft,FaChevronRight } from "react-icons/fa"
import RouterCumb from "../../routing/RouterCumb";
const SelectHeader = ({ arrival, departure, date }) => {
  return (
    <div className="Header ">
      <div className="HeaderOne   bg-[#BD3B4A] text-white p-[10px] mb-[10px]">
        {/* <RouterCumb/> */}
        <p className=" mx-[10px] py-1 max-sm:justify-between max-sm:gap-0 my-0 flex gap-2 items-center">
          <Link
            to={"/"}
            className=" hover:underline hover:text-blue-500 duration-300"
          >
            Home 
          </Link>{" "}
          <FaChevronRight/>
          <Link
            to={"/"}
            className=" hover:underline hover:text-blue-500 duration-300"
          >
            Bus Tickets
          </Link>{" "}
          <FaChevronRight/>
          {departure[0].toUpperCase() + departure.substring(1)} to{" "}
          {arrival[0].toUpperCase() + arrival.substring(1)}
        </p>
        <p className=" mx-[10px] my-0">Fare Starts from INR <span className=" text-orange-300 font-semibold">100</span></p>
      <div className="HeaderTwo p-[10px] ">
        <h3 className="inline-block mr-[10px]">
          Departure to {departure} on {date}
        </h3>
        {/* <button className=" p-[5px] w-[100px] bg-[#f8f4f4] border-[1px] border-black outline-none rounded-sm">
          Next
        </button> */}
      </div>
      </div>
    </div>
  );
};

export default SelectHeader;
