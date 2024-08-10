import React from 'react'

const SelectHeader = ({arrival,departure,date}) => {
  return (
    <div className="Header">
    <div className="HeaderOne  bg-[#f8f4f4] p-[10px] mb-[10px]">
        <p className=" mx-[10px] my-0">
            Home &gt; Bus Tickets &gt; {departure} Bus &gt; {departure} to {arrival}
        </p>
        <p className=" mx-[10px] my-0">
            Fare Starts from INR 100
        </p>
    </div>
    <div className="HeaderTwo p-[10px] ">
        <h3 className="inline-block mr-[10px]">
            Departure to {departure} on {date}
        </h3>
        <button className=" p-[5px] w-[100px] bg-[#f8f4f4] border-[1px] border-black outline-none rounded-sm">Next</button>
    </div>
</div>
  )
}

export default SelectHeader
