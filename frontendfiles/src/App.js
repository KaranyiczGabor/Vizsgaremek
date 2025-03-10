import { Route,  Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Quiz from './Quiz';
import Profile from './Profile';
import Footer from './Footer';
import Adminquestion from './Adminquestion';
import Adminuser from './Adminuser';




function App() {
  return (
    <div className="App">
      
    <Navbar/>
    
      <Routes> 

        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/quiz" element={<Quiz/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/admin/Question" element={<Adminquestion/>}/>
        <Route path="/admin/User" element={<Adminuser/>}/>
      </Routes>
      <Footer/>
      
      
    </div>
  );
}

export default App;
