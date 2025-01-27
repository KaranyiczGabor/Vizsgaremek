import { Route,  Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import SignIn from './SignIn';


function App() {
  return (
    <div className="App">
      
      <Navbar/>
        <Routes>  
        <Route path="/" element={<Home/>}/>
        <Route path="/SignIn" element={<SignIn/>}/>
        </Routes>
      
      
    </div>
  );
}

export default App;
