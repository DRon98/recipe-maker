// NavigationBar/FlavorProfileButton.jsx
import React, { useState } from 'react';
import FlavorProfileModal from './FlavorProfileModal';

const FlavorProfileButton = () => {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <div 
        className="ml-auto bg-gray-600 rounded-full h-8 w-8 flex items-center justify-center cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <span className="text-white text-lg">i</span>
      </div>
      
      {showModal && <FlavorProfileModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default FlavorProfileButton;