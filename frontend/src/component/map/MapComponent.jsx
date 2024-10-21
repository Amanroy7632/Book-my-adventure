import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import io from "socket.io-client";
import { BASE_URL } from "../../constraints";

// Initialize socket connection
const socket = io(BASE_URL.replace("/api/v1", ''));

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
  const [users, setUsers] = useState([]);

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

  // Listen for location updates from the server for other users
  useEffect(() => {
    socket.on("locationUpdate", (locationData) => {
      setUsers((prevUsers) => {
        // Check if the user already exists in the state
        const existingUserIndex = prevUsers.findIndex(
          (user) => user.id === locationData.id // Ensure locationData includes a unique user `id`
        );

        if (existingUserIndex !== -1) {
          // If user exists, update their location
          const updatedUsers = [...prevUsers];
          updatedUsers[existingUserIndex] = locationData;
          return updatedUsers;
        }

        // If user does not exist, add them
        return [...prevUsers, locationData];
      });
    });

    return () => {
      socket.off("locationUpdate");
    };
  }, []);
  // console.log(users);
  
  return (
    <div className=" flex justify-center items-center">
      <MapContainer
        center={currentPosition}
        zoom={16}
        className="h-96 w-full "
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; Book My Adventure"
        />

        {/* Marker for the current user */}
        <Marker position={currentPosition} key={currentPosition.join(",")}>
          <Popup>You are here</Popup>
        </Marker>

        {/* Markers for other users */}
        {users.map((user, index) => (
          <Marker
            key={user.id || index}
            position={[user.latitude, user.longitude]}
          >
            <Popup>Other user at [{user.latitude}, {user.longitude}]</Popup>
          </Marker>
        ))}

        {/* This component will recenter the map when the currentPosition changes */}
        <RecenterMap center={currentPosition} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
