import React from 'react'
import './navbarstyle.css';
import { Link } from 'react-router-dom';


export default function Navbar() {
    

  return (
    <div className='Navbar'>
      <nav>
      <div class="navbar">
        <div class="container nav-container">
            <input class="checkbox" type="checkbox" name="" id="" />
            <div class="hamburger-lines">
              <span class="line line1"></span>
              <span class="line line2"></span>
              <span class="line line3"></span>
            </div>  
          <div class="logo">
            <h1>ArsMciQuiz</h1>
          </div>
          <div class="menu-items">
            <li><Link to="/"> Home </Link></li>
            <li>Quiz</li>
            <li>Donate</li>
            <li><Link to="/Login"> Login </Link></li>
            <li><Link to="/Register"> Register </Link></li>
          </div>
        </div>
      </div>
    </nav>

    </div>
  )
}
