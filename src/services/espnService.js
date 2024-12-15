import axios from 'axios';

// ESPN API for all NBA-related data
export const getESPNScoreboard = async () => {
    try {
        const response = await axios.get('https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard');
        return response.data; // Returns the data from the API
    } catch (error) {
        console.error('Error fetching data:', error); 
        throw error; nt
    }
};
