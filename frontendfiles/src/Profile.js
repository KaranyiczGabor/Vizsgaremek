import React, { useEffect, useState } from 'react'
import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';


export default function Profile() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    
    let navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        setIsLoggedIn(true);

        try {
            
            const payload = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(payload));
            
            
            setIsAdmin(decodedPayload.role === "Admin");
           console.log(decodedPayload.role);
        } catch (error) {
            console.error('error:', error);
        }
        
        setLoading(false);
    }, []);
    




    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setIsAdmin(false);
        setIsLoggedIn(false);
        navigate("/");
        window.location.reload();
    };
    
    
    return (
        <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
            <div className="cards p-4" >
                <div className="d-flex flex-column justify-content-center align-items-center">
                    
                        <img src="https://i.imgur.com/wvxPV9S.png" height="100" width="100" alt="Profile" />
                        
                    
                    <span className="name mt-3">asd</span>
                    <span className="idd">asd</span>
                    <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                        <span className="idd1">asd</span>
                        
                        <span>
                            <i className="fa fa-copy"></i>
                        </span>
                    </div>
                    <div className="d-flex flex-row justify-content-center align-items-center mt-3">
                        <span className="number">
                            asd <span className="follow">Followers</span>
                        </span>
                    </div>
                    <div className="d-flex mt-2">
                        <button onClick={handleLogout} className="logout">Logout</button>

                    </div>
                    <div className="d-flex mt-2">
                    <Link to={"/changepw"} className="signup-link">jelszó változtatás</Link>
                    </div>


                    {isAdmin && (

                        <div className="admin-panel mt-3">
                            <h5 className="admin-title">Admin Controls</h5>
                            <div className="d-flex flex-row justify-content-center align-items-center gap-2 mt-2">
                                <Link to="/admin/Question" className="btn btn-outline-primary" > Kérdések </Link>

                                <Link to="/admin/User" className="btn btn-outline-primary"> Felhasználók </Link>
                                
                            </div>
                        </div>

                    )}

                    <div className="px-2 rounded mt-4 date">
                        <span className="join">Joined asd</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
