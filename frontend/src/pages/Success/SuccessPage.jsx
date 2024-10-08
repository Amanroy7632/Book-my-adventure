import React from 'react';
import { useNavigate } from 'react-router-dom'; // if using react-router
import { AiOutlineCheckCircle } from 'react-icons/ai'; // react-icons for the success icon
import TicketReceiptPage from '../../component/selectbus-page/right/bus-book/bill/TicketRecipt';

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 text-white p-6">
      {/* Animated Success Icon */}
      <div className="flex flex-col items-center space-y-4">
        <AiOutlineCheckCircle className="text-6xl md:text-8xl animate-bounce text-green-400" />
        <h1 className="text-3xl md:text-5xl font-bold text-center animate-fadeIn">Booking Successful!</h1>
        <p className="text-lg md:text-xl text-center animate-fadeIn">Your bus ticket has been booked successfully.</p>
      </div>

      {/* Ticket Details Section */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg max-w-md w-full animate-slideUp">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-center">Your Ticket</h2>
        <div className="mt-4 space-y-2 text-gray-600 text-center">
          <p>Bus: XYZ Travels</p>
          <p>Departure: 10th Oct 2024, 6:00 AM</p>
          <p>Seat: A12</p>
          <p>Amount Paid: $45.00</p>
        </div>
      </div>
     {/* <TicketReceiptPage ticketData={[{}]}/> */}
      {/* Button to Go Home */}
      <button 
        className="mt-8 px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition duration-300 ease-in-out animate-fadeIn"
        onClick={() => navigate('/')}
      >
        Go to Home
      </button>
    </div>
  );
};

export default SuccessPage;
