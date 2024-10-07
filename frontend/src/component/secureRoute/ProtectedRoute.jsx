import React from 'react'
import { useCurrentUser } from '../../context/userContext.jsx'
import { Navigate, Outlet } from 'react-router-dom'
import Loader from '../loader/Loader.jsx';

function ProtectedRoute({children}) {
    const {currentUser,isLoading} =useCurrentUser();
    if (isLoading) {
      return <Loader/>;
    }
    if (!currentUser) {
      return <Navigate to={"/exception"}/>;
    }
  return children || <Outlet/>;
}
export default ProtectedRoute
