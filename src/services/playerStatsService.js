import axios from 'axios';
// This API contains the metadata for players and headshots
const options = {
  method: 'GET',
  url: 'https://basketball-head.p.rapidapi.com/players/jamesle01',
  headers: {
    'x-rapidapi-key': '8cd48c19bamshc15038d6562e299p149a6bjsn98180d5c0330',
    'x-rapidapi-host': 'basketball-head.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}