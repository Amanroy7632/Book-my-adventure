import React from 'react'
import "./pre.css"
const Landing = () => {
  return (
    <div className=' bg-[#BD3B4A] w-screen h-screen overflow-hidden'>
      <div className='body'>
        <span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </span>
        <div className='base'>
            <span></span>
            <div className='face'></div>
        </div>
    </div>
    <div className='longfazers'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
    {/* <h2 classNameName=" text-3xl font-semibold text-white">Welcome To India's No. 1 Online Bus Ticket Booking Site</h2> */}
    {/* <h1 classNameName=" text-5xl font-semibold  text-orange-500">Book <span classNameName=" text-white">my</span> <span
            classNameName=" underline underline-offset-2 text-green-600">Adventure</span></h1> */}
    <h1 className='loading-h1' >Loading...</h1>
    {/* <div classNameName=' w-4 h-4 rounded-full border-r-2 border-l-2 border-gray-200 animate-spin'></div> */}
    </div>
  )
}

export default Landing
