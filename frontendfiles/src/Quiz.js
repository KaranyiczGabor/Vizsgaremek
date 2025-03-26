import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

export default function Quiz() {
    const navigate = useNavigate();
    
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

    useEffect(() => {
        console.log("userAnswers updated:", userAnswers);
        if (userAnswers.length === questions.length && questions.length > 0) {
            finishQuiz()
        }
    }, [userAnswers, questions]);

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("token"));
        window.addEventListener("online", () => setOffline(false));
        window.addEventListener("offline", () => setOffline(true));
        return () => {
            window.removeEventListener("online", () => setOffline(false));
            window.removeEventListener("offline", () => setOffline(true));
        };
    }, []);

    useEffect(() => {
        if (selectedCategory && selectedDifficulty) {
            fetchQuestions();
        }
    }, [selectedCategory, selectedDifficulty]); 

    const fetchQuestions = () => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_API_URL}/users/getquestions`, {
            params: {
                Category: selectedCategory,
                Difficulty: selectedDifficulty
            }
        })
        .then(response => {
            console.log("📢 API válasz:", response.data);
            if (Array.isArray(response.data) && response.data.length > 0) {
                setQuestions(response.data);
                setUserAnswers([]); 
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
        setAnswerTracking(prev => [
            ...prev.filter(a => a.questionId !== questionId), 
            { questionId, answerText: selectedAnswer, isCorrect }
        ]);
        
        setUserAnswers(prev => {
            console.log("Previous answers:", prev);
        
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
        }, 100); 
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
    
        if (!userAnswers || userAnswers.length === 0) {
            setSaveError("Nincsenek válaszok elmentve");
            setSavingScore(false);
            return;
        }
        
        console.log("Sending answers to server:", userAnswers);
        
        axios.post(
            `${process.env.REACT_APP_API_URL}/users/checkanswer`,
            userAnswers,
            {
                headers: { 
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
        )
        .then(response => {
            console.log("✅ Server response:", response.data);
            if (response.data && response.data.score !== undefined) {
                setScore(response.data.score);
            }
            setSavingScore(false);
        })
        .catch(error => {
            console.error("❌ Hiba a pontszám mentésekor:", error);
            if (error.response && error.response.data) {
                console.error("Server error:", error.response.data);
                setSaveError(`Server error: ${error.response.data}`);
            } else {
                setSaveError(error.message);
            }
            setSavingScore(false);
        });
    };

    return (
        <div className="quiz-wrapper d-flex flex-column vh-100">
            <div className="container flex-grow-1" >
                <div className="quiz-container  text-center mt-5" >
                    <h2 >IQInfinity Kvíz</h2>

                    {!isLoggedIn && (
                        <div className="alert alert-warning" >
                            <i className="bi bi-exclamation-triangle"></i> Be kell jelentkezni a pontszám mentéséhez.
                            <button className="btn btn-sm btn-outline-primary ms-2" onClick={() => navigate("/login")}>
                                Bejelentkezés
                            </button>
                        </div>
                    )}

                    {offline && <div className="alert alert-danger"><i className="bi bi-wifi-off"></i> Offline mód: az eredmény nem menthető.</div>}

                    {!selectedCategory ? (
                        <div className="container mt-4">
                            <h4>Válassz egy kategóriát:</h4>
                            {categories.map((category, index) => (
                                <button key={index} className="btn btn-primary d-flex flex-wrap justify-content-center gap-3 m-2"   onClick={() => setSelectedCategory(category)}>
                                    {category}
                                </button>
                            ))}
                        </div>
                    ) : !selectedDifficulty ? (
                        <div className="container mt-4 ">
                            <h4>Kategória: <b>{selectedCategory}</b></h4>
                            <h5>Válassz egy nehézségi szintet:</h5>
                            {[1, 2, 3].map(difficulty => (
                                <button key={difficulty} className="btn btn-secondary m-2"  onClick={() => setSelectedDifficulty(difficulty)}>
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
                            <h3>✅ Eredményed:{score} pont</h3>
                            <p>Helyes válaszok: {answerTracking.filter(a => a.isCorrect).length} / {questions.length}</p>
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
                            
                            <div className="options" >
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
            </div>
            <Footer/>
        </div>
    );
}