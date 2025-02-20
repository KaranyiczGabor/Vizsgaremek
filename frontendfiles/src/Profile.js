import React from 'react'

export default function Profile() {
    
    return (
        <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
            <div className="card p-4">
                <div className="image d-flex flex-column justify-content-center align-items-center">
                    <span className="name mt-3">{profileData.name}</span>
                    <span className="idd">{profileData.username}</span>
                    <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                        <span className="idd1">{profileData.userId}</span>
                        <span>
                            <i className="fa fa-copy"></i>
                        </span>
                    </div>
                    <div className="d-flex flex-row justify-content-center align-items-center mt-3">
                        <span className="number">
                            {profileData.followers} <span className="follow">Followers</span>
                        </span>
                    </div>
                    <div className="d-flex mt-2">
                        <button className="btn btn-dark">Edit Profile</button>
                    </div>
                   
                    <div className="px-2 rounded mt-4 date">
                        <span className="join">Joined {profileData.joinDate}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
