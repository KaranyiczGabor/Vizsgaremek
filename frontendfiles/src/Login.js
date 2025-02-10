import React from 'react'
import './Login.css'


export default function Login() {
  return (
    <div className='login'>
         <form >
      <label className='bejelentkezes'>Bejelentkezés</label>
      <label>
        Felhasználó név:
        <input
          type="text" id='email'/>
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
