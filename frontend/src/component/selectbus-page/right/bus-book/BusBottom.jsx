import React, { useState, useEffect } from "react";
import "./busbottom.css";
import ViewSeat from "./view-seats/ViewSeat.jsx";
import ReviewPage from "./view-seats/Review/ReviewPage.jsx";
import { useBusContext } from "../../../../context/busContext.jsx";
import {
  MdWifi,
  MdMovie,
  MdBattery90,
  MdHotel,
  MdCheckCircleOutline,
} from "react-icons/md";
import { BiWater } from "react-icons/bi";
import MapComponent from "../../../map/MapComponent.jsx";
const displayText = [
  "Live Location",
  "Amenities",
  "Boarding and Dropping Points",
  "Reviews",
  "Booking Policies",
  "VIEW SEATS",
];

const BusBottom = ({ filledSeats, setFilledSeats }) => {
  const [displayIndex, setDisplayIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const { busDetails } = useBusContext();
 
  
  const displayClickHandler = (index) => {
    setDisplayIndex(index);
    console.log(`Visibility index: ${index}`);
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (displayIndex !== null) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [displayIndex]);

  return (
    <div className={` overflow-hidden `}>
      {/* <div className="flex lg:justify-between md:justify-normal  md:gap-3 max-sm:grid max-sm:grid-cols-2 items-center max-md:ml-0 max-md:w-full max-sm:gap-3">
        {!displayIndex && displayIndex !== 0 && <span></span>}
        {displayIndex !== null && (
          <h2 className="text-xl">{displayText[displayIndex]}</h2>
        )}
        <div className="mainBar items-center gap-2 flex ">
          {["Amenities", "Boarding and Dropping Points", "Reviews", "Booking Policies", "VIEW SEATS"].map(
            (text, index) => (
              <React.Fragment key={index}>
                <div
                  className=""
                  onClick={() => displayClickHandler(index)}
                >
                  {text}
                </div>
                {index < 4 && <div className="max-sm:hidden">|</div>}
              </React.Fragment>
            )
          )}
        </div>
      </div> */}
      <div className="flex flex-wrap items-center justify-between max-sm:justify-center gap-3 max-md:w-full">
       
        <div className="mainBar flex w-full flex-wrap items-center justify-center lg:justify-end gap-2">
          {displayText.map((text, index) => (
            <React.Fragment key={index}>
              <div
                className="cursor-pointer p-1 max-sm:text-center"
                onClick={() => displayClickHandler(index)}
              >
                {text}
              </div>
              {index < 5 && <div className=" max-sm:block">|</div>}
            </React.Fragment>
          ))}
        </div>
        {displayIndex !== null && (
          <h2 className="text-2xl w-full  max-sm:mb-2">
            {displayText[displayIndex]}
          </h2>
        )}
      </div>
      <div className={`displayArea ${
          isVisible && displayIndex === 0 ? "displayArea-active" : ""
        }`}>
       <MapComponent/>
      </div>
      {/* Amenities Section */}
      <div
        className={`displayArea ${
          isVisible && displayIndex === 1 ? "displayArea-active" : ""
        }`}
      >
        <div>
          {busDetails ? (
            busDetails.amenity?.map((item) => (
              <div
                className="flex items-center gap-4 p-2 pl-0 text-lg"
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
                <MdCheckCircleOutline className="text-green-600 text-2xl" />
              </div>
            ))
          ) : (
            <div>Amenity data not found ...</div>
          )}
        </div>
      </div>

      {/* Boarding and Dropping Points Section */}
      <div
        className={`displayArea ${
          isVisible && displayIndex === 2 ? "displayArea-active" : ""
        }`}
      >
        Boarding points section
        {/* <MapComponent/> */}
        {/* Content goes here */}
      </div>

      {/* Reviews Section */}
      <div
        className={`displayArea ${
          isVisible && displayIndex === 3 ? "displayArea-active" : ""
        }`}
      >
        <ReviewPage busDetails={busDetails} />
      </div>

      {/* Booking Policies Section */}
      <div
        className={`displayArea ${
          isVisible && displayIndex === 4 ? "displayArea-active" : ""
        }`}
      >
        <div className="mx-auto p-8 pl-2 pt-2 select-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Booking Terms</h2>
            <p>
              All bookings made through our platform are subject to availability
              and confirmation by the bus operator. Please ensure that all
              personal and travel details are entered correctly at the time of
              booking.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Cancellation Policy</h2>
            <p>
              Cancellations are allowed up to 24 hours before the scheduled
              departure time. A cancellation fee of 10% of the ticket price will
              be charged for all cancellations. No cancellations are allowed
              within 24 hours of departure.
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
            <h2 className="text-2xl font-semibold mb-4">Rescheduling Policy</h2>
            <p>
              Tickets can be rescheduled up to 48 hours before the scheduled
              departure time. A rescheduling fee may apply. Please contact our
              customer service for more details.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">No-Show Policy</h2>
            <p>
              If you do not board the bus at the scheduled departure time, your
              ticket will be considered a no-show, and no refund or rescheduling
              will be allowed.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions or concerns regarding your booking,
              please contact our customer service team at{" "}
              <span className="text-blue-500">
                bookmyadventure049@gmail.com
              </span>{" "}
              or call us at 123-456-7890.
            </p>
          </section>
        </div>
      </div>

      {/* View Seats Section */}
      <div
        className={`displayArea ${
          isVisible && displayIndex === 5 ? "displayArea-active" : ""
        }`}
      >
        <ViewSeat
          filledSeats={filledSeats}
          setFilledSeats={setFilledSeats}
          busDetails={busDetails}
        />
      </div>
    </div>
  );
};

export default BusBottom;
