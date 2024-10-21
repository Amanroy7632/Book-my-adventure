// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import io from "socket.io-client";
// import { BASE_URL } from "../../constraints";

// // Initialize socket connection
// const socket = io(BASE_URL.replace("/api/v1", ''));

// // A custom component to update the map's center when position changes
// const RecenterMap = ({ center }) => {
//   const map = useMap(); // Get access to the Leaflet map instance

//   useEffect(() => {
//     if (center) {
//       map.setView(center, 16); // Recenter the map to the new position
//     }
//   }, [center, map]);

//   return null;
// };

// const MapComponent = () => {
//   const [currentPosition, setCurrentPosition] = useState([0, 0]);
//   const [users, setUsers] = useState([
//     {
//       id:1,
//       longitude:25.5483,
//       latitude:85.0484
//     },
//     {
//       id:2,
//       latitude:25.5483,
//       longitude:85.0485
//     },
//     {
//       id:3,
//       latitude:25.5483,
//       longitude:85.0487
//     },
//     {
//       id:4,
//       longitude:25.5483,
//       latitude:85.0486
//     },
//   ]);

//   // Get the user's current location and emit it to the server
//   useEffect(() => {
//     if (navigator.geolocation) {
//       const watchId = navigator.geolocation.watchPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           const locationData = { latitude, longitude };
//           setCurrentPosition([latitude, longitude]);

//           // Send location to the server
//           socket.emit("location", locationData);
//         },
//         (error) => {
//           console.error("Error retrieving location:", error);
//         },
//         {
//           enableHighAccuracy: true,
//           timeout: 5000,
//           maximumAge: 0,
//         }
//       );

//       // Clean up geolocation watch when component unmounts
//       return () => navigator.geolocation.clearWatch(watchId);
//     }
//   }, []);

//   // Listen for location updates from the server for other users
//   useEffect(() => {
//     socket.on("locationUpdate", (locationData) => {
//       setUsers((prevUsers) => {
//         // Check if the user already exists in the state
//         const existingUserIndex = prevUsers.findIndex(
//           (user) => user.id === locationData.id // Ensure locationData includes a unique user `id`
//         );

//         if (existingUserIndex !== -1) {
//           // If user exists, update their location
//           const updatedUsers = [...prevUsers];
//           updatedUsers[existingUserIndex] = locationData;
//           return updatedUsers;
//         }

//         // If user does not exist, add them
//         return [...prevUsers, locationData];
//       });
//     });

//     // Listen for the "userDisconnected" event and remove the user from the state
//     socket.on("userDisconnected", (userId) => {
//       setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
//     });

//     // Clean up the socket events when component unmounts
//     return () => {
//       socket.off("locationUpdate");
//       socket.off("userDisconnected");
//     };
//   }, []);

//   console.log(users);
//   return (
//     <div className="flex justify-center items-center">
//       <MapContainer center={currentPosition} zoom={16} className="h-96 w-full">
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="&copy; Book My Adventure"
//         />

//         {/* Marker for the current user */}
//         <Marker position={currentPosition} key={currentPosition.join(",")}>
//           <Popup>You are here</Popup>
//         </Marker>

//         {/* Markers for other users */}

//         {users.map((user, index) => (
//           <Marker key={user.id || index} position={[user?.latitude, user?.longitude]}>
//             <Popup>Other user at [{user.latitude}, {user.longitude}]</Popup>
//           </Marker>
//         ))}

//         {/* This component will recenter the map when the currentPosition changes */}
//         <RecenterMap center={currentPosition} />
//       </MapContainer>
//     </div>
//   );
// };

// export default MapComponent;

// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import io from "socket.io-client";
// import { BASE_URL } from "../../constraints";
// import { useBusContext } from "../../context/busContext";

// // Initialize socket connection
// const socket = io(BASE_URL.replace("/api/v1", ''));

// // A custom component to update the map's center when position changes
// const RecenterMap = ({ center }) => {
//   const map = useMap(); // Get access to the Leaflet map instance

//   useEffect(() => {
//     if (center) {
//       map.setView(center, 16); // Recenter the map to the new position
//     }
//   }, [center, map]);

