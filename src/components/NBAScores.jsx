import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NBAScores.css";

const NBAScores = ({ theme, setTheme }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggle_mode = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const getGameStatus = (statusData) => {
    const statusName = statusData?.type?.name?.toLowerCase() || "";
    const description = statusData?.type?.description || "Unknown";

    if (statusName.includes("final") || statusName === "status_final") {
      return { status: "final", display: "Final", class: "final" };
    } else if (
      statusName.includes("in_progress") ||
      statusName === "status_in_progress"
    ) {
      return { status: "live", display: "Live", class: "live" };
    } else if (
      statusName.includes("scheduled") ||
      statusName === "status_scheduled"
    ) {
      return { status: "upcoming", display: "Upcoming", class: "upcoming" };
    }

    return { status: "unknown", display: description, class: "upcoming" };
  };

  const getTeamAbbreviation = (teamName) => {
    const abbreviations = {
      "Los Angeles Lakers": "LAL",
      "Golden State Warriors": "GSW",
      "Boston Celtics": "BOS",
      "Miami Heat": "MIA",
      "Chicago Bulls": "CHI",
      "New York Knicks": "NYK",
      "Brooklyn Nets": "BKN",
      "Philadelphia 76ers": "PHI",
      "Toronto Raptors": "TOR",
      "Milwaukee Bucks": "MIL",
      "Indiana Pacers": "IND",
      "Detroit Pistons": "DET",
      "Cleveland Cavaliers": "CLE",
      "Atlanta Hawks": "ATL",
      "Charlotte Hornets": "CHA",
      "Orlando Magic": "ORL",
      "Washington Wizards": "WAS",
      "Denver Nuggets": "DEN",
      "Utah Jazz": "UTA",
      "Oklahoma City Thunder": "OKC",
      "Portland Trail Blazers": "POR",
      "Minnesota Timberwolves": "MIN",
      "Phoenix Suns": "PHX",
      "Sacramento Kings": "SAC",
      "Los Angeles Clippers": "LAC",
      "San Antonio Spurs": "SAS",
      "Dallas Mavericks": "DAL",
      "Memphis Grizzlies": "MEM",
      "New Orleans Pelicans": "NOP",
      "Houston Rockets": "HOU",
    };

    return (
      abbreviations[teamName] ||
      teamName
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 3)
    );
  };

  const formatGameTime = (event) => {
    try {
      const date = new Date(event.date);
      const options = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZoneName: "short",
      };
      return date.toLocaleTimeString("en-US", options);
    } catch {
      return "TBD";
    }
  };

  const getWinner = (homeScore, awayScore, gameStatus) => {
    if (gameStatus !== "final") return null;
    const home = parseInt(homeScore) || 0;
    const away = parseInt(awayScore) || 0;
    if (home > away) return "home";
    if (away > home) return "away";
    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/nba-scores"
        );

        const gamesData =
          data?.events?.map((event) => {
            const competition = event.competitions?.[0];
            const competitors = competition?.competitors || [];

            const homeTeam =
              competitors.find((comp) => comp.homeAway === "home") ||
              competitors[0];
            const awayTeam =
              competitors.find((comp) => comp.homeAway === "away") ||
              competitors[1];

            const gameStatusInfo = getGameStatus(event.status);
            const homeScore = homeTeam?.score || "0";
            const awayScore = awayTeam?.score || "0";
            const winner = getWinner(
              homeScore,
              awayScore,
              gameStatusInfo.status
            );

            return {
              id: event.id,
              homeTeam: {
                name: homeTeam?.team?.displayName || "N/A",
                abbreviation: getTeamAbbreviation(
                  homeTeam?.team?.displayName || ""
                ),
                logo: homeTeam?.team?.logo || "",
                score: homeScore,
                isWinner: winner === "home",
              },
              awayTeam: {
                name: awayTeam?.team?.displayName || "N/A",
                abbreviation: getTeamAbbreviation(
                  awayTeam?.team?.displayName || ""
                ),
                logo: awayTeam?.team?.logo || "",
                score: awayScore,
                isWinner: winner === "away",
              },
              status: gameStatusInfo,
              time: formatGameTime(event),
              venue: competition?.venue?.fullName || "TBD",
              broadcasts:
                competition?.broadcasts
                  ?.map((b) => b.names?.[0])
                  .filter(Boolean) || [],
            };
          }) || [];

        setGames(gamesData);
      } catch (error) {
        console.error("Error fetching NBA scoreboard:", error);
        setError("Failed to load NBA scores. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className={`scores ${theme} loading`}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`scores ${theme}`}>
        <div className="no-games">
          <div className="no-games-icon">⚠️</div>
          <h3>Unable to Load Scores</h3>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="retry-btn"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!games.length) {
    return (
      <div className={`scores ${theme}`}>
        <div className="no-games">
          <div className="no-games-icon">🏀</div>
          <h3>No Games Today</h3>
          <p>Check back later for upcoming games!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`scores ${theme}`}>
      {games.map((game) => (
        <div key={game.id} className="game-card">
          <div className="game-header">
            <span className={`game-status ${game.status.class}`}>
              {game.status.display}
            </span>
            <span className="game-time">{game.time}</span>
          </div>

          <div className="teams-container">
            <div className={`team ${game.awayTeam.isWinner ? "winner" : ""}`}>
              <div className="team-info">
                <img
                  src={game.awayTeam.logo}
                  alt={game.awayTeam.name}
                  className="team-logo"
                />
                <span className="team-name">{game.awayTeam.abbreviation}</span>
              </div>
              <span className="team-score">{game.awayTeam.score}</span>
            </div>

            <div className={`team ${game.homeTeam.isWinner ? "winner" : ""}`}>
              <div className="team-info">
                <img
                  src={game.homeTeam.logo}
                  alt={game.homeTeam.name}
                  className="team-logo"
                />
                <span className="team-name">{game.homeTeam.abbreviation}</span>
              </div>
              <span className="team-score">{game.homeTeam.score}</span>
            </div>
          </div>

          <div className="game-footer">
            <div className="venue">{game.venue}</div>
            {game.broadcasts.length > 0 && (
              <div className="broadcast">📺 {game.broadcasts.join(", ")}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NBAScores;
