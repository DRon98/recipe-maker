// contexts/RecipeContext.jsx
import React, { createContext, useState, useContext } from 'react';

// Create context with default empty values
const RecipeContext = createContext({
  recipe: null,
  setRecipe: () => {},
  updateRecipeName: () => {},
  addIngredient: () => {},
  removeIngredient: () => {}
});

export function RecipeProvider({ children }) {
  const [recipe, setRecipe] = useState({
    name: '',
    match: null,
    ingredients: [],
    tasteTags: [],
    totalTime: null,
    activeTime: null,
    difficulty: null,
    servings: null
  });

  // Specific update functions to avoid passing setRecipe everywhere
  const updateRecipeName = (name) => {
    setRecipe(prev => ({ ...prev, name }));
  };

  const addIngredient = (ingredient) => {
    setRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, ingredient]
    }));
  };

  const removeIngredient = (ingredientIndex) => {
    setRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, index) => index !== ingredientIndex)
    }));
  };

  // Value object that will be provided to consumers
  const value = {
    recipe,
    setRecipe,
    updateRecipeName,
    addIngredient,
    removeIngredient
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
}

// Custom hook for consuming this context
export function useRecipe() {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipe must be used within a RecipeProvider');
  }
  return context;
}