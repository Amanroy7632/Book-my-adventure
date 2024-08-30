import { useEffect, useState } from "react";
// import "./trips.css";
// import Logo from "../logo/Logo";
// import img1 from "../../images/img1.jpeg";
// import img2 from "../../images/img2.jpeg";
// import img3 from "../../images/img3.jpeg";
// import img4 from "../../images/img4.jpeg";
// import img6 from "../../images/img6.jpeg";
// import img5 from "../../images/img5.webp";
import {
  MdArrowRightAlt,
  MdCheckCircleOutline,
  MdEditLocationAlt,
  MdLocationCity,
  MdLocationOn,
  MdLocationPin,
  MdNavigateNext,
  MdOutlineNavigation,
  MdRadioButtonChecked,
} from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
// import useFetch from "../../hooks";
// import Loader from "../loader/Loader";
import { useCurrentUser } from "../../context/userContext";
import Spinner from "../loader/Spinner";
import Alert from "../CustomAlert/Alert";
// function Trips() {
//     const {currentUser} =useCurrentUser()
//   const [trips, setTrips] = useState([]);
//   const images = [img1, img2, img3, img4, img5, img6];

//   useEffect(() => {
//     // if (data?.data) {
//     //   setTrips(data?.data.tickets);
//     // }
//     // console.log(trips);
//     fetchData()
//     console.log(trips);

//   }, []);
// //   if (loading) {
// //     return (
// //       <div className=" flex justify-center items-center m-auto">
// //         <Loader />
// //       </div>
// //     );
// //   }
//   return (
//     <div className="SingleTrip">
//       <div className="SingleTrip__image">
//         <img
//           src={images[(Math.random() * images.length + 1).toFixed()]}
//           alt="bus"
//         />
//         {/* <Logo/> */}
//       </div>
//       <div className={"flex justify-evenly flex-col h-[85vh] overflow-y-scroll"}>
//         {trips?.length!==0?trips?.map((trip) => {
//           return (
//             <div className=" flex " key={trip?._id}>
//               <div className="SingleTrip__busdetails">
//                 <div className="heading font-[600] text-lg">Bus Details</div>
//                 {/* <!-- Insertion for Departure, Arrival details, and fare --> */}
//                 <p className=" ">
//                   <MdCheckCircleOutline className=" text-xl text-green-500" />{" "}
//                   Departure Location: {trip?.from}
//                 </p>
//                 <p>
//                   <MdCheckCircleOutline className=" text-xl text-green-500" />{" "}
//                   Departure Time: {trip?.departureTime}
//                 </p>
//                 <p>
//                   <MdCheckCircleOutline className=" text-xl text-green-500" />{" "}
//                   Departure Date: {trip?.date}
//                 </p>
//                 <p>
//                   <MdCheckCircleOutline className=" text-xl text-green-500" />{" "}
//                   Arrival Location: {trip?.to}
//                 </p>
//                 <p>
//                   <MdCheckCircleOutline className=" text-xl text-green-500" />{" "}
//                   Arrival Time: {trip?.arrivalTime}
//                 </p>
//                 <p>
//                   <MdCheckCircleOutline className=" text-xl text-green-500" />{" "}
//                   Arrival Date: {trip?.date}
//                 </p>
//                 <p>
//                   <MdCheckCircleOutline className=" text-xl text-green-500" />{" "}
//                   Total Fare: {trip?.price}
//                 </p>
//               </div>
//               <div className="SingleTrip__persondetails">
//                 <div className="heading font-[600] text-lg ">
//                   Passenger Details
//                 </div>

//                 {/* <!-- Insertion for Passenger details --> */}
//                 <p className=" flex items-center gap-3">
//                   <MdArrowRightAlt /> Contact Email: {currentUser?.email}
//                 </p>
//                 <p className=" flex items-center gap-3">
//                   <MdArrowRightAlt /> Contact Phone Number: {currentUser?.phone}
//                 </p>
//                 <div className="SingleTrip__customerDetails__passenger">
//                   <div>
//                     <p className=" flex items-center gap-3">
//                       <MdArrowRightAlt /> Name: {trip?.name}
//                     </p>
//                     <p className=" flex items-center gap-3">
//                       <MdArrowRightAlt /> Gender: {trip?.gender}
//                     </p>
//                     <p className=" flex items-center gap-3">
//                       <MdArrowRightAlt /> Age: {trip?.age}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         }):"Trips not found"}
//       </div>
//     </div>
//   );
// }

