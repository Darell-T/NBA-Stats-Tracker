import React from 'react';

const PlayerCard = ({ player }) => {
  if (!player) return null;

  console.log('Player data in PlayerCard:', player); // Log the player data
  const playerStats = player[player.length - 1]; // Get the last element of the array
//HEADSHOT WORKS, WORKING ON GETTING DATA TO DISPLAY
  return (
    <div>
      <h2>{player.name}</h2>
      <img src={player.headshotUrl} alt={player.name} width="200" />
      <p>Team: {player.team}</p>
      <p>Position: {player.position}</p>
      <p>Points per game: {player.pointsPerGame}</p>
      <p>Assists per game: {player.assistsPerGame}</p>
      <p>Rebounds per game: {player.totalReboundsPerGame}</p>
      <p>Steals per game: {player.stealsPerGame}</p>
      <p>Blocks per game: {player.blocksPerGame}</p>
      <p>Field Goal Percentage: {player.fieldGoalPercentage}</p>
      <p>Three Point Percentage: {player.threePointFieldGoalPercentage}</p>
      <p>Free Throw Percentage: {player.freeThrowPercentage}</p>
    </div>
  );
};

export default PlayerCard;