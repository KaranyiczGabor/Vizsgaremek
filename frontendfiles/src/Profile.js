import React, { useEffect, useState } from 'react'
import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Profile() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    let navigate = useNavigate();

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
            
            // Fetch user data
            fetchUserData();
        } catch (error) {
            console.error('error:', error);
        }

        setLoading(false);
    }, []);

    const fetchUserData = async () => {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                console.error("User ID not found in local storage");
                return;
            }

            const token = localStorage.getItem("token");
            const response = await axios.get(`http://192.168.144.240:5248/api/users/GetUsersbyId?Id=${userId}`, {
                headers: {
                    'accept': 'text/plain',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setUserData(response.data);
            } else {
                console.error('Failed to fetch user data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching user data:', error.response ? error.response.data : error.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setIsAdmin(false);
        setIsLoggedIn(false);
        navigate("/");
        window.location.reload();
    };

    // Display loading indicator while data is being fetched
    if (loading) {
        return (
            <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
                <div className="cards p-4">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <span>Loading profile data...</span>
                    </div>
                </div>
            </div>
        );
    }

    // If not logged in, redirect to login page
    if (!isLoggedIn) {
        return (
            <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
                <div className="cards p-4">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <span>You need to log in to view your profile</span>
                        <div className="d-flex mt-2">
                            <Link to="/login" className="btn btn-primary">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
            <div className="cards p-4" >
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <img src="https://i.imgur.com/wvxPV9S.png" height="100" width="100" alt="Profile" />

                    <span className="name mt-3">{userData?.userName || 'No username'}</span>
                    <span className="idd">{userData?.email || 'No email'}</span>
                    <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                       
                        <span>
                            <i className="fa fa-copy"></i>
                        </span>
                    </div>
                    <div className="d-flex flex-row justify-content-center align-items-center mt-3">
                        <span className="number">
                            Kitöltött kvízek: {userData?.quizAmount || 0}
                        </span>
                    </div>
                    <div className="d-flex flex-row justify-content-center align-items-center mt-2">
                        <span className="number">
                            Összes pont: {userData?.totalPoints || 0}
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
                                <Link to="/admin/Question" className="btn btn-outline-primary">Kérdések</Link>
                                <Link to="/admin/User" className="btn btn-outline-primary">Felhasználók</Link>
                            </div>
                        </div>
                    )}

                    
                </div>
            </div>
        </div>
    )
}