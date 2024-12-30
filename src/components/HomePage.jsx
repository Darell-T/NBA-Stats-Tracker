import React, { useState, useEffect } from 'react'; 
import './HomePage.css';
import NBAScores from './NBAScores';

const HomePage = () => {
  const [theme, setTheme] = useState('light');

  // Function to toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Keep theme in local storage
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className={`home-page ${theme}`}>
      <h1 
        className={`title-${theme}`} // Dynamically apply the right title color class
        onClick={toggleTheme}>
        Today's NBA Scores
      </h1>
      <div>
        <NBAScores />
      </div>
    </div>
  );
};

export default HomePage;
