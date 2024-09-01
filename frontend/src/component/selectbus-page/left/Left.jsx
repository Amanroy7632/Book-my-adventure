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

const Left = ({ className = "" }) => {
  const [checked, setChecked] = useState({});
  const [openModal, setOpenModal] = useState(null);

  const handleChecked = (filter, index) => {
    setChecked((prevChecked) => ({
      ...prevChecked,
      [filter]: {
        ...prevChecked[filter],
        [index]: !prevChecked[filter]?.[index],
      },
    }));
  };

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

  const openFilterModal = (filter) => {
    console.log(filter);

    setOpenModal(filter);
  };

  const closeModal = () => {
    setOpenModal(null);
  };

  return (
    <div
      className={`${className} left p-[15px] lg:w-[20%] border-r-2 max-md:grid max-md:grid-cols-3 gap-3 max-md:text-sm max-sm:grid-cols-2`}
    >
      <div className="left_filters mb-[25px]">
        <p className=" bg-green-600 w-fit px-3 rounded-md py-1 text-white">Filters</p>
        <ul className="list-none p-0 m-0">
          <li>
            <div className="first-section">
              <MdGpsFixed />
              <span>Live Tracking</span>
              <MdCheckCircleOutline />
            </div>
          </li>
          <li>
            <div className="first-section">
              <MdRestore />
              <span>Reschedulable</span>
              <MdCheckCircleOutline />
            </div>
          </li>
        </ul>
      </div>
      {filterBus.map((item) => (
        <div key={item.id} className="left_filters mb-[20px] max-md:mb-[5px]">
          {/* <p>{item.filterBy.toUpperCase()}</p> */}
          <ul>
            <li>
              <div
                className="cursor-pointer first-section"
                onClick={() => openFilterModal(item.id)}
              >
                <span>{item.icon}</span>
                <span> {item.filterBy.toUpperCase()}</span>
              </div>
            </li>
          </ul>
          <Modal isOpen={openModal === item.id} onClose={closeModal}>
            <div className=" flex flex-col p-6">
              <h2 className="text-xl mb-4">{item.filterBy.toUpperCase()}</h2>
              {item.data.map((data, index) => (
                <div
                  key={index}
                  className="flex items-center mb-2 cursor-pointer"
                  onClick={() => handleChecked(item.filterBy, index)}
                >
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={checked[item.filterBy]?.[index] || false}
                    onChange={() => handleChecked(item.filterBy, index)}
                  />
                  <span>{data}</span>
                </div>
              ))}
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={closeModal}
              >
                Apply
              </button>
            </div>
          </Modal>
        </div>
      ))}
    </div>
  );
};

export default Left;

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

function abc() {
  return (
    <div
      className={`${className}left p-[15px] lg:w-[20%] border-r-2 max-md:grid max-md:grid-cols-3 gap-3 max-md:text-sm max-sm:grid-cols-2 `}
    >
      <div className="left_filters mb-[25px]">
        <p>Filters</p>
        <ul className="list-none p-0 m-0">
          <li>
            <div className="first-section">
              <MdGpsFixed />
              {/* <mat-icon>gps_fixed</mat-icon> */}
              <span>Live Tracking</span>
              <MdCheckCircleOutline />
              {/* <mat-icon style="color: green;">check_circle_outline</mat-icon> */}
            </div>
          </li>
          <li>
            <div className="first-section">
              <MdRestore />
              {/* <mat-icon>restore</mat-icon> */}

              {/* <MdAirlineSeatLegroomExtra/> */}
              <span>Reschedulable</span>
              <MdCheckCircleOutline />
              {/* <mat-icon style="color: green;">check_circle_outline</mat-icon> */}
            </div>
          </li>
        </ul>
      </div>
      {filterBus.map((item) => (
        <div key={item.id} className="left_filters mb-[20px] max-md:mb-[5px]">
          <p>{item.filterBy.toUpperCase()}</p>
          <ul>
            <select name="" id="">
              {item.data.map((data, index) => (
                <option key={index} value="data">
                  {data}
                </option>
                // <li key={index}>
                //   <div
                //     className="first-section"
                //     onClick={() => handleChecked(item.filterBy, index)}
                //   >
                //     <input
                //       type="checkbox"
                //       name={item.filterBy}
                //       id={`${item.filterBy}-${index}`}
                //       checked={checked[item.filterBy]?.[index] || false}
                //       onChange={() => handleChecked(item.filterBy, index)}
                //     />
                //     {item.id.includes("time") ? (
                //       <MdAvTimer />
                //     ) : item.id.includes("bus") ? (
                //       <MdAirlineSeatLegroomExtra />
                //     ) : data.includes("wifi") ? (
                //       <MdWifi />
                //     ) : data.includes("WaterBottle") ? (
                //       <BiWater />
                //     ) : data.toLocaleLowerCase().includes("charging") ? (
                //       <MdBattery90 />
                //     ) : data.toLocaleLowerCase().includes("movie") ? (
                //       <MdMovie />
                //     ) : (
                //       <MdHotel />
                //     )}
                //     {/* <label htmlFor={`${item.filterBy}-${index}`}>{data}</label> */}
                //     <span htmlFor={`${item.filterBy}-${index}`}>{data}</span>
                //   </div>
                // </li>
              ))}
            </select>
          </ul>
        </div>
      ))}
    </div>
  );
}
