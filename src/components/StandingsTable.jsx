import React, { useState, useEffect } from "react";
import "./StandingsTable.css";

const StandingsTable = () => {
  const [standings, setStandings] = useState({
    eastern: [],
    western: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        setStandings((prevState) => ({ ...prevState, loading: true }));
        const response = await fetch("http://localhost:5000/api/standings");

        if (!response.ok) {
          throw new Error("Failed to fetch standings");
        }

        const data = await response.json();
        setStandings({
          eastern: data.eastern,
          western: data.western,
          loading: false,
          error: null,
        });
      } catch (error) {
        setStandings((prevState) => ({
          ...prevState,
          loading: false,
          error: error.message,
        }));
      }
    };

    fetchStandings();
  }, []);

  const sortedEastern = [...standings.eastern].sort((a, b) => b.wins - a.wins);
  const sortedWestern = [...standings.western].sort((a, b) => b.wins - a.wins);

  if (standings.loading) return <div>Loading standings…</div>;
  if (standings.error) return <div>Error: {standings.error}</div>;

  return (
    <div>
      <p className="title">Standings</p>
      <div className="standings">
        {/* Eastern Conference */}
        <div className="standings-card">
          <h3 className="standings-title">Eastern Conference</h3>
          <table className="standings-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Team</th>
                <th>Wins</th>
                <th>Losses</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              {sortedEastern.map((team, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="team-cell">
                    <img
                      src={team.logo}
                      alt={team.name}
                      className="team-logo"
                    />
                    {team.name}
                  </td>
                  <td>{team.wins}</td>
                  <td>{team.losses}</td>
                  <td>{(team.wins / (team.wins + team.losses)).toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Western Conference */}
        <div className="standings-card">
          <h3 className="standings-title">Western Conference</h3>
          <table className="standings-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Team</th>
                <th>Wins</th>
                <th>Losses</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              {sortedWestern.map((team, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="team-cell">
                    <img
                      src={team.logo}
                      alt={team.name}
                      className="team-logo"
                    />
                    {team.name}
                  </td>
                  <td>{team.wins}</td>
                  <td>{team.losses}</td>
                  <td>{(team.wins / (team.wins + team.losses)).toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StandingsTable;
