import React from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'


export default function Login() {
  let navigate = useNavigate()

    
    function Post() {

       

        let regdatas = {
            UserName: document.getElementById("name").value,
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
    <div className='login'>
     
         <form   onSubmit={function(event) {
            event.preventDefault()
            Post()
        }}>
        
      <label className='bejelentkezes'>Bejelentkezés</label>
      <label>
        Felhasználó név:
        <input
          type="text" id='name'/>
      </label>
      <br />
      <label>
        Jelszó:
        <input
          type="password" id='password'/>
      </label>
      <br />
      <button type="submit">Bejelentkezés</button>
    </form>
    </div>
  )
}
