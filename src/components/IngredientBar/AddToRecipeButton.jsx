import React from 'react';

const AddToRecipeButton = ({ disabled, onClick }) => {
  return (
    <button 
      className={`bg-green-600 h-10 w-40 rounded flex items-center justify-center text-white font-medium mx-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      ADD TO RECIPE
    </button>
  );
};

export default AddToRecipeButton;