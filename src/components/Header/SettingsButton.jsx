import React, { useState } from 'react';
import SettingsModal from './SettingsModal';

const SettingsButton = () => {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <button 
        className="bg-gray-700 h-10 w-10 rounded flex items-center justify-center text-2xl text-gray-400"
        onClick={() => setShowModal(true)}
      >
        ⚙
      </button>
      
      {showModal && <SettingsModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default SettingsButton;