import React from 'react';
import TasteTag from './TasteTag';

const TasteTagsContainer = ({ recipe }) => {
  // Predefined taste tags
  const availableTags = [
    { name: 'Spicy', color: 'bg-red-500 text-white' },
    { name: 'Creamy', color: 'bg-yellow-200 text-gray-800' },
    { name: 'Aromatic', color: 'bg-purple-400 text-white' },
    { name: 'Rich', color: 'bg-yellow-800 text-white' }
  ];
  
  return (
    <div className="ml-6 flex space-x-2">
      {recipe.tasteTags && recipe.tasteTags.length > 0 ? (
        recipe.tasteTags.map((tag, index) => (
          <TasteTag key={index} name={tag} />
        ))
      ) : (
        // Empty placeholders when no tags are selected
        availableTags.map((tag, index) => (
          <div 
            key={index} 
            className="bg-gray-600 rounded-full px-4 py-1 border border-gray-500"
          ></div>
        ))
      )}
    </div>
  );
};

export default TasteTagsContainer;
