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
      
        <Route path="/" element={<Home/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/LogIn" element={<Login/>}/>
        <Route path="/Quiz" element={<Quiz/>}/>
      </Routes>
      
      
    </div>
  );
}

export default App;
