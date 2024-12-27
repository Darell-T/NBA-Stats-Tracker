import React, { useState, useEffect } from 'react';
import { getESPNScoreboard } from '../services/espnService';



const NBAScores = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [boxScore, setBoxScore] = useState(null); // State for the selected game's box score
    const [selectedGame, setSelectedGame] = useState(null); // To store the selected game

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch scoreboard data (game list)
                const scoreboardData = await getESPNScoreboard();
                const gamesData = scoreboardData.events.map((event) => ({
                    id: event.id,
                    homeTeam: {
                        name: event.competitions[0].competitors[0].team.displayName,
                        logo: event.competitions[0].competitors[0].team.logo,
                        score: event.competitions[0].competitors[0].score,
                    },
                    awayTeam: {
                        name: event.competitions[0].competitors[1].team.displayName,
                        logo: event.competitions[0].competitors[1].team.logo,
                        score: event.competitions[0].competitors[1].score,
                    },
                    status: event.status.type.description,
                }));
                setGames(gamesData);
            } catch (error) {
                console.error('Error fetching NBA scoreboard:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Function to handle when a game is clicked
    const handleGameClick = async (game) => {
        console.log('Game clicked:', game); // Log to check if game data is being passed
        setSelectedGame(game); // Set the selected game
        try {
            // Fetch the box score for the selected game
            const response = await getBoxScore(game.id); // Pass the game ID
            console.log('Box score fetched:', response);  // Log the fetched box score
            setBoxScore(response); // Set the box score to state
        } catch (error) {
            console.error('Failed to fetch box score:', error);
            setBoxScore(null);
        }
    };

    if (loading) return <p>Loading NBA data...</p>;

    return (
        <div>
            <ul>
                {games.map((game) => (
                    <li
                        key={game.id}
                        onClick={() => handleGameClick(game)}
                        style={{ marginBottom: '1em', cursor: 'pointer' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img src={game.homeTeam.logo} alt={game.homeTeam.name} width="40" height="40" />
                            <strong>{game.homeTeam.name}</strong> ({game.homeTeam.score})
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img src={game.awayTeam.logo} alt={game.awayTeam.name} width="40" height="40" />
                            <strong>{game.awayTeam.name}</strong> ({game.awayTeam.score})
                        </div>
                        <p>Status: {game.status}</p>
                    </li>
                ))}
            </ul>

            {/* Displaying the Box Score for the selected game */}
            {boxScore && selectedGame && (
                <div className="box-score">
                    <h2>Box Score for {selectedGame.homeTeam.name} vs {selectedGame.awayTeam.name}</h2>
                    <div>
                        <h3>{selectedGame.homeTeam.name}</h3>
                        <ul>
                            {boxScore.home.players.map((player) => (
                                <li key={player.personId}>
                                    <img src={player.headshot.href} alt={player.displayName} width="40" />
                                    {player.displayName}: {player.stats.points} points, {player.stats.rebounds} rebounds
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>{selectedGame.awayTeam.name}</h3>
                        <ul>
                            {boxScore.away.players.map((player) => (
                                <li key={player.personId}>
                                    <img src={player.headshot.href} alt={player.displayName} width="40" />
                                    {player.displayName}: {player.stats.points} points, {player.stats.rebounds} rebounds
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NBAScores;
