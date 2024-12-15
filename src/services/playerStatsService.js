// playerStatsService.js
import axios from 'axios';

export const getBoxScore = async (gameId) => {
    try {
        const response = await axios.get(`https://cdn.nba.com/static/json/liveData/boxscore/boxscore_${gameId}.json`);
        console.log('Box score response:', response.data);  // Log the response to see if data is being fetched
        return response.data;
    } catch (error) {
        console.error('Error fetching box score:', error);
        throw error;
    }
};
