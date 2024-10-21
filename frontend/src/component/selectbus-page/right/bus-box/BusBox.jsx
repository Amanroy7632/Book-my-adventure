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
import BusBottom from "../bus-book/BusBottom.jsx";
import axiosInstance from "../../../../utils/axiosInstance.js";
import Loader from "../../../loader/Loader.jsx";
import { useBusContext } from "../../../../context/busContext.jsx";
import { BASE_URL } from "../../../../constraints.js";
import axios from "axios";

const amenities = ["Charging point", "Movies", "Lights", "Bus Stopage"];
const BusBox = ({ loading, data, errorMessage }) => {
  const [popUpVisible, setPopUpVisible] = useState(null);
  const [totalSeatLeft, setTotalSeatLeft] = useState(0);

  const {
    filledSeats,
    setFilledSeats,
    setSubmitedForm,
    setSelectedSeats,
    selectedbus,
    setSelectedBus,
    setBusDetails,
    setRouteDetails,
  } = useBusContext();
  useEffect(() => {
    const debouncer = setTimeout(async () => {
      // console.log("Selected Bus: " + selectedbus);

      if (selectedbus) {
        // Reset state before fetching new data
        setFilledSeats([1, 11, 21, 31]);
        setSubmitedForm([]);
        setSelectedSeats([]);

        const selectedBusData = data?.data[selectedbus - 1];
        setRouteDetails(selectedBusData);

        try {
          // Fetch Bus Details
          const busResponse = await axios.get(
            `${BASE_URL}/bus/${selectedBusData?.busId}`
          );
          if (busResponse.status === 200) {
            console.log(busResponse.data?.data);
            setBusDetails(busResponse.data?.data);
          }

          // Fetch Booked Tickets
          const ticketsResponse = await axiosInstance.get(
            `/ticket/?route=${selectedBusData?._id}&busNumber=${selectedBusData?.busDetails?.busno}`
          );
          // console.log(ticketsResponse);

          if (ticketsResponse.status === 200) {
            // console.log(ticketsResponse.data);
            console.log(ticketsResponse.data?.data);

            const bookedSeats = ticketsResponse.data?.data?.map((ticket) =>
              parseInt(ticket.seatNo)
            );
            setFilledSeats(bookedSeats);

            // Calculate total seats left after data is updated
            const totalSeatsLeft =
              busResponse.data?.totalSeat - bookedSeats.length;
            setTotalSeatLeft(totalSeatsLeft);
          }
        } catch (error) {
          alert(
            "Something went wrong with the fetching data\n" + error.message
          );
          console.error(error);
        }
      }
    }, 800);

    return () => clearTimeout(debouncer);
  }, [
    selectedbus,
    data,
    setBusDetails,
    setFilledSeats,
    setSubmitedForm,
    setSelectedSeats,
    setRouteDetails,
  ]);

  if (loading) {
    return (
      <div className=" flex justify-center h-[30vh] items-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="bus-box w-full flex flex-col min-h-[60vh] h-auto  mt-[20px] pl-[10px] text-[#4a4a4a] text-sm font-semibold p-[10px] ">
      <div className="rounded shadow-sm overflow-x-scroll ">
        <table className="w-full  rounded">
          <thead className=" rounded">
            <tr className=" bg-[#333] text-white  text-nowrap">
              <th className=" border-l py-1">BUSES LIST</th>
              <th className=" border-l py-1">Departure</th>
              <th className=" border-l py-1">Duration</th>
              <th className=" border-l py-1">Arrivals</th>
              <th className=" border-l py-1">Rating</th>
              <th className=" border-l py-1">Fare</th>
              <th className=" border-l py-1">Seatd Available</th>
            </tr>
          </thead>
          <tbody className=" text-nowrap">
            {data?.data.length > 0 ? (
              data?.data.map((d, index) => (
                <tr
                  onClick={() => setSelectedBus(index + 1)}
                  key={d._id}
                  className={` ${
                    selectedbus === index + 1
                      ? "bg-[#ccd1d1] hover:bg-[#d3e0e0] drop-shadow-md"
                      : "hover:bg-[#f2f4f4]"
                  } rounded-sm p-1 cursor-pointer mb-[1%]  justify-around`}
                >
                  <td className=" px-2">
                    <div>{d.operatorName}</div>
                    <div>{d.busDetails?.busType}</div>
                  </td>
                  <td className=" px-2">
                    <div>{d.departureTime}</div>
                    <div>{d.departureLocation}</div>
                  </td>

                  <td className=" px-2 text-center">
                    <div>
                      {d.arrivalTime.substr(0, 2) -
                        d.departureTime.substr(0, 1)}
                      h
                    </div>
                  </td>
                  <td className=" px-2">
                    {" "}
                    <div>{d.arrivalTime}</div>
                    <div>{d.arrivalLocation}</div>
                  </td>
                  <td className=" px-2 text-center flex justify-center items-center flex-col">
                    {" "}
                    <div className=" bg-green-400 flex w-fit justify-center gap-1 items-center p-1 rounded-md">
                      <BiSolidStar className=" text-white " />
                      <div className="">
                        <span className=" text-white text-sm">4.2</span>
                      </div>
                    </div>
                    <div className=" flex gap-1 justify-center items-center">
                      <BsPeopleFill /> 23
                    </div>
                  </td>
                  <td className=" px-2 text-center">
                    <div>
                      <div>INR</div>
                      <div>{d.fare}</div>
                    </div>
                    <div>
                      
                      <div className=" flex items-center justify-center gap-1"><MdLocalOffer className=" text-red-500" /> Deal Applied</div>
                    </div>
                  </td>
                  <td className=" px-2 text-center">
                    <div>
                      {/* <div>{d.busDetails?.totalSeat - filledSeats.length}</div> */}
                      <div className="">
                        {d.busDetails?.totalSeat - d.bookedTicketsCount}
                      </div>
                      <div>Seats Available</div>
                      {/* <div>20</div>
                  <div>Window</div> */}
                      {/* <div>{filledSeats.length}</div> */}
                    </div>
                    <div>
                      {/* <div>20</div>
              <div>Window</div> */}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className=" text-xl text-orange-500 text-center p-4 ">
                <td className=" text-center col-span-6">Bus Information not found for this route ... {errorMessage}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* {data?.data.length > 0 ? (
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
              <div className="busBoxSection14 flex flex-col justify-center">
                <div>{d.arrivalTime}</div>
                <div>{d.arrivalLocation}</div>
              </div>
              <div className="busBoxSection15">
                <div className=" bg-green-400 flex justify-evenly items-center p-1 rounded-md">
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
              <div className="busBoxSection16">
                <div>
                  <div>INR</div>
                  <div>{d.fare}</div>
                </div>
                <div>
                  <MdLocalOffer className=" text-red-500" />
                  <div>Deal Applied</div>
                </div>
              </div>
              <div className="busBoxSection17">
                <div>
                 
                  <div>{d.busDetails?.totalSeat - d.bookedTicketsCount}</div>
                  <div>Seats Available</div>
                 
                </div>
                <div>
                  
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className=" text-xl text-orange-500 text-center p-4">
          Bus Information not found for this route ... {errorMessage}
        </div>
      )} */}
      <div className=" relative flex justify-between flex-wrap">
        <div className="   flex justify-between items-center gap-5 text-xl max-sm:mt-1">
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
        <div className="busBoxSection22 flex justify-between max-sm:mt-2 ">
          <div className=" gap-1 w-full">
            <MdGpsFixed className=" text-2xl" />
            <span>Live Tracking</span>
          </div>
          <div className=" gap-1 w-full">
            <MdRestore className=" text-2xl" />
            <span>Reschedulable</span>
          </div>
        </div>
      </div>
      <div className="busBoxSection3">
        {selectedbus && (
          <BusBottom
            filledSeats={filledSeats}
            setFilledSeats={setFilledSeats}
          />
        )}
      </div>
    </div>
  );
};

export default BusBox;
