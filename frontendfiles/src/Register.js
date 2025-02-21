import React from 'react'
import './Register.css';
import { useNavigate } from 'react-router-dom';


export default function Register() {
    let navigate = useNavigate()

    
    function Post() {

       

        let regdatas = {
            email: document.getElementById("email").value,
            userName: document.getElementById("nickname").value,
            password: document.getElementById("password").value

        }
        console.log(regdatas);

        fetch("http://192.168.121.193:5248/api/users/register", {
            method: "POST",
            body: JSON.stringify(regdatas),
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    .then(function(res) {
      console.log(res.message);
        navigate("/login")
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
