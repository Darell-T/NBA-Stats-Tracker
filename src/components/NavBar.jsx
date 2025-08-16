import React, { useState } from "react";
import { FaHome, FaStar, FaSignInAlt } from "react-icons/fa";
import "./NavBar.css";
import search_icon_light from "/src/assets/search-w.png";
import search_icon_dark from "/src/assets/search-b.png";
import toggle_light from "/src/assets/night.png";
import toggle_dark from "/src/assets/day.png";
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
      console.log("Searching for:", { firstName, lastName });

      const response = await axios.post(
        "http://localhost:5000/api/player-full-data",
        {
          firstName,
          lastName,
        }
      );

      console.log("API response:", response.data);

      // Handle the new response structure
      if (
        response.data?.success &&
        response.data?.player &&
        response.data?.stats
      ) {
        const { player, stats } = response.data;

        const combinedData = {
          // Player info
          playerId: player.playerId,
          firstName: player.firstName,
          lastName: player.lastName,
          fullName: player.fullName,
          teamName: player.teamName,
          position: player.position,
          headshotUrl: player.headshotUrl,
          jerseyNumber: player.jerseyNumber,
          // Stats data
          ...stats,
        };

        console.log("Combined player data:", combinedData);
        setPlayerData(combinedData);
      } else {
        setError("Player data not found or invalid response format.");
      }
    } catch (error) {
      console.error("Error fetching player:", error);

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

  // Function to close the player card
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
            <FaHome /> Home
          </li>
          <li>
            <FaStar /> Favorites
          </li>
          <li
            style={{ cursor: "pointer" }}
            onClick={onSignInClick}
            onClose={onClose}
          >
            <FaSignInAlt /> Sign-in
          </li>
        </ul>

        <div className="search-bar">
          <input
            type="text"
            onKeyPress={handleKeyPress}
            placeholder="Enter NBA Player Name (e.g., LeBron James)"
            value={playerName}
            onChange={handleInputChange}
            disabled={loading}
            style={{
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "text",
            }}
          />
          <img
            onClick={handleSearch}
            src={theme === "light" ? search_icon_light : search_icon_dark}
            alt="Search"
            className="search-icon"
            style={{
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          />
        </div>

        <img
          onClick={toggle_mode}
          src={theme === "light" ? toggle_light : toggle_dark}
          alt="Toggle Theme"
          className="toggle-icon"
        />

        {/* Loading indicator in navbar */}
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

        {/* Error message in navbar */}
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

      {/* Centered Player Card Overlay */}
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
