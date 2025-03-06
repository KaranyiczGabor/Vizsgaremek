import React, { useEffect, useState } from 'react'
import './Profile.css';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    let navigate = useNavigate()
    
      useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("token"));
      }, []);
    
      const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setIsLoggedIn(false);
        navigate("/");
        window.location.reload();
      };

    return (
        <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
            <div className="card p-4">
                <div className="image d-flex flex-column justify-content-center align-items-center">
                    <button className="btn btn-secondary">
                        <img src="https://i.imgur.com/wvxPV9S.png" height="100" width="100" alt="Profile" />
                    </button>
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

                    <div className="px-2 rounded mt-4 date">
                        <span className="join">Joined asd</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
