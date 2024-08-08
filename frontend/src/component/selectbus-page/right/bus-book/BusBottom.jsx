import React, { useEffect, useState } from "react";
import "./busbottom.css";
import ViewSeat from "./view-seats/ViewSeat";
const displayText = ["Amenities","Boarding and Droping Points","Reviews","Booking Policies","VIEW SEAATS"]
const BusBottom = ({filledSeats,setFilledSeats,busDetails}) => {
  const [isVisibleDisplayArea,setIsVisibleDisplayArea] = useState(false)
  const [displayIndex,setdisplayIndex]=useState(null)
  const displayClickHandler = (index)=>{
    setIsVisibleDisplayArea(true)
    setdisplayIndex(index)
  }
 
  return (
    <div>
      <div class="mainBar">
        <div onClick={()=>displayClickHandler(0)}>Amenities</div>
        <div>|</div>
        <div onClick={()=>displayClickHandler(1)}>Boarding and Droping Points</div>
        <div>|</div>
        <div onClick={()=>displayClickHandler(2)}>Reviews</div>
        <div>|</div>
        <div onClick={()=>displayClickHandler(3)}>Booking Policies</div>
        <div>|</div>
        <div onClick={()=>displayClickHandler(4)}>VIEW SEAATS</div>
      </div>
      {isVisibleDisplayArea && displayIndex===0 && <div class="displayArea">Amenities</div>}
      {isVisibleDisplayArea && displayIndex===1 && <div class="displayArea">Boarding and Droping Points</div>}
      {isVisibleDisplayArea && displayIndex===2 && <div class="displayArea">Reviews</div>}
      {isVisibleDisplayArea && displayIndex===3 && <div class="displayArea">Booking Policies</div>}
      {isVisibleDisplayArea && displayIndex===4 && <div class="displayArea">
        VIEW SEATS
        <ViewSeat filledSeats={filledSeats} setFilledSeats={setFilledSeats} busDetails={busDetails}/>
        {/* <app-view-seats [filledseats]="filledseats" [seatprice]="seatprice" [routedetails]="routedetails" [busid]="busid"
        [busarrivaltime]="busarrivaltime" [busdeparturetime]="busdeparturetime">
    </app-view-seats> */}
      </div>}
    </div>
  );
};

export default BusBottom;
