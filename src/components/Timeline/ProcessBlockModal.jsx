import React, { useState } from 'react';

const ProcessBlockModal = ({ preparation, updatePreparation, removePreparation, onClose }) => {
  const [newStepText, setNewStepText] = useState('');
  const [newStepTime, setNewStepTime] = useState('');
  
  const handleUpdateStep = (index, updates) => {
    const updatedSteps = [...preparation.steps];
    updatedSteps[index] = { ...updatedSteps[index], ...updates };
    
    updatePreparation(preparation.id, { steps: updatedSteps });
  };
  
  const handleRemoveStep = (index) => {
    const updatedSteps = preparation.steps.filter((_, i) => i !== index);
    updatePreparation(preparation.id, { steps: updatedSteps });
  };
  
  const handleAddStep = () => {
    if (newStepText.trim()) {
      const newStep = {
        description: newStepText,
        time: newStepTime || 'As needed'
      };
      
      const updatedSteps = [...(preparation.steps || []), newStep];
      updatePreparation(preparation.id, { steps: updatedSteps });
      
      setNewStepText('');
      setNewStepTime('');
    }
  };
  
  const handleUpdateHeatLevel = (heatLevel) => {
    updatePreparation(preparation.id, { heatLevel });
  };
  
  const handleDelete = () => {
    removePreparation(preparation.id);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-700 rounded-lg w-1/2 max-w-2xl max-h-3/4 overflow-y-auto">
        <div className={`p-3 rounded-t-lg flex justify-between items-center ${getHeaderColorClass(preparation.type)}`}>
          <h2 className="text-gray-900 text-xl font-bold">{preparation.name} Details</h2>
          <button onClick={onClose} className="text-gray-900 text-xl">&times;</button>
        </div>
        
        <div className="p-4">
          {/* Steps Section */}
          <div className="mb-6">
            <h3 className="text-white font-bold mb-3 text-lg">Steps</h3>
            
            {preparation.steps && preparation.steps.length > 0 ? (
              <ol className="list-decimal pl-5 text-white space-y-3">
                {preparation.steps.map((step, idx) => (
                  <li key={idx} className="group">
                    <div className="flex items-start">
                      <div className="flex-1">
                        <div className="text-white">{step.description}</div>
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
              <p className="text-gray-400 italic">No steps added yet. Add your first step below.</p>
            )}
            
            {/* Add new step */}
            <div className="mt-4 bg-gray-800 rounded p-3">
              <h4 className="text-white font-medium mb-2">Add Step</h4>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Step description"
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                  value={newStepText}
                  onChange={(e) => setNewStepText(e.target.value)}
                />
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Time (e.g., '2 minutes')"
                    className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded text-white"
                    value={newStepTime}
                    onChange={(e) => setNewStepTime(e.target.value)}
                  />
                  <button
                    className="ml-2 bg-green-600 text-white p-2 rounded"
                    onClick={handleAddStep}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Timing Info */}
          <div className="mb-6 bg-gray-800 rounded p-3">
            <h3 className="text-white font-bold mb-2">Timing</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-400 text-sm">Start Time:</span>
                <div className="text-white">{formatTime(preparation.startTime)}</div>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Duration:</span>
                <div className="text-white">{formatTime(preparation.duration)}</div>
              </div>
              <div>
                <span className="text-gray-400 text-sm">End Time:</span>
                <div className="text-white">{formatTime(preparation.startTime + preparation.duration)}</div>
              </div>
            </div>
            <div className="mt-2 text-gray-400 text-xs">
              Drag to reposition or resize the block to adjust timing
            </div>
          </div>
          
          {/* Heat level controls */}
          <div className="mb-6 bg-gray-800 rounded p-3">
            <h3 className="text-white font-bold mb-2">Heat Level</h3>
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-3 py-1 rounded text-sm ${preparation.heatLevel === 'Low' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-600 text-white'}`}
                onClick={() => handleUpdateHeatLevel('Low')}
              >
                Low
              </button>
              <button
                className={`px-3 py-1 rounded text-sm ${preparation.heatLevel === 'Medium' ? 'bg-orange-500 text-gray-900' : 'bg-gray-600 text-white'}`}
                onClick={() => handleUpdateHeatLevel('Medium')}
              >
                Medium
              </button>
              <button
                className={`px-3 py-1 rounded text-sm ${preparation.heatLevel === 'High' ? 'bg-red-600 text-white' : 'bg-gray-600 text-white'}`}
                onClick={() => handleUpdateHeatLevel('High')}
              >
                High
              </button>
              <button
                className={`px-3 py-1 rounded text-sm ${preparation.heatLevel === 'High → Medium' ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white' : 'bg-gray-600 text-white'}`}
                onClick={() => handleUpdateHeatLevel('High → Medium')}
              >
                High → Medium
              </button>
              <button
                className={`px-3 py-1 rounded text-sm ${preparation.heatLevel === 'Medium → Low' ? 'bg-gradient-to-r from-orange-500 to-yellow-400 text-gray-900' : 'bg-gray-600 text-white'}`}
                onClick={() => handleUpdateHeatLevel('Medium → Low')}
              >
                Medium → Low
              </button>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-end space-x-3">
            <button
              className="bg-gray-600 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to format time (converts decimal minutes to mm:ss format)
const formatTime = (timeInMinutes) => {
  const minutes = Math.floor(timeInMinutes);
  const seconds = Math.round((timeInMinutes - minutes) * 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Helper function to get header color class based on preparation type
const getHeaderColorClass = (type) => {
  const colorMap = {
    'sauté': 'bg-orange-500',
    'boil': 'bg-blue-500',
    'marinate': 'bg-yellow-600',
    'dice': 'bg-yellow-400',
    'chop': 'bg-yellow-400',
    'plate': 'bg-red-500',
    'cook': 'bg-red-600',
    'steam': 'bg-blue-300'
  };
  
  return colorMap[type?.toLowerCase()] || 'bg-gray-500';
};

export default ProcessBlockModal;