import React from 'react';
import './HomePage.css';
import NBAScores from './NBAScores';


const HomePage = () =>{
return(
    <div>
        <h1>Today's NBA Scores</h1>
        <div>
        <NBAScores/>
        </div>
    </div>
)


};
export default HomePage;