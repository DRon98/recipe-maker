import React from 'react';
import ActionButton from './ActionButton';
import ActionButtonWithSubtext from './ActionButtonWithSubtext';

const ControlsPanel = ({ selectedPreparation }) => {
  const actions = [
    { name: 'Add Step', icon: null },
    { name: 'Add Ingredient', icon: null },
    { name: 'Set Parameter', icon: null, subtext: '(heat, time, etc.)' },
    { name: 'Add Note', icon: null },
    { name: 'Link Steps', icon: null },
    { name: 'Define Method', icon: null },
    { name: 'Templates', icon: null }
  ];
  
  return (
    <div className="bg-gray-700 h-16 border-t border-gray-600 p-1 flex items-center">
      <div className="grid grid-cols-7 gap-2 w-full">
        {actions.map((action, index) => 
          action.subtext ? (
            <ActionButtonWithSubtext 
              key={index}
              name={action.name}
              subtext={action.subtext}
              onClick={() => console.log(`${action.name} clicked`)}
            />
          ) : (
            <ActionButton 
              key={index}
              name={action.name}
              onClick={() => console.log(`${action.name} clicked`)}
            />
          )
        )}
      </div>
    </div>
  );
};

export default ControlsPanel;