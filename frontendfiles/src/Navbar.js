import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };

  return (
    <>
      <nav className="nbar">
        <div className="navbar-left">
          <button
            className={`menu-button ${isOpen ? "open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <span className="menu-icon-wrapper">
              {isOpen ? <X className="icon" /> : <Menu className="icon" />}
            </span>
          </button>

          <img src="/logo.png" alt="IQInfinity Logo" className="site-logo" />
          <h1>
            <Link to="/" className="site-title">IQInfinity</Link>
          </h1>
        </div>

        <ul className={`menu-items ${isOpen ? "open" : ""}`}>
          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/register" className="register">Register</Link>
              </li>
              <li>
                <Link to="/login" className="login">Log in</Link>
              </li>
            </>
          ) : (
            <>
              
              <li>
                <Link to="/profile" className="profile-icon">
                  <i className="bi bi-person-circle"></i>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
