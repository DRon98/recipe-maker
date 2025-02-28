import React from 'react';

const IngredientMarker = ({ ingredient }) => {
  const ingredientColors = {
    'Onions': 'bg-red-300',
    'Garlic': 'bg-red-500',
    'Tomatoes': 'bg-red-600',
    'Spices': 'bg-orange-500',
    'Chicken': 'bg-yellow-200',
    'Beef': 'bg-red-800',
    'Rice': 'bg-yellow-100',
    'Cream': 'bg-yellow-50',
    'default': 'bg-gray-400'
  };
  
  const color = ingredientColors[ingredient.name] || ingredientColors.default;
  const firstLetter = ingredient.name.charAt(0).toUpperCase();
  
  return (
    <div className={`${color} rounded-full h-5 w-5 flex items-center justify-center text-xs text-gray-900 font-bold`}>
      {firstLetter}
    </div>
  );
};

export default IngredientMarker;