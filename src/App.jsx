import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import SignIn from './components/SignIn';

const App = () => {
  const current_theme = localStorage.getItem('current_theme');
  
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');
  
  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);

  const [showSignIn, setShowSignIn] = useState(false);
  const [showScores, setShowScores] = useState(true);

  const handleSignInClick = () => {
    setShowSignIn(true);
    setShowScores(false);  // Hide scores when signing in
  };

  const handleCloseSignInForm = () => {
    setShowSignIn(false);
    setShowScores(true); // Show scores again when signing in is closed
  };

  return (
    <div>
      <div className={`navbar-container ${theme}`}>
        <NavBar 
          theme={theme} 
          setTheme={setTheme} 
          onSignInClick={handleSignInClick}
          onHomeClick={() => { setShowScores(true); setShowSignIn(false); }}
        />
        {showScores && !showSignIn && <HomePage theme={theme} />}
      </div>

      {showSignIn && (
        <div className="sign-in-container">
          <SignIn onClose={handleCloseSignInForm} />
        </div>
      )}
    </div>
  );
};

export default App;
