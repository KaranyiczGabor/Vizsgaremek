import React, { useEffect, useState } from 'react'
import './navbarstyle.css';
import { Link } from 'react-router-dom';
import './Themestyle.css'



export default function Navbar() {
  const [theme, setTheme] = useState('light-theme');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light-theme' ? 'dark-theme' : 'light-theme'));
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <nav className='navbar' >
    <div >
      <ul className='menu-items' >
         <li><Link to="/"> Home </Link></li>
         <li>Quiz</li>
         <li>Donate</li>
         <li><Link to="/Login"> Login </Link></li>
         <li><Link to="/Register"> Register </Link></li>
         <label className="theme-toggle-label">
              Sötét Mód
              <input type="checkbox" className="theme-toggle-checkbox" hecked={theme === 'dark-theme'} onChange={toggleTheme} />
         </label>
    </ul>
    </div>
  </nav>
  )
}
