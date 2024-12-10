import { useState } from "react";
import "./left.css";
import {
  MdGpsFixed,
  MdRestore,
  MdCheckCircleOutline,
  MdAvTimer,
  MdAirlineSeatLegroomExtra,
  MdWifi,
  MdBattery90,
  MdMovie,
  MdHotel,
  MdBusAlert,
  MdTimer,
  MdFilter,
} from "react-icons/md";
import Modal from "../../modal/Modal";

const Left = ({ className = "", data, onFilterChange }) => {
  const [checked, setChecked] = useState({});
  const [openModal, setOpenModal] = useState(null);
  const [openLocModel, setOpenLocModel] = useState(false);

  const filterBus = [
    {
      id: "time001",
      filterBy: "departure time",
      icon: <MdAvTimer />,
      data: ["before 6 pm", "6 am to 12 pm", "12 pm to 6 pm", "after 6 pm"],
    },
    {
      id: "bus002",
      filterBy: "bus type",
      icon: <MdBusAlert />,
      data: ["Seater", "Sleeper", "AC", "NonAc"],
    },
    {
      id: "time002",
      filterBy: "arrival time",
      icon: <MdTimer />,
      data: ["before 6 pm", "6 am to 12 pm", "12 pm to 6 pm", "after 6 pm"],
    },
    {
      id: "amenity001",
      filterBy: "amenities",
      icon: <MdFilter />,
      data: ["wifi", "WaterBottle", "Charging Points", "Movie", "Blanket"],
    },
  ];

  const handleChecked = (filter, value) => {
    setChecked((prevChecked) => ({
      ...prevChecked,
      [filter]: {
        ...prevChecked[filter],
        [value]: !prevChecked[filter]?.[value],
      },
    }));
    onFilterChange(getFilteredData())
  };

function getFilteredData  () {
    console.log(checked);
    
    if (!data || Object.keys(checked).length === 0) return data;

    return data.filter((item) => {
      return Object.entries(checked).every(([filter, values]) => {
       
        if (!values || !Object.values(values).some(Boolean)) return true;
        
        switch (filter) {
          case "departure time":
            return Object.keys(values).some((time) => time === item.departureTime);
          case "bus type":
            console.log(Object.keys(values));
            
            return Object.keys(values).some((type) => item?.busDetails?.busType?.toLowerCase().includes(type?.toLowerCase()));
          case "arrival time":
            return Object.keys(values).some((time) => time === item.arrivalTime);
          case "amenities":
            return Object.keys(values).some(
              (amenity) => values[amenity] && item.amenities?.includes(amenity)
            );
          default:
            return true;
        }
      });
    });
  };
   
  return (
    <div className="relative grid grid-cols-2 gap-2 items-center sm:flex justify-between border-b-2 py-1">
      <p
        onClick={() => setOpenLocModel(!openLocModel)}
        className="absolute cursor-pointer top-[-35px] right-0 bg-green-600 w-fit px-3 rounded-md py-1 text-white"
      >
        Filters
      </p>
      <Modal
        isOpen={openLocModel}
        onClose={() => setOpenLocModel(!openLocModel)}
      >
        <ul className="list-none p-4 m-0">
          <li>
            <div className="first-section flex items-center gap-2">
              <MdGpsFixed />
              <span>Live Tracking</span>
              <MdCheckCircleOutline />
            </div>
          </li>
          <li>
            <div className="first-section flex items-center gap-2">
              <MdRestore />
              <span>Reschedulable</span>
              <MdCheckCircleOutline />
            </div>
          </li>
        </ul>
      </Modal>

      {filterBus.map((item) => (
        <div
          key={item.id}
          className="left_filters font-semibold m-auto mb-1 px-2 py-1 bg-[#BD3B4A] rounded"
        >
          <ul>
            <li>
              <div
                className="cursor-pointer first-section flex items-center gap-2"
                onClick={() => setOpenModal(item.id)}
              >
                <span className="text-white">{item.icon}</span>
                <span className="text-sm max-sm:text-xs text-white">
                  {item.filterBy.toUpperCase()}
                </span>
              </div>
            </li>
          </ul>
          <Modal
            isOpen={openModal === item.id}
            onClose={() => setOpenModal(null)}
          >
            <div className="flex flex-col p-6">
              <h2 className="text-xl mb-4">{item.filterBy.toUpperCase()}</h2>
              {item.data.map((filterData, index) => (
                <div
                  key={index}
                  className="flex items-center mb-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={checked[item.filterBy]?.[filterData] || false}
                    onChange={() => handleChecked(item.filterBy, filterData)}
                  />
                  <span>{filterData}</span>
                </div>
              ))}
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={() => setOpenModal(null)}
              >
                Apply
              </button>
            </div>
          </Modal>
        </div>
      ))}

      {/* <div className="filtered-data mt-4">
        {filteredData?.length > 0 ? (
          filteredData.map((item, idx) => (
            <div key={idx} className="data-item p-2 border rounded mb-2">
              <p>
                <strong>Operator:</strong> {item.operatorName}
              </p>
              <p>
                <strong>Departure:</strong> {item.departureLocation}
              </p>
              <p>
                <strong>Arrival:</strong> {item.arrivalLocation}
              </p>
            </div>
          ))
        ) : (
          <p>No data found for the selected filters.</p>
        )}
      </div> */}
    </div>
  );
};

