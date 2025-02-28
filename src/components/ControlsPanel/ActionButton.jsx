import React from 'react';

const ActionButton = ({ name, icon, onClick }) => {
  return (
    <button 
      className="bg-gray-600 h-10 rounded flex items-center justify-center text-white font-medium p-2"
      onClick={onClick}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {name}
    </button>
  );
};

export default ActionButton;
