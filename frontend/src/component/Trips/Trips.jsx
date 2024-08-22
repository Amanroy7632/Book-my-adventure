import React, { useEffect, useState } from "react";
import "./trips.css";
import Logo from "../logo/Logo";
import img1 from "../../images/img1.jpeg";
import img2 from "../../images/img2.jpeg";
import img3 from "../../images/img3.jpeg";
import img4 from "../../images/img4.jpeg";
import img6 from "../../images/img6.jpeg";
import img5 from "../../images/img5.webp";
import {
  MdArrowRightAlt,
  MdCheckCircleOutline,
  MdRadioButtonChecked,
} from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import useFetch from "../../hooks";
import Loader from "../loader/Loader";
import { useCurrentUser } from "../../context/userContext";
function Trips() {
    const {currentUser} =useCurrentUser()
  const [trips, setTrips] = useState([]);
  const images = [img1, img2, img3, img4, img5, img6];
//   console.log(currentUser);
  
//   const { loading, data, errorMessage } = useFetch(
//     "http://localhost:8000/api/v1/ticket/tickets/user/66b8993ab65adc7d10d0ea22",
//     { method: "GET" }
//   );
//   console.log(data?.data);
    const fetchData = async ()=>{
      try {
          const response = await axiosInstance.get(`/ticket/tickets/user/${currentUser?._id}`)
          if (response.status===200) {
             console.log(response.data);
             setTrips(response.data?.tickets)
          }else {
            alert("Something went wrong,\nplease try again")
          }
      } catch (error) {
         console.log(error.message);
      }
    }
  useEffect(() => {
    // if (data?.data) {
    //   setTrips(data?.data.tickets);
    // }
    // console.log(trips);
    fetchData()
    console.log(trips);
    
  }, []);
//   if (loading) {
//     return (
//       <div className=" flex justify-center items-center m-auto">
//         <Loader />
//       </div>
//     );
//   }
  return (
    <div className="SingleTrip">
      <div className="SingleTrip__image">
        <img
          src={images[(Math.random() * images.length + 1).toFixed()]}
          alt="bus"
        />
        {/* <Logo/> */}
      </div>
      <div className={"flex justify-evenly flex-col"}>
        {trips?.length!==0?trips?.map((trip) => {
          return (
            <div className=" flex " key={trip?._id}>
              <div className="SingleTrip__busdetails">
                <div className="heading font-[600] text-lg">Bus Details</div>
                {/* <!-- Insertion for Departure, Arrival details, and fare --> */}
                <p className=" ">
                  <MdCheckCircleOutline className=" text-xl text-green-500" />{" "}
                  Departure Location: {trip?.from}
                </p>
                <p>
                  <MdCheckCircleOutline className=" text-xl text-green-500" />{" "}
                  Departure Time: {trip?.departureTime}
                </p>
                <p>
                  <MdCheckCircleOutline className=" text-xl text-green-500" />{" "}
                  Departure Date: {trip?.date}
                </p>
                <p>
                  <MdCheckCircleOutline className=" text-xl text-green-500" />{" "}
                  Arrival Location: {trip?.to}
                </p>
                <p>
                  <MdCheckCircleOutline className=" text-xl text-green-500" />{" "}
                  Arrival Time: {trip?.arrivalTime}
                </p>
                <p>
                  <MdCheckCircleOutline className=" text-xl text-green-500" />{" "}
                  Arrival Date: {trip?.date}
                </p>
                <p>
                  <MdCheckCircleOutline className=" text-xl text-green-500" />{" "}
                  Total Fare: {trip?.price}
                </p>
              </div>
              <div className="SingleTrip__persondetails">
                <div className="heading font-[600] text-lg ">
                  Passenger Details
                </div>

                {/* <!-- Insertion for Passenger details --> */}
                <p className=" flex items-center gap-3">
                  <MdArrowRightAlt /> Contact Email: {currentUser?.email}
                </p>
                <p className=" flex items-center gap-3">
                  <MdArrowRightAlt /> Contact Phone Number: {currentUser?.phone}
                </p>
                <div className="SingleTrip__customerDetails__passenger">
                  <div>
                    <p className=" flex items-center gap-3">
                      <MdArrowRightAlt /> Name: {trip?.name}
                    </p>
                    <p className=" flex items-center gap-3">
                      <MdArrowRightAlt /> Gender: {trip?.gender}
                    </p>
                    <p className=" flex items-center gap-3">
                      <MdArrowRightAlt /> Age: {trip?.age}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        }):"Trips not found"}
      </div>
    </div>
  );
}

export default Trips;
