import React, { useState } from 'react';
import NutritionModal from './NutritionModal';

const NutritionButton = () => {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <button 
        className="bg-gray-700 h-10 w-10 rounded flex items-center justify-center mr-4 text-2xl text-gray-400"
        onClick={() => setShowModal(true)}
      >
        N
      </button>
      
      {showModal && <NutritionModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default NutritionButton;