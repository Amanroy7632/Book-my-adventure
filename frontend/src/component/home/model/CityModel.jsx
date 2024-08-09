import React, { useEffect, useState } from "react";

function CityModel({cityInfo,handleLocation,location,onBlur}) {
    const [filteredlocation,setFilteredLocation] = useState([])
    const [isLoading,setisLoading] = useState(false)
    useEffect(()=>{
        setisLoading(true)
        const timeInterval=setTimeout(()=>{
            setFilteredLocation(cityInfo.filter(city=>city.toLowerCase().includes(location.toLowerCase())))
            console.log("Running using timeinterval");
            setisLoading(false)
        },600)
        return ()=>clearTimeout(timeInterval)
    },[location])
  return (
    <div onMouseLeave={onBlur}
      className=" duration-200 absolute top-[56%] right-[46%] w-24 bg-white rounded-md z-20 h-60 overflow-y-scroll  overflow-x-hidden "
      style={{
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <ul className=" flex flex-col gap-2 items-center rounded-md overflow-hidden">
        {!isLoading?filteredlocation.length!==0?(filteredlocation.map((city) => (
          <li
            key={city}
            className=" hover:bg-gray-200 w-full px-2 py-2"
            onClick={() => handleLocation(city)}
          >
            {city[0].toUpperCase() + city.substring(1)}
          </li>
        ))):<p className=" text-red-400 p-2">Not found</p>:<p className=" text-green-400 p-2">Loading...</p>}
      </ul>
    </div>
  );
}

export default CityModel;
