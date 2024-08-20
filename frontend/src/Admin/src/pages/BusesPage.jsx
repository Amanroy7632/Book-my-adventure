import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
function BusesPage() {
  const [buses, setBuses] = useState([]);
  const [isLoading,setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    // Fetch bus data from API
    axios.get("https://book-my-adventure.onrender.com/api/v1/bus/admin/bus").then((response) => {
      console.log(response);
      setBuses(response.data?.data);
      setIsLoading(false)
    }).catch((error)=>{
      console.error(error)
      setIsLoading(false)
    });
  }, []);

  return (
    <div className=" overflow-x-scroll">
      <h1 className="text-2xl font-bold mb-4">Buses</h1>

      <table className="w-full bg-white rounded-md shadow-md">
        <thead>
          <tr>
            <th className="p-4 max-sm:p-1 text-left">Bus ID</th>
            <th className="p-4 max-sm:p-1 text-left">Bus Name</th>
            <th className="p-4 max-sm:p-1 text-left">Capacity</th>
            <th className="p-4 max-sm:p-1 text-left">Bus Type</th>
            <th className="p-4 max-sm:p-1 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading&&<div className=" flex justify-center items-center p-5 mt-5"><Loader/></div>}
          {buses.length>0?buses?.map((bus) => (
            <tr key={bus.id}>
              <td className="p-4 max-sm:p-1">{bus._id?.substring(0,5)}</td>
              <td className="p-4 max-sm:p-1">{bus.busname}</td>
              <td className="p-4 max-sm:p-1">{bus.totalSeat}</td>
              <td className="p-4 max-sm:p-1">{bus.busType}</td>
              <td className="p-4 max-sm:p-1 max-sm:flex">
                <button className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600">
                  Edit
                </button>
                <button className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 ml-2">
                  Delete
                </button>
              </td>
            </tr>
          )):!isLoading&&<div className=" text-2xl text-orange-500">Buses data not found...</div>}
        </tbody>
      </table>
    </div>
  );
}

export default BusesPage;
