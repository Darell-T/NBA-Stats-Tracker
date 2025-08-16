import React, { useState, useEffect } from "react";

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
    }; //

    fetchStandings();
  }, []);

  // check data
  console.log("Standings data:", standings);

  return (
    <div>
      <h2>NBA Standings</h2>
      <p></p>
    </div>
  );
};

export default StandingsTable;
