import React from "react";
import { MdSecurity } from "react-icons/md";
import "./sortingbar.css"
const SortingBar = () => {
  return (
    <div class="security-container w-full  pt-[10px] flex text-center flex-col">
      <div class=" flex gap-2 items-center">
        <MdSecurity className=" text-xl" />
        <div className=" text-xl">All bus rating include safety as a major factor</div>
        {/* <mat-divider></mat-divider> */}
      </div>
      <div>
        <div class="main-container w-full">
          <div class="main-container1">
            <div>BUSES LIST</div>
            <div>SORT BY :</div>
          </div>
          <div class="main-container2">Departure</div>
          <div class="main-container3">Duration</div>
          <div class="main-container4">Arrivals</div>
          <div class="main-container5">Rating</div>
          <div class="main-container6">Fare</div>
          <div class="main-container7">Seatd Available</div>
        </div>
      </div>
    </div>
  );
};

export default SortingBar;
