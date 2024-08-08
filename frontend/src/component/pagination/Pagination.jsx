import React from "react";
import {Button} from "../commonUi/index.js"

function Pagination({ currentPage, totalPages, onPageChange,className="" }) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
    console.log(currentPage);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
    console.log(currentPage);
  };
  if (!totalPages) {
    return ""
  }
  return (
    <div className={`flex justify-center items-center space-x-4 mt-6 ${className}`}>
      <Button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-4 py-2 border rounded-md font-bold dark:text-black  ${
          currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
        }`}
      >
        &lt;
      </Button>
      <span className="text-lg">
        {currentPage} / {totalPages}
      </span>
      <Button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 border rounded-md font-bold ${
          currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"
        }`}
      >
        &gt;
      </Button>
    </div>
  );
}

export default Pagination;
