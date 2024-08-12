import React, {  useState } from "react";
import "./selectbus.css";
import SelectHeader from "./header/SelectHeader.jsx";
import Left from "./left/Left.jsx";
import Right from "./right/Right.jsx";
import SortingBar from "./right/sorting-bar/SortingBar.jsx";
import BusBox from "./right/bus-box/BusBox.jsx";
// import BusBottom from "./right/bus-book/BusBottom.jsx";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks";
const SelectBus = () => {
  const useQuery = ()=>{
    return new URLSearchParams(useLocation().search)
  }
  const query =useQuery()
  // const [bus,setBus] = useState({})
  const URL=`http://localhost:8000/api/v1/bus/709670`
    const requestOptions = {
      method:"GET",
      "Content-Type": "application/json"
    }
  const urlforBus =`https://book-my-adventure.onrender.com/api/v1/routes/?departureLocation=${query.get("departure")}&arrivalLocation=${query.get("arrival")}&date=${query.get("date")}`
  const {loading,errorMessage,data} = useFetch(urlforBus,requestOptions)  
  const onFilterChange =(filter,value)=>{

  }
  return (
    <div className="selectbus">
      <SelectHeader arrival={query.get("arrival")} departure={query.get("departure")} date={query.get("date")}/>
      <div  className=" md:flex gap-2 max-md:flex max-md:flex-col ">
        <Left className="" onFilterChange={onFilterChange}/>
        <Right className="">
            <div className=" w-full">
              <SortingBar/>
              <BusBox loading={loading} data={data} errorMessage={errorMessage}/>
            </div>
        </Right>
      </div>
    </div>
  );
};
export default SelectBus;
