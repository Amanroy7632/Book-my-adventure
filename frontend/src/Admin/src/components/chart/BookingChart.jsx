import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { addDays, format, isWithinInterval } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdDateRange } from "react-icons/md";
import { BASE_URl } from "../../constraints";
import axios from "axios";

// Register the necessary Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const BookingChart = ({ title,url }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 15));
  const [bookings, setBookings] = useState([]);

  // Fetch booking data from the API
  const fetchBookingData = async () => {
    try {
      const response = await axios.get(`${BASE_URl}${url}`);
      if (response.status === 200) {
        const bookedData = response.data?.data?.map((data) => ({
          date: new Date(data.createdAt||data.departureTime),
        }));
        // console.log(response.data?.data);
        
        setBookings(bookedData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Filter and process bookings data within the selected date range
  const filterBookingsByDateRange = (bookings, start, end) => {
    const filteredBookings = bookings.filter((booking) =>
      isWithinInterval(booking.date, { start, end })
    );

    const dateCounts = {};
    filteredBookings.forEach((booking) => {
      const formattedDate = format(booking.date, "dd/MM/yyyy");
      dateCounts[formattedDate] = (dateCounts[formattedDate] || 0) + 1;
    });

    return dateCounts;
  };

  useEffect(() => {
    fetchBookingData();
    // console.log(bookings);
    
  }, []);

  const bookingData = filterBookingsByDateRange(bookings, startDate, endDate);

  const data = {
    labels: Object.keys(bookingData).sort(),
    datasets: [
      {
        label: title.split(" ")[0],
        data: Object.values(bookingData),
        fill: true,
        backgroundColor: title?.includes("rips")? "rgba(75,192,192,0.2)":"rgba(255,102,12,0.2)",
        borderColor: title?.includes("rips")?"rgba(175,172,255,1)":"rgba(75,192,192,1)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="rounded-md shadow-md w-full">
      <div className="p-4 flex justify-between border-b-2 items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex items-center">
          <div className="w-fit">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="p-2 pr-0 outline-none w-[100px] border border-r-0 rounded-r-none rounded-md"
            />
          </div>
          <div className="w-[9px] h-[2px] bg-black mr-1"></div>
          <div className="w-fit">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="p-2 pl-0 outline-none w-[100px] border border-l-0 rounded-l-none rounded-md"
            />
          </div>
          <MdDateRange className="text-[#FF4F99] ml-2" size={28} />
        </div>
      </div>
      <Line data={data} className="p-4 mt-2 min-h-[50vh]" />
    </div>
  );
};

export default BookingChart;
