import React, { useState, useEffect } from "react";
import "./StandingsTable.css"; // Assuming you have a CSS file for styling
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
        //data are you there????
        //console.log("Fetched standings data:", data);
        //console.log("Eastern Conference:", data.eastern?.length || 0);
        //console.log("Western Conference:", data.western?.length || 0);

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
    }; //

    fetchStandings();
  }, []);

  // check data
  console.log("Standings data:", standings);
  const sortedEastern = [...standings.eastern].sort((a, b) => b.wins - a.wins);
  const sortedWestern = [...standings.western].sort((a, b) => b.wins - a.wins);
  console.log("Sorted Eastern Conference:", sortedEastern);
  console.log("Sorted Western Conference:", sortedWestern);

  return (
    <div>
      <h2 className="title">NBA Standings</h2>
      <div className="standings-container">
        <h3 className="standings-title">Eastern Conference</h3>
        <table className="standings-table">
          <thead>
            <tr>
              <th>Team</th>
              <th>Wins</th>
              <th>Losses</th>
              <th>Win %</th>
            </tr>
          </thead>
          <tbody>
            {sortedEastern.map((team, index) => (
              <tr key={index}>
                <td>{index + 1} </td> {/* Display team rank */}
                <td>
                  <img src={team.logo} alt={team.name} width="30" height="30" />
                </td>
                <td>{team.name}</td>
                <td>{team.wins}</td>
                <td>{team.losses}</td>
                <td>{(team.wins / (team.wins + team.losses)).toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StandingsTable;
