import React from 'react'
import {Button} from "../commonUi/index.js"
const Alert = ({ message, onClose }) => {
  return (
    <div className="custom-alert-overlay z-50 fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
      <div className="custom-alert bg-white p-[20px] rounded-md text-center">
        <p className='mb-[20px]'>{message}</p>
        <form onSubmit={onClose}>
         <Button type='submit' className=' px-[20px] py-[10px] border-none bg-[#007bff] text-white rounded-md cursor-pointer'>OK</Button>
        </form>
      </div>
    </div>
  )
}

export default Alert
