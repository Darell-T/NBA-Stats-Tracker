import React, { useState } from "react";
import { FcHome, FcLike, FcSearch, FcLock, FcIdea } from "react-icons/fc"; // ✅ add FcIdea
import "./NavBar.css";
import logo_gif from "/src/assets/logo-gif.gif";
import axios from "axios";
import PlayerCard from "./PlayerCard";

const NavBar = ({ theme, setTheme, onSignInClick, onClose, onHomeClick }) => {
  const [playerName, setPlayerName] = useState("");
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggle_mode = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const handleInputChange = (e) => {
    setPlayerName(e.target.value);
    if (error) setError(null);
  };

  const handleSearch = async () => {
    setError(null);
    setPlayerData(null);

    if (!playerName.trim()) {
      setError("Please enter a player name");
      return;
    }

    const nameParts = playerName.trim().split(/\s+/);

    if (nameParts.length < 2) {
      setError("Please enter both first and last name");
      return;
    }

    const [firstName, ...lastNameParts] = nameParts;
    const lastName = lastNameParts.join(" ");

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/player-full-data",
        {
          firstName,
          lastName,
        }
      );

      if (
        response.data?.success &&
        response.data?.player &&
        response.data?.stats
      ) {
        const { player, stats } = response.data;

        const combinedData = {
          playerId: player.playerId,
          firstName: player.firstName,
          lastName: player.lastName,
          fullName: player.fullName,
          teamName: player.teamName,
          position: player.position,
          headshotUrl: player.headshotUrl,
          jerseyNumber: player.jerseyNumber,
          ...stats,
        };

        setPlayerData(combinedData);
      } else {
        setError("Player data not found or invalid response format.");
      }
    } catch (error) {
      let errorMessage = "An error occurred while fetching player data.";

      if (error.response) {
        const status = error.response.status;
        const responseError =
          error.response.data?.error || error.response.data?.message || "";

        switch (status) {
          case 400:
            errorMessage =
              "Invalid input. Please enter both first and last name.";
            break;
          case 404:
            errorMessage =
              "Player not found. Please check the spelling and try again.";
            break;
          case 429:
            errorMessage =
              "Too many requests. Please wait a moment and try again.";
            break;
          case 500:
            errorMessage = "Server error. Please try again later.";
            break;
          default:
            errorMessage = `Server error (${status}): ${responseError}`;
        }
      } else if (error.request) {
        errorMessage =
          "Network error. Please check your connection and try again.";
      } else {
        errorMessage = `Error: ${error.message}`;
      }

      setError(errorMessage);
      setPlayerData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const closePlayerCard = () => {
    setPlayerData(null);
    setPlayerName("");
    setError(null);
  };

  return (
    <>
      <div className="navbar">
        <img src={logo_gif} className="logo" alt="Logo" />
        <ul>
          <li onClick={onHomeClick}>
            <FcHome /> Home
          </li>
          <li>
            <FcLike /> Favorites
          </li>
          <li
            style={{ cursor: "pointer" }}
            onClick={() => {
              onSignInClick();
              if (onClose) onClose();
            }}
          >
            <FcLock /> Sign-in
          </li>
        </ul>

        <div className="search-bar">
          <input
            type="text"
            onKeyPress={handleKeyPress}
            placeholder="Enter Player Name"
            value={playerName}
            onChange={handleInputChange}
            disabled={loading}
            style={{
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "text",
            }}
          />
          <FcSearch
            onClick={handleSearch}
            className="search-icon"
            style={{
              fontSize: "24px",
              marginLeft: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          />
        </div>

        <FcIdea
          onClick={toggle_mode}
          className="toggle-icon"
          style={{
            fontSize: "28px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            filter:
              theme === "light"
                ? "drop-shadow(0 0 6px #FFD700)" // glowing in light mode
                : "grayscale(100%) brightness(60%)", // dimmed in dark mode
          }}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        />
        {loading && (
          <div
            className="loading-indicator"
            style={{
              position: "absolute",
              top: "60px",
              right: "20px",
              background: theme === "light" ? "white" : "#333",
              color: theme === "light" ? "black" : "white",
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "14px",
              zIndex: 1001,
            }}
          >
            🔄 Searching...
          </div>
        )}

        {error && !playerData && (
          <div
            className="error-message"
            style={{
              position: "absolute",
              top: "60px",
              right: "20px",
              background: "#ffebee",
              color: "#c62828",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #f44336",
              fontSize: "14px",
              maxWidth: "300px",
              zIndex: 1001,
            }}
          >
            ❌ {error}
          </div>
        )}
      </div>

      {playerData && !error && (
        <div className="player-card-overlay">
          <div className="player-card-modal">
            <button
              className="close-button"
              onClick={closePlayerCard}
              aria-label="Close player card"
            >
              ✕
            </button>
            <PlayerCard player={playerData} theme={theme} />
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
