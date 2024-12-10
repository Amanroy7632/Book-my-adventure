import React, { useEffect, useState } from "react";
import "./selectbus.css";
import SelectHeader from "./header/SelectHeader.jsx";
import Left from "./left/Left.jsx";
import Right from "./right/Right.jsx";

import BusBox from "./right/bus-box/BusBox.jsx";

import { useLocation } from "react-router-dom";
import useFetch from "../../hooks";
import ScrollToTop from "../commonUi/ScrollToTop.jsx";
import { useCurrentUser } from "../../context/userContext.jsx";
import { BASE_URL } from "../../constraints.js";
import axios from "axios";
const SelectBus = () => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const { isScrollTopVisible } = useCurrentUser();
  const [isLoading,setIsLoading] = useState(true);
  const [routeData,setRouteData] = useState(null)
  const [filteredData,setFilteredData] = useState([]);
  const [errorMessage,setErrorMessage] = useState('');
  const query = useQuery();
  const fetchRouteData = async () => {
    try {
      const urlforBus = `${BASE_URL}/routes/?departureLocation=${query
        .get("departure")
        .toLocaleLowerCase()}&arrivalLocation=${query
        .get("arrival")
        .toLocaleLowerCase()}&date=${query.get("date")}`;
      const response = await axios.get(urlforBus);
      if (response.status === 200) {
        console.log(response.data);
        setRouteData(response.data)
        setFilteredData(response.data?.data);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }finally{
      setIsLoading(false);
    }
  };
  const requestOptions = {
    method: "GET",
    "Content-Type": "application/json",
  };
  const urlforBus = `${BASE_URL}/routes/?departureLocation=${query
    .get("departure")
    .toLocaleLowerCase()}&arrivalLocation=${query
    .get("arrival")
    .toLocaleLowerCase()}&date=${query.get("date")}`;
  // console.log(urlforBus);

  // const { loading, errorMessage, data } = useFetch(urlforBus, requestOptions);
  // console.log(data);
  useEffect(()=>{
    fetchRouteData();
  },[])
  const onFilterChange = (filter, value) => {
    console.log(filter);
    
  };
  return (
    <div className="selectbus">
      <SelectHeader
        arrival={query.get("arrival")}
        departure={query.get("departure")}
        date={query.get("date")}
      />
      <div className=" md:flex gap-2 max-md:flex max-md:flex-col ">
        <Right className="">
          {/* <div className=" w-full"> */}
          <Left className="" onFilterChange={setFilteredData} data={routeData?.data} />
          {/* <SortingBar /> */}
          <BusBox loading={isLoading} data={routeData} errorMessage={errorMessage} />
          {/* </div> */}
        </Right>
      </div>
      {isScrollTopVisible && <ScrollToTop />}
    </div>
  );
};
export default SelectBus;
