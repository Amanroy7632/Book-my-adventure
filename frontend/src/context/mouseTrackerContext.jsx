
import  { createContext, useContext, useState, useEffect } from "react";

// Create a context for mouse tracking
const MouseTrackerContext = createContext();

// MouseTrackerProvider component to provide context values
export const MouseTrackerProvider = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [sparkles, setSparkles] = useState([]);

  const handleMouseMove = (e) => {
    const newSparkle = { x: e.pageX, y: e.pageY, id: Date.now() };
    setMousePosition({ x: e.pageX, y: e.pageY });
    setSparkles((prev) => [...prev, newSparkle]);

    // Remove sparkles after a short delay to prevent too many elements from piling up
    setTimeout(() => {
      setSparkles((prev) =>
        prev.filter((sparkle) => sparkle.id !== newSparkle.id)
      );
    }, 500);
  };
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mouseleave", handleMouseMove);
    };
  }, []);

  return (
    <MouseTrackerContext.Provider value={{ sparkles, mousePosition }}>
      {children}
    </MouseTrackerContext.Provider>
  );
};

// Custom hook to use mouse tracking context
export const useMouseTracker = () => {
  return useContext(MouseTrackerContext);
};
