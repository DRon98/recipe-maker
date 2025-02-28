// NavigationBar/NavigationBar.jsx
import React from 'react';
import IngredientsListDropdown from './IngredientsListDropdown';
import TasteTagsContainer from './TasteTagsContainer';
import FlavorProfileButton from './FlavorProfileButton';

const NavigationBar = ({ recipe }) => {
  return (
    <div className="bg-gray-700 h-10 flex items-center px-4">
      <IngredientsListDropdown recipe={recipe} />
      <TasteTagsContainer recipe={recipe} />
      <FlavorProfileButton />
    </div>
  );
};

export default NavigationBar;