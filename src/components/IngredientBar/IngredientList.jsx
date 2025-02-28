import React from 'react';
import IngredientButton from './IngredientButton';

const IngredientList = ({ selectedCategory, selectedIngredients, onSelectIngredient }) => {
  // Categories and their ingredients
  const categories = {
    'VEGETABLES': ['Tomatoes', 'Onions', 'Carrots', 'Bell Peppers', 'Garlic'],
    'MEAT': ['Chicken', 'Beef', 'Pork', 'Lamb', 'Turkey'],
    'DAIRY': ['Milk', 'Cheese', 'Butter', 'Cream', 'Yogurt'],
    'SPICES': ['Salt', 'Pepper', 'Cumin', 'Paprika', 'Turmeric'],
    'GRAINS': ['Rice', 'Pasta', 'Quinoa', 'Couscous', 'Barley']
  };
  
  // Get ingredients for selected category or show empty
  const ingredients = selectedCategory ? (categories[selectedCategory] || []) : [];
  
  return (
    <div className="flex space-x-2 items-center">
      {ingredients.map((ingredient, index) => (
        <IngredientButton 
          key={index}
          name={ingredient}
          selected={selectedIngredients.includes(ingredient)}
          onClick={() => onSelectIngredient(ingredient)}
        />
      ))}
      
      {ingredients.length > 0 && (
        <span className="text-gray-400 text-2xl">...</span>
      )}
    </div>
  );
};

export default IngredientList;

