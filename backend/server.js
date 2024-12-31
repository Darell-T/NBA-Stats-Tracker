require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

// Initialize express app
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// #1. Fetch NBA scores from ESPN API
app.get('/api/nba-scores', async (req, res) => {
    try {
        const response = await axios.get('https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching NBA Scores:', error);
        res.status(500).json({ message: 'Failed to fetch current scores.' });
    }
});

// #2. Fetch player by name (to get player ID)
app.post('/api/player-stats', async (req, res) => {
    const { firstname, lastname } = req.body;

    const options = {
        method: 'POST',
        url: `${process.env.NBA_API_URL}/players/search`,
        headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
            'x-rapidapi-host': 'basketball-head.p.rapidapi.com',
            'Content-Type': 'application/json',
        },
        data: {
            firstname,
            lastname,
            pageSize: 1,
        },
    };

    try {
        const response = await axios.request(options);
        res.json(response.data);
    } catch (error) {
        console.error('Error searching for player:', error);
        res.status(500).json({ message: 'Player search failed.' });
    }
});

// #3. Fetch player stats by ID
app.get('/api/player-stats/:playerId', async (req, res) => {
    const { playerId } = req.params;

    const options = {
        method: 'GET',
        url: `https://basketball-head.p.rapidapi.com/players/${playerId}/stats/PerGame`,
        params: {
            seasonType: 'Regular',
        },
        headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
            'x-rapidapi-host': 'basketball-head.p.rapidapi.com',
        },
    };

    try {
        const response = await axios.request(options);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching player stats:', error);
        res.status(500).json({ message: 'Failed to fetch player stats.' });
    }
});
// #TEST ROUTES WITH POSTMAN BEFORE INTEGRATING WITH FRONTEND
//Once connected to postgresql I will add the methods for favorites and user search history




// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
