import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
    const navigate = useNavigate();
    const API_BASE_URL = "http://192.168.125.70:5248/api/users";

    const [categories] = useState(["Történelem", "Földrajz", "Matematika", "Sport", "Irodalom"]); 
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [answerTracking, setAnswerTracking] = useState([]);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [showFeedback, setShowFeedback] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [savingScore, setSavingScore] = useState(false);
    const [saveError, setSaveError] = useState(null);
    const [offline, setOffline] = useState(!navigator.onLine);
    const userId = localStorage.getItem("userId");

    // Add debug effect for userAnswers
    useEffect(() => {
    console.log("userAnswers updated:", userAnswers);
    // Only finish the quiz when all questions have been answered
    if (userAnswers.length === questions.length && questions.length > 0) {
        finishQuiz()
    }
}, [userAnswers, questions]);

    // Check login status and network status
    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("token"));
        window.addEventListener("online", () => setOffline(false));
        window.addEventListener("offline", () => setOffline(true));
        return () => {
            window.removeEventListener("online", () => setOffline(false));
            window.removeEventListener("offline", () => setOffline(true));
        };
    }, []);

    // Fetch questions when category and difficulty are selected
    useEffect(() => {
        if (selectedCategory && selectedDifficulty) {
            fetchQuestions();
        }
    }, [selectedCategory, selectedDifficulty]); 

    

    const fetchQuestions = () => {
        setLoading(true);
        fetch(`${API_BASE_URL}/getquestions?Category=${encodeURIComponent(selectedCategory)}&Difficulty=${encodeURIComponent(selectedDifficulty)}`)
            .then(response => response.json())
            .then(data => {
                console.log("📢 API válasz:", data);
                if (Array.isArray(data) && data.length > 0) {
                    setQuestions(data);
                    setUserAnswers([]); // IMPORTANT: Reset userAnswers when loading new questions
                    setAnswerTracking([]);
                    setScore(0);
                    setCurrentQuestion(0);
                } else {
                    setQuestions([]);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("❌ Hiba a kérdések lekérésekor:", error);
                setLoading(false);
            });
    };

    const handleAnswerSelect = (questionId, selectedAnswer) => {
        console.log("Selected:", questionId, selectedAnswer);
        const question = questions.find(q => q.id === questionId);
        if (!question) return;

        const correctAnswer = question.answers.find(a => a.correct);
        const isCorrect = correctAnswer?.answerText === selectedAnswer;

        setFeedbackMessage(isCorrect ? "✅ Helyes válasz!" : "❌ Helytelen válasz!");
        setShowFeedback(true);
        setTimeout(() => setShowFeedback(false), 1000);

        if (isCorrect) setScore(prev => prev + 1);

        // Track locally for UI
        setAnswerTracking(prev => [
            ...prev.filter(a => a.questionId !== questionId), 
            { questionId, answerText: selectedAnswer, isCorrect }
        ]);
        
        // Format for backend - use consistent property names
        // IMPORTANT FIX: Using questionId consistently
        setUserAnswers(prev => {
            console.log("Previous answers:", prev);
            
            // Filter using the same property name that we're storing
            const newArray = prev.filter(a => a.questionId !== questionId);
            
            const updatedAnswers = [...newArray, {
                questionId: questionId,
                answerText: selectedAnswer,
                uid: userId
            }];
            
            console.log("New answers array:", updatedAnswers);
            return updatedAnswers;
        });

        setTimeout(() => {
            if (currentQuestion + 1 < questions.length) {
                setCurrentQuestion(prev => prev + 1);
            }
        }, 1500); // Shortened from 5000ms to 1500ms
    };

    const finishQuiz = () => {
        setShowResult(true);
        if (isLoggedIn && !offline) saveScoreToServer();
    };

    const saveScoreToServer = () => {
        const token = localStorage.getItem("token");
        if (!token) return setSaveError("⚠ Auth token not found");

        setSavingScore(true);
        setSaveError(null);
        
        // Check if userAnswers is empty
        if (!userAnswers || userAnswers.length === 0) {
            setSaveError("Nincsenek válaszok elmentve");
            setSavingScore(false);
            return;
        }
        
        console.log("Sending answers to server:", userAnswers);
        
        fetch(`${API_BASE_URL}/checkanswer`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(userAnswers)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    console.error("Server error:", text);
                    throw new Error("Server error: " + text);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log("✅ Server response:", data);
            if (data && data.score !== undefined) {
                setScore(data.score);
            }
            setSavingScore(false);
        })
        .catch(error => {
            console.error("❌ Hiba a pontszám mentésekor:", error);
            setSaveError(error.message);
            setSavingScore(false);
        });
    };

    return (
        <div className="quiz-container text-center mt-5" >
            <h2 style={{padding:"15px"}}>IQInfinity Kvíz</h2>

            {!isLoggedIn && (
                <div className="alert alert-warning">
                    <i className="bi bi-exclamation-triangle"></i> Be kell jelentkezni a pontszám mentéséhez.
                    <button className="btn btn-sm btn-outline-primary ms-2" onClick={() => navigate("/login")}>
                        Bejelentkezés
                    </button>
                </div>
            )}

            {offline && <div className="alert alert-danger"><i className="bi bi-wifi-off"></i> Offline mód: az eredmény nem menthető.</div>}

            {!selectedCategory ? (
                <div>
                    <h4>Válassz egy kategóriát:</h4>
                    {categories.map((category, index) => (
                        <button key={index} className="btn btn-primary m-2" onClick={() => setSelectedCategory(category)}>
                            {category}
                        </button>
                    ))}
                </div>
            ) : !selectedDifficulty ? (
                <div>
                    <h4>Kategória: <b>{selectedCategory}</b></h4>
                    <h5>Válassz egy nehézségi szintet:</h5>
                    {[1, 2, 3].map(difficulty => (
                        <button key={difficulty} className="btn btn-secondary m-2" onClick={() => setSelectedDifficulty(difficulty)}>
                            {difficulty === 1 ? "Könnyű" : difficulty === 2 ? "Közepes" : "Nehéz"}
                        </button>
                    ))}
                </div>
            ) : loading ? (
                <h4>Kérdések betöltése...</h4>
            ) : questions.length === 0 ? (
                <div>
                    <h4>⚠ Nincsenek elérhető kérdések ehhez a kategóriához és nehézségi szinthez.</h4>
                    <button className="btn btn-primary mt-3" onClick={() => {
                        setSelectedCategory(null);
                        setSelectedDifficulty(null);
                    }}>
                        Vissza
                    </button>
                </div>
            ) : showResult ? (
                <div>
                    <h3>✅ Eredményed: {score} / {questions.length}</h3>
                    <p>Helyes válaszok: {answerTracking.filter(a => a.isCorrect).length}</p>
                    <p>Hibás válaszok: {answerTracking.filter(a => !a.isCorrect).length}</p>
                    
                    {isLoggedIn && savingScore && (
                        <div className="alert alert-info">
                            <i className="bi bi-hourglass-split"></i> Eredmény mentése folyamatban...
                        </div>
                    )}
                    
                    {isLoggedIn && !savingScore && saveError && (
                        <div className="alert alert-danger">
                            <i className="bi bi-exclamation-triangle"></i> Hiba történt a pontszám mentése közben.
                            <small className="d-block mt-1">{saveError}</small>
                        </div>
                    )}
                    
                    {isLoggedIn && !offline && !savingScore && !saveError && (
                        <div className="alert alert-success">
                            <i className="bi bi-check-circle"></i> Az eredményed sikeresen elmentve!
                        </div>
                    )}
                    
                    <button className="btn btn-success mt-3" onClick={() => {
                        setSelectedCategory(null);
                        setSelectedDifficulty(null);
                        setQuestions([]);
                        setShowResult(false);
                        setSaveError(null);
                    }}>
                        Újrakezdés
                    </button>
                </div>
            ) : (
                <div>
                    <div className="progress mb-3">
                        <div 
                            className="progress-bar" 
                            role="progressbar" 
                            style={{width: `${(currentQuestion / questions.length) * 100}%`}}
                            aria-valuenow={(currentQuestion / questions.length) * 100}
                            aria-valuemin="0" 
                            aria-valuemax="100">
                        </div>
                    </div>
                    
                    <div className="d-flex justify-content-between mb-3">
                        <span>Kérdés: {currentQuestion + 1} / {questions.length}</span>
                        <span>Pontszám: {score} / {currentQuestion}</span>
                    </div>
                    
                    <h4>{questions[currentQuestion]?.question1 || "Nincs kérdés"}</h4>
                    
                    {showFeedback && (
                        <div className={`alert ${feedbackMessage.includes("✅") ? "alert-success" : "alert-danger"} mb-3`}>
                            {feedbackMessage}
                        </div>
                    )}
                    
                    <div className="options">
                        {questions[currentQuestion]?.answers?.map((answer, index) => (
                            <button 
                                key={index} 
                                className="btn btn-primary m-2" 
                                onClick={() => handleAnswerSelect(questions[currentQuestion].id, answer.answerText)}
                                disabled={showFeedback}
                            >
                                {answer.answerText}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}