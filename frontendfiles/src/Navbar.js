import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <button className="menu-button" onClick={() => setIsOpen(true)}>
            <Menu className="icon" />
          </button>
          <img src="/logo.png" alt="IQInfinity Logo" className="site-logo"/>
          <h1><Link to="/" className="site-title">IQInfinity</Link></h1>
        </div>

        <ul className="menu-items">

        {!isLoggedIn ? (
            <>
              <li><Link to="/register" className='register'>Register</Link></li>
              <li><Link to="/login" className='login'>Log in</Link></li>
            </>
          ) : (
            <>
              <li><button onClick={handleLogout}>Logout</button></li>
              <li><Link to="/profile"><i class="bi bi-person-circle"></i></Link></li>
            </>
          )}
        </ul>
      </nav>

      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
