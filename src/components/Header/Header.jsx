import React from 'react';
import AppTitle from './AppTitle';
import RecipeNameInput from './RecipeNameInput';
import MatchScore from './MatchScore';
import UtilityButtons from './UtilityButtons';

const Header = ({ recipe, setRecipe }) => {
  return (
    <div className="bg-gray-900 h-20 flex items-center px-4">
      <AppTitle />
      <RecipeNameInput recipe={recipe} setRecipe={setRecipe} />
      <div className="flex items-center">
        <MatchScore score={recipe.match} />
        <UtilityButtons />
      </div>
    </div>
  );
};


export default Header;
