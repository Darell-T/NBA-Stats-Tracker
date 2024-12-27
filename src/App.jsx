import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import SignIn from './components/SignIn';

const App = () => {
  // Get the current theme from localStorage if exists, or default to 'light'
  const current_theme = localStorage.getItem('current_theme');
  
  // Set initial theme state based on localStorage
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');
  const [showSignIn, setShowSignIn] = useState(false);
  
  // Update localStorage whenever the theme changes
  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);

  return (
    <div>
      <div className={`navbar-container ${theme}`}>
        <NavBar 
          theme={theme} 
          setTheme={setTheme} 
          onSignInClick={() => setShowSignIn(true)} 
        />
        <HomePage theme={theme} />
      </div>

      {showSignIn && (
        <div className="sign-in">
          <SignIn onClose={() => setShowSignIn(false)} />
        </div>
      )}
    </div>
  );
};

export default App;
