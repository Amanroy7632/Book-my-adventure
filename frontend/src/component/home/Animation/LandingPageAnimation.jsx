// LoadingAnimation.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // If you're using react-router for navigation
import Loader from "../../loader/Loader";

const LoadingAnimation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // Redirect to the landing page after 3 seconds
    }, 2500);
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen " style={{backgroundImage:"url(https://images.unsplash.com/photo-1517606400858-ba377e7e66d7?q=80&w=2036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundPosition:"center",
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover"
    }}>
      <div className="  h-full flex  justify-center items-center select-none">
        <div className=" flex flex-col gap-3 items-center">
            <div className=" flex flex-col items-center gap-2">
                <h1 className=" text-3xl font-semibold text-white">Welcome To India's No. 1 Online Bus Ticket Booking Site</h1>
                <h1 className=" text-5xl font-semibold  text-orange-500">Book <span className=" text-white">my</span> <span className=" underline underline-offset-2 text-green-600">Adventure</span></h1>
            </div>
          <div className="animate-spin rounded-full h-28 w-28 border-t-4 border-b-4 border-green-600"></div>
          <Loader />
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
