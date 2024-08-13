import React, { useState, useEffect } from "react";
import axios from "axios";

function TripsPage() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Fetch trips data from API
    axios.get("https://book-my-adventure.onrender.com/api/v1/routes/get-all-routes")
      .then((response) => {
        console.log(response.data);
        setTrips(response.data?.data);
        
      })
      .catch((error) => {
        console.error("Error fetching trips:", error);
      });
  }, []);

  const handleDelete = (tripId) => {
    // Call API to delete trip
    axios.delete(`/api/trips/${tripId}`)
      .then(() => {
        // Remove deleted trip from state
        setTrips((prevTrips) => 
          prevTrips.filter((trip) => trip.id !== tripId)
        );
      })
      .catch((error) => {
        console.error("Error deleting trip:", error);
      });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Trips</h1>
      <table className="w-full bg-white rounded-md shadow-md">
        <thead>
          <tr>
            <th className="p-4 text-left">Trip ID</th>
            <th className="p-4 text-left">Bus Name</th>
            <th className="p-4 text-left">From</th>
            <th className="p-4 text-left">To</th>
            <th className="p-4 text-left">Departure Time</th>
            <th className="p-4 text-left">Arrival Time</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id}>
              <td className="p-4">{trip._id}</td>
              <td className="p-4">{trip.busDetails?.busname}</td>
              <td className="p-4">{trip.departureLocation[0].toUpperCase()+trip.departureLocation?.substring(1)}</td>
              <td className="p-4">{trip.arrivalLocation[0].toUpperCase()+trip.arrivalLocation?.substring(1)}</td>
              <td className="p-4">{new Date(trip.departureTime).toLocaleString()}</td>
              <td className="p-4">{new Date(trip.arrivalTime).toLocaleString()}</td>
              <td className="p-4">
                <button className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600">
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(trip.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 ml-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TripsPage;
