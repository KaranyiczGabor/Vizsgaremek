import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
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
      
      
      const data = await response.data;
      console.log("Parsed Data:", data);
      
      
      if (data.error || !data.token) {
        throw new Error(`Login failed: ${data.message || 'Invalid credentials'}`);
      }
      
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
      setError("Hibás felhasználónév vagy jelszó.");
    }}

  return (
    <div className="login-container">
    <h2>Login</h2>
    {error && <p className="error">{error}</p>}
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Log in</button>
    </form>
  </div>
  )
}