export default Left;
// const Left = ({ className = "",data,onFilterChange }) => {
//   const [checked, setChecked] = useState({});
//   const [openModal, setOpenModal] = useState(null);
//   const [openLocModel, setOpenLocModel] = useState(false);
//   const handleChecked = (filter,data, index) => {
//     // console.log(filter);

//     setChecked((prevChecked) => ({
//       ...prevChecked,
//       [filter]: {
//         ...prevChecked[filter],
//         [index]: !prevChecked[filter]?.[index],
//       },
//     }));
//   };

//   const filterBus = [
//     {
//       id: "time001",
//       filterBy: "departure time",
//       icon: <MdAvTimer />,
//       data: ["before 6 pm", "6 am to 12 pm", "12 pm to 6 pm", "after 6 pm"],
//     },
//     {
//       id: "bus002",
//       filterBy: "bus type",
//       icon: <MdBusAlert />,
//       data: ["Seater", "Sleeper", "AC", "NonAc"],
//     },
//     {
//       id: "time002",
//       filterBy: "arrival time",
//       icon: <MdTimer />,
//       data: ["before 6 pm", "6 am to 12 pm", "12 pm to 6 pm", "after 6 pm"],
//     },
//     {
//       id: "amenity001",
//       filterBy: "amenities",
//       icon: <MdFilter />,
//       data: ["wifi", "WaterBottle", "Charging Points", "Movie", "Blanket"],
//     },
//   ];

//   const openFilterModal = (filter) => {
//     onFilterChange(checked);
//     console.log(checked);

//     setOpenModal(filter);
//   };

//   const closeModal = () => {
//     setOpenModal(null);
//   };

//   return (
//     <div className="relative grid grid-cols-2 gap-2 items-center sm:flex  justify-between   border-b-2 py-1 ">
//       <p
//         onClick={() => setOpenLocModel(!openLocModel)}
//         className="absolute  cursor-pointer top-[-35px] right-0 bg-green-600 w-fit px-3 rounded-md py-1 text-white"
//       >
//         Filters
//       </p>
//       <Modal
//         isOpen={openLocModel}
//         onClose={() => setOpenLocModel(!openLocModel)}
//       >
//         <ul className="list-none p-4 m-0">
//           <li>
//             <div className="first-section flex items-center gap-2">
//               <MdGpsFixed />
//               <span>Live Tracking</span>
//               <MdCheckCircleOutline />
//             </div>
//           </li>
//           <li>
//             <div className="first-section flex items-center gap-2">
//               <MdRestore />
//               <span>Reschedulable</span>
//               <MdCheckCircleOutline />
//             </div>
//           </li>
//         </ul>
//       </Modal>

//       {filterBus.map((item) => (
//         <div
//           key={item.id}
//           className="left_filters  font-semibold m-auto mb-1 px-2 py-1  bg-[#BD3B4A] rounded"
//         >
//           <ul>
//             <li>
//               <div
//                 className="cursor-pointer first-section flex items-center gap-2"
//                 onClick={() => openFilterModal(item.id)}
//               >
//                 <span className="text-white">{item.icon}</span>
//                 <span className="text-sm max-sm:text-xs text-white">
//                   {item.filterBy.toUpperCase()}
//                 </span>
//               </div>
//             </li>
//           </ul>
//           <Modal isOpen={openModal === item.id} onClose={closeModal}>
//             <div className="flex flex-col p-6">
//               <h2 className="text-xl mb-4">{item.filterBy.toUpperCase()}</h2>
//               {item.data.map((data, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center mb-2 cursor-pointer"
//                   onClick={() => handleChecked(item.filterBy,data, index)}
//                 >
//                   <input
//                     type="checkbox"
//                     className="mr-2"
//                     checked={checked[item.filterBy]?.[index] || false}
//                     onChange={() => handleChecked(item.filterBy,data, index)}
//                   />
//                   <span>{data}</span>
//                 </div>
//               ))}
//               <button
//                 className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//                 onClick={closeModal}
//               >
//                 Apply
//               </button>
//             </div>
//           </Modal>
//         </div>
//       ))}
//     </div>
//   );
// };
// const Left = ({ className = "", data, onFilterChange }) => {
//   console.log(data);

