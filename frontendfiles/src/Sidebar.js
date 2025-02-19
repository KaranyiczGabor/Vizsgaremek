import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { X } from "lucide-react";
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
            >
                <div className="sidebar-header">
                    <button className="close-button" onClick={onClose}>
                        <X className="icon" />
                    </button>
                </div>
                <ul className="sidebar-menu">
                    <li><Link to="/home"> Home </Link></li>
                    <li><Link to="/quiz">Quiz</Link></li>
                    <li>Donate</li>
                </ul>
            </motion.div>
        </>
    );
}
