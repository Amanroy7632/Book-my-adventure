import React from "react";
import { useCurrentUser } from "../../context/userContext";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ element }) => {
  const { currentUser } = useCurrentUser();
  if (currentUser) {
    console.log("Public Route wala navigate");
    
     return <Navigate to={"/"} replace />;
  }
  return element;
};

export default PublicRoute;