//   const [checked, setChecked] = useState({}); // Stores the filter state
//   const [openModal, setOpenModal] = useState(null);
//   const [openLocModel, setOpenLocModel] = useState(false);

//   const filterBus = [
//     {
//       id: "time001",
//       filterBy: "departure time",
//       icon: <MdAvTimer />,
//       data: ["before 6 pm", "6 am to 12 pm", "12 pm to 6 pm", "after 6 pm"],
//     },
//     {
//       id: "bus002",
//       filterBy: "bus type",
//       icon: <MdBusAlert />,
//       data: ["Seater", "Sleeper", "AC", "NonAc"],
//     },
//     {
//       id: "time002",
//       filterBy: "arrival time",
//       icon: <MdTimer />,
//       data: ["before 6 pm", "6 am to 12 pm", "12 pm to 6 pm", "after 6 pm"],
//     },
//     {
//       id: "amenity001",
//       filterBy: "amenities",
//       icon: <MdFilter />,
//       data: ["wifi", "WaterBottle", "Charging Points", "Movie", "Blanket"],
//     },
//   ];

//   const handleChecked = (filter, value) => {
//     setChecked((prevChecked) => ({
//       ...prevChecked,
//       [filter]: {
//         ...prevChecked[filter],
//         [value]: !prevChecked[filter]?.[value], // Toggle the value
//       },
//     }));
//   };

//   // Function to filter the data based on selected filters
//   const getFilteredData = () => {
//     if (!data || Object.keys(checked).length === 0) return data;

//     return data.filter((item) => {
//       // Check all selected filters
//       return Object.entries(checked).every(([filter, values]) => {
//         // Skip if no filter value is selected
//         if (!values || !Object.values(values).some(Boolean)) return true;

//         // Match the data item against the selected filter values
//         if (filter === "departure time") {
//           // Example: Assume item has a `departureTime` property
//           return values[item.departureTime];
//         } else if (filter === "bus type") {
//           // Example: Assume item has a `busType` property
//           return values[item.busType];
//         } else if (filter === "arrival time") {
//           // Example: Assume item has an `arrivalTime` property
//           return values[item.arrivalTime];
//         } else if (filter === "amenities") {
//           // Example: Assume item has an `amenities` array
//           return Object.keys(values).some((amenity) =>
//             item.amenities?.includes(amenity)
//           );
//         }
//         return true; // Default if no filter matches
//       });
//     });
//   };

//   const filteredData = getFilteredData();
//   console.log(filteredData);

//   return (
//     <div className="relative grid grid-cols-2 gap-2 items-center sm:flex justify-between border-b-2 py-1">
//       <p
//         onClick={() => setOpenLocModel(!openLocModel)}
//         className="absolute cursor-pointer top-[-35px] right-0 bg-green-600 w-fit px-3 rounded-md py-1 text-white"
//       >
//         Filters
//       </p>
//       <Modal
//         isOpen={openLocModel}
//         onClose={() => setOpenLocModel(!openLocModel)}
//       >
//         <ul className="list-none p-4 m-0">
//           <li>
//             <div className="first-section flex items-center gap-2">
//               <MdGpsFixed />
//               <span>Live Tracking</span>
//               <MdCheckCircleOutline />
//             </div>
//           </li>
//           <li>
//             <div className="first-section flex items-center gap-2">
//               <MdRestore />
//               <span>Reschedulable</span>
//               <MdCheckCircleOutline />
//             </div>
//           </li>
//         </ul>
//       </Modal>

