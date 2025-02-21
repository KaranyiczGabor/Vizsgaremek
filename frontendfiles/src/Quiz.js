import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './Card'


export default function Quiz() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const API_BASE_URL = "http://localhost:5000/api";

    useEffect(() => {
        fetch(`${API_BASE_URL}/categories`)
          .then((response) => response.json())
          .then((data) => setCategories(data))
          .catch((error) => console.error("Hiba a kategóriák lekérésekor:", error));
      }, []);

      const fetchQuestions = (category) => {
        setLoading(true);
        fetch(`${API_BASE_URL}/quiz?category=${category}`)
          .then((response) => response.json())
          .then((data) => {
            setQuestions(data);
            setSelectedCategory(category);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Hiba történt a kérdések betöltésekor:", error);
            setLoading(false);
          });
      };
      const handleAnswer = (selectedOption) => {
        if (selectedOption === questions[currentQuestion].correctAnswer) {
          setScore(score + 1);
        }
    
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
          setCurrentQuestion(nextQuestion);
        } else {
          setShowResult(true);
        }
      };
    
      const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setSelectedCategory(null);
        setQuestions([]);
      };

  return (
    <div className="quiz-container text-center mt-5">
      <h2>IQInfinity Kvíz</h2>

      {!selectedCategory ? (
        // Kategóriaválasztás
        <div className="category-selection">
          <h4>Válassz egy kategóriát:</h4>
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <button
                key={index}
                className="btn btn-primary m-2"
                onClick={() => fetchQuestions(category)}
              >
                {category}
              </button>
            ))
          ) : (
            <p>Kategóriák betöltése...</p>
          )}
        </div>
      ) : loading ? (
        <h4>Kérdések betöltése...</h4>
      ) : !showResult ? (
        // Kvíz kérdések
        <div>
          <h4>{questions[currentQuestion].question}</h4>
          <div className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className="btn btn-primary m-2"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        // Eredmény kijelzése
        <div className="result">
          <h3>Eredményed: {score} / {questions.length}</h3>
          <button className="btn btn-success mt-3" onClick={restartQuiz}>
            Újrakezdés
          </button>
        </div>
      )}
    </div>
  )
}
