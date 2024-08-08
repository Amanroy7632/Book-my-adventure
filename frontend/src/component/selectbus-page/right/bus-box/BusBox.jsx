import React, { useEffect, useState } from "react";
import { BiSolidStar } from "react-icons/bi";
import {
  MdLocalOffer,
  MdRestore,
  MdDirectionsBus,
  MdWbIncandescent,
  MdMovie,
  MdGpsFixed,
} from "react-icons/md";
import { BsPower, BsPeopleFill } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa";
import "./busbox.css";
import BusBottom from "../bus-book/BusBottom";
import useFetch from "../../../../hooks";
import Loader from "../../../loader/Loader";
const amenities = ["Charging point", "Movies", "Lights", "Bus Stopage"];
const BusBox = ({ loading, data, errorMessage }) => {
  const [popUpVisible, setPopUpVisible] = useState(null);
  const [filledSeats, setFilledSeats] = useState([31, 12, 3, 4]);
  const [selectedbus, setSelectedBus] = useState(null);
  const [busDetails, setBusDetails] = useState({});
  useEffect(() => {
    console.log("Selected Bus: " + selectedbus);
    const fetchBusDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/bus/${
            data?.data[selectedbus - 1]?.busId
          }`,
          {
            method: "GET",
            "Content-Type": "application/json",
          }
        );
        const result = await response.json();
        console.log(result?.data);
        
        setBusDetails(result?.data)
      } catch (error) {
        console.error(error)
      }
    };
    if (selectedbus) {
      fetchBusDetails()
    }
  }, [selectedbus]);
  if (loading) {
    return (
      <div className=" flex justify-center h-[30vh] items-center">
        <Loader />
      </div>
    );
  }
  return (
    <div class="bus-box w-full min-h-[180px] h-auto border border-[#ddd] mt-[20px] pl-[10px] text-[#4a4a4a] text-sm font-semibold p-[10px] ">
      {data?.data.length > 0 ? (
        data?.data.map((d, index) => {
          return (
            <div
              onClick={() => setSelectedBus(index + 1)}
              key={d._id}
              className={`busBoxSection1 ${
                selectedbus === index + 1
                  ? "bg-[#ccd1d1] hover:bg-[#b3c5c5] drop-shadow-md"
                  : "hover:bg-[#f2f4f4]"
              } rounded-sm p-1 cursor-pointer h-[40%] mb-[1%] flex justify-around`}
            >
              <div className="busBoxSection11 w-[25%]">
                <div>{d.operatorName}</div>
                <div>{d.busDetails?.busType}</div>
              </div>
              <div className="busBoxSection12 w-[10%]">
                <div>{d.departureTime}</div>
                <div>{d.departureLocation}</div>
              </div>
              <div className="busBoxSection13">
                <div>
                  {d.arrivalTime.substr(0, 2) - d.departureTime.substr(0, 1)}h
                </div>
              </div>
              <div class="busBoxSection14 flex flex-col justify-center">
                <div>{d.arrivalTime}</div>
                <div>{d.arrivalLocation}</div>
              </div>
              <div class="busBoxSection15">
                <div className=" bg-green-400 flex justify-evenly items-center p-1 rounded-md">
                  {/* <i class="material-icons">star</i> */}
                  <BiSolidStar className=" text-white " />
                  <div className="">
                    <span className=" text-white text-sm">4.2</span>
                  </div>
                </div>
                <div>
                  <BsPeopleFill />
                  <div>23</div>
                </div>
              </div>
              <div class="busBoxSection16">
                <div>
                  <div>INR</div>
                  <div>{d.fare}</div>
                </div>
                <div>
                  <MdLocalOffer className=" text-red-500" />
                  <div>Deal Applied</div>
                </div>
              </div>
              <div class="busBoxSection17">
                <div>
                  <div>{d.busDetails?.totalSeat - filledSeats.length}</div>
                  <div>Seats Available</div>
                  <div>20</div>
                  <div>Window</div>
                </div>
                <div>
                  {/* <div>20</div>
              <div>Window</div> */}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className=" text-xl text-orange-500 text-center p-4">
          Bus Information not found for this route ... {errorMessage}
        </div>
      )}
      <div class="busBoxSection2 relative">
        <div class="  busBoxSection21 flex justify-between items-center gap-5 text-xl">
          {amenities.map((item, index) => (
            <div key={index}>
              {popUpVisible === index && (
                <div
                  className={` animate-bounce flex flex-col justify-center items-center   font-thin text-sm absolute -top-8  rounded-xl
             `}
                  style={
                    index === 0
                      ? { left: "-42px" }
                      : index === 1
                      ? { left: "29px" }
                      : index === 2
                      ? { left: "78px" }
                      : { left: "104px" }
                  }
                >
                  <p className="p-1 rounded-md text-blue-500 backdrop-blur-md border">
                    {item}
                  </p>

                  <FaAngleDown className=" text-2xl text-gray-400" />
                </div>
              )}
              <span
                key={item}
                onMouseOver={() => setPopUpVisible(index)}
                onMouseLeave={() => setPopUpVisible(null)}
                className=" cursor-pointer"
              >
                {item.includes("Charging point") ? (
                  <BsPower className=" hover:text-orange-500" />
                ) : item.includes("Movies") ? (
                  <MdMovie className=" hover:text-green-500" />
                ) : item.includes("Lights") ? (
                  <MdWbIncandescent className=" hover:text-yellow-500" />
                ) : (
                  <MdDirectionsBus className=" hover:text-red-500" />
                )}
              </span>
            </div>
          ))}
        </div>
        <div class="busBoxSection22">
          <div className=" gap-1">
            <MdGpsFixed className=" text-2xl" />
            <span>Live Tracking</span>
          </div>
          <div className=" gap-1">
            <MdRestore className=" text-2xl" />
            <span>Reschedulable</span>
          </div>
        </div>
      </div>
      <div class="busBoxSection3">
        <BusBottom filledSeats={filledSeats} setFilledSeats={setFilledSeats} busDetails={busDetails} />
        {/* <app-bottom-tab [busid]='busid' [filledseats]="filledseats" [seatprice]="seatprice"
        [routedetails]="routedetails" [busarrivaltime]="busarrivaltime" [busdeparturetime]="busdeparturetime"
            [operatorname]="operatorname"></app-bottom-tab> */}
      </div>
    </div>
  );
};

export default BusBox;
