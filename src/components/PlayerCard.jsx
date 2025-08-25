import React from "react";
import "./PlayerCard.css";

const PlayerCard = ({ player, theme, onClose }) => {
  if (!player) return null;

  console.log("Player data in PlayerCard:", player);
  const playerStats = player.body[player.body.length - 2];

  return (
    <div className="player-card-overlay">
      <div className="player-card-modal">
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Close player card"
        >
          ×
        </button>

        <div className={`player-card ${theme}`}>
          {/* Header Section */}
          <div className={`player-header ${theme}`}>
            <h2 className="player-title">
              {`${player.firstName ?? ""} ${player.lastName ?? ""}`.trim() ||
                "Unknown Player"}
            </h2>

            {player.headshotUrl ? (
              <img
                src={player.headshotUrl}
                alt={playerStats.name || "Player"}
                className={`player-image ${theme}`}
                onError={(e) => {
                  console.log("Image failed to load:", player.headshotUrl);
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <div className={`player-image-placeholder ${theme}`}>
                No Photo Available
              </div>
            )}

            <div className="team-position-container">
              <div className={`stat-item ${theme}`}>
                <div className={`stat-label ${theme}`}>Team</div>
                <div className={`stat-value ${theme}`}>
                  {playerStats.team || "N/A"}
                </div>
              </div>
              <div className={`stat-item ${theme}`}>
                <div className={`stat-label ${theme}`}>Position</div>
                <div className={`stat-value ${theme}`}>
                  {playerStats.position || "N/A"}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className={`stat-item ${theme}`}>
              <div className={`stat-label ${theme}`}>Points per Game</div>
              <div className={`stat-value ${theme}`}>
                {playerStats.pointsPerGame || "N/A"}
              </div>
            </div>

            <div className={`stat-item ${theme}`}>
              <div className={`stat-label ${theme}`}>Assists per Game</div>
              <div className={`stat-value ${theme}`}>
                {playerStats.assistsPerGame || "N/A"}
              </div>
            </div>

            <div className={`stat-item ${theme}`}>
              <div className={`stat-label ${theme}`}>Rebounds per Game</div>
              <div className={`stat-value ${theme}`}>
                {playerStats.totalReboundsPerGame || "N/A"}
              </div>
            </div>

            <div className={`stat-item ${theme}`}>
              <div className={`stat-label ${theme}`}>Steals per Game</div>
              <div className={`stat-value ${theme}`}>
                {playerStats.stealsPerGame || "N/A"}
              </div>
            </div>

            <div className={`stat-item ${theme}`}>
              <div className={`stat-label ${theme}`}>Blocks per Game</div>
              <div className={`stat-value ${theme}`}>
                {playerStats.blocksPerGame || "N/A"}
              </div>
            </div>

            <div className={`stat-item ${theme}`}>
              <div className={`stat-label ${theme}`}>Field Goal %</div>
              <div className={`stat-value ${theme}`}>
                {playerStats.fieldGoalPercentage
                  ? `${(playerStats.fieldGoalPercentage * 100).toFixed(1)}%`
                  : "N/A"}
              </div>
            </div>

            <div className={`stat-item ${theme}`}>
              <div className={`stat-label ${theme}`}>Three Point %</div>
              <div className={`stat-value ${theme}`}>
                {playerStats.threePointFieldGoalPercentage
                  ? `${(
                      playerStats.threePointFieldGoalPercentage * 100
                    ).toFixed(1)}%`
                  : "N/A"}
              </div>
            </div>

            <div className={`stat-item ${theme}`}>
              <div className={`stat-label ${theme}`}>Free Throw %</div>
              <div className={`stat-value ${theme}`}>
                {playerStats.freeThrowPercentage
                  ? `${(playerStats.freeThrowPercentage * 100).toFixed(1)}%`
                  : "N/A"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
