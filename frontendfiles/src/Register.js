import React from 'react'
import './Register.css';
import { useNavigate } from 'react-router-dom';


export default function Register() {
    let navigate = useNavigate()

    
    function Post() {

       

        let datas = {
            email: document.getElementById("email").value,
            name: document.getElementById("nickname").value,
            password: document.getElementById("password").value,

        }

        fetch("", {
            method: "POST",
            body: JSON.stringify(datas),
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
      <label>ÁSZF

      <input type='checkbox' ></input>
      </label>
      <button type="submit">Regisztráció</button>
    </form>
    </div>
  )
}
