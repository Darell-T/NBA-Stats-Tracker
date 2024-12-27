import React, { useState } from 'react'
import NavBar from './NavBar'
import { FaUser, FaLock } from "react-icons/fa";
import "./SignIn.css"
const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState ('');

    const handleEnter = (e) => {
        e.preventDefault();

    };

    return (
        <div className = "signin-container">
            <form action = "">
                <h1>Login</h1>
                <div className = "input-box">
                    <input type = "text" placeholder = "Username" required/>
                    <FaUser className='icon'/>
                </div>
                <div className='input-box'>
                    <input type = "password" placeholder = "Password" required/>
                    <FaLock className='icon'/>
                </div>
                <div className="remember-forgot">
                    <label><input type = 'checkbox'/>Remember me</label>
                    <a href='#'>Forgot password?</a>
                </div>

                <button type = 'submit'>Login</button>
                <div className="register-link">
                    <p>Don't have an account? <a href='#'>Register</a></p>
                </div>
            </form>
            </div>
    );
};
export default SignIn