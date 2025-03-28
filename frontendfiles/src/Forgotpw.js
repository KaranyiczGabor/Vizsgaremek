import React, { useState } from 'react';
import axios from 'axios';
import './Forgotpw.css';
import { Link } from 'react-router-dom';

export default function Forgotpw() {
  const [userName, setUserName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!userName.trim()) {
      newErrors.userName = 'Username is required';
    }
    
    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setMessage('');
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/ForgotPassword`, {
        userName,
        newPassword
      });
      
      setIsSuccess(true);
      setMessage('Password has been reset successfully!');
      // Clear form
      setUserName('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setIsSuccess(false);
      if (error.response) {
     
        setMessage(error.response.data.message || 'Nem sikerült új jelszót állitani. Próbald Újra');
      } else if (error.request) {
    
        setMessage('No response from server. Please check your connection and try again.');
      } else {
      
        setMessage('An error occurred. Please try again later.');
      }
      console.error('Error resetting password:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <div className="forgot-password-header">
          <h2 className="forgot-password-title">Új jelszó állítása</h2>
          <p className="forgot-password-subtitle">Add meg a felhasználónevet és az új jelszavadat</p>
        </div>
        
        {message && (
          <div className={`response-message ${isSuccess ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
        
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userName" className="form-label">Felhasználónév</label>
            <input
              id="userName"
              name="userName"
              type="text"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className={`form-input ${errors.userName ? 'error' : ''}`}
              placeholder="Add meg a felhasználónevedet"
            />
            {errors.userName && <p className="error-message">{errors.userName}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="newPassword" className="form-label">Új jelszó</label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`form-input ${errors.newPassword ? 'error' : ''}`}
              placeholder="Add meg az új jelszavad"
            />
            {errors.newPassword && <p className="error-message">{errors.newPassword}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Jelszó megerősítés</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
              placeholder="Erősitsd meg jelszavadat"
            />
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? 'Processing...' : 'Jelszó változtatás'}
          </button>
          
          <p className="signup-text"> vissza a bejelentkezéshez <Link to={"/login"} className="signup-link">login</Link></p>
        </form>
      </div>
    </div>
  );
}