// export default Trips;

// const trips = [
//   {
//     id: 1,
//     destination: "New York",
//     departure: "Los Angeles",
//     date: "2024-08-25",
//     time: "10:00 AM",
//     status: "Upcoming",
//   },
//   {
//     id: 2,
//     destination: "San Francisco",
//     departure: "Chicago",
//     date: "2024-08-28",
//     time: "2:00 PM",
//     status: "Completed",
//   },
//   {
//     id: 3,
//     destination: "Las Vegas",
//     departure: "Phoenix",
//     date: "2024-09-01",
//     time: "5:00 PM",
//     status: "Upcoming",
//   },
// ];

const Trips = () => {
  const { currentUser,alertMessage,setAlertMessage,onCloseHandler } = useCurrentUser();
  const [trips, setTrips] = useState([]);
  const [isLoading,setIsLoadin] =useState(true)
  const [message,setMessage] = useState({
    message:"",
    type:""
  })
  const fetchData = async () => {
    try {
      // setIsLoadin(true)
      const response = await axiosInstance.get(
        `/ticket/tickets/user/${currentUser?._id}`
      );
      // console.log(response);
      
      if (response.status === 200) {
        console.log(response.data);
        setTrips(response.data?.data?.tickets);
        // setAlertMessage("All trips fetched successfully")
      } else {
        setAlertMessage({message:"Something went wrong, please try again",type:"error  "})
        // alert("Something went wrong,\nplease try again");
      }
      // setTimeout(() => {
      // }, 1500);
      setIsLoadin(false)
    } catch (error) {
      setIsLoadin(false)
      setAlertMessage(error.message)
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-col w-full items-center p-4 bg-gray-100 min-h-[86vh] overflow-y-scroll">
      <h1 className="text-2xl font-bold mb-4">My Trips</h1>
      <div className="w-full max-w-4xl">
        {trips?trips?.map((trip) => (
          <div
            key={trip._id}
            className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col md:flex-row justify-between items-center"
          >
            <div className="flex flex-col md:flex-row md:items-center md:gap-6">
              <div>
              <h2 className=" text-xl font-semibold">Passenger Details</h2>
                <p className=" flex items-center gap-3">
                  <MdArrowRightAlt /> Contact Email: {currentUser?.email}
                </p>
                <p className=" flex items-center gap-3">
                  <MdArrowRightAlt /> Contact Email: {currentUser?.phone}
                </p>
                <p className=" flex items-center gap-3">
                  <MdArrowRightAlt />
                  Name: {trip?.name}
                </p>
                <p className=" flex items-center gap-3">
                  <MdArrowRightAlt />
                  Gender: {trip?.gender}
                </p>
                <p className=" flex items-center gap-3">
                  <MdArrowRightAlt />
                  Age: {trip?.age} yrs
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:gap-6">
              <div className="text-lg flex gap-2 items-center font-semibold">
                <MdLocationOn/>
                {trip?.from
                  ? trip?.from[0].toUpperCase() + trip?.from.substring(1)
                  : ""}{" "}
                to{" "}
                {trip?.to
                  ? trip?.to[0].toUpperCase() + trip?.to.substring(1)
                  : ""}
              </div>
              <div className="text-gray-500">
                {trip?.date} at {trip?.departureTime?.split('T')[1]}
              </div>
            </div>
            <div
              className={`mt-2 md:mt-0 text-sm md:text-base font-semibold ${
                trip?.date > new Date().toISOString() ? "text-blue-500" : "text-green-500"
              }`}
            >
              {trip?.date > new Date().toISOString() ? (
                "Upcomming"
              ) : (
                <div className=" flex gap-2">
                  Completed <MdCheckCircleOutline className=" text-xl" />
                </div>
              )}
            </div>
          </div>
        )):<div className=" p-10 text-2xl text-red-400">The user don't have any trips yet ..</div>}
      </div>
      {isLoading&& <Spinner/>}
      {alertMessage.message&&<Alert message={alertMessage} onClose={onCloseHandler}/>}
    </div>
  );
};

export default Trips;
