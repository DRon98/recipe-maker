// Timeline/TimeScale.jsx
import React from 'react';

const TimeScale = () => {
  const timeMarkers = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50,55,60,65,70];
  
  return (
    <div className="relative h-8 mb-4">
      <div className="absolute left-0 right-0 top-4 h-px bg-gray-500"></div>
      
      {timeMarkers.map((time, index) => (
        <div key={index} className="absolute" style={{ left: 260+ (time * (1040/50)) }}>
          <div className="h-2 w-px bg-gray-500"></div>
          <div className="text-gray-400 text-xs mt-1">
            {time === 0 ? '0' : `${time}:00`}
          </div>
        </div>
      ))}
    </div>
  );
};


export default TimeScale;