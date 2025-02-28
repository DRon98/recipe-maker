import React, { useState } from 'react';

const SettingsModal = ({ onClose }) => {
  const [settings, setSettings] = useState({
    temperature: 'Fahrenheit',
    timeFormat: '12-hour',
    measurementSystem: 'US',
    autoSave: true
  });
  
  const handleChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-700 rounded-lg w-96 max-h-3/4 overflow-y-auto">
        <div className="bg-gray-800 p-3 rounded-t-lg flex justify-between items-center">
          <h2 className="text-white text-xl font-bold">Settings</h2>
          <button onClick={onClose} className="text-white text-xl">&times;</button>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <h3 className="text-white font-bold mb-2">Temperature Units</h3>
            <div className="flex space-x-2">
              <button 
                className={`px-3 py-1 rounded ${settings.temperature === 'Fahrenheit' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300'}`}
                onClick={() => handleChange('temperature', 'Fahrenheit')}
              >
                Fahrenheit
              </button>
              <button 
                className={`px-3 py-1 rounded ${settings.temperature === 'Celsius' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300'}`}
                onClick={() => handleChange('temperature', 'Celsius')}
              >
                Celsius
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-white font-bold mb-2">Time Format</h3>
            <div className="flex space-x-2">
              <button 
                className={`px-3 py-1 rounded ${settings.timeFormat === '12-hour' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300'}`}
                onClick={() => handleChange('timeFormat', '12-hour')}
              >
                12-hour
              </button>
              <button 
                className={`px-3 py-1 rounded ${settings.timeFormat === '24-hour' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300'}`}
                onClick={() => handleChange('timeFormat', '24-hour')}
              >
                24-hour
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-white font-bold mb-2">Measurement System</h3>
            <div className="flex space-x-2">
              <button 
                className={`px-3 py-1 rounded ${settings.measurementSystem === 'US' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300'}`}
                onClick={() => handleChange('measurementSystem', 'US')}
              >
                US (cups, oz)
              </button>
              <button 
                className={`px-3 py-1 rounded ${settings.measurementSystem === 'Metric' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300'}`}
                onClick={() => handleChange('measurementSystem', 'Metric')}
              >
                Metric (g, ml)
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-white font-bold mb-2">Auto Save</h3>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="autoSave" 
                checked={settings.autoSave} 
                onChange={(e) => handleChange('autoSave', e.target.checked)}
                className="mr-2 h-5 w-5"
              />
              <label htmlFor="autoSave" className="text-white">Enable auto-save</label>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded"
              onClick={onClose}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;