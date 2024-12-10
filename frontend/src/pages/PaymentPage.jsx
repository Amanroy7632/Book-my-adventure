import React from "react";
import "./paymentPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../context/userContext";
import ScrollToTop from "../component/commonUi/ScrollToTop";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import { storeTickets } from "../component/selectbus-page/right/bus-book/view-seats/ViewSeat";
import { useBusContext } from "../context/busContext";
function PaymentPage() {
  const {passengerData,busDetails,routeDetails,setPassengerData}    = useBusContext();
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const payableAmnt = query.get("totalAmount");
  console.log(parseFloat(payableAmnt).toFixed(2));
  
  const { isScrollTopVisible, currentUser } = useCurrentUser();
  // console.log(currentUser);
  const navigate = useNavigate();
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
    
    passengerData.forEach((ticket, index) => {
      // Set document title and header
      doc.setFontSize(22);
      doc.setTextColor(40);
      doc.text("Ticket Receipt", 105, 20, { align: "center" });
  
      // Draw a line below the title
      doc.setLineWidth(0.5);
      doc.line(20, 25, 190, 25);
  
      // Passenger Information Section
      doc.setFontSize(12);
      doc.setTextColor(60);
      doc.text("Passenger Information", 20, 35);
      doc.setLineWidth(0.2);
      doc.line(20, 37, 190, 37);
  
      doc.text("Booking ID:", 20, 45);
      doc.text(ticket.bookingId || "N/A", 60, 45);
  
      doc.text("Name:", 20, 55);
      doc.text(ticket.passengerName || "N/A", 60, 55);
  
      doc.text("Age:", 20, 65);
      doc.text(ticket.passengerAge ? `${ticket.passengerAge}` : "N/A", 60, 65);
  
      doc.text("Gender:", 20, 75);
      doc.text(ticket.passengerGender || "N/A", 60, 75);
  
      // Journey Details Section
      doc.text("Journey Details", 20, 85);
      doc.setLineWidth(0.2);
      doc.line(20, 87, 190, 87);
  
      doc.text("From:", 20, 95);
      doc.text(ticket.departureLocation || "N/A", 60, 95);
  
      doc.text("To:", 20, 105);
      doc.text(ticket.arrivalLocation || "N/A", 60, 105);
  
      doc.text("Departure Time:", 20, 115);
      doc.text(ticket.departureTime || "N/A", 60, 115);
  
      doc.text("Arrival Time:", 20, 125);
      doc.text(ticket.arrivalTime || "N/A", 60, 125);
  
      doc.text("Seat Number:", 20, 135);
      doc.text(ticket.seatNumber || "N/A", 60, 135);
  
      doc.text("Fare:", 20, 145);
      doc.text(ticket.fare ? `$${ticket.fare.toFixed(2)}` : "N/A", 60, 145);
  
      // Bus and Operator Details Section
      doc.text("Bus and Operator Details", 20, 155);
      doc.setLineWidth(0.2);
      doc.line(20, 157, 190, 157);
  
      doc.text("Operator:", 20, 165);
      doc.text(ticket.operatorName || "N/A", 60, 165);
  
      doc.text("Bus Number:", 20, 175);
      doc.text(ticket.busNumber || "N/A", 60, 175);
  
      doc.text("Route:", 20, 185);
      doc.text(ticket.route || "N/A", 60, 185);
  
      // Footer Section
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text("Thank you for choosing SuperBus! Have a safe journey.", 105, 200, {
        align: "center",
      });
  
      // Visual enhancements: Draw containers
      doc.setDrawColor(0);
      doc.setLineWidth(0.2);
      doc.rect(15, 30, 180, 180); // Main container box
  
      // Add a new page if there are more tickets
      if (index < tickets.length - 1) {
        doc.addPage();
      }
    });
  
    // Save the PDF
    doc.save("tickets_receipt.pdf");
  };
  // const handlePrintTicket = () => {
  //   // console.log(businessData);
    
  //   if (!passengerData ) {
  //     toast.info("Please fill the passenger details");
  //     // navigate("business/business");
  //     return;
  //   }
  //   const printWindow = window.open("", "", "height=1223,width=800");
  //   console.log(printWindow);
    
  //   printWindow.document.open();
  //   printWindow.document.write(generateTicketContent());
  //   printWindow.document.close();
  //   printWindow.focus();
  //   printWindow.print();
  // };
  const handlePrintTicket = () => {
    if (!passengerData) {
      toast.info("Please fill the passenger details");
      return;
    }
  
    const printWindow = window.open("", "", "height=1223,width=800");
    if (!printWindow) {
      alert("Popup blocked. Please allow popups for this site.");
      return;
    }
  
    const ticketContent = generateTicketContent();
    if (!ticketContent) {
      console.error("No ticket content generated.");
      return;
    }
  
    printWindow.document.open();
    printWindow.document.write(ticketContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };
  console.log(routeDetails);
  
  function  generateTicketContent (){
    return `<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bus Ticket</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      /* background-color: #f4f4f4; */
    }
    .ticket {
      width: 700px;
      margin: 50px auto;
      background: white;
      border: 1px solid #ccc;
      border-radius: 10px;
      overflow: hidden;
      display: flex;
    }
    .left-section {
      width: 70%;
      padding: 20px;
      background-color: #fff;
      position: relative;
    }
    .left-section h1 {
      font-size: 24px;
      margin: 0 0 10px;
      color: #ff2d55;
    }
    .info {
      margin-bottom: 20px;
    }
    .info p {
      margin: 5px 0;
      font-size: 14px;
    }
    .highlight {
      font-weight: bold;
      font-size: 16px;
    }
    .right-section {
      width: 30%;
      background: #ff2d55;
      color: white;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .right-section h2 {
      font-size: 18px;
      margin: 0 0 20px;
      text-align: center;
    }
    .barcode {
      height: 50px;
      width: 100%;
      background: white;
      margin-top: 20px;
      text-align: center;
      padding: 10px 0;
    }
    .barcode span {
      font-size: 12px;
      color: #333;
    }
    .logo {
      width: 50px;
      height: 50px;
      background: white;
      border-radius: 50%;
      margin: 10px auto;
      text-align: center;
      line-height: 50px;
      font-weight: bold;
      color: #ff2d55;
    }
    .seat {
      text-align: center;
      font-size: 18px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  ${passengerData?.map((pdata,index)=>{
    return `<div key="${index}" class="ticket">
    <div class="left-section">
      <h1>Bus Ticket</h1>
      <div class="info">
        <p><span class="highlight">From:</span>${routeDetails?.departureLocation}</p>
        <p><span class="highlight">To:</span> ${routeDetails?.arrivalLocation}</p>
        <p><span class="highlight">Date:</span> ${new Date(routeDetails?.arrivalTime).toDateString()}</p>
        <p><span class="highlight">Time:</span> ${new Date(routeDetails?.arrivalTime).toTimeString()}</p>
        <p><span class="highlight">Class:</span> Standard</p>
        <p><span class="highlight">Seat:</span> ${pdata?.seatNo}</p>
        <p><span class="highlight">Price:</span> INR ${pdata?.price}</p>
      </div>
    </div>
    <div class="right-section">
      <h2>Boarding Pass</h2>
      <div class="logo">BUS</div>
      <p class="seat">Seat ${pdata?.seatNo}</p>
      <div class="barcode">
        <span>AA00123456 897 ${pdata?.seatNo}</span>
      </div>
    </div>
  </div>`;
  })}
  
</body>
</html>`;
  }
  const paymentHandler = async () => {
    try {
      const response = await axiosInstance.post("/payment/orders", {
        amount: parseFloat(payableAmnt).toFixed(2),
        currenct: "INR",
      });
      if (response.status === 201) {
        toast.success("Order submitted successfully");
        const options = {
          key: "rzp_test_WyxBn1k9ABsqCR", // Enter the Key ID generated from the Dashboard
          amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "Book My Adventure",
          description: "Confirm Transaction for booking tickets.",
          image:
            "https://github.com/Amanroy7632/Book-my-adventure/blob/main/frontend/public/bus.png?raw=true",
          order_id: response.data?.data?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          // callback_url: "http://localhost:5173/success",
          handler: function (response) {
            storeTickets({ ticketData: passengerData });
            handlePrintTicket();
            navigate("/success");
            // setPassengerData([])
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature);
          },
          prefill: {
            name: currentUser?.fullname,
            email: currentUser?.email,
            contact: currentUser?.phone,
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };
        const razor = new window.Razorpay(options);
        razor.open();
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    // generate order here
  };
  return (
    <section className=" max-md:flex-col max-md:mx-[1%] max-md:items-center text-[#4a4a4a] break-words font-[400] flex justify-between items-start mx-[3%] my-[5%]">
      <div className=" payment-container-left w-[55%] max-md:w-full p-2 flex flex-col ">
        <input
          type="text"
          className=" offer-code rounded-[2px] shadow-[rgba(0,0,0,0.12) 0px 3px 11px 0px] p-[20px] border outline-none"
          placeholder="ENTER OFFER CODE"
        />
        <div className="payment-right-container-inforbar mt-[20px] flex max-sm:flex-col max-sm:h-full max-sm:items-start max-sm:gap-3 justify-between items-center w-auto h-[60px] border-dashed px-[20px] bg-white ">
          <div className="banner_chip flex max-sm:gap-3 items-center">
            <img
              src="https://s3.rdbuz.com/Images/webplatform/Common/Payment/safe-payments.svg"
              alt="CC"
            />
            <div className="banner_text ml-[10px] flex flex-col font-[500] text-gray-500">
              <div>Safe and Secure</div>
              <div>Online Payments</div>
            </div>
          </div>
          <div className="banner_chip flex max-sm:gap-3 items-center">
            <img
              src="https://s3.rdbuz.com/Images/webplatform/Common/Payment/transactions.svg"
              alt="Million Transactions"
            />
            <div className="banner_text ml-[10px] flex flex-col font-[500] text-gray-500">
              <div>60+ million</div>
              <div>transactions</div>
            </div>
          </div>
          <div className="banner_chip flex max-sm:gap-3 items-center">
            <img
              src="https://s3.rdbuz.com/Images/webplatform/Common/Payment/trust.svg"
              alt="Reliable"
            />
            <div className="banner_text ml-[10px] flex flex-col font-[500] text-gray-500">
              <div>10+ years of</div>
              <div>Trust</div>
            </div>
          </div>
        </div>
        <div className="payment-left-container-instrument flex flex-col">
          {/* payment methods  */}
          <div className=" payment-stripe">
            <button>Pay with Stripe</button>
          </div>
          <div className="choose_payment_heading">
            Choose Other Payment Method
          </div>
          <div className="payment__fullContainer_leftContainer_paymentInstrument shadow-md rounded-sm">
            {/* <!-- Credit Card --> */}
            <div className="payment__fullContainer_leftContainer_eachPaymentInstruments rounded-sm bg-white p-[1.3em] flex items-center border-b-2">
              {/* <input
                className="radioButton"
                type="radio"
                name="creditCard"
                id="creditCard"
              /> */}
              <button
              type="button"
                onClick={paymentHandler}
              
                className=" bg-blue-600 text-white px-3 py-1 shadow-sm rounded text-xl"
              >
                Pay using RazorPay
              </button>
              {/* <div className="radioButtonText">Credit Card</div> */}
              {/* <div className="paymentIconList">
                <img
                  className="payment_icon_img"
                  src="https://st.redbus.in/paas/images/mobile/v2/visa.png"
                  alt=""
                />
                <img
                  className="payment_icon_img"
                  src="https://st.redbus.in/paas/images/mobile/v2/mastercard.png"
                  alt=""
                />
                <img
                  className="payment_icon_img"
                  src="https://st.redbus.in/paas/images/web/v2/maestro.png"
                  alt=""
                />
              </div> */}
            </div>
            {/* <!-- Debit Card --> */}
            <div className="payment__fullContainer_leftContainer_eachPaymentInstruments rounded-sm bg-white p-[1.3em] flex items-center border-b-2">
              <input
                className="radioButton"
                type="radio"
                name="debitCard"
                id="debitCard"
              />
              <label htmlFor="debitCard" className=" text-xl">
                Debit Card
              </label>
              <div className="paymentIconList">
                <img
                  className="payment_icon_img"
                  src="https://st.redbus.in/paas/images/mobile/v2/visa.png"
                  alt=""
                />
                <img
                  className="payment_icon_img"
                  src="https://st.redbus.in/paas/images/mobile/v2/mastercard.png"
                  alt=""
                />
                <img
                  className="payment_icon_img"
                  src="https://st.redbus.in/paas/images/web/v2/maestro.png"
                  alt=""
                />
              </div>
            </div>
            {/* <!-- Wallets --> */}
            <div className="payment__fullContainer_leftContainer_eachPaymentInstruments rounded-sm bg-white p-[1.3em] flex items-center border-b-2">
              <input
                className="radioButton"
                type="radio"
                id="wallet"
                name="wallet"
              />
              <label htmlFor="wallet" className=" text-xl">
                Wallets
              </label>

              <img
                className="payment_icon_img"
                src="https://st.redbus.in/paas/images/web/v2/amazonpay.png"
                alt=""
              />
            </div>
            {/* <!-- Net Banking --> */}
            <div className="payment__fullContainer_leftContainer_eachPaymentInstruments rounded-sm bg-white p-[1.3em] flex items-center border-b-2">
              <input
                className="radioButton"
                type="radio"
                name="netBanking"
                id="netBanking"
              />
              <label htmlFor="netBanking" className=" text-xl">
                Net Banking
              </label>

              <div className="paymentIconList flex justify-between">
                <img
                  className="payment_icon_img max-sm:ml-0"
                  src="https://st.redbus.in/paas/images/web/v2/axis.png"
                  alt=""
                />
                <img
                  className="payment_icon_img max-sm:ml-0"
                  src="https://st.redbus.in/paas/images/web/v2/sbi.png"
                  alt=""
                />
                {/* <img className="payment_icon_img" src="https://st.redbus.in/paas/images/web/v2/hdfc.png" alt="" /> */}
                {/* <img className="payment_icon_img" src="https://st.redbus.in/paas/images/web/v2/icici.png" alt="" /> */}
                <img
                  className="payment_icon_img max-sm:ml-0"
                  src="https://st.redbus.in/paas/images/web/v2/kotak.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="Upi-payment-text mt-[50px] font-semibold my-[1em]">
          UPI PAYMENT USING PHONEPAY / GPAY / AMAZONPAY ETC...
        </div>
        <div className="payment-left-container-instrument flex flex-col rounded-[2px]  shadow-md border-none">
          {/* <!-- UPI payment methods --> */}
          <div className="payment__fullContainer_leftContainer_eachPaymentInstruments items-center">
            <input
              className="radioButton"
              type="radio"
              name="qrCode"
              id="qrCode"
            />
            <label htmlFor="qrCode" className=" text-xl">
              Pay through QR Code
            </label>
            <div className="payment__fullContainer_leftContainer_eachPaymentInstruments_new">
              New
            </div>
            <div className="paymentIconList">
              <img
                className="payment_icon_img"
                src="https://st.redbus.in/paas/images/web/v2/upi/gpay.svg"
                alt=""
              />
              <img
                className="payment_icon_img"
                src="https://st.redbus.in/paas/images/web/v2/upi/phonepe.svg"
                alt=""
              />
              {/* <img className="payment_icon_img" src="https://st.redbus.in/paas/images/web/v2/upi/amazonpay.svg"alt="" /> */}
            </div>
          </div>
          {/* <!-- Pay through UPI ID --> */}
          <div className="payment__fullContainer_leftContainer_eachPaymentInstruments items-center">
            <input className="radioButton" type="radio" name="upi" id="upi" />
            <label htmlFor="upi" className=" text-xl">
              Pay through UPI ID
            </label>
            <div className="payment__fullContainer_leftContainer_eachPaymentInstruments_new">
              New
            </div>
            <div className="paymentIconList">
              <img
                className="payment_icon_img"
                src="https://st.redbus.in/paas/images/web/v2/upi/gpay.svg"
                alt=""
              />
              <img
                className="payment_icon_img"
                src="https://st.redbus.in/paas/images/web/v2/upi/phonepe.svg"
                alt=""
              />
              {/* <img className="payment_icon_img" src="https://st.redbus.in/paas/images/web/v2/upi/amazonpay.svg" alt="" /> */}
            </div>
          </div>
        </div>
        {/* <div className="payment-right-container-inforbar"></div> */}
      </div>
      <div className=" payment-container-right w-[30%] max-md:w-full  flex flex-col p-2">
        <div className="payment__fullContainer_rightContainer_trip_container">
          <div className="travel_operator_info">
            <div className="travel_title">{query.get("operatorName")} </div>
            <div className="travel_specification">Seater / A/C / Sleeper</div>
          </div>
          <div className="line"></div>
          <div className="flex justify-between">
            <div className="flex justify-between w-[200px]">
              {/* <mat-icon className="icons">date_range</mat-icon> */}
              <div className="flex flex-col">
                <div className="travel_specification">Booking Date</div>
                <div className=" flex w-[150px]">
                  {/* <div>bookingdate | date: 'yyyy-MM-dd' </div> */}
                  <div>
                    {new Date()
                      .toISOString()
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("-")}{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col mr-[10px]">
              <div>Seats Booked</div>
              <div> {query.get("seats")} </div>
            </div>
          </div>
          <div className="line"></div>
          <div className="flex justify-between">
            <div className="flex justify-between w-[150px]">
              {/* <mat-icon className="icons">location_on</mat-icon> */}
              <div className="flex flex-col">
                <div className="travel_specification">Boarding Point</div>
                <div>
                  {query.get("departureLocation")[0].toUpperCase() +
                    query.get("departureLocation").substring(1)}
                </div>
                {/* <div> bookingdate </div> */}
                <div>
                  {query
                    .get("departureTime")
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("-")}
                </div>
                <div>{query.get("departureTime").split("T")[1]}</div>
                <div>
                  {query.get("departureLocation")[0].toUpperCase() +
                    query.get("departureLocation").substring(1)}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="travel_specification">Dropping Point</div>
              <div>
                {" "}
                {query.get("arrivalLocation")[0].toUpperCase() +
                  query.get("arrivalLocation").substring(1)}{" "}
              </div>
              {/* <div> bookingdate </div> */}
              <div>
                {" "}
                {query
                  .get("arrivalTime")
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join("-")}
              </div>
              <div> {query.get("arrivalTime").split("T")[1]}</div>
              <div>
                {query.get("arrivalLocation")[0].toUpperCase() +
                  query.get("arrivalLocation").substring(1)}
              </div>
            </div>
          </div>
          <div className="passangerInfo">
            {/* <mat-icon className="icons">account_box</mat-icon> */}
            <div className="passangerName">{query.get("customerName")} </div>
          </div>
        </div>
        <div className="payment__fullContainer_rightContainer_fair_container">
          <div className="flex justify-between">
            <div className="travel_title">FARE BREAKUP</div>
            <img
              src="https://s3.rdbuz.com/Images/webplatform/Common/Payment/down.svg"
              width="14"
              height="14"
              alt=""
            />
          </div>
          <div className="flex justify-between mt-[ 10px]"></div>
          <div className="display: flex; justify-content: space-between; margin-top: 10px;">
            <div className="travel_specification font-bold">Total Payable</div>
            <div className="travel_specification font-bold">
              Rs. {query.get("totalAmount")}
            </div>
          </div>
        </div>
        <div className="flex justify-around mt-[10px] w-[95%]">
          <img
            className="payment_banner_icon_img"
            src="https://s3.rdbuz.com/Images/webplatform/Common/Payment/master-card-secure-code.png"
            alt=""
          />
          <img
            className="payment_banner_icon_img"
            src="https://s3.rdbuz.com/Images/webplatform/Common/Payment/verified-by-visa.svg"
            alt=""
          />
          <img
            className="payment_banner_icon_img"
            src="https://s3.rdbuz.com/Images/webplatform/Common/Payment/verisign-secured.png"
            alt=""
          />
        </div>
      </div>
      {isScrollTopVisible && <ScrollToTop />}
    </section>
  );
}

export default PaymentPage;