//   return null;
// };

// const MapComponent = () => {
//   const [currentPosition, setCurrentPosition] = useState([0, 0]);
//   const [users, setUsers] = useState([
//     {
//       id: 1,
//       longitude: 25.5483,
//       latitude: 85.0484
//     },
//     {
//       id: 2,
//       latitude: 25.5483,
//       longitude: 85.0485
//     },
//     {
//       id: 3,
//       latitude: 25.5483,
//       longitude: 85.0487
//     },
//     {
//       id: 4,
//       longitude: 25.5483,
//       latitude: 85.0486
//     },
//   ]);
//   const {busDetails} =useBusContext();

//   // User data to send to the server (replace with actual user data)
//   const busData = {
//     busno: busDetails?.busno, // Replace with dynamic data
//     busname: busDetails?.busname, // Replace with dynamic data
//     busId: busDetails?._id, // Replace with dynamic data
//     totalSeats: busDetails?.totalSeat, // Replace with dynamic data
//   };

//   // Emit user data on socket connection
//   useEffect(() => {
//     // Emit user data once the component is mounted
//     socket.emit('registerBus', busData);

//     // Listen for location updates from the server for other users
//     socket.on("locationUpdate", (locationData) => {
//       setUsers((prevUsers) => {
//         const existingUserIndex = prevUsers.findIndex(
//           (user) => user.id === locationData.id // Ensure locationData includes a unique user `id`
//         );

//         if (existingUserIndex !== -1) {
//           // If user exists, update their location
//           const updatedUsers = [...prevUsers];
//           updatedUsers[existingUserIndex] = locationData;
//           return updatedUsers;
//         }

//         // If user does not exist, add them
//         return [...prevUsers, locationData];
//       });
//     });

//     // Listen for the "userDisconnected" event and remove the user from the state
//     socket.on("userDisconnected", (userId) => {
//       setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
//     });

//     // Clean up the socket events when component unmounts
//     return () => {
//       socket.off("locationUpdate");
//       socket.off("userDisconnected");
//     };
//   }, []);

//   // Get the user's current location and emit it to the server
//   useEffect(() => {
//     if (navigator.geolocation) {
//       const watchId = navigator.geolocation.watchPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           const locationData = { latitude, longitude };
//           setCurrentPosition([latitude, longitude]);

//           // Send location to the server
//           socket.emit("location", locationData);
//         },
//         (error) => {
//           console.error("Error retrieving location:", error);
//         },
//         {
//           enableHighAccuracy: true,
//           timeout: 5000,
//           maximumAge: 0,
//         }
//       );

//       // Clean up geolocation watch when component unmounts
//       return () => navigator.geolocation.clearWatch(watchId);
//     }
//   }, []);
//   useEffect(() => {
//     // Existing socket listeners...

//     // Listen for bus data from the server
//     socket.on("busRegistered", (busData) => {
//       console.log('Bus data received:', busData);
//       // Handle bus data (e.g., store it in state or display it on the map)
//     });

//     // Clean up the socket events when component unmounts
//     return () => {
//       socket.off("busData");
//       // Other off listeners...
//     };
//   }, []);

//   console.log(users);
//   return (
//     <div className="flex justify-center items-center">
//       <MapContainer center={currentPosition} zoom={16} className="h-96 w-full">
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="&copy; Book My Adventure"
//         />

//         {/* Marker for the current user */}
//         <Marker position={currentPosition} key={currentPosition.join(",")}>
//           <Popup>You are here</Popup>
//         </Marker>

//         {/* Markers for other users */}
//         {users.map((user, index) => (
//           <Marker key={user.id || index} position={[user?.latitude, user?.longitude]}>
//             <Popup>Other user at [{user.latitude}, {user.longitude}]</Popup>
//           </Marker>
//         ))}

//         {/* This component will recenter the map when the currentPosition changes */}
//         <RecenterMap center={currentPosition} />
//       </MapContainer>
//     </div>
//   );
// };

