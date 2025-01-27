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
            <h1>Navbar</h1>
          </div>
          <div class="menu-items">
            <li><a href="#" > <Link to="/"> Home </Link></a></li>
            <li><a href="#">Quiz</a></li>
            <li><a href="#">Donate</a></li>
            <li><a href="#">Sign Up</a></li>
            <li><a href="#"><Link to="/SignIn"> Sign In </Link></a></li>
          </div>
        </div>
      </div>
    </nav>

    </div>
  )
}
