import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import DatePicker from 'react-datepicker';
import { addDays, format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

// Register necessary components for Pie Chart
ChartJS.register(ArcElement, Tooltip, Legend);

const TripPieChart = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 30));

  // Dummy data generation for illustration
  const generateData = (start, end) => {
    let tripsCount = Math.floor(Math.random() * 100) + 1;
    let noTripsCount = Math.floor(Math.random() * 50) + 1;
    return {
      labels: ['Trips', 'No Trips'],
      datasets: [
        {
          data: [tripsCount, noTripsCount],
          backgroundColor: ['#4CAF50', '#FF6384'],
          hoverBackgroundColor: ['#45a049', '#FF6384'],
        },
      ],
    };
  };

  const pieData = generateData(startDate, endDate);

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Total Number of Trips</h2>

      <div className="flex gap-4 mb-4">
        <div>
          <label className="block font-medium mb-1">From:</label>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">To:</label>
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="p-2 border rounded-md"
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default TripPieChart;
