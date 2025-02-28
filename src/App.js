// App.jsx - Main Application Component
import React, { useState } from 'react';
import Header from './components/Header/Header';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Timeline from './components/Timeline';
import PreparationPanel from './components/PreparationPanel/PreparationPanel';
import ControlsPanel from './components/ControlsPanel/ControlsPanel';
import IngredientBar from './components/IngredientBar/IngredientBar';
import StatusBar from './components/StatusBar/StatusBar';


// Import our context providers
import { RecipeProvider } from './context/RecipeContext';
import { PreparationProvider } from './context/PreperationContext';
import { ModalProvider } from './context/ModalContext';
const App = () => {
  const [recipe, setRecipe] = useState({
    name: '',
    match: null,
    ingredients: [],
    tasteTags: [],
    preparations: [],
    totalTime: null,
    activeTime: null,
    difficulty: null,
    servings: null
  });

  const [selectedPreparation, setSelectedPreparation] = useState(null);
  const [preparationDropdownOpen, setPreparationDropdownOpen] = useState(false);

  const addPreparation = (preparation) => {
    setRecipe({
      ...recipe,
      preparations: [...recipe.preparations, preparation]
    });
    setSelectedPreparation(preparation);
    setPreparationDropdownOpen(false);
  };

  return (
    // <RecipeProvider>
    // <PreparationProvider>
    //   <ModalProvider>
    <div className="flex flex-col h-screen bg-gray-800">
      <Header recipe={recipe} setRecipe={setRecipe} />
      <NavigationBar recipe={recipe} />
      
      <div className="flex-1 flex">
        <PreparationPanel 
          dropdownOpen={preparationDropdownOpen}
          setDropdownOpen={setPreparationDropdownOpen}
          addPreparation={addPreparation}
          selectedPreparation={selectedPreparation}
        />
        
        <div className="flex-1 flex flex-col">
          <Timeline recipe={recipe} />
          <ControlsPanel selectedPreparation={selectedPreparation} />
        </div>
      </div>
      
      <IngredientBar recipe={recipe} setRecipe={setRecipe} />
      <StatusBar recipe={recipe} />
    </div>
    // </ModalProvider>
    //   </PreparationProvider>
    // </RecipeProvider>
  );
};

export default App;