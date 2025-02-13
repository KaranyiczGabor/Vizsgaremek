import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './Card'


export default function Quiz() {
    const [data, setdata] = useState([])
    useEffect(() => {
        Get()
    }, [])
    function Get() {
        axios.get("")
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
