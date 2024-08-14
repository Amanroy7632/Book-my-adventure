import React from 'react'

const Spinner = () => {
  return (
    <div className='custom-alert-overlay z-50 fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center"'>
    <div className=' flex justify-center items-center'>
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-700"></div>
    </div>
    </div>
  )
}

export default Spinner
