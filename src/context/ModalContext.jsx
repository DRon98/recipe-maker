// contexts/ModalContext.jsx
import React, { createContext, useState, useContext } from 'react';
import NutritionModal from '../components/Header/NutritionModal';
import SettingsModal from '../components/Header/SettingsModal';
import FlavorProfileModal from '../components/NavigationBar/FlavorProfileModal';
import ProcessBlockModal from '../components/Timeline/ProcessBlockModal';

// Define all possible modal types
const MODAL_TYPES = {
  NUTRITION: 'nutrition',
  SETTINGS: 'settings',
  FLAVOR_PROFILE: 'flavorProfile',
  PROCESS_BLOCK: 'processBlock'
};

const ModalContext = createContext({
  openModal: () => {},
  closeModal: () => {}
});

export function ModalProvider({ children }) {
  const [activeModals, setActiveModals] = useState({
    [MODAL_TYPES.NUTRITION]: { isOpen: false, props: {} },
    [MODAL_TYPES.SETTINGS]: { isOpen: false, props: {} },
    [MODAL_TYPES.FLAVOR_PROFILE]: { isOpen: false, props: {} },
    [MODAL_TYPES.PROCESS_BLOCK]: { isOpen: false, props: {} }
  });

  const openModal = (modalType, props = {}) => {
    if (!MODAL_TYPES[modalType]) {
      console.warn(`Unknown modal type: ${modalType}`);
      return;
    }
    
    setActiveModals(prev => ({
      ...prev,
      [modalType]: { isOpen: true, props }
    }));
  };

  const closeModal = (modalType) => {
    if (!MODAL_TYPES[modalType]) {
      console.warn(`Unknown modal type: ${modalType}`);
      return;
    }
    
    setActiveModals(prev => ({
      ...prev,
      [modalType]: { isOpen: false, props: {} }
    }));
  };

  // Value object that will be provided to consumers
  const value = {
    openModal,
    closeModal
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      
      {/* Render modals based on state */}
      {activeModals[MODAL_TYPES.NUTRITION].isOpen && (
        <NutritionModal 
          onClose={() => closeModal(MODAL_TYPES.NUTRITION)}
          {...activeModals[MODAL_TYPES.NUTRITION].props} 
        />
      )}
      
      {activeModals[MODAL_TYPES.SETTINGS].isOpen && (
        <SettingsModal 
          onClose={() => closeModal(MODAL_TYPES.SETTINGS)}
          {...activeModals[MODAL_TYPES.SETTINGS].props} 
        />
      )}
      
      {activeModals[MODAL_TYPES.FLAVOR_PROFILE].isOpen && (
        <FlavorProfileModal 
          onClose={() => closeModal(MODAL_TYPES.FLAVOR_PROFILE)}
          {...activeModals[MODAL_TYPES.FLAVOR_PROFILE].props} 
        />
      )}
      
      {activeModals[MODAL_TYPES.PROCESS_BLOCK].isOpen && (
        <ProcessBlockModal 
          onClose={() => closeModal(MODAL_TYPES.PROCESS_BLOCK)}
          {...activeModals[MODAL_TYPES.PROCESS_BLOCK].props} 
        />
      )}
    </ModalContext.Provider>
  );
}

// Export modal types for use in components
export { MODAL_TYPES };

// Custom hook for consuming this context
export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}