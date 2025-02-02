import React from 'react'
import './Login.css'


export default function Login() {
  return (
    <div className='login'>
         <form >
      <h2>Bejelentkezés</h2>
      <label>
        Email:
        <input
          type="email" id='email'/>
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
