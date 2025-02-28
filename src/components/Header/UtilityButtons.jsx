// Header/UtilityButtons.jsx
import React from 'react';
import NutritionButton from './NutritionButton';
import SettingsButton from './SettingsButton';

const UtilityButtons = () => {
  return (
    <div className="flex">
      <NutritionButton />
      <SettingsButton />
    </div>
  );
};

export default UtilityButtons;