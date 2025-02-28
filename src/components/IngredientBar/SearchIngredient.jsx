import React, { useState } from 'react';

const SearchIngredient = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm);
    }
  };
  
  return (
    <div className="relative">
      <div className="bg-gray-600 h-10 w-10 rounded flex items-center justify-center text-gray-400 text-lg">
        🔍
      </div>
      
      <input
        type="text"
        placeholder="Search..." 
        className="absolute top-0 right-0 w-0 h-10 opacity-0 focus:opacity-100 focus:w-40 bg-gray-600 text-white px-2 rounded transition-all duration-300 ease-in-out"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearch}
      />
    </div>
  );
};

export default SearchIngredient;
