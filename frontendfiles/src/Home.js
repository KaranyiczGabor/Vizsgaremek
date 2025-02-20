import React from 'react'
import './Home.css';
export default function Home() {
  
  return (
    <div className="container mt-4">
    {/* Bemutatkozás */}
    <div className="intro text-center">
      <h1>Üdvözlünk az IQInfinity-n!</h1>
      <p>
        Fedezd fel tudásodat és tágítsd látókörödet velünk! Weboldalunkon
        izgalmas és változatos kvízek várnak, amelyek segítenek fejleszteni és
        tesztelni ismereteidet különböző témákban.
      </p>
    </div>

    {/* Kvíz Kategóriák */}
    <div className="categories text-center mt-5">
      <h2>Kvízkategóriák</h2>
      <div className="d-flex flex-wrap justify-content-center gap-3">
        <span className="badge bg-success p-3">Tudomány</span>
        <span className="badge bg-info p-3">Történelem</span>
        <span className="badge bg-warning p-3">Szórakozás</span>
        <span className="badge bg-danger p-3">Sport</span>
        <span className="badge bg-primary p-3">Művészet</span>
        <span className="badge bg-secondary p-3">Technológia</span>
      </div>
    </div>

    {/* Felhasználói Vélemények */}
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
