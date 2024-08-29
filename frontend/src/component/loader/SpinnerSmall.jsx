import React from 'react'

function SpinnerSmall({className}) {
  return (
    <div className={`${className} animate-spin rounded-full h-4 w-4 border-t-4 border-b-4 border-blue-700`}></div>
  )
}

export default SpinnerSmall
