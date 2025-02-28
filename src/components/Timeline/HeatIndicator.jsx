import React from 'react';

const HeatIndicator = ({ heatLevel }) => {
  // Handle different heat level formats
  // Could be a string like "High → Medium" or a number value
  
  let gradientClass = 'bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500';
  
  if (typeof heatLevel === 'string' && heatLevel.includes('→')) {
    // For transitions, keep default gradient
  } else if (heatLevel === 'High' || heatLevel > 0.7) {
    gradientClass = 'bg-gradient-to-r from-red-600 to-red-500';
  } else if (heatLevel === 'Medium' || (heatLevel > 0.4 && heatLevel <= 0.7)) {
    gradientClass = 'bg-gradient-to-r from-orange-500 to-yellow-500';
  } else if (heatLevel === 'Low' || heatLevel <= 0.4) {
    gradientClass = 'bg-gradient-to-r from-yellow-400 to-yellow-300';
  }
  
  return (
    <div className="absolute left-0 right-0 bottom-0 h-1">
      <div className={`w-full h-full rounded-b ${gradientClass}`}></div>
    </div>
  );
};

export default HeatIndicator;