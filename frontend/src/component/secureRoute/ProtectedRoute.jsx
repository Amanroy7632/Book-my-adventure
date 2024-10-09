import React from 'react'
import { useCurrentUser } from '../../context/userContext.jsx'
import { Navigate, Outlet } from 'react-router-dom'

import Landing from '../home/Animation/Landing.jsx';

function ProtectedRoute({children}) {
    const {currentUser,isLoading} =useCurrentUser();
    if (isLoading) {
      return <Landing/>;
    }
    if (!currentUser) {
      return <Navigate to={"/exception"}/>;
    }
  return children || <Outlet/>;
}
export default ProtectedRoute
