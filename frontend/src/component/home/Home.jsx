import React, { useEffect, useRef, useState } from "react";
import OfferCard from "../offerCard/OfferCard";
import { images } from "../../assets/index.js";
import { useParams } from "react-router-dom";
import { FaBus, FaWalking, FaCalendarDay, FaExchangeAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Example from "./Example.jsx";
import CityModel from "./model/CityModel.jsx";
const offerCardDetails = [
  {
    id: 1,
    imgSrc: images.offer1,
    offer: "Save up to Rs 250 on bus tickets",
    validity: "Valid till 30 Nov",
    coupanCode: "FIRST",
    vehicle: "BUS",
    className: "bg-gradient-to-r from-blue-800 to-blue-500",
  },
  {
    id: 2,
    imgSrc: images.offer2,
    offer: "Save up to Rs 300 on AP, TS routes",
    validity: "Valid till 30 Nov",
    coupanCode: "SUPERHIT",
    vehicle: "BUS",
    className: "bg-gradient-to-r from-red-800 to-red-500",
  },
  {
    id: 3,
    imgSrc: images.offer3,
    offer: "Save up to Rs 300 on RJ,MH, Goa, MP,",
    validity: "Valid till 30 Nov",
    coupanCode: "FIRST",
    vehicle: "BUS",
    className: "bg-gradient-to-r from-green-800 to-green-500",
  },
  {
    id: 4,
    imgSrc: images.offer4,
    offer: "Save up to Rs 200 in Kerala routes.",
    validity: "Valid till 30 Nov",
    coupanCode: "FIRST",
    vehicle: "BUS",
    className: "bg-gradient-to-r from-sky-800 to-sky-500",
  },
];
const frequentlyAskedQuestions = [
  {
    id: 1,
    question: "Can I track the location of my booked bus online?",
    answer: `Yes, you can track your <strong>bus online</strong> by using our bus tracking app feature called
                      <a class="text-blue-500">Track My Bus</a>. This feature allows passengers and their families to
                      track the live bus tracking location. You may follow your bus on a map and use the information
                      to plan your trip to the boarding point and to get off at the correct stop. Family and friends
                      may also check the bus position to plan pick-ups and ensure your safety.`,
  },
  {
    id: 2,
    question: "Why book bus tickets online on tedbus?",
    answer: `Yes, you can track your <strong>bus online</strong> by using our bus tracking app feature called
                      <a class="text-blue-500">Track My Bus</a>. This feature allows passengers and their families to
                      track the live bus tracking location. You may follow your bus on a map and use the information
                      to plan your trip to the boarding point and to get off at the correct stop. Family and friends
                      may also check the bus position to plan pick-ups and ensure your safety.`,
  },
  {
    id: 3,
    question:
      "Do I need to create an account on the tedbus site to book my bus ticket?",
    answer: `Yes, you can track your <strong>bus online</strong> by using our bus tracking app feature called
                      <a class="text-blue-500">Track My Bus</a>. This feature allows passengers and their families to
                      track the live bus tracking location. You may follow your bus on a map and use the information
                      to plan your trip to the boarding point and to get off at the correct stop. Family and friends
                      may also check the bus position to plan pick-ups and ensure your safety.`,
  },
  {
    id: 4,
    question: "Does bus booking online cost me more?",
    answer: `Yes, you can track your <strong>bus online</strong> by using our bus tracking app feature called
                      <a class="text-blue-500">Track My Bus</a>. This feature allows passengers and their families to
                      track the live bus tracking location. You may follow your bus on a map and use the information
                      to plan your trip to the boarding point and to get off at the correct stop. Family and friends
                      may also check the bus position to plan pick-ups and ensure your safety.`,
  },
  {
    id: 5,
    question: "How can I get the discounts on the bus booking?",
    answer: `Yes, you can track your <strong>bus online</strong> by using our bus tracking app feature called
                      <a class="text-blue-500">Track My Bus</a>. This feature allows passengers and their families to
                      track the live bus tracking location. You may follow your bus on a map and use the information
                      to plan your trip to the boarding point and to get off at the correct stop. Family and friends
                      may also check the bus position to plan pick-ups and ensure your safety.`,
  },
  {
    id: 6,
    question: "Can I book a Government bus ticket on tedbus?",
    answer: `Yes, you can track your <strong>bus online</strong> by using our bus tracking app feature called
                      <a class="text-blue-500">Track My Bus</a>. This feature allows passengers and their families to
                      track the live bus tracking location. You may follow your bus on a map and use the information
                      to plan your trip to the boarding point and to get off at the correct stop. Family and friends
                      may also check the bus position to plan pick-ups and ensure your safety.`,
  },
];
const from = ["Delhi", "Mumbai", "Banglore", "Kolkata", "Patna", "Chennai"];
const to = [...from];
const Home = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  // const [modelType,setmodelType] = useState<"from"|"to"|"">("")
  const [modelType, setModelType] = useState("from");
  const modalRef = useRef(null)
  const fromModalRef = useRef(null);
  const toModalRef = useRef(null);
  const [openLocationModel, setOpenLocationModel] = useState(false);
  const handleFromLocation = (city) => {
    setOpenLocationModel(false)
    setFromLocation(city)
    fromModalRef.current=null
  };
  const handleToLocation = (city) => {
    setOpenLocationModel(false)
    setToLocation(city)
    // modalRef.current=null
    toModalRef.current=null
  };
  const handleClickOutside = (event) => {
    if ((fromModalRef.current && !fromModalRef.current.contains(event.target))||(toModalRef.current && !toModalRef.current.contains(event.target))) {
      setOpenLocationModel(false)
      setModelType("")
      fromModalRef.current=null
      toModalRef.current=null
      // console.log("Hello Aman");
    }
  };
  function exchangeLocation(){
    console.log('Working exchange location');
    console.log(`Locatiom Model :${openLocationModel}`);
    setOpenLocationModel(false)
    setFromLocation(toLocation)
    setToLocation(fromLocation)
  }
  function handleSearchRequest(){
    if (!fromLocation|| !toLocation) {
      alert("Please select from location and to location")
      return 
    }
    if (fromLocation===toLocation) {
      alert("Please select a different location")
      return
    }
    if (!from.includes(fromLocation)|| !to.includes(toLocation)) {
      alert("Please select a given location")
      return
    }
    console.log(`From : ${fromLocation} To : ${toLocation} Date : ${startDate}`)
    setFromLocation("")
    setToLocation("")
    setStartDate("")
    
  }
  useEffect(()=>{
      if (openLocationModel) {
        window.addEventListener('click', handleClickOutside);
      }else{
        window.removeEventListener('click', handleClickOutside);
      }
      return () => {
        // Cleanup event listener on component unmount
        window.removeEventListener('click', handleClickOutside);
      };
  },[openLocationModel])
  // const params = useParams()
  return (
    <>

      <section className="h-[32rem] bg-main-color bg-[url('assets/hero-img.png')] bg-center  bg-no-repeat bg-cover flex justify-center">
        <div className="flex flex-col items-center w-full max-w-[1400px]">
          <h1 className="text-2xl mx-4 md:text-[2rem] text-white font-bold mt-16 mb-4 text-center">
            India's No. 1 Online Bus Ticket Booking Site
          </h1>
          <div className=" font-sans select-none font-[600] w-[90%] sm:w-[80%] lg:h-24 mt-4 bg-white cursor-pointer relative bottom-7 sm:bottom-0 flex flex-col lg:flex-row rounded-3xl overflow-x-clip ">
            <div className="h-full flex flex-col sm:flex-row items-center justify-center lg:w-1/2">
              <div className="h-full border-b sm:border-r border-gray-300 w-full md:w-[50%] sm:w-auto">
                <div className=" relative px-7 py-8 flex items-center h-full gap-3 overflow-visible" ref={fromModalRef}>
                  <FaBus className=" text-2xl text-gray-400" />
                  <input
                    className="outline-none w-full"
                    type="text"
                    name=""
                    id=""
                    value={fromLocation}
                    placeholder="From"
                    onClick={() => {setOpenLocationModel(!openLocationModel); setModelType("from")}}
                    onChange={(e) => setFromLocation(e.target.value)}
                  />
                  {openLocationModel && modelType==="from" &&(
                    <CityModel location={fromLocation} cityInfo={from} handleLocation={handleFromLocation} />
                  )}
                </div>
              </div>
              <div onClick={exchangeLocation} className="w-10 h-10 bg-white rounded-full  grid place-content-center absolute border border-gray-300">
                <FaExchangeAlt className=" text-2xl text-gray-900" />
              </div>
              <div className="h-full border-b sm:border-r border-gray-300 w-full md:w-[50%] sm:w-auto">
                <div className=" relative px-7 py-8 flex items-center h-full gap-3" ref={toModalRef}>
                  <FaWalking className=" text-2xl font-semibold text-gray-400"/>
                  <input
                    className="outline-none w-full"
                    type="text"
                    name=""
                    id=""
                    value={toLocation}
                    placeholder="To"
                    onClick={()=>{setOpenLocationModel(!openLocationModel); setModelType("to")
                      console.log("Hello to is to working");
                      console.log(openLocationModel);
                      console.log(modelType);
                      
                      
                      
                    }}
                    onChange={(e) => setToLocation(e.target.value)}
                  />
                   {openLocationModel && modelType==="to" &&(<CityModel location={toLocation} cityInfo={from} handleLocation={handleToLocation} />
                  )}
                </div>
              </div>
            </div>
            <div className="flex bg-white flex-col sm:flex-row lg:w-1/2  rounded-r-3xl ">
              <div className="h-full border-b sm:border-r border-gray-300 sm:w-1/2 w-full rounded-r-3xl">
                <div className="px-7 py-8 flex items-center h-full gap-3 group relative pr-12">
                  <FaCalendarDay className=" text-2xl text-gray-400" />
                  {/* <input
                    className="outline-none opacity-0 scale-[3] h-14 w-[30px] absolute left-14 z-10"
                    placeholder="Date"
                  /> */}
                  {/* <p className="text-gray-400">Date</p> */}
                  <DatePicker
                    className="outline-none text-center w-full z-10"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Date"
                  />
                </div>
              </div>
              <button onClick={handleSearchRequest} className=" px-7 py-8 flex items-center justify-center bg-red-400 whitespace-nowrap text-white font-bold w-full sm:w-1/2 text-center rounded-r-3xl">
                SEARCH BUSES
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="flex relative md:bottom-[150px] mb-20 mt-10 md:my-0 justify-center">
        <div className="flex flex-col items-center w-full max-w-[1400px] py-6 pb-0">
          <div className="w-full md:w-[83%] md:p-8 flex flex-col gap-6 bg-white md:rounded-3xl md:drop-shadow-xl">
            <div className="flex justify-between px-4 md:px-0">
              <h2 className="text-xl md:text-3xl text-gray-600">
                TRENDING OFFERS
              </h2>
              <button className="text-blue-600 py-1 font-semibold text-base  px-4 rounded-full border border-gray-500 hover:shadow-lg">
                View All
              </button>
            </div>
            <div className="flex text-white gap-6 overflow-auto pl-4 md:pl-0">
              {offerCardDetails.map((offer) => {
                return <OfferCard key={offer.id} details={offer} />;
              })}
            </div>
          </div>
        </div>
      </section>
      <section class="flex justify-center  my-20 md:my-40">
        <div class="flex flex-col w-full px-6 md:px-0 md:w-[80%] max-w-[1300px]">
          <h1 class="text-gray-700 text-2xl md:text-[2.5rem] mb-6 md:mb-12">
            FREQUENTY ASKED QUESTIONS
          </h1>

          <div class="flex gap-6 text-sm md:text-base lg:text-lg">
            <a
              class="py-2 px-2 border-b-[3px] border-main-color text-main-color"
              href=""
            >
              General
            </a>
            <a class="py-2 px-2 hover:border-b-[3px] border-gray-300" href="">
              Ticket-related
            </a>
            <a
              href=""
              class=" leading-none flex justify-center items-center gap-3 py-2 px-2 hover:border-b-[3px] border-gray-300 sm:hidden"
            >
              More
              <i class="fa-solid fa-chevron-right"></i>
            </a>
            <a
              class="hidden sm:inline-block py-2 px-2 hover:border-b-[3px] border-gray-300"
              href=""
            >
              Payment
            </a>
            <a
              class="hidden sm:inline-block py-2 px-2 hover:border-b-[3px] border-gray-300"
              href=""
            >
              Cancellation & Refund
            </a>
            <a
              class="hidden sm:inline-block py-2 px-2 hover:border-b-[3px] border-gray-300"
              href=""
            >
              Insurance
            </a>
          </div>

          <div class="flex flex-col gap-6 md:gap-10 mt-11">
            {frequentlyAskedQuestions.map((question) => {
              return (
                <div
                  key={question.id}
                  class="p-4 md:p-7 cursor-pointer bg-white group hover:bg-slate-100 rounded-2xl border border-gray-100"
                >
                  <div class="flex md:text-base text-sm justify-between items-center font-semibold gap-2">
                    <h3>{question.question}</h3>
                    <i class="fa-solid fa-plus inline-block group-hover:hidden">
                      ➕
                    </i>
                    <i class="fa-solid fa-minus hidden group-hover:inline-block">
                      ➖
                    </i>
                  </div>

                  <div class="text-xs md:text-sm mt-6 hidden group-hover:inline-block">
                    <p>
                      Yes, you can track your <strong>bus online</strong> by
                      using our bus tracking app feature called
                      <a class="text-blue-500">Track My Bus</a>. This feature
                      allows passengers and their families to track the live bus
                      tracking location. You may follow your bus on a map and
                      use the information to plan your trip to the boarding
                      point and to get off at the correct stop. Family and
                      friends may also check the bus position to plan pick-ups
                      and ensure your safety.
                    </p>
                  </div>
                </div>
              );
            })}

            <div class="p-4 md:p-7  cursor-pointer bg-white group hover:bg-slate-100 rounded-2xl border border-gray-100">
              <div class="flex md:text-base text-sm justify-between items-center font-semibold gap-2">
                <h3>Why book bus tickets online on tedbus?</h3>
                <i class="fa-solid fa-plus inline-block group-hover:hidden"></i>
                <i class="fa-solid fa-minus hidden group-hover:inline-block"></i>
              </div>

              <div class="text-xs md:text-sm mt-6 hidden group-hover:inline-block">
                <p>
                  Yes, you can track your <strong>bus online</strong> by using
                  our bus tracking app feature called
                  <a class="text-blue-500">Track My Bus</a>. This feature allows
                  passengers and their families to track the live bus tracking
                  location. You may follow your bus on a map and use the
                  information to plan your trip to the boarding point and to get
                  off at the correct stop. Family and friends may also check the
                  bus position to plan pick-ups and ensure your safety.
                </p>
              </div>
            </div>
            <div class="p-4 md:p-7  cursor-pointer bg-white group hover:bg-slate-100 rounded-2xl border border-gray-100">
              <div class="flex md:text-base text-sm justify-between items-center font-semibold gap-2">
                <h3>Can I book a Government bus ticket on tedbus?</h3>
                <i class="fa-solid fa-plus inline-block group-hover:hidden"></i>
                <i class="fa-solid fa-minus hidden group-hover:inline-block"></i>
              </div>

              <div class="text-xs md:text-sm mt-6 hidden group-hover:inline-block">
                <p>
                  Yes, you can track your <strong>bus online</strong> by using
                  our bus tracking app feature called
                  <a class="text-blue-500">Track My Bus</a>. This feature allows
                  passengers and their families to track the live bus tracking
                  location. You may follow your bus on a map and use the
                  information to plan your trip to the boarding point and to get
                  off at the correct stop. Family and friends may also check the
                  bus position to plan pick-ups and ensure your safety.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Example />
      {/* <ShadowDiv/> */}
    </>
  );
};

export default Home;
