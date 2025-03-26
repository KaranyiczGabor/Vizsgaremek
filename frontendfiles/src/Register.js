import React from 'react'
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Register() {
    let navigate = useNavigate()

    
    function Post() {
        let regdatas = {
            email: document.getElementById("email").value,
            userName: document.getElementById("nickname").value,
            password: document.getElementById("password").value
        }
        console.log(regdatas);

        axios.post(
            `${process.env.REACT_APP_API_URL}/users/register`, 
            regdatas,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        .then(function(response) {
            console.log(response.data);
            navigate("/login")
        })
        .catch(function(error) {
            console.error("Registration error:", error);
        });
    }
    
    return (
        <div className='register'>
    <img src="/logo.png" alt="IQInfinity Logo" className="logo" />
    <form onSubmit={function(event) {
        event.preventDefault()
        Post()
    }}>
        <label className='bejelentkezes'>Regisztráció</label>
        
        <label>
            Email:
            <input type="email" id='email' placeholder="johndoe@example.com"/>
        </label>
        
        <label>
            Felhasználónév:
            <input type="text" id='nickname' placeholder="felhasználónév"/>
        </label>
        
        <label>
            Jelszó:
            <input type="password" id='password' placeholder="jelszó"/>
        </label>
        
        <button type="submit">Regisztráció</button>
    </form>
    
    <p className="signin-text">Már van fiókod? <Link to={"/login"} className="signin-link">Bejelentkezés</Link></p>
</div>
    )
}