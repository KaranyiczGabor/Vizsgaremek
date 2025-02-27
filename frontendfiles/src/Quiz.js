import React, { useState, useEffect } from "react";

export default function Quiz() {
    const [categories] = useState(["Történelem", "Földrajz", "Matematika", "Sport", "Irodalom"]); 
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const API_BASE_URL = "http://192.168.121.70:5248/api/users";

    // 🔹 `useEffect` akkor fut le, ha mindkét állapot (`selectedCategory` és `selectedDifficulty`) beállításra kerül
    useEffect(() => {
        if (selectedCategory && selectedDifficulty) {
            fetchQuestions();
        }
    }, [selectedCategory, selectedDifficulty]); 

    // API hívás kérdések lekérésére
    const fetchQuestions = () => {
        if (!selectedCategory || !selectedDifficulty) {
            console.log("❌ Nincs kiválasztott kategória vagy nehézség!");
            return;
        }

        setLoading(true);
        const encodedCategory = encodeURIComponent(selectedCategory);
        const encodedDifficulty = encodeURIComponent(selectedDifficulty);

        console.log(`🔹 API hívás indul: ${API_BASE_URL}/getquestions?Category=${encodedCategory}&Difficulty=${encodedDifficulty}`);

        fetch(`${API_BASE_URL}/getquestions?Category=${encodedCategory}&Difficulty=${encodedDifficulty}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("📢 API válasz:", data);
                if (Array.isArray(data) && data.length > 0) {
                    setQuestions(data);
                } else {
                    console.log("⚠ Üres kérdéslista!");
                    setQuestions([]);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("❌ Hiba a kérdések lekérésekor:", error);
                setLoading(false);
            });
    };

    return (
        <div className="quiz-container text-center mt-5">
            <h2>IQInfinity Kvíz</h2>

            {!selectedCategory ? (
                <div className="category-selection">
                    <h4>Válassz egy kategóriát:</h4>
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            className="btn btn-primary m-2"
                            onClick={() => {
                                console.log(`🔹 Kategória kiválasztva: ${category}`);
                                setSelectedCategory(category);
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            ) : !selectedDifficulty ? (
                <div className="difficulty-selection mt-4">
                    <h4>Kategória: <b>{selectedCategory}</b></h4>
                    <h5>Válassz egy nehézségi szintet:</h5>
                    <button className="btn btn-secondary m-2" onClick={() => {
                        console.log("🔹 Nehézségi szint kiválasztva: 1 (Könnyű)");
                        setSelectedDifficulty(1);
                    }}>Könnyű</button>
                    <button className="btn btn-secondary m-2" onClick={() => {
                        console.log("🔹 Nehézségi szint kiválasztva: 2 (Közepes)");
                        setSelectedDifficulty(2);
                    }}>Közepes</button>
                    <button className="btn btn-secondary m-2" onClick={() => {
                        console.log("🔹 Nehézségi szint kiválasztva: 3 (Nehéz)");
                        setSelectedDifficulty(3);
                    }}>Nehéz</button>
                </div>
            ) : loading ? (
                <h4>Kérdések betöltése...</h4>
            ) : questions.length === 0 ? (
                <h4>⚠ Nincsenek elérhető kérdések ehhez a kategóriához és nehézségi szinthez.</h4>
            ) : !showResult ? (
                <div>
                    <h4>{questions[currentQuestion]?.question1 || "Nincs kérdés"}</h4>
                    <div className="options">
                        {questions[currentQuestion]?.answers?.map((answer, index) => (
                            <button
                                key={index}
                                className="btn btn-primary m-2"
                                onClick={() => {
                                    if (answer.correct) {
                                        setScore(score + 1);
                                    }
                                    if (currentQuestion + 1 < questions.length) {
                                        setCurrentQuestion(currentQuestion + 1);
                                    } else {
                                        setShowResult(true);
                                    }
                                }}
                            >
                                {answer.answerText}
                            </button>
                        )) || <p>⚠ Nincsenek válaszlehetőségek.</p>}
                    </div>
                </div>
            ) : (
                <div className="result">
                    <h3>Eredményed: {score} / {questions.length}</h3>
                    <button className="btn btn-success mt-3" onClick={() => {
                        console.log("🔹 Kvíz újrakezdése");
                        
                    }}>
                        Újrakezdés
                    </button>
                </div>
            )}
        </div>
    );
}
