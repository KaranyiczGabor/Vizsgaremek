import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminUser.css';

const API_BASE_URL = "http://192.168.125.240:5248/api/admin";
const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin before fetching data
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      
      if (decodedPayload.role !== "Admin") {
        navigate('/');
        return;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      navigate('/');
      return;
    }

    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/GetUsers`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Felhasználók betöltése sikertelen');
      }

      const data = await response.json();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Hiba történt a felhasználók betöltésekor');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const getUserById = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/GetUsersbyId?Id=${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Felhasználó adatainak betöltése sikertelen');
      }

      const userData = await response.json();
      setSelectedUser(userData);
    } catch (err) {
      console.error('Error fetching user details:', err);
      setError('Hiba a felhasználó adatainak betöltésekor');
    }
  };

  const handleUserSelect = (userId) => {
    getUserById(userId);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const resetUserSelection = () => {
    setSelectedUser(null);
  };
  
  const handleUserDelete = async (userId) => {
    if (!window.confirm('Biztosan törölni szeretné ezt a felhasználót?')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/DeleteUser?id=${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Felhasználó törlése sikertelen');
      }

      // Remove user from the list and reset selection if needed
      setUsers(users.filter(user => user.id !== userId));
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser(null);
      }
      
      alert('Felhasználó sikeresen törölve!');
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Hiba történt a felhasználó törlésekor: ' + err.message);
    }
  };

  const filteredUsers = users.filter(user => 
    user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Betöltés...</span>
        </div>
      </div>
    );
  }

  if (error && !selectedUser && users.length === 0) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
          <button 
            className="btn btn-outline-danger ms-3"
            onClick={fetchUsers}
          >
            Újrapróbálkozás
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mb-0">Felhasználók kezelése</h3>
            <button className="btn btn-light" onClick={fetchUsers}>
              <i className="fa fa-refresh me-2"></i> Frissítés
            </button>
          </div>
        </div>
        
        <div className="card-body">
          <div className="row">
            <div className="col-md-5">
              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fa fa-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Keresés..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>

              {filteredUsers.length === 0 ? (
                <div className="alert alert-info">Nincs találat</div>
              ) : (
                <div className="list-group user-list">
                  {filteredUsers.map(user => (
                    <button
                      key={user.id}
                      className={`list-group-item list-group-item-action ${selectedUser?.id === user.id ? 'active' : ''}`}
                      onClick={() => handleUserSelect(user.id)}
                    >
                      <div className="d-flex w-100 justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">{user.name || user.username}</h6>
                          <small>{user.email}</small>
                        </div>
                        <span className={`badge ${user.role === 'Admin' ? 'bg-danger' : 'bg-secondary'}`}>
                          {user.role}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="col-md-7">
              {selectedUser ? (
                <div className="card">
                  <div className="card-header bg-light">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Felhasználói adatok</h5>
                      <button 
                        className="btn btn-sm btn-outline-secondary" 
                        onClick={resetUserSelection}
                      >
                        <i className="fa fa-times"></i>
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-center mb-4">
                      <img 
                        src={"https://i.imgur.com/wvxPV9S.png"} 
                        alt="Avatar" 
                        className="rounded-circle"
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                      <h4 className="mt-2">{selectedUser.name || selectedUser.username}</h4>
                      <span className={`badge ${selectedUser.role === 'Admin' ? 'bg-danger' : 'bg-secondary'}`}>
                        {selectedUser.role}
                      </span>
                    </div>

                    <div className="mb-4">
                      <h6 className="text-muted mb-2">Fiók információk</h6>
                      <table className="table">
                        <tbody>
                          <tr>
                            <td><strong>Felhasználónév:</strong></td>
                            <td>{selectedUser.userName}</td>
                          </tr>
                          <tr>
                            <td><strong>Email:</strong></td>
                            <td>{selectedUser.email}</td>
                          </tr>
                          <tr>
                            <td><strong>Azonosító:</strong></td>
                            <td><small className="text-muted">{selectedUser.id}</small></td>
                          </tr>
                          <tr>
                            <td><strong>Kitöltött kvízek:</strong></td>
                            <td>
                              {selectedUser.quizAmount  || 'N/A'}
                            </td>
                          </tr>
                          <tr>
                            <td><strong>Összes Pontszám:</strong></td>
                            <td>
                              {selectedUser.totalPoints|| 'N/A'}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="d-flex justify-content-between">
                      <button className="btn btn-outline-primary">
                        <i className="fa fa-pencil me-1"></i> Szerkesztés
                      </button>
                      <div>
                        <button className="btn btn-outline-warning me-2">
                          <i className="fa fa-lock me-1"></i> Jelszó módosítás
                        </button>
                        <button 
                          className="btn btn-outline-danger"
                          onClick={() => handleUserDelete(selectedUser.id)}
                        >
                          <i className="fa fa-trash me-1"></i> Kitiltás
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card">
                  <div className="card-body text-center py-5">
                    <i className="fa fa-user text-muted" style={{ fontSize: '3rem' }}></i>
                    <p className="mt-3">Válassz egy felhasználót a részletek megtekintéséhez</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUser;