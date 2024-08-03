import React from 'react'

const SelectHeader = () => {
  return (
    <div class="Header">
    <div class="HeaderOne  bg-[#f8f4f4] p-[10px] mb-[10px]">
        <p class=" mx-[10px] my-0">
            Home &gt; Bus Tickets &gt; this.departure Bus &gt; this.departure to this.arrival
        </p>
        <p class=" mx-[10px] my-0">
            Fare Starts from INR 100
        </p>
    </div>
    <div class="HeaderTwo p-[10px] ">
        <h3 class="inline-block mr-[10px]">
            Departure to this.arrival on this.date
        </h3>
        <button class=" p-[5px] w-[100px] bg-[#f8f4f4] border-[1px] border-black outline-none rounded-sm">Next</button>
    </div>
</div>
  )
}

export default SelectHeader
