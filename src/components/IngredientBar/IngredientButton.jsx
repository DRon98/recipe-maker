import React from 'react';

const IngredientButton = ({ name, selected, onClick }) => {
  return (
    <button 
      className={`h-10 w-32 rounded px-2 ${selected ? 'bg-green-600' : 'bg-gray-600'} text-white text-sm`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default IngredientButton;