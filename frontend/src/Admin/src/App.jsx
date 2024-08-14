import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import BusesPage from "./pages/BusesPage";
import TripsPage from "./pages/TripsPage";
import BookingsPage from "./pages/BookingsPage";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import AddTripPage from "./pages/AddTripPage";

function App() {
  return (
    <Router>
      <div className="flex max-sm:flex-col overflow-hidden">
        <Sidebar  className=" max-sm:h-[13vh] w-full "/>
        <div className="flex-1">
          <Navbar />
          <div className="p-4">
            <Routes>
              <Route path="/" element={< DashboardPage/>} />
              <Route path="/buses" element={<BusesPage />} />
              <Route path="/trips" element={<TripsPage />} />
              <Route path="/bookings" element={<BookingsPage />} />
              <Route path="/add-trips" element={<AddTripPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
