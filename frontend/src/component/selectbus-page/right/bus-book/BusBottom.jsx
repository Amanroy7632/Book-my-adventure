import React, { useEffect, useState } from "react";
import "./busbottom.css";
import ViewSeat from "./view-seats/ViewSeat";
const displayText = [
  "Amenities",
  "Boarding and Droping Points",
  "Reviews",
  "Booking Policies",
  "VIEW SEAATS",
];
import {
  MdWifi,
  MdMovie,
  MdBattery90,
  MdHotel,
  MdArrowCircleLeft,
  MdCheckCircleOutline,
} from "react-icons/md";
import { BiWater } from "react-icons/bi";
import ReviewPage from "./view-seats/Review/ReviewPage";
import { useBusContext } from "../../../../context/busContext";
const BusBottom = ({ filledSeats, setFilledSeats }) => {
  const [isVisibleDisplayArea, setIsVisibleDisplayArea] = useState(false);
  const [displayIndex, setdisplayIndex] = useState(null);
  const {busDetails} =useBusContext()
  const displayClickHandler = (index) => {
    setIsVisibleDisplayArea(true);
    setdisplayIndex(index);
  };

  return (
    <div>
      <div className="mainBar">
        <div onClick={() => displayClickHandler(0)}>Amenities</div>
        <div>|</div>
        <div onClick={() => displayClickHandler(1)}>
          Boarding and Droping Points
        </div>
        <div>|</div>
        <div onClick={() => displayClickHandler(2)}>Reviews</div>
        <div>|</div>
        <div onClick={() => displayClickHandler(3)}>Booking Policies</div>
        <div>|</div>
        <div onClick={() => displayClickHandler(4)}>VIEW SEATS</div>
      </div>
      {isVisibleDisplayArea && displayIndex === 0 && (
        <div className="displayArea">
          <h1 className=" text-xl">Amenities</h1>
          <div className="">
            {busDetails ? (
              busDetails.amenity?.map((item) => (
                <div
                  className=" flex items-center gap-4 p-2 pl-0 text-lg"
                  key={item}
                >
                  {item.includes("wifi") ? (
                    <MdWifi />
                  ) : item.includes("WaterBottle") ? (
                    <BiWater />
                  ) : item.toLocaleLowerCase().includes("charging") ? (
                    <MdBattery90 />
                  ) : item.toLocaleLowerCase().includes("movie") ? (
                    <MdMovie />
                  ) : (
                    <MdHotel />
                  )}{" "}
                  {item}
                  {
                    <MdCheckCircleOutline className=" text-green-600 text-2xl" />
                  }
                </div>
              ))
            ) : (
              <div>Amenity data not found ...</div>
            )}
          </div>
        </div>
      )}
      {isVisibleDisplayArea && displayIndex === 1 && (
        <div className="displayArea">
          {" "}
          <h1 className=" text-xl">Boarding and Droping Points</h1>
        </div>
      )}
      {isVisibleDisplayArea && displayIndex === 2 && (
        <div className="displayArea">
          <h1 className=" text-xl">Reviews</h1>
          <ReviewPage busDetails={busDetails}/>
        </div>
      )}
      {isVisibleDisplayArea && displayIndex === 3 && (
        <div className="displayArea">
          {/* <h1 className=" text-xl">Booking Policies</h1> */}
          <div className=" mx-auto p-8 pl-2 pt-2 select-none">
            <h1 className="text-3xl font-bold mb-6">
              Ticket Booking Policy
            </h1>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Booking Terms</h2>
              <p>
                All bookings made through our platform are subject to
                availability and confirmation by the bus operator. Please ensure
                that all personal and travel details are entered correctly at
                the time of booking.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Cancellation Policy
              </h2>
              <p>
                Cancellations are allowed up to 24 hours before the scheduled
                departure time. A cancellation fee of 10% of the ticket price
                will be charged for all cancellations. No cancellations are
                allowed within 24 hours of departure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Refund Policy</h2>
              <p>
                Refunds will be processed within 7-10 business days after
                cancellation. The refund amount will be credited to the original
                payment method used during booking, minus any applicable
                cancellation fees.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Rescheduling Policy
              </h2>
              <p>
                Tickets can be rescheduled up to 48 hours before the scheduled
                departure time. A rescheduling fee may apply. Please contact our
                customer service for more details.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">No-Show Policy</h2>
              <p>
                If you do not board the bus at the scheduled departure time,
                your ticket will be considered a no-show, and no refund or
                rescheduling will be allowed.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p>
                If you have any questions or concerns regarding your booking,
                please contact our customer service team at <span className=" text-blue-500">bookmyadventure049@gmail.com</span>
                &nbsp; or call us at 123-456-7890.
              </p>
            </section>
          </div>
        </div>
      )}
      {isVisibleDisplayArea && displayIndex === 4 && (
        <div className="displayArea">
          <h1 className=" text-xl">VIEW SEATS</h1>
          <ViewSeat
            filledSeats={filledSeats}
            setFilledSeats={setFilledSeats}
            busDetails={busDetails}
            />
        </div>
      )}
    </div>
  );
};

export default BusBottom;
