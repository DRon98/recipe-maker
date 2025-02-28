import React from 'react';

const TrackHeader = ({ trackName, trackColor }) => {
  return (
    <div className={`absolute left-0 top-0 ${trackColor} rounded-l p-2 w-28 h-16 flex justify-between items-center`}>
      <span className="text-gray-900 font-bold text-sm uppercase">{trackName}</span>
      <span className="text-gray-900">...</span>
    </div>
  );
};

export default TrackHeader;