import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Leaderboard() {
   
    const [leaders, setLeaders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
     fetchLeaderboard()
    }, [])
    
    function fetchLeaderboard() {
       
        axios.get(`${process.env.REACT_APP_API_URL}/users/Leaderboard`, {  
        })
        .then(response => {
            
            return response.data;
        })
        .then(data => {
            setLeaders(data);
            setLoading(false);
        })
        .catch(err => {
            console.error("Error fetching leaderboard:", err);
            setError(err.message);
            setLoading(false);
        });
    }

    if (loading) return <div>Leaderboard adatainak betöltése</div>;
    if (error) return <div className="alert alert-danger">Error: {error}</div>;
    if (leaders.length === 0) return <div>Nincs elérhető adat</div>;

      
    return (
        

        <div className="container mt-3 ">
  <table className="table table-dark">
    <thead>
      <tr>
        <th scope="col">Felhasználó név</th>
        <th scope="col">Pont</th>
      </tr>
    </thead>
    <tbody>
      {leaders.map(leader => (
        <tr key={leader.userName}>
          <td>{leader.userName}</td>
          <td>{leader.score}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  )
}
