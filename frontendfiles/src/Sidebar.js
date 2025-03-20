import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Sidebar.css";

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className={`sidebar ${isOpen ? "open" : "closed"}`}
        style={{ position: "fixed", top: "60px", height: "calc(100% - 60px)" }}
      >
        <ul className="sidebar-menu">
          <li>
            <Link to="/" onClick={onClose}>Home</Link>
          </li>
          <li>
            <Link to="/quiz" onClick={onClose}>Quiz</Link>
          </li>
          <li>
            <Link to="/leaderboard" onClick={onClose}>Leaderboard</Link>
          </li>
          <li>Donate</li>
        </ul>
      </motion.div>
    </>
  );
}
