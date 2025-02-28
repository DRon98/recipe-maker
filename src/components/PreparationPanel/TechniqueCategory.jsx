import React from 'react';

const TechniqueCategory = ({ category, onSelect }) => {
  return (
    <div className="p-2 border-b border-gray-500">
      <h4 className="text-gray-300 mb-1">{category.name}-Based</h4>
      <div className="flex flex-wrap gap-1">
        {category.techniques.map((technique, techIndex) => (
          <button 
            key={techIndex} 
            className={`${technique.color} text-gray-900 text-xs p-1 rounded`}
            onClick={() => onSelect(technique)}
          >
            {technique.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TechniqueCategory;