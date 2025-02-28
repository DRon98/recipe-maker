
// PreparationPanel/CustomTechniqueCreator.jsx
import React, { useState } from 'react';

const CustomTechniqueCreator = ({ onCreateTechnique }) => {
  const [customTechnique, setCustomTechnique] = useState('');
  
  const handleAddCustom = () => {
    if (customTechnique.trim()) {
      const newTechnique = {
        name: customTechnique,
        color: 'bg-green-500'
      };
      
      onCreateTechnique(newTechnique);
      setCustomTechnique('');
    }
  };
  
  return (
    <div className="p-2">
      <h4 className="text-gray-300 mb-1">Create Custom Technique</h4>
      <div className="flex">
        <input 
          type="text" 
          placeholder="Name your technique" 
          className="flex-1 p-1 bg-gray-700 border border-gray-500 text-white rounded"
          value={customTechnique}
          onChange={(e) => setCustomTechnique(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddCustom()}
        />
        <button 
          className="ml-1 bg-green-500 text-white px-2 rounded"
          onClick={handleAddCustom}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CustomTechniqueCreator;