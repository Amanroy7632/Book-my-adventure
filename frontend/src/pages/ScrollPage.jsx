import React, { useRef } from 'react';

const ScrollExample = () => {
  // Create a reference for the section to scroll to
  const sectionRef = useRef(null);

  // Function to handle scrolling to the section
  const scrollToSection = () => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Button to trigger the scroll */}
      <button
        onClick={scrollToSection}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Scroll to Section
      </button>

      {/* Lots of content to demonstrate scrolling */}
      <div style={{ height: '1000px' }} className="bg-gray-100">
        <p>Scroll down to see the magic!</p>
      </div>

      {/* Target section */}
      <div
        ref={sectionRef}
        className="p-10 bg-green-500 text-white text-center"
      >
        <h2>You've reached the section!</h2>
      </div>

      {/* Extra content for more scrolling */}
      <div style={{ height: '1000px' }} className="bg-gray-100">
        <p>Keep scrolling...</p>
      </div>
    </div>
  );
};

export default ScrollExample;
