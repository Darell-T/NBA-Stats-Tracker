import React, { useState, useEffect } from "react";
import "./HomePage.css";
import HeroSection from "./HeroSection";
import NBAScores from "./NBAScores";
import StandingsTable from "./StandingsTable";

const HomePage = ({ theme, setTheme }) => {
  // Function to toggle between light and dark theme styles
  const toggle_mode = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div className={`home-page ${theme}`}>
      {/* Hero Section - NEW */}
      <HeroSection theme={theme} />

      <div>
        <NBAScores theme={theme} />
      </div>

      <div className="standings-section">
        <StandingsTable />
      </div>
    </div>
  );
};

export default HomePage;
