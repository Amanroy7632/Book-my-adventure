import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { BASE_URl } from "../constraints";


function AddTripPage() {
  const [selectedbusId, setSelectedBusId] = useState("");
  const [formData, setFormData] = useState({
    busId: "", // Added busId field
    departureLocation: "",
    busname: "",
    busNo: "",
    fare: "",
    arrivalLocation: "",
    departureTime: "",
    arrivalTime: "",
  });
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "busId") {
      setSelectedBusId(value);
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // Call API to add a new trip
    try {
      const data = {
        ...formData,
        departureLocation:formData.departureLocation.toLowerCase(),
        arrivalLocation:formData.arrivalLocation.toLowerCase(),
        operatorName: formData.busname,
        date: formData.departureTime
          ?.split("T")[0]
          .split("-")
          .reverse()
          .join("-"),
      };
      console.log(data);
      const response = await axios.post(
        `${BASE_URl}/routes/register`,
        data
      );
      // console.log(response.data);

      if (response.status === 200) {
        alert("Route added successfully");
      }
      setFormData({
        busId: "", // Added busId field
        departureLocation: "",
        busname: "",
        busNo: "",
        fare: "",
        arrivalLocation: "",
        departureTime: "",
        arrivalTime: "",
      })
    } catch (error) {}
     finally{
      setLoading(false)
     }
    // axios.post("/api/trips", formData)
    //   .then((response) => {
    //     alert("Trip added successfully!");
    //     // Reset form after successful submission
    //     setFormData({
    //       busId: "", // Reset busId field,
    //       busname:"",
    //       fromLocation: "",
    //       toLocation: "",
    //       departureTime: "",
    //       arrivalTime: "",
    //     });
    //   })
    //   .catch((error) => {
    //     console.error("Error adding trip:", error);
    //     alert("Failed to add trip. Please try again.");
    //   });
  };

  const fetchBusData = async () => {
    try {
      const response = await axios.get(`${BASE_URl}/bus/`);
      if (response.status === 200) {
        console.log(response.data);
        setBuses(response.data?.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch data", error.message);
    }
  };

  useEffect(() => {
    fetchBusData();
  }, []);
  useEffect(() => {
    if (selectedbusId) {
      const selectedBus = buses.find((bus) => bus?._id === selectedbusId);
      if (selectedBus) {
        setFormData((prevData) => ({
          ...prevData,
          busname: selectedBus.busname,
          busNo: selectedBus.busno,
        }));
      }
    }
  }, [selectedbusId, buses]);
  return (
    <div className="w-full mx-auto relative bg-white p-8 max-sm:p-1 rounded-md shadow-md">
      
      <h1 className="text-2xl font-bold mb-4">Add New Trip</h1>
      <form onSubmit={handleSubmit}>
        <div className=" grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="busId"
            >
              Bus ID:
            </label>
            <select
              id="busId"
              name="busId"
              value={formData.busId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select bus ID
              </option>
              {buses.map((bus) => (
                <option key={bus._id} value={bus._id}>
                  {bus._id}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="busname"
            >
              Bus Name:
            </label>
            <input
              type="text"
              id="fromLocation"
              name="busname"
              disabled
              value={formData.busname}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter departure location"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="busname"
            >
              Bus Number:
            </label>
            <input
              type="text"
              id="fromLocation"
              name="busname"
              disabled
              value={formData.busNo}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter departure location"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="departureLocation"
            >
              From Location
            </label>
            <input
              type="text"
              id="fromLocation"
              name="departureLocation"
              value={formData.departureLocation}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter departure location"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="arrivalLocation"
            >
              To Location
            </label>
            <input
              type="text"
              id="toLocation"
              name="arrivalLocation"
              value={formData.arrivalLocation}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter destination location"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="departureTime"
            >
              Departure Time
            </label>
            <input
              type="datetime-local"
              id="departureTime"
              name="departureTime"
              value={formData.departureTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="arrivalTime"
            >
              Arrival Time
            </label>
            <input
              type="datetime-local"
              id="arrivalTime"
              name="arrivalTime"
              value={formData.arrivalTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="fromLocation"
            >
              Fare
            </label>
            <input
              type="number"
              id="fromLocation"
              name="fare"
              value={formData.fare}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter fare"
              required
            />
          </div>
        </div>

        <div className=" m-auto w-[80%]">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add Trip
          </button>
        </div>
      </form>
      {loading &&<div className=" absolute flex w-full h-full items-center justify-center top-0 left-0 bg-[rgb(0,0,0,0.1)]"><Loader/></div>  }
    </div>
  );
}

export default AddTripPage;
