// import React from "react";
// import Logo from "../logo/Logo";

// const Footer = () => {
//   return (
//     <footer className="flex flex-col bg-white-100 py-16 items-center">
//       <div className="flex flex-col-reverse md:text-base text-sm md:flex-col w-full px-6 md:px-0 md:w-[80%] max-w-[1300px]">
//         <div className=" flex justify-between items-center max-md:grid lg:grid-cols-4 max-md:grid-cols-2 gap-1">
//           <ul className="flex flex-col gap-2">
//             <li className="text-xl font-bold">Top RTCs</li>
//             <li>
//               <a href="">APSRTC</a>
//             </li>
//             <li>
//               <a href="">GSRTC</a>
//             </li>
//             <li>
//               <a href="">MSRTC</a>
//             </li>
//             <li>
//               <a href="">TNSTC</a>
//             </li>
//             <li>
//               <a href="">View All</a>
//             </li>
//           </ul>

//           <ul className="flex flex-col gap-2">
//             <li className="text-xl font-bold">Others</li>
//             <li>
//               <a href="">TSRTC</a>
//             </li>
//             <li>
//               <a href="">SBSTC</a>
//             </li>
//             <li>
//               <a href="">RSRTC</a>
//             </li>
//             <li>
//               <a href="">Kerala RTC</a>
//             </li>
//             <li>
//               <a href="">View All</a>
//             </li>
//           </ul>

//           <ul className="flex flex-col gap-2">
//             <li className="text-xl font-bold">Top bus routes</li>
//             <li>
//               <a href="">Hyderabad to Bangalore Bus</a>
//             </li>
//             <li>
//               <a href="">Bangalore to Chennai Bus</a>
//             </li>
//             <li>
//               <a href="">Pune to Bangalore Bus</a>
//             </li>
//             <li>
//               <a href="">Mumbai to Bangalore Bus</a>
//             </li>
//             <li>
//               <a href="">View All</a>
//             </li>
//           </ul>

//           <ul className="flex flex-col gap-2">
//             <li className="text-xl font-bold">Top cities</li>
//             <li>
//               <a href="">Hyderabad Bus Tickets</a>
//             </li>
//             <li>
//               <a href="">Bangalore Bus Tickets</a>
//             </li>
//             <li>
//               <a href="">Chennai Bus Tickets</a>
//             </li>
//             <li>
//               <a href="">Pune Bus Tickets</a>
//             </li>
//             <li>
//               <a href="">View All</a>
//             </li>
//           </ul>

//           <ul className="flex flex-col gap-2">
//             <li className="text-xl font-bold">redRail</li>
//             <li>
//               <a href="">Book Train Tickets</a>
//             </li>
//             <li>
//               <a href="">PNR Status</a>
//             </li>
//             <li>
//               <a href="">Live Train Status</a>
//             </li>
//             <li>
//               <a href="">Train Seat Availability</a>
//             </li>
//             <li>
//               <a href="">Trains between Stations</a>
//             </li>
//           </ul>
//         </div>

//         <hr className="my-8" />

//           <div className="flex gap-16 py-2 ">
//             <div>
//               <Logo/>
//             </div>
//             <p>
//               tedbus is the world's largest online bus ticket booking service
//               trusted by over 25 million happy customers globally. tedbus offers
//               bus ticket booking through its website, iOS and Android mobile
//               apps for all major routes.
//             </p>
//           </div>
//         <div className="grid lg:grid-cols-4 max-md:grid-cols-2 gap-1 max-sm:grid-cols-1">

//           <ul className="flex flex-col gap-2 max-sm:grid grid-cols-2">
//             <li className="text-xl font-bold">About us</li>
            
//             <li>
//               <a href="">Investor Relations</a>
//             </li>
//             <li>
//               <a href="">Contact us</a>
//             </li>
//             <li>
//               <a href="">Mobile version</a>
//             </li>
//             <li>
//               <a href="">tedbus on mobile</a>
//             </li>
//             <li>
//               <a href="">Sitemap</a>
//             </li>
//             <li>
//               <a href="">Offers</a>
//             </li>
//             <li>
//               <a href="">Careers</a>
//             </li>
//             <li>
//               <a href="">Values</a>
//             </li>
//           </ul>

//           <ul className="flex flex-col gap-2 max-sm:grid grid-cols-2">
//             <li className="text-xl font-bold">Info</li>
//             <li>
//               <a href="">T&C</a>
//             </li>
//             <li>
//               <a href="">Privacy policy</a>
//             </li>
//             <li>
//               <a href="">FAQ</a>
//             </li>
//             <li>
//               <a href="">Blog</a>
//             </li>
//             <li>
//               <a href="">Bus operator registration</a>
//             </li>
//             <li>
//               <a href="">Agent registration</a>
//             </li>
//             <li>
//               <a href="">Insurance partner</a>
//             </li>
//             <li>
//               <a href="">User agreement</a>
//             </li>
//           </ul>

//           <ul className="flex flex-col gap-2 max-sm:grid grid-cols-2">
//             <li className="text-xl font-bold">Global Sites</li>
//             <li>
//               <a href="">India</a>
//             </li>
//             <li>
//               <a href="">Singapore</a>
//             </li>
//             <li>
//               <a href="">Malaysia</a>
//             </li>
//             <li>
//               <a href="">Indonesia</a>
//             </li>
//             <li>
//               <a href="">Peru</a>
//             </li>
//             <li>
//               <a href="">Colombia</a>
//             </li>
//           </ul>

