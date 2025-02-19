import { Link } from 'react-router-dom';
import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <button className="menu-button" onClick={() => setIsOpen(true)}>
            <Menu className="icon" />
          </button>
          <h1 className="site-title">IQInfinity</h1>
        </div>

        <ul className="menu-items">
          <li><Link to="/register" className="register">Register</Link></li>
          <li><Link to="/login" className="login">Log in</Link></li>
        </ul>
      </nav>

      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
