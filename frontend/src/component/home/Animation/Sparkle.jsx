import  { useEffect, useState } from 'react';
import { useMouseTracker } from '../../../context/mouseTrackerContext.jsx';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
const getRandomOffset = (radius) => {
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * radius;
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    };
  };
const Sparkle = ({ x, y }) => {
  const [isFading, setIsFading] = useState(false);
  const [color, setColor] = useState(getRandomColor());
  const offset = getRandomOffset(30);
  useEffect(() => {
    // Start fading out the sparkle after 50ms
    const fadeTimeout = setTimeout(() => setIsFading(true), 500);

    // Remove the sparkle after 300ms
    const removeTimeout = setTimeout(() => {
      setIsFading(true);
    }, 500);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(removeTimeout);
    };
  }, []);

  return (
    <div
      className={` z-50 absolute pointer-events-none transform transition-opacity duration-300 ease-out ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        top: y,
        left: x ,
      }}
    >
      <div
        className="w-4 h-4 relative"
        style={{
          transform: 'rotate(45deg)',
        }}
      >
        {/* Create a star shape */}
        <div className={`absolute top-0 left-0 w-full h-full bg-current shadow-md shadow-[${color}]`}
          style={{
            clipPath:
              'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
            boxShadow: `0 0 8px ${color}, 0 0 20px ${color}, 0 0 30px ${color}`,
            transition: 'box-shadow 0.3s ease-in-out',
            backgroundColor:color
          }}
        ></div>
      </div>
    </div>
  );
};

export default Sparkle;

export const Sparkles = () => {
  const {sparkles} = useMouseTracker()

  return (
    <>
      {sparkles.map((sparkle) => (
        <Sparkle key={sparkle.id} x={sparkle.x} y={sparkle.y} />
      ))}
      </>
    
  );
};


