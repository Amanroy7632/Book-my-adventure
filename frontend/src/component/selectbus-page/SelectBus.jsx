import React, { useEffect, useState } from "react";
import "./selectbus.css";
import SelectHeader from "./header/SelectHeader";
import Left from "./left/Left";
import Right from "./right/Right";
import SortingBar from "./right/sorting-bar/SortingBar";
import BusBox from "./right/bus-box/BusBox";
import BusBottom from "./right/bus-book/BusBottom";
import { useParams,useLocation } from "react-router-dom";
import useFetch from "../../hooks";
const SelectBus = () => {
  const useQuery = ()=>{
    return new URLSearchParams(useLocation().search)
  }
  const query =useQuery()
  const [bus,setBus] = useState({})
  const URL=`http://localhost:8000/api/v1/bus/709670`
    const requestOptions = {
      method:"GET",
      "Content-Type": "application/json"
    }
  // const { loading, errorMessage, data } = useFetch(URL, requestOptions);
  // console.log(data);
  const urlforBus =`http://localhost:8000/api/v1/routes/?departureLocation=${query.get("departure")}&arrivalLocation=${query.get("arrival")}&date=${query.get("date")}`
  const {loading,errorMessage,data} = useFetch(urlforBus,requestOptions)
  console.log(data);
  
  return (
    <div class="'selectbus">
      <SelectHeader arrival={query.get("arrival")} departure={query.get("departure")} date={query.get("date")}/>
      <div class="SelectBUS_MAINCONTENT  ">
        <Left/>
        <Right>
            <div className="">
              <SortingBar/>
              <BusBox loading={loading} data={data} errorMessage={errorMessage}/>
            </div>
        </Right>
        {/* <app-right></app-right> */}
      </div>
    </div>
  );
};
export default SelectBus;
