import React from "react";
import "./selectbus.css";
import SelectHeader from "./header/SelectHeader";
import Left from "./left/Left";
import Right from "./right/Right";
const SelectBus = () => {
  return (
    <div class="'selectbus">
      <SelectHeader/>
      <div class="SelectBUS_MAINCONTENT ">
        <Left/>
        <Right/>
        {/* <app-right></app-right> */}
      </div>
    </div>
  );
};

export default SelectBus;
