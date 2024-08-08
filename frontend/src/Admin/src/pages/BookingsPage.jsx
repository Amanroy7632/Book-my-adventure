import React, { useState, useEffect } from "react";
import axios from "axios";

function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch booking data from API
    // axios.get("/api/bookings")
    //   .then((response) => {
    //     setBookings(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching bookings:", error);
    //   });
  }, []);

  const handleDelete = (bookingId) => {
    // Call API to delete booking
    axios.delete(`/api/bookings/${bookingId}`)
      .then(() => {
        // Remove deleted booking from state
        setBookings((prevBookings) => 
          prevBookings.filter((booking) => booking.id !== bookingId)
        );
      })
      .catch((error) => {
        console.error("Error deleting booking:", error);
      });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>
      <table className="w-full bg-white rounded-md shadow-md">
        <thead>
          <tr>
            <th className="p-4 text-left">Booking ID</th>
            <th className="p-4 text-left">Passenger Name</th>
            <th className="p-4 text-left">Bus</th>
            <th className="p-4 text-left">Seat No.</th>
            <th className="p-4 text-left">Trip Date</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="p-4">{booking.id}</td>
              <td className="p-4">{booking.passengerName}</td>
              <td className="p-4">{booking.busName}</td>
              <td className="p-4">{booking.seatNumber}</td>
              <td className="p-4">{new Date(booking.tripDate).toLocaleDateString()}</td>
              <td className="p-4">
                <button className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600">
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(booking.id)}
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

export default BookingsPage;
