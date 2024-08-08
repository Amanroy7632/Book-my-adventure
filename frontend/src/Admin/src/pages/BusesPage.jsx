import React, { useState, useEffect } from "react";
import axios from "axios";

function BusesPage() {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    // Fetch bus data from API
    // axios.get("/api/buses").then((response) => {
    //   setBuses(response.data);
    // });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Buses</h1>
      <table className="w-full bg-white rounded-md shadow-md">
        <thead>
          <tr>
            <th className="p-4 text-left">Bus ID</th>
            <th className="p-4 text-left">Bus Name</th>
            <th className="p-4 text-left">Capacity</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {buses.map((bus) => (
            <tr key={bus.id}>
              <td className="p-4">{bus.id}</td>
              <td className="p-4">{bus.name}</td>
              <td className="p-4">{bus.capacity}</td>
              <td className="p-4">
                <button className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600">
                  Edit
                </button>
                <button className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 ml-2">
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

export default BusesPage;
