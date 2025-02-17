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
        console.log(regdatas);
        fetch("http://192.168.121.193:5248/api/users/login", {
            method: "POST",
            body: JSON.stringify(regdatas),
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    .then(function(res) {
      console.log(res);
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
