// NavigationBar/IngredientsListDropdown.jsx
import React, { useState } from 'react';

const IngredientsListDropdown = ({ recipe }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <div 
        className="bg-gray-600 rounded-full px-5 py-1 flex items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-white mr-3">Ingredients List</span>
        <span className="text-white">{isOpen ? '▲' : '▼'}</span>
      </div>
      
      {isOpen && (
        <div className="absolute top-10 left-0 bg-gray-700 rounded p-4 shadow-lg z-10 w-64">
          <h3 className="text-white mb-2 font-bold">Ingredients</h3>
          {recipe.ingredients && recipe.ingredients.length > 0 ? (
            <ul className="text-white">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="mb-1 flex justify-between">
                  <span>{ingredient.name}</span>
                  <span className="text-gray-400">
                    {ingredient.quantity} {ingredient.unit}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No ingredients added yet.</p>
          )}
          
          <div className="mt-4 pt-2 border-t border-gray-600">
            <button className="w-full bg-green-500 text-white py-1 px-2 rounded text-sm">
              Edit Ingredients
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientsListDropdown;