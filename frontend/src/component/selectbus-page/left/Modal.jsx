// Modal.js
import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-30 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white relative p-6 rounded-lg shadow-lg max-sm:w-2/3 w-1/3 md:w-1/3 lg:w-1/3">
        <button
          className="absolute text-red-400 top-2 right-2 text-xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
