import React from "react";
import "./HeroSection.css";

const HeroSection = ({ theme }) => {
  const scrollToScores = () => {
    const scoresSection = document.querySelector(".scores");
    if (scoresSection) {
      scoresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToSearch = () => {
    const searchBar = document.querySelector(".search-bar input");
    if (searchBar) {
      searchBar.focus();
      searchBar.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`hero-section ${theme}`}>
      <div className="floating-elements">
        <div className="floating-ball">🏀</div>
        <div className="floating-ball">🏀</div>
        <div className="floating-ball">🏀</div>
      </div>

      <div className="hero-content">
        <h1 className="hero-title">NBA Stats Tracker</h1>
        <p className="hero-subtitle">
          Get live scores, standings, and detailed player statistics all in one
          place. Stay updated with real-time NBA data.
        </p>

        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-number">30</div>
            <div className="stat-label">Teams</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">Live</div>
            <div className="stat-label">Updates</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Players</div>
          </div>
        </div>

        <div className="hero-cta">
          <button onClick={scrollToScores} className="cta-button cta-primary">
            🏀 View Live Scores
          </button>
          <button onClick={scrollToSearch} className="cta-button cta-secondary">
            🔍 Search Players
          </button>
        </div>
      </div>

      <div className="game-preview">
        <h3 className="preview-title">What You'll Find</h3>
        <div className="sample-cards">
          <div className="sample-card">
            <div className="card-header">
              <span className="status-live">Live</span>
              <span>Q3 8:42</span>
            </div>
            <div className="teams">
              <div className="team">
                <span className="team-name">Lakers</span>
                <span className="score">98</span>
              </div>
              <div className="team">
                <span className="team-name">Warriors</span>
                <span className="score">102</span>
              </div>
            </div>
          </div>

          <div className="sample-card">
            <div className="card-header">
              <span>Player Stats</span>
              <span>2024 Season</span>
            </div>
            <div className="teams">
              <div className="team">
                <span className="team-name">PPG</span>
                <span className="score">28.4</span>
              </div>
              <div className="team">
                <span className="team-name">RPG</span>
                <span className="score">8.1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
