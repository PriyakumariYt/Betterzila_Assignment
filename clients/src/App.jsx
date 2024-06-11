
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { Logout } from './pages/Logout';
import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from 'react';


function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);


 return (
    <>
    <Router>

        <Navbar />
        <Routes>
        
        <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
         </Router>
<Outlet/>
  
    </>
  );
}

export default App;


