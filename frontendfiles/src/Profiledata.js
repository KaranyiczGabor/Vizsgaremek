import axios from 'axios'
import React, { useState } from 'react'
import Profile from './Profile'

export default function Profiledata() {
    const [data, setdata] = useState([])
    useEffect(() => {
        Get()
    }, [])
    function Get() {
        axios.get(`${process.env.REACT_APP_API_URL}/users`)
            .then(function (response) {
                console.log(response);
                setdata(response.data)
            })
    }
    return (
        <div>
            {
                data.map(function (prof) {
                    return <Profile adat={prof} />
                })
            }
        </div>
    )
}
