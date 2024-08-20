import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

function AddBusPage() {
  const [selectedbusId, setSelectedBusId] = useState("");
  const [formData, setFormData] = useState({
    totalSeat: "",
    busname: "",
    busno: "",
    busType: "",
    owner: "",
    wifi: false,
    waterBottle: false,
    chargingPorts: false,
    movie: false,
    blanket: false,
  });
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { type, name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    // const raw = JSON.stringify({
    //   "busno": "768981",
    //   "busname": "NagpurExpress",
    //   "totalSeat": 44,
    //   "busType": "Ac & Sleeper",
    //   "owner": "66b8993ab65adc7d10d0ea22",
    //   "wifi": true,
    //   "waterBottle": true,
    //   "chargingPorts": true,
    //   "movie": false,
    //   "blanket": true
    // });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(formData),
      redirect: "follow"
    };
    
    fetch("http://localhost:8000/api/v1/bus/register", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));












    console.log(formData);

    // Code to handle form submission (e.g., making an API call)
    // setLoading(true);
    // try {
    //   const response = await axios.post("http://localhost:8000/api/v1/bus/register", formData);
    //   if (response.status === 200) {
    //     alert("Bus added successfully");
    //     setFormData({
    //       totalSeat: "",
    //       busname: "",
    //       busno: "",
    //       busType: "",
    //       owner: "",
    //       wifi: false,
    //       waterBottle: false,
    //       chargingPorts: false,
    //       movie: false,
    //       blanket: false,
    //     });
    //   }
    // } catch (error) {
    //   console.error("Failed to add bus", error.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  const fetchBusData = async () => {
    try {
      const response = await axios.get(
        "https://book-my-adventure.onrender.com/api/v1/bus/"
      );
      if (response.status === 200) {
        console.log(response.data);
        setBuses(response.data?.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch data", error.message);
    }
  };

  // useEffect(() => {
  //   fetchBusData();
  // }, []);

  // useEffect(() => {
  //   if (selectedbusId) {
  //     const selectedBus = buses.find((bus) => bus?._id === selectedbusId);
  //     if (selectedBus) {
  //       setFormData((prevData) => ({
  //         ...prevData,
  //         busname: selectedBus.busname,
  //         busNo: selectedBus.busno,
  //       }));
  //     }
  //   }
  // }, [selectedbusId, buses]);

  return (
    <div className="w-full mx-auto bg-white p-8 max-sm:p-1 rounded-md shadow-md">
      {loading && <Loader />}
      <h1 className="text-2xl font-bold mb-4">Add New Trip</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="busname"
            >
              Bus Name:
            </label>
            <input
              type="text"
              id="busname"
              name="busname"
              value={formData.busname}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Bus name"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="busno"
            >
              Bus Number:
            </label>
            <input
              type="text"
              id="busno"
              name="busno"
              value={formData.busno}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter bus number"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="busType"
            >
              Bus Type:
            </label>
            <select
              id="busType"
              name="busType"
              value={formData.busType}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select bus type
              </option>
              <option value="Sleeper">Sleeper</option>
              <option value="Sleeper & Ac">Sleeper & Ac</option>
              <option value="Sleeper & Non-Ac">Sleeper & Non-Ac</option>
              <option value="Sleeper & Hot-Cool">Sleeper & Hot-Cool</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="owner"
            >
              Owner Id:
            </label>
            <input
              type="text"
              id="owner"
              name="owner"
              value={formData.owner}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter owner Id"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="totalSeat"
            >
              Total Seats:
            </label>
            <input
              type="number"
              id="totalSeat"
              name="totalSeat"
              value={formData.totalSeat}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter total seats"
              required
            />
          </div>

          <div className="mb-4 select-none">
            <h2 className="text-gray-700 font-bold mb-2">Amenities</h2>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="wifi"
                name="wifi"
                checked={formData.wifi}
                onChange={handleChange}
                className="w-1/3 px-3 py-2"
              />
              <label className="block mb-2" htmlFor="wifi">
                Wifi
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="waterBottle"
                name="waterBottle"
                checked={formData.waterBottle}
                onChange={handleChange}
                className="w-1/3 px-3 py-2"
              />
              <label className="block mb-2" htmlFor="waterBottle">
                Water Bottle
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="chargingPorts"
                name="chargingPorts"
                checked={formData.chargingPorts}
                onChange={handleChange}
                className="w-1/3 px-3 py-2"
              />
              <label className="block mb-2" htmlFor="chargingPorts">
                Charging Ports
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="movie"
                name="movie"
                checked={formData.movie}
                onChange={handleChange}
                className="w-1/3 px-3 py-2"
              />
              <label className="block mb-2" htmlFor="movie">
                Movie
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="blanket"
                name="blanket"
                checked={formData.blanket}
                onChange={handleChange}
                className="w-1/3 px-3 py-2"
              />
              <label className="block mb-2" htmlFor="blanket">
                Blanket
              </label>
            </div>
          </div>
        </div>

        <div className="m-auto w-[80%]">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add Bus
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBusPage;
