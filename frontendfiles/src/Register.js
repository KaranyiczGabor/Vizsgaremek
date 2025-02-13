import React from 'react'
import './Register.css';
import { useNavigate } from 'react-router-dom';


export default function Register() {
    let navigate = useNavigate()

    
    function Post() {

       

        let regdatas = {
            Email: document.getElementById("email").value,
            UserName: document.getElementById("nickname").value,
            Password: document.getElementById("password").value

        }

        fetch("http://10.169.85.161:5248/Users/register", {
            method: "POST",
            body: JSON.stringify(regdatas),
            headers: {
                "Content-type": "application/json"
            }
        }
    )
    .then(function() {
        navigate("/")
    })
    }
  return (
    <div className='register'>
        <form onSubmit={function(event) {
            event.preventDefault()
            Post()
        }}>
      <label className='bejelentkezes'>Regisztráció</label>
      <label>
        Email:
        <input
          type="email" id='email'/>
      </label>
      <br />
      <label>
        Felhasználónév:
        <input
          type="text" id='nickname'/>
      </label>
      <br />
      <label>
        Jelszó:
        <input type="password" id='password'/>
      </label>
      <br />
      
      <button type="submit">Regisztráció</button>
    </form>
    </div>
  )
}
