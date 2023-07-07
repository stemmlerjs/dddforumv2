import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontPageComponent from './components/frontPage/frontPageComponent';
import RegistrationPageComponent from './components/registrationPage/registrationPageComponent';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className='app'>
      <Router>
      <Routes>
        <Route path="/" element={<FrontPageComponent/>} />
        <Route path="/register" element={<RegistrationPageComponent/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
