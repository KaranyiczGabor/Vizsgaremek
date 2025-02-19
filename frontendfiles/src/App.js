import { Route,  Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Quiz from './Quiz';




function App() {
  return (
    <div className="App">
      
    <Navbar/>
    
      <Routes> 
      
        <Route path="/home" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/quiz" element={<Quiz/>}/>
      </Routes>
      
      
    </div>
  );
}

export default App;
