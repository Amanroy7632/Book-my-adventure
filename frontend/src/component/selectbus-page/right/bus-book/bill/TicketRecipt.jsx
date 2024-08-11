import React from "react";
import jsPDF from "jspdf";

const TicketReceiptPage = ({ ticketData }) => {
  const tickets = [
    {
      bookingId: "123456",
      passengerName: "John Doe",
      departureLocation: "New York",
      arrivalLocation: "Los Angeles",
      departureTime: "2024-08-10 10:00 AM",
      arrivalTime: "2024-08-10 04:00 PM",
      seatNumber: "B12",
      fare: "$120.00",
      operatorName: "SuperBus",
      busNumber: "NYC-LA-2024",
    },
    {
      bookingId: "789012",
      passengerName: "Jane Smith",
      departureLocation: "San Francisco",
      arrivalLocation: "Las Vegas",
      departureTime: "2024-08-11 09:00 AM",
      arrivalTime: "2024-08-11 01:00 PM",
      seatNumber: "A4",
      fare: "$90.00",
      operatorName: "ExpressLine",
      busNumber: "SF-LV-2024",
    },
    {
      bookingId: "789012",
      passengerName: "Jane Smith",
      departureLocation: "San Francisco",
      arrivalLocation: "Las Vegas",
      departureTime: "2024-08-11 09:00 AM",
      arrivalTime: "2024-08-11 01:00 PM",
      seatNumber: "A4",
      fare: "$90.00",
      operatorName: "ExpressLine",
      busNumber: "SF-LV-2024",
    },
    {
      bookingId: "789012",
      passengerName: "Jane Smith",
      departureLocation: "San Francisco",
      arrivalLocation: "Las Vegas",
      departureTime: "2024-08-11 09:00 AM",
      arrivalTime: "2024-08-11 01:00 PM",
      seatNumber: "A4",
      fare: "$90.00",
      operatorName: "ExpressLine",
      busNumber: "SF-LV-2024",
    },
    {
      bookingId: "789012",
      passengerName: "Jane Smith",
      departureLocation: "San Francisco",
      arrivalLocation: "Las Vegas",
      departureTime: "2024-08-11 09:00 AM",
      arrivalTime: "2024-08-11 01:00 PM",
      seatNumber: "A4",
      fare: "$90.00",
      operatorName: "ExpressLine",
      busNumber: "SF-LV-2024",
    },
    {
      bookingId: "789012",
      passengerName: "Jane Smith",
      departureLocation: "San Francisco",
      arrivalLocation: "Las Vegas",
      departureTime: "2024-08-11 09:00 AM",
      arrivalTime: "2024-08-11 01:00 PM",
      seatNumber: "A4",
      fare: "$90.00",
      operatorName: "ExpressLine",
      busNumber: "SF-LV-2024",
    },
    // Add more ticket objects as needed
  ];

  const downloadPDF = () => {
    const doc = new jsPDF();

    ticketData.forEach((ticket, index) => {
      // Set document title
      doc.setFontSize(22);
      doc.setTextColor(40);
      doc.text("Ticket Receipt", 105, 20, { align: "center" });

      // Draw a line below the title
      doc.setLineWidth(0.5);
      doc.line(20, 25, 190, 25);

      // Ticket Details Section
      doc.setFontSize(12);
      doc.setTextColor(60);

      // Booking ID and Passenger Info
      doc.text("Booking ID:", 20, 40);
      doc.text(ticket.bookingId, 60, 40);

      doc.text("Passenger Name:", 20, 50);
      doc.text(ticket.name, 60, 50);
      doc.text("Passenger Age:", 20, 50);
      doc.text(ticket.age, 60, 50);
      doc.text("Passenger Gender:", 20, 50);
      doc.text(ticket.gender, 60, 50);

      // Departure and Arrival Info
      doc.text("From:", 20, 60);
      doc.text(ticket.departureLocation, 60, 60);

      doc.text("To:", 20, 70);
      doc.text(ticket.arrivalLocation, 60, 70);

      // Departure and Arrival Times
      doc.text("Departure Time:", 20, 80);
      doc.text(ticket.departureTime, 60, 80);

      doc.text("Arrival Time:", 20, 90);
      doc.text(ticket.arrivalTime, 60, 90);

      // Seat and Fare Info
      doc.text("Seat Number:", 20, 100);
      doc.text(ticket.seatNo, 60, 100);

      doc.text("Fare:", 20, 110);
      doc.text(ticket.price, 60, 110);

      // Operator and Bus Info
      doc.text("Operator:", 20, 120);
      doc.text(ticket.operatorName, 60, 120);

      doc.text("Bus Number:", 20, 130);
      doc.text(ticket.busNumber, 60, 130);

      // Draw boxes around sections
      doc.setDrawColor(0);
      doc.setLineWidth(0.2);
      doc.rect(15, 30, 180, 110); // Main container box
      doc.line(15, 65, 195, 65); // Line separating Passenger and Journey Info

      // Footer or additional information
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text("Thank you for choosing SuperBus!", 105, 150, {
        align: "center",
      });

      // If it's not the last ticket, add a new page
      if (index < tickets.length - 1) {
        doc.addPage();
      }
    });

    // Save the PDF
    doc.save("tickets_receipt.pdf");
  };

  return (
    
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center p-4">
      <h2 className="text-xl font-bold mb-6">Ticket Receipt</h2>
      <div className="overflow-x-auto w-full">
        <div className="flex gap-4">
          {ticketData.map((ticket, index) => (
            <div key={index} className="bg-white w-96 min-w-[24rem] rounded-lg shadow-lg p-6 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Booking ID:</span>
                <span>{ticket.bookingId}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Passenger Name:</span>
                <span>{ticket.name}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Passenger Age:</span>
                <span>{ticket.age}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Passenger Gender:</span>
                <span>{ticket.gender}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">From:</span>
                <span>{ticket.departureLocation}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">To:</span>
                <span>{ticket.arrivalLocation}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Departure Time:</span>
                <span>{ticket.departureTime}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Arrival Time:</span>
                <span>{ticket.arrivalTime}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Seat Number:</span>
                <span>{ticket.seatNo}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Fare:</span>
                <span>{ticket.price}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Operator:</span>
                <span>{ticket.operatorName}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Bus Number:</span>
                <span>{ticket.busNumber}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={downloadPDF}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default TicketReceiptPage;
