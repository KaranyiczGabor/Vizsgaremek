import React from 'react'
import './Footer.css';


export default function Footer() {
    return (
        
            <footer className="footer bg-dark text-light py-2 mt-1">
                <div className=" text-center">
                    <p className="mb-2">&copy; {new Date().getFullYear()} IQInfinity. Minden jog fenntartva.</p>
                    <div className="social-icons d-flex justify-content-center gap-3">
                        <a href="#" className="text-light"><i className="fa fa-twitter"></i></a>
                        <a href="#" className="text-light"><i className="fa fa-facebook-f"></i></a>
                        <a href="#" className="text-light"><i className="fa fa-instagram"></i></a>
                        <a href="#" className="text-light"><i className="fa fa-linkedin"></i></a>
                    </div>
                    <div className="footer-links mt-3">
                        <a href="#" className="text-light mx-2">Kapcsolat</a> |
                        <a href="#" className="text-light mx-2">Adatvédelem</a> |
                        <a href="#" className="text-light mx-2">Felhasználási feltételek</a>
                    </div>
                </div>
            </footer>
        
    )
}
