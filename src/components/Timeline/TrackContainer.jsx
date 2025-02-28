import React from 'react';
import TrackHeader from './TrackHeader';

const TrackContainer = ({ trackName, trackIndex, children }) => {
  const trackColors = {
    'prep': 'bg-yellow-400',
    'marination': 'bg-yellow-600',
    'cooking': 'bg-orange-500',
    'assembly': 'bg-red-500',
    'sauce': 'bg-purple-500',
    'side dish': 'bg-blue-500',
    'misc': 'bg-gray-500'
  };
  
  const trackColor = trackColors[trackName.toLowerCase()] || 'bg-gray-500';
  const topOffset = trackIndex * 70;
  
  return (
    <div className="relative mb-4" style={{ marginTop: topOffset }}>
      <TrackHeader 
        trackName={trackName} 
        trackColor={trackColor} 
      />
      <div className="ml-32 relative min-h-16">{children}</div>
    </div>
  );
};

export default TrackContainer;