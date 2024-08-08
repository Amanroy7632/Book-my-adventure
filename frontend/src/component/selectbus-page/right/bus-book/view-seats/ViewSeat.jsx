import React, { useState } from "react";
import {
  MdDonutLarge,
  MdAirlineSeatReclineExtra,
  MdFlightTakeoff,
  MdFlightLand,
} from "react-icons/md";
import { BiLogoWhatsapp, BiSolidEnvelope } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { HiCurrencyRupee } from "react-icons/hi";
import "./viewseats.css";
import { Button, Input } from "../../../../commonUi/index.js";
import MediumSizedForm from "../passenger-form/PassengerForm.jsx";
import { useCurrentUser } from "../../../../../context/userContext.jsx";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
function ViewSeat({ filledSeats, setFilledSeats,busDetails }) {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [boardAndDrop, setBoardAndDrop] = useState(false);
  const [visibleSeatNo, setVisibleSeatNo] = useState(null);
  const [passengerForm, setPassengerForm] = useState(false);
  const [passengerData, setPassengerData] = useState([]);
  const [submittedForm, setSubmitedForm] = useState([]);
  const {register,handleSubmit} = useForm()
  const {currentUser} =useCurrentUser()
  const handleSelectedSeats = (seatNo) => {
    // console.log(selectedSeats);
    if (filledSeats.includes(seatNo)) {
      return
    }
    if (selectedSeats.includes(seatNo)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNo));
      setFilledSeats(filledSeats.filter((seat) => seat !== seatNo));
      return;
    }
    setSelectedSeats((prev) => [...prev, seatNo]);
    // setFilledSeats((prev) => [...prev, seatNo]);
  };
  const handleVisiblitySelectedSeat = (seatNo) => {
    setVisibleSeatNo(seatNo);
  };
  const SEAT_PRICE = 105.55;
  const handleFormSubmit = (formData) => {
    setPassengerData((prevData) => [...prevData, formData]);
  };
  const handleFinalSubmit = (data) => {
    Object.keys(data).forEach((key)=>{
      
      
    })
    if (!data.email) {
      toast.error("Email is required")
      return
    }
    if (!data.phone) {
      toast.error("Phone is required")
      return
      
    }
    let newArray =[]
    passengerData.forEach(seat=>{
      newArray.push(seat.passengerSeat)
    })
    passengerData.forEach(seat => {
      setFilledSeats(prev=>[...prev,seat.passengerSeat])
    });
    setSelectedSeats([])
    console.log(data);
    // console.log(x);
    
    toast.success("Ticked Booked successfully.\nCheck your mobile phone for tickets.")
    console.log("All Passenger Data:", passengerData);
    // You can now send this data to your backend or process it as needed.
  };
  
  return (
    <>
      <div className=" mainContainer flex justify-evenly lg:flex-row max-md:flex-col items-center bg-[#eeeded] min-h-[350px]">
        <div class="mainContainer1 flex justify-between   gap-2 items-center border bg-white rounded-md drop-shadow-md">
          <div className=" relative h-40 flex justify-between items-center flex-col">
            <div
              style={{ boxShadow: "0 0 15px 1rem yellow" }}
              className=" absolute top-2 left-[-16px] p-2 shadow-md shadow-[yellow] bg-orange-300 rounded-l-full"
            ></div>
            <div
              style={{ boxShadow: "0 0 15px 1rem yellow" }}
              className=" absolute bottom-2 left-[-16px] p-2 shadow-md shadow-[yellow] bg-orange-300 rounded-l-full"
            ></div>
          </div>
          <div class="mainContainerLeft pr-3">
            <MdDonutLarge className=" text-3xl" />
          </div>
          <div class="mainContainer1Right grid grid-cols-10 border-l-2 p-2 border-black ">
            {Array.from({ length:busDetails?.totalSeat||40 }, (_, index) => index + 1).map(
              (index) => {
                return (
                  <div
                    key={index}
                    className={` relative p-3   ${
                      selectedSeats.includes(index)
                        ? "text-blue-700 cursor-pointer"
                        : filledSeats.includes(index)
                        ? "text-red-700"
                        : "text-gray-900 cursor-pointer"
                    } `}
                    onClick={() => handleSelectedSeats(index)}
                    onMouseOver={() => handleVisiblitySelectedSeat(index)}
                    onMouseLeave={() => setVisibleSeatNo(null)}
                  >
                    {" "}
                    {visibleSeatNo === index &&
                      !filledSeats.includes(index) && (
                        <span className=" text-sm absolute top-[-10px] right-[50%]">
                          {visibleSeatNo}
                        </span>
                      )}
                    <MdAirlineSeatReclineExtra className=" font-extrabold text-2xl" />
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div className="mainContainer2 select-none w-[470px] h-[400px] px-[20px] py-[10px] my-[30px] bg-[rgb(248,248,248)] font-sans">
          <div class="mainContainer21 w-full text-[#3e3e52] flex justify-between">
            <div className=" text-xl font-semibold">Boarding and Droping</div>
            <div className=" text-[#5279d0] font-bold cursor-pointer uppercase">
              Changes
            </div>
          </div>
          <div className="mainContainer22 flex justify-between mb-[20px]">
            <div className=" flex flex-row justify-between items-center">
              <div>
                <span className="text-[16px] font-bold text-[#3e3e52]">
                  <MdFlightTakeoff /> &nbsp;&nbsp;{query.get("departure")}
                </span>
                <br />
                <span className="text-[14px] text-[#7e7e8c]">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Departure Location
                </span>
              </div>
            </div>
            <div className="  text-[#4a4a4a] font-bold  flex flex-row justify-between items-center">
              8:00
            </div>
          </div>
          <div className="mainContainer23 flex justify-between mb-[20px] font-sans">
            <div>
              <div>
                <span className="text-[16px] font-bold text-[#3e3e52]">
                  <MdFlightLand />
                  &nbsp;&nbsp;{query.get("arrival")}
                </span>
                <br />
                <span className="text-[14px] text-[#7e7e8c] ">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Arrival Location
                </span>
              </div>
            </div>
            <div className="text-[#4a4a4a] font-bold  flex flex-row justify-between items-center">
              13:00
            </div>
          </div>
          <div className="mainContainer24 font-sans border-t-2 border-b-2 ">
            <div>Seat No.</div>
            <div className=" flex gap-1">{selectedSeats.join(",")}</div>
          </div>
          <div className="mainContainer25">Fare Details</div>
          <div className="mainContainer26">
            <div>
              <span className="font-size: 16px; color: #3e3e52;">Amount</span>
              <br />
              <span className=" text-[10px] font-bold text-[#838083] margin-top: 5px;">
                Taxes will be calculated during Payment
              </span>
            </div>
            <div className="  flex items-center">
              {" "}
              <HiCurrencyRupee className=" text-2xl text-blue-500" />{" "}
              <span>{selectedSeats.length * SEAT_PRICE}</span>
            </div>
          </div>
          <div className="mainContainer27 pt-5 ">
            <Button
              onClick={() => setPassengerForm(!passengerForm)}
              className=" w-full bg-orange-700 rounded-none "
            >
              PROCEED TO BOOK
            </Button>
          </div>
        </div>
      </div>
      {passengerForm && (
        <div className=" flex justify-end scroll-smooth duration-300">
        <div className="w-fit  overflow-x-auto p-4 bg-white rounded-md shadow-md">
          <div className="flex items-center space-x-4 gap-3">
            {selectedSeats.map((seat, index) => (
              <div key={seat}>
                <MediumSizedForm
                  seatNo={seat}
                  passengerNo={index + 1}
                  onSubmit={handleFormSubmit}
                  submittedForm={submittedForm}
                  setSubmittedForm={setSubmitedForm}
                  selectedSeats={selectedSeats}
                  setSelectedSeat={setSelectedSeats}
                />
              </div>
            ))}
          </div>
        </div>
        </div>
      )}
      {selectedSeats.length!==0&&submittedForm.length!==0&&<div className=" flex  items-center">
        <div className=" flex flex-col border p-10 shadow-md">
          <div className=" text-xl font-semibold flex items-center gap-4">
            {" "}
            <BiSolidEnvelope className=" text-yellow-500 text-2xl" /> Contact
            Details
          </div>
          <div className=" bg-yellow-200 w-fit px-4 py-[2px] text-sm font-semibold rounded-md">
            Your ticket will be sent to these details
          </div>
          <div className=" ">
            <form onSubmit={handleSubmit(handleFinalSubmit)} className=" flex flex-col gap-2">
              <Input
                label="Email"
                placeholder="Email"
                icon={<BiSolidEnvelope />}
                defaultValue={currentUser?.email}
                {...register("email",{
                  required:true
                })}
              />
             
              <Input label="Phone" placeholder="Phone" defaultValue={currentUser?.phone} {...register("phone",{
                required:true
              })} />
              <div className=" flex  gap-2  outline-none p-1 rounded-sm w-full">
                <input
                  type="checkbox"
                  name="business"
                  id="business"
                  {...register("business")}
                  className="rounded-sm border border-gray-400 px-2 py-1 outline-none"
                />
                <label htmlFor="business">
                  I am booking tickets for business travel.
                </label>
              </div>
              <div className=" flex gap-2  outline-none p-1 rounded-sm w-full">
                <input
                  type="checkbox"
                  name="updates"
                  id="updates"
                  {...register("updates")}
                  className="rounded-sm border border-gray-400 px-2 py-1 outline-none"
                />
                <label htmlFor="updates" className=" flex items-center gap-3">
                  <BiLogoWhatsapp className=" text-3xl" /> Send updates and
                  booking details on my Whatsapp number.
                </label>
              </div>

              <div className=" font-semibold text-sm bg-yellow-300/40 mx-6 p-3 rounded-md">
                Insure your travel by adding Rs 15 per passenger. Powered by
                𝙄�𝙄𝘾𝙄 �𝙇𝙤𝙢𝙗𝙖𝙧𝙙 𝙂𝙄𝘾 𝙇𝙩𝙙
              </div>
              <div className=" flex justify-evenly">
                <div className=" flex flex-col justify-center items-center">
                  <p>Loss of baggage</p> <p>Upto Rs. 3000 insurance cover</p>
                </div>
                <div className=" flex flex-col justify-center items-center">
                  <p>Personal Accident</p>
                  <p> Rs. 6,00,000 insurance cover</p>
                </div>
              </div>
              <div className=" flex  gap-2  outline-none p-1 rounded-sm w-full">
                <input
                  type="checkbox"
                  name="insurance"
                  id="insurance"
                  {...register("insurance")}
                  className="rounded-sm border border-gray-400 px-2 py-1 outline-none"
                />
                <label htmlFor="insurance">
                  Yes , secure my trip with insurance , I have read and
                  understood the Terms and conditions.
                </label>
              </div>
              <div className=" flex  gap-2  outline-none p-1 rounded-sm w-full">
                <input
                  type="checkbox"
                  name="covid"
                  id="covid"
                  {...register("covid")}
                  className="rounded-sm border border-gray-400 px-2 py-1 outline-none"
                />
                <label htmlFor="covid">COVID Donation</label>
              </div>
              <div>
                By clicking on proceed, I agree that I have read and understood
                the TnCs and the Privacy Policy
              </div>
              <div>
                <Button type="submit" className=" bg-red-500/80 rounded-none">
                  PROCEED TO PAY
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>}
      {
        selectedSeats.length === submittedForm.length &&
          submittedForm.length !== 0 && (
            <Button onClick={handleFinalSubmit}>PROCEED TO PAY</Button>
          )
        // <button onClick={handleFinalSubmit}>Get Data</button>
      }
    </>
  );
}

export default ViewSeat;
