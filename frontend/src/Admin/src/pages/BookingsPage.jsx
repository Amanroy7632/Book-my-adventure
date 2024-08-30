import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { BASE_URl } from "../constraints";
import Spinner from "../components/loader/Spinner";

function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading,setLoading] = useState(true)
  const fetchBusData = async () => {
    try {
      const response = await axios.get(`${BASE_URl}/ticket/tickets/all`);
      if (response.status === 200) {
        // console.log(response.data?.data);
        setBookings(response.data?.data)
        // setBuses(response.data?.data || []);
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error);
    }
  };
  useEffect(() => {
    fetchBusData()
  }, []);

  const handleDelete = (bookingId) => {
    // Call API to delete booking
    axios.delete(BASE_URl+`/${bookingId}`)
      .then(() => {
        // Remove deleted booking from state
        setBookings((prevBookings) => 
          prevBookings.filter((booking) => booking._id !== bookingId)
      );
      alert("Ticket deleted successfully")
      })
      .catch((error) => {
        console.error("Error deleting booking:", error);
      });
  };

  return (
    <div className=" h-[85vh] overflow-y-scroll relative">
      <h1 className="text-2xl font-bold mb-4  sticky top-[-10px] backdrop-blur-md z-10">Bookings</h1>
      <table className="w-full bg-white rounded-md shadow-md">
        <thead>
          <tr className="sticky top-[10px] backdrop-blur-md">
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
            <tr key={booking._id}>
              <td className="p-4">{booking._id?.substring(0,5)}</td>
              <td className="p-4">{booking.name}</td>
              <td className="p-4">{booking.busNumber}</td>
              <td className="p-4">{booking.seatNo}</td>
              <td className="p-4">{new Date(booking.departureTime).toLocaleDateString()}</td>
              <td className="p-4">
                <button className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600">
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(booking._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 ml-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading&& <Loader/>}
      {/* {loading && <Spinner/>} */}
    </div>
  );
}

export default BookingsPage;
