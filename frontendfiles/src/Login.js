import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'


export default function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate()

    
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Hibajelzés törlése

    try {
      const response = await fetch("http://192.168.121.70:5248/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
    
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }
    
      const data = await response.json();
      console.log("Parsed Data:", data);
    
      localStorage.setItem("token", data.token?.token);
    
      <Login setIsLoggedIn={setIsLoggedIn} />
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("Login Error:", err);
      setError("Login failed. Check your credentials.");
    }
  };    

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
