// src/components/SearchBar.jsx
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [playerName, setPlayerName] = useState('');

  const handleChange = (event) => {
    setPlayerName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(playerName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={playerName}
        onChange={handleChange}
        placeholder="Search NBA player"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
