import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Adminquestion() {
  const API_BASE_URL = "http://192.168.125.240:5248/api/admin";
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: '',
    question1: '',
    category: '',
    difficulty: 1,
    answers: []
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin before fetching data
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      
      if (decodedPayload.role !== "Admin") {
        navigate('/');
        return;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      navigate('/');
      return;
    }

    fetchQuestions();
  }, [navigate]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/getAllQuestionsWAnswers`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Kérdések betöltése sikertelen');
      }

      const data = await response.json();
      setQuestions(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Hiba történt a kérdések betöltésekor');
      console.error('Error fetching questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const getQuestionById = async (questionId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/getAllQuestionsWAnswersById?id=${questionId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Kérdés adatainak betöltése sikertelen');
      }
  
      const questionData = await response.json();
      
      // Check if the response is an array and extract the first item
      if (Array.isArray(questionData) && questionData.length > 0) {
        setSelectedQuestion(questionData[0]);
      } else {
        setSelectedQuestion(questionData);
      }
    } catch (err) {
      console.error('Error fetching question details:', err);
      setError('Hiba a kérdés adatainak betöltésekor');
    }
  };
  const handleQuestionSelect = (questionId) => {
    getQuestionById(questionId);
    
    
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const resetQuestionSelection = () => {
    setSelectedQuestion(null);
    setIsEditing(false);
    setEditFormData({
      id: '',
      question1: '',
      category: '',
      difficulty: 1,
      answers: []
    });
  };
  
  const handleEditClick = (question) => {
    setIsEditing(true);
    setEditFormData({
      id: question.id,
      question1: question.question1 || '',
      category: question.category || '',
      difficulty: question.difficulty || 1,
      answers: question.answers || []
    });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: name === 'difficulty' ? parseInt(value, 10) : value
    });
  };
  
  const handleAnswerChange = (index, field, value) => {
    const updatedAnswers = [...editFormData.answers];
    updatedAnswers[index] = {
      ...updatedAnswers[index],
      [field]: field === 'correct' ? value === 'true' : value
    };
    setEditFormData({
      ...editFormData,
      answers: updatedAnswers
    });
  };
  
  const addAnswer = () => {
    const newAnswer = {
      answerId: `temp-${Date.now()}`, // Temporary ID until saved
      answerText: '',
      questionId: editFormData.id,
      correct: false
    };
    
    setEditFormData({
      ...editFormData,
      answers: [...editFormData.answers, newAnswer]
    });
  };
  
  const removeAnswer = (index) => {
    const updatedAnswers = [...editFormData.answers];
    updatedAnswers.splice(index, 1);
    setEditFormData({
      ...editFormData,
      answers: updatedAnswers
    });
  };
  
 
  const putquestionbyid = async (questionId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/EditQuestion?id=${editFormData.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editFormData)
      });

      if (!response.ok) {
        throw new Error('Kérdés módosítása sikertelen');
      }
      
      // Update the question in the list
      setQuestions(questions.map(q => 
        q.id === editFormData.id ? {...q, ...editFormData} : q
      ));
      
      // Update selected question if viewing it
      if (selectedQuestion && selectedQuestion.id === editFormData.id) {
        setSelectedQuestion({...selectedQuestion, ...editFormData});
        console.log(selectedQuestion);
      }
      
      setIsEditing(false);
      alert('Kérdés sikeresen módosítva!');
    } catch (err) {
      console.error('Error updating question:', err);
      alert('Hiba történt a kérdés módosításakor: ' + err.message);
    }
  }
  
  
  const handleQuestionDelete = async (questionId) => {
    if (!window.confirm('Biztosan törölni szeretné ezt a kérdést?')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/DeleteQuestionWithAnswer?id=${questionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Kérdés törlése sikertelen');
      }

      // Remove question from the list and reset selection if needed
      setQuestions(questions.filter(question => question.id !== questionId));
      if (selectedQuestion && selectedQuestion.id === questionId) {
        setSelectedQuestion(null);
      }
      
      alert('Kérdés sikeresen törölve!');
    } catch (err) {
      console.error('Error deleting question:', err);
      alert('Hiba történt a kérdés törlésekor: ' + err.message);
    }
  };

  const filteredQuestions = questions.filter(question => 
    question.question1?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.answers?.some(answer => 
      answer.answerText?.toLowerCase().includes(searchTerm.toLowerCase())
    ) ||
    question.category?.toLowerCase().includes(searchTerm.toLowerCase()) 
    
    
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Betöltés...</span>
        </div>
      </div>
    );
  }

  if (error && !selectedQuestion && questions.length === 0) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
          <button 
            className="btn btn-outline-danger ms-3"
            onClick={fetchQuestions}
          >
            Újrapróbálkozás
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Kérdések kezelése</h2>
          
          {/* Search bar */}
          <div className="mb-4">
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Keresés kérdés, válasz vagy kategória alapján..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {searchTerm && (
                <button 
                  className="btn btn-outline-secondary" 
                  type="button"
                  onClick={() => setSearchTerm('')}
                >
                  <i className="bi bi-x"></i>
                </button>
              )}
            </div>
          </div>

          {/* Question detail view */}
          {selectedQuestion && !isEditing && (
            <div className="card mb-4">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Kérdés részletei</h5>
                <div>
                  <button 
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleEditClick(selectedQuestion) }
                  >
                    Szerkesztés
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-secondary"
                    onClick={resetQuestionSelection}
                  >
                    Vissza a listához
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-md-3 fw-bold">Azonosító:</div>
                  <div className="col-md-9">{selectedQuestion.id }</div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-3 fw-bold">Kérdés:</div>
                  <div className="col-md-9">{selectedQuestion.question1}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-3 fw-bold">Kategória:</div>
                  <div className="col-md-9">{selectedQuestion.category || "Nincs kategória"}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-3 fw-bold">Nehézségi szint:</div>
                  <div className="col-md-9">{selectedQuestion.difficulty}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-3 fw-bold">Válaszok:</div>
                  <div className="col-md-9">
                    <table className="table table-sm table-bordered">
                      <thead>
                        <tr>
                          <th>Válasz</th>
                          <th>Helyes?</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedQuestion.answers && selectedQuestion.answers.map((answer, index) => (
                          
                          <tr key={answer.answerId} className={answer.correct ? "table-success" : ""}>
                            <td>{answer.answerText}</td>
                            <td>{answer.correct ? "✓" : "✗"}</td>
                          </tr>
                        ))}
                        
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-12">
                    <button 
                      className="btn btn-danger"
                      onClick={() => handleQuestionDelete(selectedQuestion.id)}
                    >
                      Kérdés törlése
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Question edit form */}
          {isEditing && (
            <div className="card mb-4">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Kérdés szerkesztése</h5>
                <button 
                  className="btn btn-sm btn-outline-secondary"
                  onClick={resetQuestionSelection}
                >
                  Mégse
                </button>
              </div>
              <div className="card-body">
                <div onSubmit={putquestionbyid}>
                  <input type="hidden" name="id" value={editFormData.id} />
                  
                  <div className="mb-3">
                    <label htmlFor="question1" className="form-label">Kérdés:</label>
                    <textarea
                      id="question1"
                      name="question1"
                      className="form-control"
                      value={editFormData.question1}
                      onChange={handleInputChange}
                      required
                      rows={3}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">Kategória:</label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      className="form-control"
                      value={editFormData.category}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="difficulty" className="form-label">Nehézségi szint:</label>
                    <select
                      id="difficulty"
                      name="difficulty"
                      className="form-select"
                      value={editFormData.difficulty}
                      onChange={handleInputChange}
                    >
                      <option value="1">1 - Könnyű</option>
                      <option value="2">2 - Közepes</option>
                      <option value="3">3 - Nehéz</option>
                    </select>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Válaszok:</label>
                    {editFormData.answers.map((answer, index) => (
                      <div key={answer.answerId || index} className="card mb-2 p-3">
                        <div className="row g-2">
                          <div className="col-md-7">
                            <label className="form-label small">Válasz szövege:</label>
                            <input
                              type="text"
                              className="form-control"
                              value={answer.answerText}
                              onChange={(e) => handleAnswerChange(index, 'answerText', e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-md-3">
                            <label className="form-label small">Helyes válasz?</label>
                            <select
                              className="form-select"
                              value={answer.correct.toString()}
                              onChange={(e) => handleAnswerChange(index, 'correct', e.target.value)}
                            >
                              <option value="true">Igen</option>
                              <option value="false">Nem</option>
                            </select>
                          </div>
                          <div className="col-md-2 d-flex align-items-end">
                            <button 
                              type="button" 
                              className="btn btn-outline-danger"
                              onClick={() => removeAnswer(index)}
                            >
                              Törlés
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <button 
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={addAnswer}
                    >
                      + Új válasz hozzáadása
                    </button>
                  </div>
                  
                  <div className="mt-4">
                    <button type="button" className="btn btn-primary me-2" onClick={putquestionbyid}>
                      Mentés

                    </button>
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary"
                      onClick={resetQuestionSelection}
                    >
                      Mégse
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Questions table */}
          {!selectedQuestion && (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Kérdés</th>
                      <th>Válaszok száma</th>
                      <th>Kategória</th>
                      <th>Nehézség</th>
                      <th>Műveletek</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQuestions.length > 0 ? (
                      filteredQuestions.map(question => (
                        <tr key={question.id}>
                          <td>{question.id.substring(0, 8)}...</td>
                          <td>{question.question1?.length > 50 ? `${question.question1.substring(0, 50)}...` : question.question1}</td>
                          <td>{question.answers?.length || 0}</td>
                          <td>{question.category || "Nincs kategória"}</td>
                          <td>{question.difficulty}</td>
                          <td>
                            <button 
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => handleQuestionSelect(question.id) }
                            >
                             
                              Részletek
                            </button>
                            
                            <button 
                              className="btn btn-sm btn-outline-success me-2"
                              onClick={() => {
                                handleQuestionSelect(question.id);
                                handleEditClick(question);
                              }}
                            >
                              Szerkesztés
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleQuestionDelete(question.id)}
                            >
                              Törlés
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-4">
                          {searchTerm ? 'Nincs találat a keresési feltételeknek megfelelően' : 'Nincsenek kérdések az adatbázisban'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                  <span className="text-muted">Összesen: {filteredQuestions.length} kérdés</span>
                </div>
                <button 
                  className="btn btn-primary"
                  onClick={fetchQuestions}
                >
                  Frissítés
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}