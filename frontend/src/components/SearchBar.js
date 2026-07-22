import React, { useState } from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch, onClear }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim()) {
      onSearch(value);
    } else {
      onClear();
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    onClear();
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search notes..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />
      {searchQuery && (
        <button className="clear-btn" onClick={handleClear}>
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;
