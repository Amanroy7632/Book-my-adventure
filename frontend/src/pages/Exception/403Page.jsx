import React from 'react';
import { Link } from 'react-router-dom';
import './Forbidden403.css'; 

const Forbidden403 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      
      <div className="text-center">
        <h1 className="text-7xl font-bold text-gray-800 animate-bounce">403</h1>
        <h2 className="text-3xl font-semibold text-gray-600 mt-4">Forbidden</h2>
        <p className="text-lg text-gray-500 mt-2">Sorry, you don't have permission to access this page.</p>
        
     
        <div className="mt-8 animate-spin-slow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-red-500 mx-auto"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19.428 15.341A8 8 0 1 1 15.34 3.572"></path>
            <path d="M22 12h-4"></path>
          </svg>
        </div>

       
        <Link to="/" className="mt-6 inline-block px-6 py-3 text-white bg-red-500 rounded-full hover:bg-red-600 transition-all">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden403;

