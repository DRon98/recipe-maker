// StatusBar/RecipeMetrics.jsx
import React from 'react';

const RecipeMetrics = ({ recipe }) => {
  const { totalTime, activeTime, difficulty, servings } = recipe;
  
  return (
    <span>
      Total Cook Time: {totalTime || '--'} | 
      Active Time: {activeTime || '--'} | 
      Difficulty: {difficulty || '--'} | 
      Serves: {servings || '--'}
    </span>
  );
};

export default RecipeMetrics;
