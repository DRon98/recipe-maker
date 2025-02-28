// Header/RecipeNameInput.jsx
import React from 'react';

const RecipeNameInput = ({ recipe, setRecipe }) => {
  const handleNameChange = (e) => {
    setRecipe({
      ...recipe,
      name: e.target.value
    });
  };

  return (
    <div className="mx-10 flex-1">
      <input
        type="text"
        value={recipe.name}
        onChange={handleNameChange}
        placeholder="Enter Recipe Name..."
        className="w-full bg-gray-700 text-blue-400 p-2 rounded border border-gray-600 text-xl"
      />
    </div>
  );
};

export default RecipeNameInput;
