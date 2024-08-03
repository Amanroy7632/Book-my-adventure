import React from 'react'

const BusBox = () => {
  return (
    <div
    class="bus-box w-full min-h-[180px] h-auto border border-[#ddd] mt-[20px] pl-[10px] text-[#4a4a4a] text-sm font-semibold p-[10px] ">
    <div class="busBoxSection1 h-[40%] mb-[1%] flex justify-around">
        <div class="busBoxSection11 w-[25%]">
            <div>operatorname</div>
            <div>bustypeName</div>
        </div>
        <div class="busBoxSection12 w-[10%]">
            <div>
                busdeparturetime:00
            </div>
            <div>routedetails.departureLocation.name</div>
        </div>
        <div class="busBoxSection13">
            <div>routedetails.durationh</div>
        </div>
        <div class="busBoxSection14 flex flex-col justify-center">
            <div>busarrivaltime:00</div>
            <div>routedetails.arrivalLocation.name</div>
        </div>
        <div class="busBoxSection15">
            <div>
                <i class="material-icons">star</i>
                <div>avgRating</div>
            </div>
            <div>
                <i class="material-icons">people</i>
                <div>totalReview</div>
            </div>

        </div>
        <div class="busBoxSection16">
            <div>
                <div>INR</div>
                <div>seatprice</div>
            </div>
            <div>
                <i class=" material-icons">local_offer</i>
                <div>Deal Applied</div>
            </div>
        </div>
        <div class="busBoxSection17">
            <div>
                <div>40 -filledseats.length</div>
                <div>Seats Available</div>
            </div>
            <div>20</div>
            <div>Window</div>
        </div>

    </div>
    <div class="busBoxSection2">
        <div class="busBoxSection21">
            <span matTooltip="Charging Point">
                <i class="material-icons">power</i>
            </span>
            <span matTooltip="Movie">
                <i class="material-icons">movie_filter</i>
            </span>
            <span matTooltip="Reading Light">
                <i class="material-icons">wb_incandescent</i>
            </span>
            <span matTooltip="Track My Bus">
                <i class="material-icons">direction_bus</i>
            </span>
        </div>
        <div class="busBoxSection22">
            <div >
                <i class="material-icons">gps_fixed</i>
                <span>Live Tracking</span>
            </div>
            <div >
                <i class="material-icons">restore</i>
                <span>Reschedulable</span>
            </div>
        </div>
    </div>
    <div class="busBoxSection3">
        {/* <app-bottom-tab [busid]='busid' [filledseats]="filledseats" [seatprice]="seatprice"
        [routedetails]="routedetails" [busarrivaltime]="busarrivaltime" [busdeparturetime]="busdeparturetime"
            [operatorname]="operatorname"></app-bottom-tab> */}
    </div>

</div>
  )
}

export default BusBox
