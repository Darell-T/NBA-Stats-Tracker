import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NBAScores = ({ theme, setTheme }) => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    const toggle_mode = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/nba-scores');
                console.log('Fetched data:', data);
                const gamesData = data?.events?.map((event) => ({
                    id: event.id,
                    homeTeam: {
                        name: event.competitions?.[0]?.competitors?.[0]?.team?.displayName || 'N/A',
                        logo: event.competitions?.[0]?.competitors?.[0]?.team?.logo || '',
                        score: event.competitions?.[0]?.competitors?.[0]?.score || 0,
                    },
                    awayTeam: {
                        name: event.competitions?.[0]?.competitors?.[1]?.team?.displayName || 'N/A',
                        logo: event.competitions?.[0]?.competitors?.[1]?.team?.logo || '',
                        score: event.competitions?.[0]?.competitors?.[1]?.score || 0,
                    },
                    status: event.status?.type?.description || 'Unknown',
                })) || [];
                setGames(gamesData);
            } catch (error) {
                console.error('Error fetching NBA scoreboard:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading NBA data...</p>;
    if (!games.length) return <p>No games available to display.</p>;

    return (
        <div>
            <ul className={`scores ${theme}`}>
                {games.map((game) => (
                    <li key={game.id} style={{ marginBottom: '1em',
                        color: theme === 'dark' ? 'white': 'black',
                    }}>
                        <div>
                            <img src={game.homeTeam.logo} alt={game.homeTeam.name} width="40" />
                            {game.homeTeam.name} ({game.homeTeam.score})
                        </div>
                        <div>
                            <img src={game.awayTeam.logo} alt={game.awayTeam.name} width="40" />
                            {game.awayTeam.name} ({game.awayTeam.score})
                        </div>
                        <p>Status: {game.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NBAScores;
