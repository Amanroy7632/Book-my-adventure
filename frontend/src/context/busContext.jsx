import { createContext, useContext } from "react";
import {useState,useEffect} from "react"
const BusContext = createContext();
export const useBusContext = () => {
  return useContext(BusContext);
};
export const BusContextProvider = ({ children }) => {
  const [filledSeats, setFilledSeats] = useState([1, 11, 21, 31]);
  const [selectedbus, setSelectedBus] = useState(null);
  const [busDetails, setBusDetails] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [submittedForm, setSubmitedForm] = useState([]);
  const [routeDetails,setRouteDetails] = useState({})
//   useEffect(() => {
//     const debouncer = setTimeout(()=>{

//       console.log("Selected Bus: " + selectedbus);
//       const fetchBusDetails = async () => {
//         try {
//           const response = await fetch(
//             `http://localhost:8000/api/v1/bus/${
//               data?.data[selectedbus - 1]?.busId
//             }`,
//             {
//               method: "GET",
//               "Content-Type": "application/json",
//             }
//           );
//           const result = await response.json();
//           console.log(result?.data);
          
//           setBusDetails(result?.data)
//         } catch (error) {
//           console.error(error)
//         }
//       };
//       if (selectedbus) {
//         setFilledSeats([1, 11, 21, 31])
//         fetchBusDetails()

//       }
//     },800)
//     return ()=>clearTimeout(debouncer)
//   }, [selectedbus]);
  return (
    <BusContext.Provider
      value={{
        filledSeats,
        setFilledSeats,
        selectedbus,
        setSelectedBus,
        busDetails,
        setBusDetails,
        selectedSeats,
        setSelectedSeats,
        submittedForm,
        setSubmitedForm,
        routeDetails,
        setRouteDetails
      }}
    >
      {children}
    </BusContext.Provider>
  );
};
