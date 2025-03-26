import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Changepw.css';

export default function Changepw() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const validatePassword = () => {
    setError('');
    
    if (newPassword !== confirmPassword) {
      setError('Az új jelszavak nem egyeznek');
      return false;
    }
    
    if (newPassword.length < 8) {
      setError('A jelszónak legalább 8 karakter hosszúnak kell lennie');
      return false;
    }

    if (!/[A-Z]/.test(newPassword)) {
      setError('A jelszónak tartalmaznia kell legalább egy nagybetűt');
      return false;
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword)) {
      setError('A jelszónak tartalmaznia kell legalább egy speciális karaktert');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setError('A jelszó módosításához be kell jelentkezni');
      return;
    }
    
    setError('');
    setSuccess('');
    
    if (!validatePassword()) {
      return;
    }
    
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); 
    
    const requestBody = {
      uid: userId , 
      currentPassword,
      newPassword
    };
    
    try {
      setLoading(true);
      
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/ChangePassword`, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setSuccess('A jelszó sikeresen megváltozott!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setError('Jelenlegi jelszó helytelen.');
        } else {
          setError(err.response.data.message || 'Nem sikerült megváltoztatni a jelszót. Kérjük, próbálja újra.');
        }
      } else if (err.request) {
        setError('Nincs válasz a szervertől. Kérjük, ellenőrizze a kapcsolatot.');
      } else {
        setError('Hiba történt. Kérjük, próbálja újra később.');
      }
      console.error('Jelszóváltoztatási hiba:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <div>A jelszó módosításához be kell jelentkezni. Kérjük, jelentkezzen be.</div>;
  }

  return (
    <div className="password-change-container">
      <h2>Jelszó módosítása</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="currentPassword">Jelenlegi jelszó</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="newPassword">Új jelszó</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Új jelszó megerősítése</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Folyamatban...' : 'Jelszó módosítása'}
        </button>
      </form>
      
      <div className="password-requirements">
        <p>Jelszó követelmények:</p>
        <ul>
          <li>Legalább 8 karakter hosszú</li>
          <li>Legalább 1 speciális karakter </li>
          <li>Legalább 1 nagy karakter </li>

        </ul>
      </div>
    </div>
  );
}