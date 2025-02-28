import React from 'react';

const FlavorProfileModal = ({ onClose }) => {
  // Sample flavor profile data
  const flavorProfile = {
    primary: ['Spicy', 'Aromatic'],
    secondary: ['Creamy', 'Rich'],
    flavor: 8.5,
    complexity: 7.2,
    balance: 9.0,
    intensity: 6.5
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-700 rounded-lg w-96 max-h-3/4 overflow-y-auto">
        <div className="bg-gray-800 p-3 rounded-t-lg flex justify-between items-center">
          <h2 className="text-white text-xl font-bold">Flavor Profile</h2>
          <button onClick={onClose} className="text-white text-xl">&times;</button>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <h3 className="text-white font-bold mb-2">Primary Flavors</h3>
            <div className="flex flex-wrap gap-2">
              {flavorProfile.primary.map((flavor, idx) => (
                <span key={idx} className="bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                  {flavor}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-white font-bold mb-2">Secondary Flavors</h3>
            <div className="flex flex-wrap gap-2">
              {flavorProfile.secondary.map((flavor, idx) => (
                <span key={idx} className="bg-yellow-600 text-white px-2 py-1 rounded-full text-sm">
                  {flavor}
                </span>
              ))}
            </div>
          </div>
          
          <div className="space-y-3 mt-6">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-white">Flavor</span>
                <span className="text-white">{flavorProfile.flavor}/10</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2.5">
                <div 
                  className="bg-red-500 h-2.5 rounded-full" 
                  style={{ width: `${flavorProfile.flavor * 10}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-white">Complexity</span>
                <span className="text-white">{flavorProfile.complexity}/10</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2.5">
                <div 
                  className="bg-purple-500 h-2.5 rounded-full" 
                  style={{ width: `${flavorProfile.complexity * 10}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-white">Balance</span>
                <span className="text-white">{flavorProfile.balance}/10</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2.5">
                <div 
                  className="bg-green-500 h-2.5 rounded-full" 
                  style={{ width: `${flavorProfile.balance * 10}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-white">Intensity</span>
                <span className="text-white">{flavorProfile.intensity}/10</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2.5">
                <div 
                  className="bg-orange-500 h-2.5 rounded-full" 
                  style={{ width: `${flavorProfile.intensity * 10}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-gray-400 text-sm">
            <p>This flavor profile is generated based on ingredients and cooking methods.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlavorProfileModal;