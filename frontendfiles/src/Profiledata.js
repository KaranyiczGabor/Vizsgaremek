import axios from 'axios'
import React, { useState } from 'react'
import Profile from './Profile'

export default function Profiledata() {
    const [data, setdata] = useState([])
    useEffect(() => {
        Get()
    }, [])
    function Get() {
        axios.get("http://192.168.121.193:5248/api/users/")
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
