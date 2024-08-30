import React from 'react'
import "./spinner.css"
const Spinner = () => {
  return (
    <div className=' relative flex justify-center items-center min-h-[90vh]  z-50'>
        <div className="skype-loader flex items-center">
            <div className="dot">
              <div className="first"></div>
            </div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
    </div> 
  )
}

export default Spinner
