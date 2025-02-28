import React, { useState } from 'react';
import TechniqueCategory from './TechniqueCategory';
import CustomTechniqueCreator from './CustomTechniqueCreator';

const PreparationDropdown = ({ addPreparation, closeDropdown }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const preparationCategories = [
    {
      name: 'Heat',
      techniques: [
        { name: 'Sauté', color: 'bg-orange-500' },
        { name: 'Boil', color: 'bg-orange-500' },
        { name: 'Simmer', color: 'bg-orange-500' },
        { name: 'Grill', color: 'bg-orange-500' },
        { name: 'Roast', color: 'bg-orange-500' },
        { name: 'Steam', color: 'bg-orange-500' }
      ]
    },
    {
      name: 'Cold',
      techniques: [
        { name: 'Chill', color: 'bg-blue-300' },
        { name: 'Freeze', color: 'bg-blue-300' },
        { name: 'Refrigerate', color: 'bg-blue-300' }
      ]
    },
    {
      name: 'Cut',
      techniques: [
        { name: 'Dice', color: 'bg-yellow-400' },
        { name: 'Chop', color: 'bg-yellow-400' },
        { name: 'Mince', color: 'bg-yellow-400' },
        { name: 'Julienne', color: 'bg-yellow-400' }
      ]
    },
    {
      name: 'Mix',
      techniques: [
        { name: 'Stir', color: 'bg-blue-500' },
        { name: 'Blend', color: 'bg-blue-500' },
        { name: 'Whisk', color: 'bg-blue-500' },
        { name: 'Fold', color: 'bg-blue-500' }
      ]
    }
  ];
  
  // Filter techniques based on search term
  const filteredCategories = searchTerm
    ? preparationCategories.map(category => ({
        ...category,
        techniques: category.techniques.filter(tech => 
          tech.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.techniques.length > 0)
    : preparationCategories;
  
  const handleAddPreparation = (technique) => {
    const newPreparation = {
      id: Date.now(),
      name: technique.name,
      type: technique.name.toLowerCase(),
      track: getTechniqueTrack(technique.name),
      startTime: 0,
      duration: 5,
      ingredients: [],
      steps: [],
      notes: ''
    };
    
    addPreparation(newPreparation);
    closeDropdown();
  };
  
  // Determine which track a technique belongs to
  const getTechniqueTrack = (techniqueName) => {
    const lowerName = techniqueName.toLowerCase();
    
    if (['dice', 'chop', 'mince', 'julienne'].includes(lowerName)) {
      return 'Prep';
    } else if (['marinate', 'brine'].includes(lowerName)) {
      return 'Marination';
    } else if (['sauté', 'boil', 'simmer', 'grill', 'roast'].includes(lowerName)) {
      return 'Cooking';
    } else if (['plate', 'garnish'].includes(lowerName)) {
      return 'Assembly';
    } else if (['stir', 'blend', 'whisk', 'fold'].includes(lowerName)) {
      return 'Sauce';
    } else if (['steam'].includes(lowerName)) {
      return 'Side Dish';
    }
    
    return 'Misc';
  };
  
  return (
    <div className="absolute top-12 left-0 w-60 bg-gray-600 rounded shadow-lg z-10 border border-gray-500">
      <div className="p-2 border-b border-gray-500">
        <input 
          type="text" 
          placeholder="Search techniques..." 
          className="w-full p-1 bg-gray-700 border border-gray-500 text-white rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {filteredCategories.map((category, catIndex) => (
          <TechniqueCategory 
            key={catIndex}
            category={category}
            onSelect={handleAddPreparation}
          />
        ))}
        
        <CustomTechniqueCreator 
          onCreateTechnique={handleAddPreparation} 
        />
      </div>
    </div>
  );
};

export default PreparationDropdown;