//           <ul className="flex flex-col gap-2 max-sm:grid grid-cols-2">
//             <li className="text-xl font-bold">Our Partners</li>
//             <li>
//               <a href="">Goibibo Bus</a>
//             </li>
//             <li>
//               <a href="">Goibibo Hotels</a>
//             </li>
//             <li>
//               <a href="">Makemytrip Bus</a>
//             </li>
//             <li>
//               <a href="">Makemytrip Hotels</a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from "react";
import Logo from "../logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
          <div className="w-full  mb-8 md:mb-0">
            <Logo />
            <p className="text-gray-700 mt-4">
            Book my Adventure is the world's largest online bus ticket booking service
              trusted by over 25 million happy customers globally. Book my Adventureus offers
              bus ticket booking through its website, iOS, and Android mobile
              apps for all major routes.
            </p>
          </div>
        <div className="flex flex-wrap justify-between">
          {/* Logo and description */}

          {/* Top RTCs and Other links */}
          <div className="w-full md:w-1/3 flex flex-wrap justify-between">
            <div className="w-1/2 mb-8 md:mb-0">
              <h3 className="text-lg font-semibold mb-4">Top RTCs</h3>
              <ul>
                <li><a href="" className="text-gray-700 hover:text-orange-500">APSRTC</a></li>
                <li><a href="" className="text-gray-700 hover:text-orange-500">GSRTC</a></li>
                <li><a href="" className="text-gray-700 hover:text-orange-500">MSRTC</a></li>
                <li><a href="" className="text-gray-700 hover:text-orange-500">TNSTC</a></li>
                <li><a href="" className="text-gray-700 hover:text-orange-500">View All</a></li>
              </ul>
            </div>
            <div className="w-1/2">
              <h3 className="text-lg font-semibold mb-4">Others</h3>
              <ul>
                <li><a href="" className="text-gray-700 hover:text-orange-500">TSRTC</a></li>
                <li><a href="" className="text-gray-700 hover:text-orange-500">SBSTC</a></li>
                <li><a href="" className="text-gray-700 hover:text-orange-500">RSRTC</a></li>
                <li><a href="" className="text-gray-700 hover:text-orange-500">Kerala RTC</a></li>
                <li><a href="" className="text-gray-700 hover:text-orange-500">View All</a></li>
              </ul>
            </div>
          </div>

          {/* Top Bus Routes and Top Cities */}
          <div className="w-full md:w-1/3 flex flex-wrap justify-between">
            <div className="w-1/2 mb-8 md:mb-0">
              <h3 className="text-lg font-semibold mb-4">Top Bus Routes</h3>
              <ul>
                <li><a href="" className="text-gray-700 hover:text-orange-500">Hyderabad to Bangalore</a></li>
                <li><a href="" className="text-gray-700 hover:text-orange-500">Bangalore to Chennai</a></li>
                <li><a href="" className="text-gray-700 hover:text-orange-500">Pune to Bangalore</a></li>
                <li><a href="" className="text-gray-700 hover:text-orange-500">Mumbai to Bangalore</a></li>
                <li><a href="" className="text-gray-700 hover:text-orange-500">View All</a></li>
              </ul>
            </div>
            <div className="w-1/2">
              <h3 className="text-lg font-semibold mb-4">Top Cities</h3>
              <ul>
                <li><a href="" className="text-gray-700 hover:text-orange-500">Hyderabad Bus Tickets</a></li>
                <li><a href="" className="text-gray-700 hover:text-orange-500">Bangalore Bus Tickets</a></li>
                <li><a href="" className="text-gray-700 hover:text-orange-500">Chennai Bus Tickets</a></li>
                <li><a href="" className="text-gray-700 hover:text-orange-500">Pune Bus Tickets</a></li>
                <li><a href="" className="text-gray-700 hover:text-orange-500">View All</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between">
          {/* Global Sites */}
          <div className="mb-8 md:mb-0 md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Global Sites</h3>
            <ul>
              <li><a href="" className="text-gray-700 hover:text-orange-500">India</a></li>
              <li><a href="" className="text-gray-700 hover:text-orange-500">Singapore</a></li>
              <li><a href="" className="text-gray-700 hover:text-orange-500">Malaysia</a></li>
              <li><a href="" className="text-gray-700 hover:text-orange-500">Indonesia</a></li>
              <li><a href="" className="text-gray-700 hover:text-orange-500">Peru</a></li>
              <li><a href="" className="text-gray-700 hover:text-orange-500">Colombia</a></li>
            </ul>
          </div>

          {/* Partners */}
          <div className="md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Our Partners</h3>
            <ul>
              <li><a href="" className="text-gray-700 hover:text-orange-500">Goibibo Bus</a></li>
              <li><a href="" className="text-gray-700 hover:text-orange-500">Goibibo Hotels</a></li>
              <li><a href="" className="text-gray-700 hover:text-orange-500">Makemytrip Bus</a></li>
              <li><a href="" className="text-gray-700 hover:text-orange-500">Makemytrip Hotels</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-200 py-4 mt-8">
        <div className="container mx-auto text-center text-gray-600">
          © 2024 Book my Adventure. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
