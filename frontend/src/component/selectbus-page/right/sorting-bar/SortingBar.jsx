import React from "react";
import { MdSecurity } from "react-icons/md";
import "./sortingbar.css"
const SortingBar = () => {
  return (
    <div className="security-container w-full  pt-[10px] flex text-center flex-col">
      <div className=" flex gap-2 items-center">
        <MdSecurity className=" text-xl" />
        <div className=" text-xl">All bus rating include safety as a major factor</div>
        {/* <mat-divider></mat-divider> */}
      </div>
      <div>
        <div className="main-container w-full">
          <div className="main-container1">
            <div>BUSES LIST</div>
            <div>SORT BY :</div>
          </div>
          <div className="main-container2">Departure</div>
          <div className="main-container3">Duration</div>
          <div className="main-container4">Arrivals</div>
          <div className="main-container5">Rating</div>
          <div className="main-container6">Fare</div>
          <div className="main-container7">Seatd Available</div>
        </div>
      </div>
    </div>
  );
};

export default SortingBar;
