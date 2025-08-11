import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import SignIn from "./components/SignIn";
import PlayerCard from "./components/PlayerCard"; // Import PlayerCard component

const App = () => {
  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(current_theme ? current_theme : "light");

  useEffect(() => {
    localStorage.setItem("current_theme", theme);
  }, [theme]);

  const [showSignIn, setShowSignIn] = useState(false);
  const [showScores, setShowScores] = useState(true);
  const [playerData, setPlayerData] = useState(null); // Manage player data state

  const handleSearch = (data) => {
    console.log("Player data received in App:", data); // Log the received data
    setPlayerData(data); // Update with player data fetched from API
    setShowScores(false); // Hide HomePage if search results are shown
    setShowSignIn(false); // Ensure Sign-In form is hidden
  };

  const handleSignInClick = () => {
    setShowSignIn(true);
    setShowScores(false); // Hide scores when signing in
  };

  const handleCloseSignInForm = () => {
    setShowSignIn(false);
    setShowScores(true); // Show scores again when signing in is closed
  };

  const handleHomeClick = () => {
    setShowScores(true); // Show scores
    setShowSignIn(false); // Hide Sign-In
    setPlayerData(null); // Clear search results
  };

  return (
    <div>
      <div className={`navbar-container ${theme}`}>
        <NavBar
          theme={theme}
          setTheme={setTheme}
          onSignInClick={handleSignInClick}
          onHomeClick={handleHomeClick}
          onSearch={handleSearch} // Pass search handler to NavBar
        />

        {showScores && !playerData && (
          <HomePage theme={theme} setTheme={setTheme} />
        )}
      </div>

      {showSignIn && (
        <div className="sign-in-container">
          <SignIn onClose={handleCloseSignInForm} />
        </div>
      )}

      {/* Render PlayerCard if playerData is available */}
      {playerData && (
        <div className="player-card-container">
          <PlayerCard
            player={playerData} // Pass player data as prop
            theme={theme}
            onClose={handleHomeClick} // Close player card and return to HomePage
          />
        </div>
      )}
    </div>
  );
};

export default App;
