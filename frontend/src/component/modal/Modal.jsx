import React from 'react'

const Modal = ({children}) => {
  return (
    <div className=' z-50 fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center overflow-hidden'>
      {children}
    </div>
  )
}

export default Modal
