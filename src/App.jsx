import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';

const App = () => {
  // Get the current theme from localStorage if exists, or default to 'light'
  const current_theme = localStorage.getItem('current_theme');
  
  // Set initial theme state based on localStorage
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');
  
  // Update localStorage whenever the theme changes
  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);

  return (
    <div>
      <div className={`navbar-container ${theme}`}>
        <NavBar theme={theme} setTheme={setTheme} />
        <HomePage theme={theme} />
      </div>
    </div>
  );
};

export default App;
