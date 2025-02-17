import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './Card'


export default function Quiz() {
    const [data, setdata] = useState([])
    useEffect(() => {
        Get()
    }, [])
    function Get() {
        axios.get("http://192.168.121.193:5248/api/users/checkanswers")
        .then(function (response) {
            console.log(response);
            setdata(response.data)
        })
    }

  return (
    <div>
        {
            data.map(function(quiz){
                return <Card adat={quiz}/>
            })
        }
    </div>
  )
}
