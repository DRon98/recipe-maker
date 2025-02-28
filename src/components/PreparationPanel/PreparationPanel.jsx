import React, { useState } from 'react';
import TechniqueButtons from './TechniqueButtons';
import PreparationDropdown from './PreparationDropdown';

const PreparationPanel = ({ dropdownOpen, setDropdownOpen, addPreparation }) => {
  return (
    <div className="w-32 bg-gray-700 border-r border-gray-600 relative">
      <div className="p-2">
        <button 
          className="w-full bg-green-500 text-white py-2 px-4 rounded text-sm flex justify-between items-center"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span>+ Add Prep</span>
          <span>▼</span>
        </button>
        
        <TechniqueButtons />
      </div>
      
      {dropdownOpen && (
        <PreparationDropdown 
          addPreparation={addPreparation} 
          closeDropdown={() => setDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default PreparationPanel;