import React from 'react';
import TimeScale from './TimeScale';
import TimelineContent from './TimelineContent';

const Timeline = ({ recipe, updateRecipe, updatePreparation, removePreparation, setSelectedPreparation }) => {
  return (
    <div className="flex-1 bg-gray-700 bg-opacity-50 p-4 overflow-y-auto relative">
      <TimeScale />
      <TimelineContent 
        recipe={recipe}
        updateRecipe={updateRecipe}
        updatePreparation={updatePreparation}
        removePreparation={removePreparation}
        setSelectedPreparation={setSelectedPreparation}
      />
    </div>
  );
};

export default Timeline;