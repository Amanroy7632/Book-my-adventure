// import React from 'react';

// const CabRentalPage = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-800">
//       {/* Header */}
//       <header className="bg-blue-900 text-white py-4">
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-3xl font-bold">Book My Cab</h1>
//           <nav className="space-x-4">
//             <a href="#home" className="hover:text-gray-300">Home</a>
//             <a href="#services" className="hover:text-gray-300">Services</a>
//             <a href="#fleet" className="hover:text-gray-300">Our Fleet</a>
//             <a href="#contact" className="hover:text-gray-300">Contact</a>
//           </nav>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section id="home" className="bg-white py-12">
//         <div className="container mx-auto text-center">
//           <h2 className="text-4xl font-semibold mb-4">Rent a Cab Anytime, Anywhere</h2>
//           <p className="text-lg mb-6">Choose from a wide range of cabs to suit your needs.</p>
//           <button className="bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800">Book Now</button>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section id="services" className="py-12 bg-gray-100">
//         <div className="container mx-auto">
//           <h2 className="text-3xl font-semibold text-center mb-8">Our Services</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-bold mb-4">Airport Transfers</h3>
//               <p>Reliable and comfortable airport pick-up and drop-off services.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-bold mb-4">City Tours</h3>
//               <p>Explore the city with our professional chauffeurs.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-bold mb-4">Hourly Rentals</h3>
//               <p>Rent a cab by the hour for your convenience.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Our Fleet Section */}
//       <section id="fleet" className="py-12 bg-white">
//         <div className="container mx-auto">
//           <h2 className="text-3xl font-semibold text-center mb-8">Our Fleet</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-gray-100 p-6 rounded-lg shadow-md">
//               <img src="sedan.jpg" alt="Sedan" className="w-full h-40 object-cover rounded-md mb-4" />
//               <h3 className="text-xl font-bold mb-2">Sedan</h3>
//               <p>Perfect for small groups and business trips.</p>
//             </div>
//             <div className="bg-gray-100 p-6 rounded-lg shadow-md">
//               <img src="suv.jpg" alt="SUV" className="w-full h-40 object-cover rounded-md mb-4" />
//               <h3 className="text-xl font-bold mb-2">SUV</h3>
//               <p>Ideal for families and off-road adventures.</p>
//             </div>
//             <div className="bg-gray-100 p-6 rounded-lg shadow-md">
//               <img src="luxury.jpg" alt="Luxury" className="w-full h-40 object-cover rounded-md mb-4" />
//               <h3 className="text-xl font-bold mb-2">Luxury</h3>
//               <p>Experience premium comfort and style.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section id="contact" className="py-12 bg-blue-900 text-white">
//         <div className="container mx-auto text-center">
//           <h2 className="text-3xl font-semibold mb-6">Get in Touch</h2>
//           <p className="mb-4">Contact us for more information or to book a cab.</p>
//           <button className="bg-white text-blue-900 px-6 py-3 rounded-md hover:bg-gray-300">Contact Us</button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-gray-400 py-6">
//         <div className="container mx-auto text-center">
//           <p>&copy; 2024 Cab Rental. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default CabRentalPage;



import React, { useState } from 'react';

const CabRentalPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-blue-900 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Book My Cab</h1>
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
          <nav
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } md:flex md:space-x-4 space-y-4 md:space-y-0 absolute md:static bg-blue-900 w-full md:w-auto top-full left-0 md:left-auto md:top-auto p-4 md:p-0`}
          >
            <a href="#home" className="block md:inline hover:text-gray-300">
              Home
            </a>
            <a href="#services" className="block md:inline hover:text-gray-300">
              Services
            </a>
            <a href="#fleet" className="block md:inline hover:text-gray-300">
              Our Fleet
            </a>
            <a href="#contact" className="block md:inline hover:text-gray-300">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-white py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-4">Rent a Cab Anytime, Anywhere</h2>
          <p className="text-lg mb-6">Choose from a wide range of cabs to suit your needs.</p>
          <button className="bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800">Book Now</button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img src="https://www.internationalairportreview.com/wp-content/uploads/Deepturn_persfoto.webp" alt="airpot" className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-bold mb-4">Airport Transfers</h3>
              <p>Reliable and comfortable airport pick-up and drop-off services.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img src="https://ik.imgkit.net/3vlqs5axxjf/TW/ik-seo/uploadedImages/Art/2023/0403/T0403TOOTBUS1_C_HR/Day-tours-bounce-back-in-big-cities-but-recovery-i.jpg?tr=w-780%2Ch-440%2Cfo-auto" alt="airpot" className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-bold mb-4">City Tours</h3>
              <p>Explore the city with our professional chauffeurs.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img src="https://gos3.ibcdn.com/img-1658318593.jpg" alt="airpot" className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-bold mb-4">Hourly Rentals</h3>
              <p>Rent a cab by the hour for your convenience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Fleet Section */}
      <section id="fleet" className="py-12 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-8">Our Fleet</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <img src="https://imgd-ct.aeplcdn.com/664x415/n/cw/ec/131145/s90-exterior-right-front-three-quarter-4.jpeg?isig=0&q=80" alt="Sedan" className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-bold mb-2">Sedan</h3>
              <p>Perfect for small groups and business trips.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <img src="https://imgd.aeplcdn.com/600x337/n/cw/ec/42355/xuv700-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80" alt="SUV" className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-bold mb-2">SUV</h3>
              <p>Ideal for families and off-road adventures.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <img src="https://imgd.aeplcdn.com/600x337/n/cw/ec/44709/fortuner-exterior-right-front-three-quarter-20.jpeg?isig=0&q=80" alt="Luxury" className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-bold mb-2">Luxury</h3>
              <p>Experience premium comfort and style.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 bg-blue-900 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Get in Touch</h2>
          <p className="mb-4">Contact us for more information or to book a cab.</p>
          <button className="bg-white text-blue-900 px-6 py-3 rounded-md hover:bg-gray-300">Contact Us</button>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gray-800 text-gray-400 py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Cab Rental. All rights reserved.</p>
        </div>
      </footer> */}
    </div>
  );
};

export default CabRentalPage;













// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaBars, FaTimes } from "react-icons/fa";
// // import "./CabRentalPage.css"; // Assuming you have a CSS file for any additional styling

// const CabRentalPage = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Cab Rentals</h1>
//         <button className="text-2xl md:hidden" onClick={toggleMenu}>
//           {isMenuOpen ? <FaTimes /> : <FaBars />}
//         </button>
//         <nav className={`flex-col md:flex-row md:flex items-center ${isMenuOpen ? "flex" : "hidden"} md:block`}>
//           <Link to="/" className="px-3 py-2 hover:bg-blue-700">Home</Link>
//           <Link to="/rentals" className="px-3 py-2 hover:bg-blue-700">Rentals</Link>
//           <Link to="/about" className="px-3 py-2 hover:bg-blue-700">About Us</Link>
//           <Link to="/contact" className="px-3 py-2 hover:bg-blue-700">Contact</Link>
//         </nav>
//       </header>

//       <main className="p-6">
//         <section className="mb-8">
//           <h2 className="text-xl font-semibold mb-4">Available Cabs</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {/* Example cab cards */}
//             <div className="p-4 bg-white rounded shadow">
//               <h3 className="font-semibold text-lg mb-2">Cab Model A</h3>
//               <p className="text-gray-700">Seats: 4</p>
//               <p className="text-gray-700">Price: $50/day</p>
//               <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Book Now</button>
//             </div>
//             <div className="p-4 bg-white rounded shadow">
//               <h3 className="font-semibold text-lg mb-2">Cab Model B</h3>
//               <p className="text-gray-700">Seats: 6</p>
//               <p className="text-gray-700">Price: $75/day</p>
//               <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Book Now</button>
//             </div>
//             {/* More cabs can be added here */}
//           </div>
//         </section>
//       </main>

//       <footer className="bg-blue-600 text-white text-center p-4">
//         © 2024 Cab Rentals
//       </footer>
//     </div>
//   );
// };

// export default CabRentalPage;

