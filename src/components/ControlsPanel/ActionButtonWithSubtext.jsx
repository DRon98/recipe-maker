import React from 'react';

const ActionButtonWithSubtext = ({ name, subtext, icon, onClick }) => {
  return (
    <div className="flex flex-col">
      <button 
        className="bg-gray-600 h-10 rounded flex items-center justify-center text-white font-medium p-2"
        onClick={onClick}
      >
        {icon && <span className="mr-1">{icon}</span>}
        {name}
      </button>
      <span className="text-gray-400 text-xs text-center">{subtext}</span>
    </div>
  );
};

export default ActionButtonWithSubtext;