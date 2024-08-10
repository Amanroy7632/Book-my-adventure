import React from 'react'
import { useCurrentUser } from '../../context/userContext.jsx'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({element}) {
    const {currentUser} =useCurrentUser()
    // if (currentUser.email) {
    //     return <Navigate to={"/"} replace />
    // }
  return element
}
export default ProtectedRoute
