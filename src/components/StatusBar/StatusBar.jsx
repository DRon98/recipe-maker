// StatusBar/StatusBar.jsx
import React from 'react';
import RecipeMetrics from './RecipeMetrics';

const StatusBar = ({ recipe }) => {
  return (
    <div className="bg-gray-900 h-4 text-gray-400 text-xs px-2 flex items-center justify-between">
      <RecipeMetrics recipe={recipe} />
    </div>
  );
};

export default StatusBar;