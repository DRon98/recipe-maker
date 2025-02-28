import React from 'react';

const MatchScore = ({ score }) => {
  return (
    <div className="bg-gray-700 h-10 w-20 rounded flex flex-col items-center justify-center mr-4">
      <span className="text-gray-400 text-xs">MATCH</span>
      {score && (
        <span className="text-green-500 font-bold">{score}%</span>
      )}
    </div>
  );
};

export default MatchScore;