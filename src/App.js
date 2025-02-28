// App.jsx - Main Application Component
import React, { useState } from 'react';
import Header from './components/Header/Header';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Timeline from './components/Timeline';
import PreparationPanel from './components/PreparationPanel/PreparationPanel';
import ControlsPanel from './components/ControlsPanel/ControlsPanel';
import IngredientBar from './components/IngredientBar/IngredientBar';
import StatusBar from './components/StatusBar/StatusBar';

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
    const newPrep = {
      ...preparation,
      id: Date.now() // Ensure unique ID
    };
    
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      preparations: [...prevRecipe.preparations, newPrep]
    }));
    
    setSelectedPreparation(newPrep);
    setPreparationDropdownOpen(false);
    
    // Calculate and update recipe timing metrics
    updateRecipeMetrics([...recipe.preparations, newPrep]);
  };
  
  const updateRecipeMetrics = (preparations) => {
    if (!preparations.length) return;
    
    // Find the end time of the last preparation
    const endTimes = preparations.map(prep => prep.startTime + prep.duration);
    const totalTime = Math.max(...endTimes);
    
    // Calculate active time (exclude passive processes like marinating)
    const activePreparations = preparations.filter(
      prep => !['marinate', 'chill', 'refrigerate'].includes(prep.type?.toLowerCase())
    );
    const activeTime = activePreparations.reduce((sum, prep) => sum + prep.duration, 0);
    
    // Estimate difficulty based on number of steps and preparations
    let difficulty = 'Easy';
    const totalSteps = preparations.reduce((sum, prep) => sum + (prep.steps?.length || 0), 0);
    
    if (totalSteps > 10 || preparations.length > 5) {
      difficulty = 'Medium';
    }
    if (totalSteps > 20 || preparations.length > 8) {
      difficulty = 'Hard';
    }
    
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      totalTime: `${Math.floor(totalTime)}:${(totalTime % 1 * 60).toFixed(0).padStart(2, '0')}`,
      activeTime: `${Math.floor(activeTime)}:${(activeTime % 1 * 60).toFixed(0).padStart(2, '0')}`,
      difficulty
    }));
  };
  
  const updatePreparation = (id, updates) => {
    const updatedPreparations = recipe.preparations.map(prep => 
      prep.id === id ? { ...prep, ...updates } : prep
    );
    
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      preparations: updatedPreparations
    }));
    
    updateRecipeMetrics(updatedPreparations);
  };
  
  const removePreparation = (id) => {
    const filteredPreparations = recipe.preparations.filter(prep => prep.id !== id);
    
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      preparations: filteredPreparations
    }));
    
    if (selectedPreparation?.id === id) {
      setSelectedPreparation(null);
    }
    
    updateRecipeMetrics(filteredPreparations);
  };
  
  const addIngredientToPreparation = (preparationId, ingredient) => {
    updatePreparation(preparationId, {
      ingredients: [
        ...(recipe.preparations.find(p => p.id === preparationId)?.ingredients || []),
        ingredient
      ]
    });
  };
  
  const addStepToPreparation = (preparationId, step) => {
    updatePreparation(preparationId, {
      steps: [
        ...(recipe.preparations.find(p => p.id === preparationId)?.steps || []),
        step
      ]
    });
  };

  return (
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
          <Timeline 
            recipe={recipe} 
            updatePreparation={updatePreparation}
            removePreparation={removePreparation}
            setSelectedPreparation={setSelectedPreparation}
          />
          <ControlsPanel 
            selectedPreparation={selectedPreparation}
            addStepToPreparation={selectedPreparation ? 
              (step) => addStepToPreparation(selectedPreparation.id, step) : null}
            addIngredientToPreparation={selectedPreparation ? 
              (ingredient) => addIngredientToPreparation(selectedPreparation.id, ingredient) : null}
          />
        </div>
      </div>
      
      <IngredientBar recipe={recipe} setRecipe={setRecipe} />
      <StatusBar recipe={recipe} />
    </div>
  );
};

export default App;