import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';


export default function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate()

    
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`, 
        { username, password },
        { 
          headers: { "Content-Type": "application/json" }
        }
      );
      
      const data = response.data;
      console.log("Response Data:", data);
      
      if (!data.token?.token || !data.token?.result?.id) {
        throw new Error("Incomplete login data received");
      }
      
      localStorage.setItem("token", data.token?.token);
      localStorage.setItem("userId", data.token?.result.id);
      
      if (typeof setIsLoggedIn === 'function') {
        setIsLoggedIn(true);
      }
      navigate("/");
      setTimeout(() => window.location.reload(), 1000); 
    } catch (err) {
      console.error("Login Error:", err);
      
      if (err.response && err.response.status === 404) {
        setError("Hibás felhasználónév vagy jelszó.");
      } else if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.request) {
      
        setError("Nem sikerült kapcsolódni a szerverhez.");
      } else {
      
        setError("Hiba történt a bejelentkezés során.");
      }
    }
  }

  return (
    <div className="login-container">
      <img src="/logo.png" alt="IQInfinity Logo" className="logo" />
      <h2>Üdvözöljük</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Felhasználó név</label>
          <input
            type="text"
            placeholder="Példa1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group" style={{position: 'relative'}}>
          <label>Jelszó</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="bejelentkezese" type="submit">BEJELENTKEZÉS</button>
      </form>
      <p className="signup-text">Nincs még profilod <Link to={"/register"} className="signup-link">regisztráció</Link></p>
      <p className="signup-text">Elfelejtetted a jelszavadat? <Link to={"/forgotpw"} className="signup-link">elfelejtett jelszó</Link></p>
    </div>
  )
}