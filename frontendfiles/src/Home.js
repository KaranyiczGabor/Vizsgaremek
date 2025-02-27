import React, { useEffect, useState } from 'react'
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
export default function Home() {
  const navigate = useNavigate();
  const categories = ["Sport", "Történelem", "Földrajz", "Matematika", "Irodalom"];

  return (
    <div className="container mt-4">
    
    <div className="intro text-center">
      <h1>Üdvözlünk az IQInfinity-n!</h1>
      <p>
        Fedezd fel tudásodat és tágítsd látókörödet velünk! Weboldalunkon
        izgalmas és változatos kvízek várnak, amelyek segítenek fejleszteni és
        tesztelni ismereteidet különböző témákban.
      </p>
    </div>

    
    <div className="categories text-center mt-5">
      <h2>Kvízkategóriák</h2>
      <div className="d-flex flex-wrap justify-content-center gap-3">
          {categories.map((category, index) => (
            <button
              key={index}
              className="btn btn-primary p-3"
              onClick={() => navigate(`/quiz?${category}`)}
            >
              {category}
            </button>
          ))}
          </div>
    </div>

  
    <div className="reviews text-center mt-5">
      <h2>Felhasználói Vélemények</h2>
      <div className="d-flex flex-wrap justify-content-center gap-4">
        <div className="review-card p-4 border rounded shadow-sm bg-light">
          <p>
            "Nagyon szórakoztató kvízek! Egyik legjobb tanulási platform!"
          </p>
          <span>- Homovics M.</span>
        </div>
        <div className="review-card p-4 border rounded shadow-sm bg-light">
          <p>"Rengeteg kategória, mindig találok valami újat!"</p>
          <span>- Kalina T.</span>
        </div>
        <div className="review-card p-4 border rounded shadow-sm bg-light">
          <p>"Izgalmas kihívások és interaktív élmény!"</p>
          <span>- Kihor D.</span>
        </div>
      </div>
    </div>
  </div>

  )
}
