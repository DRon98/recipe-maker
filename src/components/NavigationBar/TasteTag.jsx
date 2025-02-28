//NavigationBar/TasteTag.jsx
import React from 'react';

const TasteTag = ({ name }) => {
  const tagColors = {
    'Spicy': 'bg-red-500 text-white',
    'Creamy': 'bg-yellow-200 text-gray-800',
    'Aromatic': 'bg-purple-400 text-white',
    'Rich': 'bg-yellow-800 text-white',
    'Sweet': 'bg-pink-400 text-white',
    'Sour': 'bg-green-400 text-gray-800',
    'Savory': 'bg-red-800 text-white',
    'default': 'bg-gray-500 text-white'
  };
  
  const colorClass = tagColors[name] || tagColors.default;
  
  return (
    <div className={`rounded-full px-4 py-1 text-sm ${colorClass}`}>
      {name}
    </div>
  );
};

export default TasteTag;