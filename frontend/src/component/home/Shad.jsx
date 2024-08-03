import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const Modal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Add event listener to close modal on outside click
      window.addEventListener('click', handleClickOutside);
    } else {
      // Remove event listener when modal is closed
      window.removeEventListener('click', handleClickOutside);
    }
    return () => {
      // Cleanup event listener on component unmount
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content" ref={modalRef}>
        <h2>Modal Title</h2>
        <p>This is the modal content.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const ShadowDiv = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <button onClick={openModal}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default ShadowDiv;

