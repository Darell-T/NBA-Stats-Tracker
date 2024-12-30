//establishing the backend where a REST API will be created

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());

const PORT = 5000;

app.get('/api/nba-scores', async (req, res)=> {
    try{
        const response = await axios.get('https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard');
        res.json(response.data);
    }
    catch(error){
console.error('Encountered an error fetching NBA Scores', error);
res.status(500).json({message: 'Failed to fetch current scores'});
    }
});

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
});