import React from 'react';

const PlayerCard = ({ player }) => {
  if (!player) return null;

  console.log('Player data in PlayerCard:', player); // Log the player data
  const playerStats = player.body[player.body.length - 1]; // Get the last element of the array
//HEADSHOT WORKS, WORKING ON GETTING DATA TO DISPLAY

console.log('Player stats:', playerStats);
  return (
    <div>
      <h2>{playerStats.name}</h2>
      <img src={player.headshotUrl} alt={player.name} width="200" />
      <p>Team: {playerStats.team}</p>
      <p>Position: {playerStats.position}</p>
      <p>Points per game: {playerStats.pointsPerGame}</p>
      <p>Assists per game: {playerStats.assistsPerGame}</p>
      <p>Rebounds per game: {playerStats.totalReboundsPerGame}</p>
      <p>Steals per game: {playerStats.stealsPerGame}</p>
      <p>Blocks per game: {playerStats.blocksPerGame}</p>
      <p>Field Goal Percentage: {playerStats.fieldGoalPercentage}</p>
      <p>Three Point Percentage: {playerStats.threePointFieldGoalPercentage}</p>
      <p>Free Throw Percentage: {playerStats.freeThrowPercentage}</p>
    </div>
  );
};

export default PlayerCard;