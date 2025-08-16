import React, { useState, useEffect } from "react";
import "./HomePage.css";
import NBAScores from "./NBAScores";
import StandingsTable from "./StandingsTable";

const HomePage = ({ theme, setTheme }) => {
  // Function to toggle between light and dark theme styles
  const toggle_mode = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div className={`home-page ${theme}`}>
      <h1
        className={`title-${theme}`} // Dynamically apply the right title color class
      ></h1>
      <div>
        <NBAScores />
      </div>

      <div>
        <StandingsTable />
      </div>
    </div>
  );
};

export default HomePage;
