import React, { useEffect, useState } from 'react'
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
export default function Home() {
  const navigate = useNavigate();
  const categories = ["Történelem", "Földrajz", "Matematika", "Sport", "Irodalom"];

  return (
    <div>
    
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
      <h2>Elérhető Kvízkategóriák</h2>
      <div className="d-flex flex-wrap justify-content-center gap-3">
          {categories.map((category, index) => (
            <button
              key={index}
              className="btn btn-secondary"
              onClick={() => navigate(`/quiz?`)}
            >
              {category}
            </button>
          ))}
          </div>
    </div>

  <div className="reviews text-center mt-5 container">
  <h2 className="mb-4">Felhasználói Vélemények</h2>
  <div className="row justify-content-center">
    <div className="col-12 col-md-4 mb-4">
      <div className="review-cards p-4 border rounded shadow-sm bg-light h-100 mx-auto" >
        <p className="mb-3">
          "Nagyon szórakoztató kvízek! Egyik legjobb tanulási platform!"
        </p>
        <span className="d-block">- Homovics M.</span>
      </div>
    </div>
    <div className="col-12 col-md-4 mb-4">
      <div className="review-cards p-4 border rounded shadow-sm bg-light h-100 mx-auto" >
        <p className="mb-3">"Rengeteg kategória, mindig találok valami újat!"</p>
        <span className="d-block">- Kalina T.</span>
      </div>
    </div>
    <div className="col-12 col-md-4 mb-4">
      <div className="review-cards p-4 border rounded shadow-sm bg-light h-100 mx-auto" >
        <p className="mb-3">"Izgalmas kihívások és interaktív élmény!"</p>
        <span className="d-block">- Kihor D.</span>
      </div>
    </div>
  </div>
</div>


</div>
<div>
<Footer/>
</div>
  </div>
  
  
  

  )
}