//       {filterBus.map((item) => (
//         <div
//           key={item.id}
//           className="left_filters font-semibold m-auto mb-1 px-2 py-1 bg-[#BD3B4A] rounded"
//         >
//           <ul>
//             <li>
//               <div
//                 className="cursor-pointer first-section flex items-center gap-2"
//                 onClick={() => setOpenModal(item.id)}
//               >
//                 <span className="text-white">{item.icon}</span>
//                 <span className="text-sm max-sm:text-xs text-white">
//                   {item.filterBy.toUpperCase()}
//                 </span>
//               </div>
//             </li>
//           </ul>
//           <Modal
//             isOpen={openModal === item.id}
//             onClose={() => setOpenModal(null)}
//           >
//             <div className="flex flex-col p-6">
//               <h2 className="text-xl mb-4">{item.filterBy.toUpperCase()}</h2>
//               {item.data.map((filterData, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center mb-2 cursor-pointer"
//                 >
//                   <input
//                     type="checkbox"
//                     className="mr-2"
//                     checked={checked[item.filterBy]?.[filterData] || false}
//                     onChange={() =>
//                       handleChecked(item.filterBy, filterData, index)
//                     }
//                   />
//                   <span>{filterData}</span>
//                 </div>
//               ))}
//               <button
//                 className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//                 onClick={() => setOpenModal(null)}
//               >
//                 Apply
//               </button>
//             </div>
//           </Modal>
//         </div>
//       ))}

//       {/* Render Filtered Data */}
//       <div className="filtered-data mt-4">
//         {filteredData?.length > 0 ? (
//           filteredData.map((item, idx) => (
//             <div key={idx} className="data-item p-2 border rounded mb-2">
//               <p>
//                 <strong>Operator:</strong> {item.operatorName}
//               </p>
//               <p>
//                 <strong>Departure:</strong> {item.departureLocation}
//               </p>
//               <p>
//                 <strong>Arrival:</strong> {item.arrivalLocation}
//               </p>
//               {/* Add other details as needed */}
//             </div>
//           ))
//         ) : (
//           <p>No data found for the selected filters.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Left;


// const Left = ({ className = "", onFilterChange}) => {
//   // const [checked, setChecked] = useState({});

//   // const handleChecked = (filter, index) => {
//   //   setChecked((prevChecked) => ({
//   //     ...prevChecked,
//   //     [filter]: {
//   //       ...prevChecked[filter],
//   //       [index]: !prevChecked[filter]?.[index],
//   //     },
//   //   }));
//   //   console.log(checked);
//   // };
//   const [selectedFilters, setSelectedFilters] = useState({
//     departureTime: "",
//     busType: "",
//     arrivalTime: "",
//     amenities: "",
//   });

//   const handleSelectChange = (filter, value) => {
//     setSelectedFilters((prevFilters) => ({
//       ...prevFilters,
//       [filter]: value,
//     }));
//     onFilterChange(filter, value);
//   };

//   const filterBus = [
//     {
//       id: "time001",
//       label: "departure time",
//       data: ["before 6 pm", "6 am to 12 pm", "12 pm to 6 pm", "after 6 pm"],
//     },
//     {
//       id: "bus002",
//       label: "bus type",
//       data: ["Seater", "Sleeper", "AC", "NonAc"],
//     },
//     {
//       id: "time002",
//       label: "arrival time",
//       data: ["before 6 pm", "6 am to 12 pm", "12 pm to 6 pm", "after 6 pm"],
//     },
//     {
//       id: "amenity001",
//       label: "amenities",
//       data: ["wifi", "WaterBottle", "Charging Points", "Movie", "Blanket"],
//     },
//   ];

//   return (
//     <div
//       className={`${className} left p-[15px] lg:w-[20%] border-r-2 max-md:grid max-md:grid-cols-3 gap-3 max-md:text-sm max-sm:grid-cols-2`}
//     >
//       <div className="left_filters mb-[25px]">
//         <p>Filters</p>
//         <ul className="list-none p-0 m-0">
//           <li>
//             <div className="first-section flex items-center justify-between">
//               <MdGpsFixed />
//               <span>Live Tracking</span>
//               <MdCheckCircleOutline />
//             </div>
//           </li>
//           <li>
//             <div className="first-section flex items-center justify-between">
//               <MdRestore />
//               <span>Reschedulable</span>
//               <MdCheckCircleOutline />
//             </div>
//           </li>
//         </ul>
//       </div>

//       {filterBus.map((item) => (
//         <div key={item.id} className="left_filters mb-[20px] h-fit max-md:mb-[5px]">
//           {/* <p className="mb-2">{item.label}</p> */}
//           <div className="flex items-center gap-2">
//             {item.icon}
//             <select
//               className="p-2 border rounded w-full"
//               value={selectedFilters[item.label]}
//               onChange={(e) =>
//                 handleSelectChange(item.label, e.target.value)
//               }
//             >
//               <option value="">{item.label?.toUpperCase()}</option>
//               {item.data.map((data, index) => (
//                 <option key={index} value={data}>
//                   {data}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Left;
