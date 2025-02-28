const TechniqueButtons = () => {
    const techniqueCategories = [
      { name: 'Heat', color: 'bg-orange-500' },
      { name: 'Cold', color: 'bg-blue-300' },
      { name: 'Cut', color: 'bg-yellow-400' },
      { name: 'Mix', color: 'bg-blue-500' },
      { name: 'More...', color: 'bg-gray-600' },
    ];
  
    return (
      <div className="mt-6">
        <h3 className="text-white text-center text-sm mb-2">Techniques</h3>
        
        <div className="space-y-2">
          {techniqueCategories.map((category, index) => (
            <button 
              key={index} 
              className="w-full bg-gray-600 py-1 rounded text-white text-sm"
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="mt-8">
          <button className="w-full bg-green-500 text-white py-2 rounded text-sm">
            Custom
          </button>
        </div>
      </div>
    );
  };
  
  export default TechniqueButtons;