// export default MapComponent;

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import io from "socket.io-client";
import { BASE_URL } from "../../constraints";
import { useBusContext } from "../../context/busContext";

// Initialize socket connection
const socket = io(BASE_URL.replace("/api/v1", ""));

// A custom component to update the map's center when position changes
const RecenterMap = ({ center }) => {
  const map = useMap(); // Get access to the Leaflet map instance

  useEffect(() => {
    if (center) {
      map.setView(center, 16); // Recenter the map to the new position
    }
  }, [center, map]);

  return null;
};

const MapComponent = () => {
  const [currentPosition, setCurrentPosition] = useState([0, 0]);
  const [buses, setBuses] = useState([
    {
      busId: "66d192def9b46d93679467e0",
      busNumber: "678909",
      busName: "Jalmagan Xpress",
      totalSeats: 37,
      latitude: 25.234,
      longitude: 85.345,
    },
  ]); // Store bus data and locations
  const { busDetails } = useBusContext();

  // Bus data to send to the server
  const busData = {
    busId: busDetails?._id, // Replace with dynamic data
    busNumber: busDetails?.busno, // Replace with dynamic data
    busName: busDetails?.busname, // Replace with dynamic data
    totalSeats: busDetails?.totalSeat, // Replace with dynamic data
  };

  // Emit bus registration on component mount
  useEffect(() => {
    if (busData.busId) {
      // Emit bus registration data to the server
      socket.emit("registerBus", busData);
    }

    // Listen for location updates from the server for other buses
    socket.on("locationUpdate", (locationData) => {
      setBuses((prevBuses) => {
        const existingBusIndex = prevBuses.findIndex(
          (bus) => bus.busId === locationData.busId // Ensure locationData includes a unique `busId`
        );

        if (existingBusIndex !== -1) {
          // If bus exists, update their location
          const updatedBuses = [...prevBuses];
          updatedBuses[existingBusIndex] = locationData;
          return updatedBuses;
        }

        // If bus does not exist, add them
        return [...prevBuses, locationData];
      });
    });

    // Listen for the "userDisconnected" event and remove the bus from the state
    socket.on("userDisconnected", (userId) => {
      setBuses((prevBuses) => prevBuses.filter((bus) => bus.busId !== userId));
    });

    // Clean up the socket events when component unmounts
    return () => {
      socket.off("locationUpdate");
      socket.off("userDisconnected");
    };
  }, [busData.busId]);

  // Get the user's current location and emit it to the server
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationData = { latitude, longitude };
          setCurrentPosition([latitude, longitude]);

          // Send location to the server
          socket.emit("location", locationData);
        },
        (error) => {
          console.error("Error retrieving location:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );

      // Clean up geolocation watch when component unmounts
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  // Handle bus registration confirmation from the server
  useEffect(() => {
    socket.on("busRegistered", (registeredBusData) => {
      console.log("Bus registered on server:", registeredBusData);
      // Optionally, store or display the registered bus data if needed
    });

    return () => {
      socket.off("busRegistered");
    };
  }, []);

  console.log(buses);

  return (
    <div className="flex justify-center items-center">
      <MapContainer center={currentPosition} zoom={16} className="h-96 w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; Book My Adventure"
        />

        {/* Marker for the current user (bus) */}
        <Marker position={currentPosition} key={currentPosition.join(",")}>
          <Popup>
            Bus Number: {busDetails.busno} <br />
            Bus Name: {busDetails.busname} <br />
            Location: {busDetails?.locationName} <br />
            Coordinates: {currentPosition}
          </Popup>
        </Marker>

        {/* Markers for other buses */}
        {buses.map((bus, index) => (
          <Marker
            key={bus.busId || index}
            position={[bus.latitude, bus.longitude]}
          >
            <Popup>
              Bus Number: {bus.busNumber} <br />
              Bus Name: {bus.busName} <br />
              Location: {bus.locationName} <br />
              Coordinates: [{bus.latitude}, {bus.longitude}]
            </Popup>
          </Marker>
        ))}

        {/* This component will recenter the map when the currentPosition changes */}
        <RecenterMap center={currentPosition} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
