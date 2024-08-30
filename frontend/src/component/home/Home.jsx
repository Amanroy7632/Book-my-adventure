import React, { useEffect, useRef, useState } from "react";
import OfferCard from "../offerCard/OfferCard";
import { images } from "../../assets/index.js";
import { useNavigate } from "react-router-dom";
import { FaBus, FaWalking, FaCalendarDay, FaExchangeAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CityModel from "./model/CityModel.jsx";
import useFetch from "../../hooks/index.js";
import Loader from "../loader/Loader.jsx";
import { Button, Input } from "../commonUi/index.js";
import { useForm } from "react-hook-form";
import Pagination from "../pagination/Pagination.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import { useCurrentUser } from "../../context/userContext.jsx";
import Alert from "../CustomAlert/Alert.jsx";
import LoadingAnimation from "./Animation/LandingPageAnimation.jsx";
import axios from "axios";
import { BASE_URL } from "../../constraints.js";
import ScrollToTop from "../commonUi/ScrollToTop.jsx";
import Spinner from "../loader/Spinner.jsx";
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
// const frequentlyAskedQuestions = [
//   {
//     id: 1,
//     question: "Can I track the location of my booked bus online?",
//     answer: `Yes, you can track your <strong>bus online</strong> by using our bus tracking app feature called
//                       <a class="text-blue-500">Track My Bus</a>. This feature allows passengers and their families to
//                       track the live bus tracking location. You may follow your bus on a map and use the information
//                       to plan your trip to the boarding point and to get off at the correct stop. Family and friends
//                       may also check the bus position to plan pick-ups and ensure your safety.`,
//   },
//   {
//     id: 2,
//     question: "Why book bus tickets online on tedbus?",
//     answer: `Yes, you can track your <strong>bus online</strong> by using our bus tracking app feature called
//                       <a class="text-blue-500">Track My Bus</a>. This feature allows passengers and their families to
//                       track the live bus tracking location. You may follow your bus on a map and use the information
//                       to plan your trip to the boarding point and to get off at the correct stop. Family and friends
//                       may also check the bus position to plan pick-ups and ensure your safety.`,
//   },
//   {
//     id: 3,
//     question:
//       "Do I need to create an account on the tedbus site to book my bus ticket?",
//     answer: `Yes, you can track your <strong>bus online</strong> by using our bus tracking app feature called
//                       <a class="text-blue-500">Track My Bus</a>. This feature allows passengers and their families to
//                       track the live bus tracking location. You may follow your bus on a map and use the information
//                       to plan your trip to the boarding point and to get off at the correct stop. Family and friends
//                       may also check the bus position to plan pick-ups and ensure your safety.`,
//   },
//   {
//     id: 4,
//     question: "Does bus booking online cost me more?",
//     answer: `Yes, you can track your <strong>bus online</strong> by using our bus tracking app feature called
//                       <a class="text-blue-500">Track My Bus</a>. This feature allows passengers and their families to
//                       track the live bus tracking location. You may follow your bus on a map and use the information
//                       to plan your trip to the boarding point and to get off at the correct stop. Family and friends
//                       may also check the bus position to plan pick-ups and ensure your safety.`,
//   },
//   {
//     id: 5,
//     question: "How can I get the discounts on the bus booking?",
//     answer: `Yes, you can track your <strong>bus online</strong> by using our bus tracking app feature called
//                       <a class="text-blue-500">Track My Bus</a>. This feature allows passengers and their families to
//                       track the live bus tracking location. You may follow your bus on a map and use the information
//                       to plan your trip to the boarding point and to get off at the correct stop. Family and friends
//                       may also check the bus position to plan pick-ups and ensure your safety.`,
//   },
//   {
//     id: 6,
//     question: "Can I book a Government bus ticket on tedbus?",
//     answer: `Yes, you can track your <strong>bus online</strong> by using our bus tracking app feature called
//                       <a class="text-blue-500">Track My Bus</a>. This feature allows passengers and their families to
//                       track the live bus tracking location. You may follow your bus on a map and use the information
//                       to plan your trip to the boarding point and to get off at the correct stop. Family and friends
//                       may also check the bus position to plan pick-ups and ensure your safety.`,
//   },
// ];
const from = ["delhi", "mumbai", "banglore", "kolkata", "patna", "chennai"];

const to = [...from];
const Home = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const { isScrollTopVisible } = useCurrentUser();
  // const [modelType,setmodelType] = useState<"from"|"to"|"">("")
  const [modelType, setModelType] = useState("from");
  const fromModalRef = useRef(null);
  const toModalRef = useRef(null);
  const [openLocationModel, setOpenLocationModel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const [routes, setRoutes] = useState([]);
  const [showRoute, setShowRoute] = useState(false);
  const navigate = useNavigate();
  const fetchAllRoutes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/routes/get-all-routes`);
      if (response.status === 200) {
        setRoutes(response.data?.data);
      }
      console.log(response.data?.data);
    } catch (error) {}
  };
  const handleFromLocation = (city) => {
    setModelType("");
    setOpenLocationModel(false);
    setFromLocation(city);
    fromModalRef.current = null;
  };
  const handleToLocation = (city) => {
    setModelType("");
    setOpenLocationModel(false);
    setToLocation(city);

    toModalRef.current = null;
  };
  const handleClickOutside = (event) => {
    if (
      (fromModalRef.current && !fromModalRef.current.contains(event.target)) ||
      (toModalRef.current && !toModalRef.current.contains(event.target))
    ) {
      setOpenLocationModel(false);
      setModelType("");
      fromModalRef.current = null;
      toModalRef.current = null;
    }
  };
  function exchangeLocation() {
    // console.log("Working exchange location");
    // console.log(`Locatiom Model :${openLocationModel}`);
    setOpenLocationModel(false);
    setFromLocation(toLocation);
    setToLocation(fromLocation);
  }
  async function handleSearchRequest() {
    if (!fromLocation || !toLocation) {
      await fetchAllRoutes();
      setShowRoute(true);
      // alert("Please select from location and to location");
      return;
    }
    if (fromLocation === toLocation) {
      await fetchAllRoutes();
      setShowRoute(true);
      // alert("Please select a different location");
      return;
    }
    if (
      !from.includes(fromLocation.toLowerCase()) ||
      !to.includes(toLocation.toLowerCase())
    ) {
      await fetchAllRoutes();
      setShowRoute(true);
      // alert("Please select a given location");
      return;
    }
    const day = String(startDate.getDate()).padStart(2, "0");
    const month = String(startDate.getMonth() + 1).padStart(2, "0");
    const year = startDate.getFullYear();
    const date = `${day}-${month}-${year}`;
    console.log(`From : ${fromLocation} To : ${toLocation} Date : ${date}`);

    navigate(
      `/select-bus?departure=${fromLocation}&arrival=${toLocation}&date=${date}`
    );
    setFromLocation("");
    setToLocation("");
    setStartDate("");
  }
  const handleQuestionSubmit = async (data) => {
    // setIsSubmitting(true)
    console.log(currentUser);

    if (!currentUser) {
      setAlertMessage({ message: "Please Login for any Query", type: "info" });
      navigate("/login");
      return;
    }
    if (!data) {
      setAlertMessage({
        message: "Please enter your query..",
        type: "warning",
      });
      // alert("Please enter your query..");
      return;
    }
    const quesData = {
      ...data,
      userId: currentUser?._id,
    };
    try {
      setIsSubmitting(true);
      const response = await axiosInstance.post(
        "/question-answer/register",
        quesData
      );
      console.log(response);
      if (response.status === 201) {
        setAlertMessage({
          message: "Your Query has been submitted successfully",
          type: "success",
        });
        reset();
      }
    } catch (error) {
      // alert("Something went wrong: " + error.message)
      setAlertMessage({
        message: "Something went wrong" + error.message,
        type: "error",
      });

      console.log("Error" + error.message);
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 500);
    }
  };
  const { currentUser, alertMessage, setAlertMessage, onCloseHandler } =
    useCurrentUser();
  useEffect(() => {
    if (openLocationModel) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }
    return () => {
      // Cleanup event listener on component unmount
      window.removeEventListener("click", handleClickOutside);
    };
  }, [openLocationModel]);
  const { loading, data, errorMessage } = useFetch(
    `${BASE_URL}/question-answer/?limit=5&page=${currentPage}`,
    {
      method: "GET",
      "Content-Type": "application/json",
    }
  );
  // console.log(data);

  const frequentlyAskedQuestions = data?.data?.questionAnswer;
  // console.log(frequentlyAskedQuestions);
  useEffect(() => {
    const timeDur = setTimeout(() => {
      return <LoadingAnimation />;
    }, 2000);
    return () => clearTimeout(timeDur);
  }, []);
  return (
    <>
      <section className="h-[32rem] bg-main-color bg-[url('assets/hero-img.png')] bg-center  bg-no-repeat bg-cover flex justify-center">
        <div className="flex flex-col items-center w-full max-w-[1400px]">
          <h1 className="text-2xl mx-4 md:text-[2rem] text-white font-bold mt-16 mb-4 text-center">
            India's No. 1 Online Bus Ticket Booking Site
          </h1>
          <div className=" font-sans select-none font-[600] w-[90%] sm:w-[80%] lg:h-24 mt-4 bg-white cursor-pointer relative bottom-7 sm:bottom-0 flex flex-col lg:flex-row rounded-3xl overflow-x-clip ">
            <div className="h-full relative flex flex-col sm:flex-row items-center justify-center lg:w-1/2">
              <div className="h-full border-b sm:border-r border-gray-300 w-full md:w-[50%] sm:w-auto">
                <div
                  className=" relative px-7 py-8 flex items-center h-full gap-3 overflow-visible"
                  ref={fromModalRef}
                >
                  <FaBus className=" text-2xl text-gray-400" />
                  <input
                    className="outline-none w-full"
                    type="text"
                    name=""
                    id=""
                    value={fromLocation}
                    placeholder="From"
                    onFocus={() => {
                      setOpenLocationModel(true);
                      setModelType("from");
                    }}
                    // onBlur={() => {
                    //   setOpenLocationModel(false);
                    //   setModelType("");
                    // }}
                    onChange={(e) => setFromLocation(e.target.value)}
                  />
                  {openLocationModel && modelType === "from" && (
                    <CityModel
                      location={fromLocation}
                      cityInfo={from}
                      onBlur={() => setModelType("")}
                      handleLocation={handleFromLocation}
                    />
                  )}
                </div>
              </div>
              <div
                onClick={exchangeLocation}
                className="w-10 h-10 bg-white rounded-full  grid place-content-center absolute border border-gray-300"
              >
                <FaExchangeAlt className=" text-2xl text-gray-900" />
              </div>
              <div className="h-full border-b sm:border-r border-gray-300 w-full md:w-[50%] sm:w-auto">
                <div
                  className=" relative px-7 py-8 flex items-center h-full gap-3"
                  ref={toModalRef}
                >
                  <FaWalking className=" text-2xl font-semibold text-gray-400" />
                  <input
                    className="outline-none w-full"
                    type="text"
                    name=""
                    id=""
                    value={toLocation}
                    placeholder="To"
                    onFocus={() => {
                      setOpenLocationModel(true);
                      setModelType("to");
                      console.log("Hello to is to working");
                      console.log(openLocationModel);
                      console.log(modelType);
                    }}
                    // onBlur={() => {
                    //   setOpenLocationModel(false);
                    //   setModelType("");
                    // }}
                    onChange={(e) => setToLocation(e.target.value)}
                  />
                  {openLocationModel && modelType === "to" && (
                    <CityModel
                      location={toLocation}
                      cityInfo={from}
                      onBlur={() => setModelType("")}
                      handleLocation={handleToLocation}
                    />
                  )}
                </div>
              </div>
              {/* <div className="absolute z-40 top-24 right-0 w-64 h-64 border bg-gray-400 ">
                Hello
              </div> */}
              {showRoute && (
                <div className="custom-alert-overlay z-50 fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
                  <div
                    onMouseLeave={() => setShowRoute(false)}
                    className="custom-alert bg-white p-[20px] rounded-md "
                  >
                    <h2 className=" text-xl pb-1">Bus Rotes Available</h2>
                    <table className="table-auto w-full border-collapse shadow-md">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border px-6 py-3">No.</th>
                          <th className="border px-6 py-3">From</th>
                          <th className="border px-6 py-3">To</th>
                          <th className="border px-6 py-3">No. OF BUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {routes.length > 0
                          ? routes.map((route, index) => {
                              return (
                                <tr className="bg-white">
                                  <td className="border-b-2 px-6 py-3">
                                    {index + 1}
                                  </td>
                                  <td className="border-b-2 px-6 py-3">
                                    {route?.departureLocation[0].toUpperCase() +
                                      route?.departureLocation.substring(1)}
                                  </td>
                                  <td className="border-b-2 px-6 py-3">
                                    {route?.arrivalLocation[0].toUpperCase() +
                                      route?.arrivalLocation.substring(1)}
                                  </td>
                                  <td className="border-b-2 px-6 py-3">2</td>
                                </tr>
                              );
                            })
                          : ""}
                        <tr></tr>
                      </tbody>
                    </table>
                    {/* <p className="mb-[20px]">{"jhvjg"}</p> */}
                    <form
                      onSubmit={() => {
                        setShowRoute(false);
                      }}
                      className=" flex w-full"
                    >
                      <Button
                        type="submit"
                        className=" items-end px-[20px] py-[10px] border-none bg-gray-400 duration-300 hover:bg-gray-500 text-white rounded-sm cursor-pointer"
                      >
                        CANCEL
                      </Button>
                    </form>
                  </div>
                </div>
              )}
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
              <button
                onClick={handleSearchRequest}
                className=" px-7 py-8 flex items-center justify-center bg-red-400 whitespace-nowrap text-white font-bold w-full sm:w-1/2 text-center rounded-r-3xl"
              >
                SEARCH BUSES
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="flex relative md:bottom-[150px] mb-20 max-sm:my-5 mt-10 md:my-0 justify-center">
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

      <section
        className={`  flex justify-center py-3 bg-gradient-to-r from-red-500 to-red-800 overflow-y-scroll scroll-smooth  ${
          frequentlyAskedQuestions && frequentlyAskedQuestions.length > 0
            ? "h-[80vh]"
            : "h-[50vh]"
        }`}
      >
        <div className=" relative flex flex-col w-full px-6 md:px-0 md:w-[80%] max-w-[1300px]">
          <h1 className=" sticky top-0 z-10 backdrop-blur-md text-white text-2xl md:text-[2.5rem] mb-6 md:mb-12">
            FREQUENTY ASKED QUESTIONS
          </h1>

          <div className=" sticky backdrop-blur-md top-10 z-10 flex gap-6 text-sm md:text-base lg:text-lg">
            <a
              className="py-2 px-2 border-b-[3px] border-main-color text-main-color"
              href=""
            >
              General
            </a>
            <a
              className="py-2 px-2 hover:border-b-[3px] border-gray-300"
              href=""
            >
              Ticket-related
            </a>
            <a
              href=""
              className=" leading-none flex justify-center items-center gap-3 py-2 px-2 hover:border-b-[3px] border-gray-300 sm:hidden"
            >
              More
              <i className="fa-solid fa-chevron-right"></i>
            </a>
            <a
              className="hidden sm:inline-block py-2 px-2 hover:border-b-[3px] border-gray-300"
              href=""
            >
              Payment
            </a>
            <a
              className="hidden sm:inline-block py-2 px-2 hover:border-b-[3px] border-gray-300"
              href=""
            >
              Cancellation & Refund
            </a>
            <a
              className="hidden sm:inline-block py-2 px-2 hover:border-b-[3px] border-gray-300"
              href=""
            >
              Insurance
            </a>
          </div>

          <div className="flex flex-col gap-3 max-md:gap-10 mt-11 duration-300 scroll-smooth">
            {loading ? (
              <div className=" flex justify-center">
                <Loader />
              </div>
            ) : frequentlyAskedQuestions ? (
              frequentlyAskedQuestions.map((question) => {
                return (
                  <div
                    key={question._id}
                    class="p-4 md:p-7 cursor-pointer bg-white group hover:bg-slate-100 rounded-2xl border border-gray-100"
                  >
                    <div className="flex md:text-base text-sm justify-between items-center font-semibold gap-2 duration-300">
                      <h3>{question.question}</h3>
                      <i className="fa-solid fa-plus inline-block duration-300 group-hover:hidden">
                        ➕
                      </i>
                      <i className="fa-solid fa-minus hidden duration-300 group-hover:inline-block">
                        ➖
                      </i>
                    </div>

                    <div className="text-xs md:text-sm mt-6 hidden duration-300  group-hover:inline-block">
                      {/* <p>
                        Yes, you can track your <strong>bus online</strong> by
                        using our bus tracking app feature called
                        <a className="text-blue-500">Track My Bus</a>. This feature
                        allows passengers and their families to track the live bus
                        tracking location. You may follow your bus on a map and
                        use the information to plan your trip to the boarding
                        point and to get off at the correct stop. Family and
                        friends may also check the bus position to plan pick-ups
                        and ensure your safety.
                      </p> */}
                      <p>{question.answer?.text}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className=" text-red-400 flex justify-center text-xl">
                Oops..Something went wrong while loading the Frequently asked
                question.
              </div>
            )}

            {/* <div className="p-4 md:p-7  cursor-pointer bg-white group hover:bg-slate-100 rounded-2xl border border-gray-100">
              <div className="flex md:text-base text-sm justify-between items-center font-semibold gap-2">
                <h3>Why book bus tickets online on tedbus?</h3>
                <i className="fa-solid fa-plus inline-block group-hover:hidden"></i>
                <i className="fa-solid fa-minus hidden group-hover:inline-block"></i>
              </div>

              <div className="text-xs md:text-sm mt-6 hidden group-hover:inline-block">
                <p>
                  Yes, you can track your <strong>bus online</strong> by using
                  our bus tracking app feature called
                  <a className="text-blue-500">Track My Bus</a>. This feature allows
                  passengers and their families to track the live bus tracking
                  location. You may follow your bus on a map and use the
                  information to plan your trip to the boarding point and to get
                  off at the correct stop. Family and friends may also check the
                  bus position to plan pick-ups and ensure your safety.
                </p>
              </div>
            </div>
            <div className="p-4 md:p-7  cursor-pointer bg-white group hover:bg-slate-100 rounded-2xl border border-gray-100">
              <div className="flex md:text-base text-sm justify-between items-center font-semibold gap-2">
                <h3>Can I book a Government bus ticket on tedbus?</h3>
                <i className="fa-solid fa-plus inline-block group-hover:hidden"></i>
                <i className="fa-solid fa-minus hidden group-hover:inline-block"></i>
              </div>

              <div className="text-xs md:text-sm mt-6 hidden group-hover:inline-block">
                <p>
                  Yes, you can track your <strong>bus online</strong> by using
                  our bus tracking app feature called
                  <a className="text-blue-500">Track My Bus</a>. This feature allows
                  passengers and their families to track the live bus tracking
                  location. You may follow your bus on a map and use the
                  information to plan your trip to the boarding point and to get
                  off at the correct stop. Family and friends may also check the
                  bus position to plan pick-ups and ensure your safety.
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </section>
      <section className=" flex justify-center items-center ">
        <Pagination
          currentPage={currentPage}
          totalPages={data?.data.totalPages}
          onPageChange={setCurrentPage}
          className="z-40"
        />
      </section>
      <section className=" relative flex justify-center flex-col items-center border my-20">
        <div className=" bg-gradient-to-r from-gray-800 to-gray-500 absolute flex flex-col justify-center lg:w-[70%] max-md:w-[90%] max-sm:mt-10 rounded-xl drop-shadow-md z-10 p-5">
          <h1 className=" text-2xl font-semibold text-white pl-4 m-auto">
            Ask a Question ?
          </h1>
          <form
            onSubmit={handleSubmit(handleQuestionSubmit)}
            className=" lg:w-[70%] max-md:w-full p-4 flex max-sm:flex-col max-sm:gap-3 m-auto "
          >
            <Input
              placeholder="Enter your Question .."
              className=" lg:rounded-r-none max-sm:rounded-md"
              {...register("question", {
                required: true,
                message: "Fill the field with your question",
              })}
              required
            />
            <Button
              type="submit"
              className=" lg:rounded-l-none bg-orange-500 font-semibold"
              disabled={isSubmitting || !currentPage}
            >
              {isSubmitting ? "Submitting" : "Submit"}
            </Button>
          </form>
        </div>
        {alertMessage.message && (
          <Alert message={alertMessage} onClose={onCloseHandler} />
        )}
        {isScrollTopVisible && <ScrollToTop/>}
      </section>
    </>
  );
};

export default Home;
