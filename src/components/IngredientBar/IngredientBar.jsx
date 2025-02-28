// IngredientBar/IngredientBar.jsx
import React, { useState } from 'react';
import CategorySelector from './CategorySelector';
import IngredientList from './IngredientList';
import SearchIngredient from './SearchIngredient';
import AddToRecipeButton from './AddToRecipeButton';

const IngredientBar = ({ recipe, setRecipe }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  
  const handleSelectIngredient = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };
  
  const handleAddToRecipe = () => {
    const newIngredients = selectedIngredients.map(name => ({
      name,
      quantity: 1,
      unit: 'cup'
    }));
    
    setRecipe({
      ...recipe,
      ingredients: [...(recipe.ingredients || []), ...newIngredients]
    });
    
    setSelectedIngredients([]);
  };
  
  return (
    <div className="bg-gray-700 h-20 border-t border-gray-600 flex items-center p-2">
      <CategorySelector 
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />
      
      <IngredientList 
        selectedCategory={selectedCategory}
        selectedIngredients={selectedIngredients}
        onSelectIngredient={handleSelectIngredient}
      />
      
      <AddToRecipeButton 
        disabled={selectedIngredients.length === 0}
        onClick={handleAddToRecipe}
      />
      
      <SearchIngredient 
        onSearch={(term) => console.log(`Searching for: ${term}`)}
      />
    </div>
  );
};

export default IngredientBar;
