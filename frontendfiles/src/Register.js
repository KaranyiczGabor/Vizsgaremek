import React, { useState } from 'react'
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    let navigate = useNavigate()
    const [passwordError, setPasswordError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    function validateForm() {
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            setPasswordError('A jelszavak nem egyeznek');
            return false;
        }

        setPasswordError('');
        return true;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setUsernameError('');
        setPasswordError('');

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        let regdatas = {
            email: document.getElementById("email").value,
            userName: document.getElementById("nickname").value,
            password: document.getElementById("password").value
        };

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/users/register`,
                regdatas,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log(response.data);

            navigate("/login");

        } catch (error) {
            console.error("Registration error:", error);

            if (error.response) {

                if (error.response.status === 404) {

                    setUsernameError('Ez a felhasználónév már foglalt');
                } else if (error.response.data && error.response.data.message) {

                    setUsernameError(error.response.data.message);
                } else {
                    setUsernameError('A jelszó nem felel meg a követeleményeknek');
                }
            } else if (error.request) {

                setUsernameError('Nem sikerült kapcsolódni a szerverhez');
            } else {

                setUsernameError('Hiba történt a regisztráció során');
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='register'>
            <img src="/logo.png" alt="IQInfinity Logo" className="logo" />
            <form onSubmit={handleSubmit}>
                <label className='bejelentkezes'>Regisztráció</label>

                <label>
                    Email:
                    <input type="email" id='email' placeholder="johndoe@example.com" required />
                </label>

                <label>
                    Felhasználónév:
                    <input type="text" id='nickname' placeholder="felhasználónév" required />
                </label>
                {usernameError && <p className="error-message">{usernameError}</p>}

                <label>
                    Jelszó:
                    <input type="password" id='password' placeholder="jelszó" required />
                </label>
                <div className="form-group">
                    <label>jelszó megerősítése</label>
                    <input
                        placeholder="jelszó ujra"
                        type="password"
                        id="confirmPassword"
                        required
                    />
                </div>
                <div className="password-requirements">
                    <p>Jelszó követelmények:</p>
                    <ul>
                        <li>Legalább 8 karakter hosszú</li>
                        <li>Legalább 1 speciális karakter </li>
                        <li>Legalább 1 nagy karakter </li>

                    </ul>
                </div>
                {passwordError && <p className="error-message">{passwordError}</p>}
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Feldolgozás...' : 'Regisztráció'}
                </button>
            </form>

            <p className="signin-text">Már van fiókod? <Link to={"/login"} className="signin-link">Bejelentkezés</Link></p>
        </div>
    )
}