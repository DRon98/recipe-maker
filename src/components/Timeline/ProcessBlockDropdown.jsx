import React from 'react';

const ProcessBlockDropdown = ({ preparation, updatePreparation, removePreparation }) => {
  const handleUpdateStep = (index, updates) => {
    const updatedSteps = [...preparation.steps];
    updatedSteps[index] = { ...updatedSteps[index], ...updates };
    
    updatePreparation(preparation.id, { steps: updatedSteps });
  };
  
  const handleRemoveStep = (index) => {
    const updatedSteps = preparation.steps.filter((_, i) => i !== index);
    updatePreparation(preparation.id, { steps: updatedSteps });
  };
  
  const handleUpdateHeatLevel = (heatLevel) => {
    updatePreparation(preparation.id, { heatLevel });
  };
  
  const handleDelete = () => {
    removePreparation(preparation.id);
  };
  
  return (
    <div className="absolute z-10 mt-1 bg-gray-700 rounded p-3 shadow-lg w-full">
      {preparation.steps && preparation.steps.length > 0 ? (
        <ol className="list-decimal pl-5 text-white">
          {preparation.steps.map((step, idx) => (
            <li key={idx} className="mb-2 group">
              <div className="flex items-start">
                <div className="flex-1">
                  <div>{step.description}</div>
                  <div className="text-gray-400 text-sm">{step.time}</div>
                </div>
                <button 
                  className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveStep(idx)}
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-white">No detailed steps available</p>
      )}
      
      {/* Heat level controls */}
      <div className="mt-4">
        <h4 className="text-white text-sm font-bold mb-2">Heat Level</h4>
        <div className="flex space-x-2">
          <button
            className={`px-2 py-1 rounded text-xs ${preparation.heatLevel === 'Low' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-600 text-white'}`}
            onClick={() => handleUpdateHeatLevel('Low')}
          >
            Low
          </button>
          <button
            className={`px-2 py-1 rounded text-xs ${preparation.heatLevel === 'Medium' ? 'bg-orange-500 text-gray-900' : 'bg-gray-600 text-white'}`}
            onClick={() => handleUpdateHeatLevel('Medium')}
          >
            Medium
          </button>
          <button
            className={`px-2 py-1 rounded text-xs ${preparation.heatLevel === 'High' ? 'bg-red-600 text-white' : 'bg-gray-600 text-white'}`}
            onClick={() => handleUpdateHeatLevel('High')}
          >
            High
          </button>
          <button
            className={`px-2 py-1 rounded text-xs ${preparation.heatLevel === 'High → Medium' ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white' : 'bg-gray-600 text-white'}`}
            onClick={() => handleUpdateHeatLevel('High → Medium')}
          >
            High → Medium
          </button>
        </div>
      </div>
      
      {/* Timing indicator */}
      <div className="mt-4">
        <h4 className="text-white text-sm font-bold mb-2">Duration</h4>
        <div className="flex items-center">
          <span className="text-white mr-2">{Math.floor(preparation.duration)} minutes</span>
          <span className="text-gray-400 text-xs">(drag right edge of block to resize)</span>
        </div>
      </div>
      
      {/* Delete button */}
      <div className="mt-4 flex justify-end">
        <button
          className="bg-red-600 text-white px-3 py-1 rounded text-sm"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProcessBlockDropdown;