import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Usercard(props) {
    let navigate = useNavigate()
    function Del(id)
    {
        fetch("http://192.168.125.70:5248/api/admin/GetUsers"+id, {method:"DELETE"}).then(
            function(res)
            {
                alert("Sikeres törlés!");
                
                    
                
            }
        )
        .then(function() {
            navigate("/")
        })
    }
  return (
    <div style={{ padding: 50 }}>
      <div class="card" style={{width: "18rem"}}>
        <div class="card-body">
          <h5 class="card-title">{props.user.UserName}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="card-link">Card link</a>
          <a onClick={function() {if(window.confirm("Biztosan törölni szeretnél?")){Del(props.adat.id)}}} class="btn btn-danger"><i class="bi bi-trash3-fill"></i></a>
        </div>
      </div>

    </div>
  )
}
