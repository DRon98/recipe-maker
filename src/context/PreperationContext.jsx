// contexts/PreparationContext.jsx
import React, { createContext, useState, useContext, useCallback } from 'react';
import { useRecipe } from './RecipeContext';

const PreparationContext = createContext({
  selectedPreparation: null,
  setSelectedPreparation: () => {},
  addPreparation: () => {},
  updatePreparation: () => {},
  removePreparation: () => {},
  preparationDropdownOpen: false,
  setPreparationDropdownOpen: () => {}
});

export function PreparationProvider({ children }) {
  const { recipe, setRecipe } = useRecipe();
  const [selectedPreparation, setSelectedPreparation] = useState(null);
  const [preparationDropdownOpen, setPreparationDropdownOpen] = useState(false);

  const addPreparation = useCallback((preparation) => {
    setRecipe(prev => ({
      ...prev,
      preparations: [...prev.preparations, preparation]
    }));
    setSelectedPreparation(preparation);
    setPreparationDropdownOpen(false);
  }, [setRecipe]);

  const updatePreparation = useCallback((id, updates) => {
    setRecipe(prev => ({
      ...prev,
      preparations: prev.preparations.map(prep => 
        prep.id === id ? { ...prep, ...updates } : prep
      )
    }));
  }, [setRecipe]);

  const removePreparation = useCallback((id) => {
    setRecipe(prev => ({
      ...prev,
      preparations: prev.preparations.filter(prep => prep.id !== id)
    }));
    
    // Clear selected preparation if it's the one being removed
    if (selectedPreparation && selectedPreparation.id === id) {
      setSelectedPreparation(null);
    }
  }, [setRecipe, selectedPreparation]);

  // Value object that will be provided to consumers
  const value = {
    selectedPreparation,
    setSelectedPreparation,
    addPreparation,
    updatePreparation,
    removePreparation,
    preparationDropdownOpen,
    setPreparationDropdownOpen
  };

  return (
    <PreparationContext.Provider value={value}>
      {children}
    </PreparationContext.Provider>
  );
}

// Custom hook for consuming this context
export function usePreparation() {
  const context = useContext(PreparationContext);
  if (context === undefined) {
    throw new Error('usePreparation must be used within a PreparationProvider');
  }
  return context;
}