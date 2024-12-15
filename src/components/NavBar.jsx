import React from 'react';
import { FaHome, FaStar, FaSignInAlt } from 'react-icons/fa';
import './NavBar.css';
import search_icon_light from '/src/assets/search-w.png';
import search_icon_dark from '/src/assets/search-b.png';
import toggle_light from '/src/assets/night.png';
import toggle_dark from '/src/assets/day.png';
import logo_gif from '/src/assets/logo-gif.gif';
import { useState,} from 'react';
import { getESPNScoreboard } from '../services/espnService';

const NavBar = ({ theme, setTheme }) => {
    const toggle_mode = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');

    };
    const [playerName,setPlayerName] = useState("");
    
    const handleInputChange = (e) =>{
        setPlayerName(e.target.value);
        // check if input is as expected
        console.log(playerName)
    }

    const handleSearch = async() => {
        console.log('Searching for player: ${playerName}');
        
    }



    return (
        <div className="navbar">
            <img src={logo_gif} className="logo" alt="Logo" />
            <ul>
            <li><FaHome /> Home</li>
            <li><FaStar /> Favorites</li>
            <li><FaSignInAlt /> Sign-in</li>
            </ul>
            <div className="search-bar">
                <input type="text" onKeyPress= {(e)=> e.key === "Enter" && handleSearch()}placeholder="Enter NBA Player Name" value = {playerName} onChange = {handleInputChange}/>
                <img
                    onClick={handleSearch}
                    src={theme === 'light' ? search_icon_light : search_icon_dark}
                    alt="Search"
                    className="search-icon"
                />
            </div>
            {/* theme toggle button */}
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
