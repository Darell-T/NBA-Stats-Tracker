import React, { useState } from 'react';
import { FaHome, FaStar, FaSignInAlt } from 'react-icons/fa';
import './NavBar.css';
import search_icon_light from '/src/assets/search-w.png';
import search_icon_dark from '/src/assets/search-b.png';
import toggle_light from '/src/assets/night.png';
import toggle_dark from '/src/assets/day.png';
import logo_gif from '/src/assets/logo-gif.gif';
import axios from 'axios';

const NavBar = ({ theme, setTheme, onSignInClick, onClose, onHomeClick, onSearch}) => {
    const [playerName, setPlayerName] = useState("");
    const [firstname, lastname] = playerName.trim().split(/\s+/);
    const [playerData, setPlayerData] = useState(null);
    
    const toggle_mode = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    };

    const handleInputChange = (e) => {
        setPlayerName(e.target.value);
    };

    const handleSearch = async () => {
        try {
    
            if (!firstname || !lastname) {
                console.error('Please enter a full name (first and last).');
                return;
            }
    
            const response = await axios.post('http://localhost:5000/api/player-stats', {
                firstname,
                lastname,
            });
    
            const playerId = response.data?.playerId; // Access playerId from the response
            if (!playerId) {
                console.error('Player not found');
                return;
            }
    
            // Now fetch actual stats using playerId
            const stats = await axios.get(`http://localhost:5000/api/player-stats/${playerId}`);
    
            console.log('Fetched Player Stats:', stats.data);
            setPlayerData(stats.data); // Update state with fetched stats
        } catch (error) {
            console.error('Error fetching player:', error);
            onSearch(null);
        }
    };
    
    

    return (
        <div className="navbar">
            <img src={logo_gif} className="logo" alt="Logo" />
            <ul>
                <li 
                 onClick={onHomeClick}>
                    <FaHome /> Home</li>
                <li><FaStar /> Favorites</li>
                <li 
                    style={{ cursor: 'pointer' }}
                    onClick={onSignInClick} 
                    onClose ={onClose}
                >
                    <FaSignInAlt /> Sign-in
                </li>
            </ul>

            <div className="search-bar">
                <input 
                    type="text" 
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()} 
                    placeholder="Enter NBA Player Name" 
                    value={playerName} 
                    onChange={handleInputChange} 
                />
                <img
                    onClick={handleSearch}
                    src={theme === 'light' ? search_icon_light : search_icon_dark}
                    alt="Search"
                    className="search-icon"
                />
            </div>

            {/* Theme toggle button */}
            <img
                onClick={toggle_mode}
                src={theme === 'light' ? toggle_light : toggle_dark}
                alt="Toggle Theme"
                className="toggle-icon"
            />
        </div>
    );
};

export default NavBar;
