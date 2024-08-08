import React, { useState } from "react";
import axios from "axios";

function AddTripPage() {
  const [formData, setFormData] = useState({
    busName: "",
    fromLocation: "",
    toLocation: "",
    departureTime: "",
    arrivalTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call API to add a new trip
    axios.post("/api/trips", formData)
      .then((response) => {
        alert("Trip added successfully!");
        // Reset form after successful submission
        setFormData({
          busName: "",
          fromLocation: "",
          toLocation: "",
          departureTime: "",
          arrivalTime: "",
        });
      })
      .catch((error) => {
        console.error("Error adding trip:", error);
        alert("Failed to add trip. Please try again.");
      });
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add New Trip</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="busName">
            Bus Name
          </label>
          <input
            type="text"
            id="busName"
            name="busName"
            value={formData.busName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter bus name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="fromLocation">
            From Location
          </label>
          <input
            type="text"
            id="fromLocation"
            name="fromLocation"
            value={formData.fromLocation}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter departure location"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="toLocation">
            To Location
          </label>
          <input
            type="text"
            id="toLocation"
            name="toLocation"
            value={formData.toLocation}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter destination location"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="departureTime">
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
          <label className="block text-gray-700 font-bold mb-2" htmlFor="arrivalTime">
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

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add Trip
        </button>
      </form>
    </div>
  );
}

export default AddTripPage;
