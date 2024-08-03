import React from "react";
import "./busbottom.css";
const BusBottom = () => {
  return (
    <div>
      <div class="mainBar">
        <div>Amenities</div>
        <div>|</div>
        <div>Boarding and Droping Points</div>
        <div>|</div>
        <div>Reviews</div>
        <div>|</div>
        <div>Booking Policies</div>
        <div>|</div>
        <div>VIEW SEAATS</div>
      </div>
      <div class="displayArea">Amenities</div>
      <div class="displayArea">Boarding and Droping Points</div>
      <div class="displayArea">Reviews</div>
      <div class="displayArea">Booking Policies</div>
      <div class="displayArea">
        VIEW SEAATS
        {/* <app-view-seats [filledseats]="filledseats" [seatprice]="seatprice" [routedetails]="routedetails" [busid]="busid"
        [busarrivaltime]="busarrivaltime" [busdeparturetime]="busdeparturetime">
    </app-view-seats> */}
      </div>
    </div>
  );
};

export default BusBottom;
