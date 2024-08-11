import { useState } from "react";
import "./left.css";
import { BiMap, BiCheckCircle, BiWater } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";

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
} from "react-icons/md";
const Left = () => {
  const [checked, setChecked] = useState({});

  const handleChecked = (filter, index) => {
    setChecked((prevChecked) => ({
      ...prevChecked,
      [filter]: {
        ...prevChecked[filter],
        [index]: !prevChecked[filter]?.[index],
      },
    }));
    console.log(checked);
  };

  const filterBus = [
    {
      id: "time001",
      filterBy: "departure time",
      data: ["before 6 pm", "6 am to 12 pm", "12 pm to 6 pm", "after 6 pm"],
    },
    {
      id: "bus002",
      filterBy: "bus type",
      data: ["Seater", "Sleeper", "AC", "NonAc"],
    },
    {
      id: "time002",
      filterBy: "arrival time",
      data: ["before 6 pm", "6 am to 12 pm", "12 pm to 6 pm", "after 6 pm"],
    },
    {
      id: "amenity001",
      filterBy: "amenities",
      data: ["wifi", "WaterBottle", "Charging Points", "Movie", "Blanket"],
    },
  ];

  return (
    <div className="left p-[15px] border-r-2 max-md:grid max-md:grid-cols-3 gap-3 max-md:text-sm max-sm:grid-cols-2 ">
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
        <div key={item.id} className="left_filters mb-[25px] max-md:mb-[5px]">
          <p>{item.filterBy.toUpperCase()}</p>
          <ul>
            {item.data.map((data, index) => (
              <li key={index}>
                <div
                  className="first-section"
                  onClick={() => handleChecked(item.filterBy, index)}
                >
                  <input
                    type="checkbox"
                    name={item.filterBy}
                    id={`${item.filterBy}-${index}`}
                    checked={checked[item.filterBy]?.[index] || false}
                    onChange={() => handleChecked(item.filterBy, index)}
                  />
                  {item.id.includes("time") ? (
                    <MdAvTimer />
                  ) : item.id.includes("bus") ? (
                    <MdAirlineSeatLegroomExtra />
                  ) : data.includes("wifi") ? (
                    <MdWifi />
                  ) : data.includes("WaterBottle") ? (
                    <BiWater />
                  ) : data.toLocaleLowerCase().includes("charging") ? (
                    <MdBattery90 />
                  ) : data.toLocaleLowerCase().includes("movie") ? (
                    <MdMovie />
                  ) : (
                    <MdHotel />
                  )}
                  {/* <label htmlFor={`${item.filterBy}-${index}`}>{data}</label> */}
                  <span htmlFor={`${item.filterBy}-${index}`}>{data}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Left;
