import React, { useState } from 'react';

const CategorySelector = ({ selectedCategory, onSelectCategory }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const categories = [
    { name: 'VEGETABLES', ingredients: ['Tomatoes', 'Onions', 'Carrots', 'Bell Peppers', 'Garlic'] },
    { name: 'MEAT', ingredients: ['Chicken', 'Beef', 'Pork', 'Lamb', 'Turkey'] },
    { name: 'DAIRY', ingredients: ['Milk', 'Cheese', 'Butter', 'Cream', 'Yogurt'] },
    { name: 'SPICES', ingredients: ['Salt', 'Pepper', 'Cumin', 'Paprika', 'Turmeric'] },
    { name: 'GRAINS', ingredients: ['Rice', 'Pasta', 'Quinoa', 'Couscous', 'Barley'] }
  ];
  
  const handleSelect = (category) => {
    onSelectCategory(category);
    setDropdownOpen(false);
  };
  
  return (
    <div className="relative mr-2">
      <div 
        className="bg-gray-600 h-10 w-40 rounded flex items-center justify-between px-2 cursor-pointer"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <span className="text-white">{selectedCategory || "Select Category"}</span>
        <span className="text-white">{dropdownOpen ? '▲' : '▼'}</span>
      </div>
      
      {dropdownOpen && (
        <div className="absolute top-11 left-0 w-40 bg-gray-600 rounded shadow-lg z-10 border border-gray-500">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="px-2 py-1 hover:bg-gray-500 cursor-pointer text-white"
              onClick={() => handleSelect(category.name)}
            >
              {category.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySelector;