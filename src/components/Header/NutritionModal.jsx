import React from 'react';

const NutritionModal = ({ onClose }) => {
  // This would be populated with actual nutrition data from the recipe
  const nutritionData = {
    calories: 320,
    protein: 22,
    carbs: 35,
    fat: 12,
    fiber: 5,
    sodium: 650
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-700 rounded-lg w-96 max-h-3/4 overflow-y-auto">
        <div className="bg-gray-800 p-3 rounded-t-lg flex justify-between items-center">
          <h2 className="text-white text-xl font-bold">Nutrition Facts</h2>
          <button onClick={onClose} className="text-white text-xl">&times;</button>
        </div>
        
        <div className="p-4">
          <div className="border-b border-gray-500 pb-2 mb-2">
            <div className="text-white text-2xl font-bold">Nutrition Facts</div>
            <div className="text-gray-300">Per serving</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between border-b border-gray-500 pb-1">
              <span className="text-white font-bold">Calories</span>
              <span className="text-white">{nutritionData.calories}</span>
            </div>
            
            <div className="flex justify-between border-b border-gray-500 pb-1">
              <span className="text-white font-bold">Protein</span>
              <span className="text-white">{nutritionData.protein}g</span>
            </div>
            
            <div className="flex justify-between border-b border-gray-500 pb-1">
              <span className="text-white font-bold">Carbohydrates</span>
              <span className="text-white">{nutritionData.carbs}g</span>
            </div>
            
            <div className="flex justify-between border-b border-gray-500 pb-1">
              <span className="text-white font-bold">Fat</span>
              <span className="text-white">{nutritionData.fat}g</span>
            </div>
            
            <div className="flex justify-between border-b border-gray-500 pb-1">
              <span className="text-white font-bold">Fiber</span>
              <span className="text-white">{nutritionData.fiber}g</span>
            </div>
            
            <div className="flex justify-between border-b border-gray-500 pb-1">
              <span className="text-white font-bold">Sodium</span>
              <span className="text-white">{nutritionData.sodium}mg</span>
            </div>
          </div>
          
          <div className="mt-4 text-gray-400 text-sm">
            * Percent Daily Values are based on a 2,000 calorie diet.
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionModal;