import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginPage from './welcome/LoginPage'
import SignupPageEmail from './welcome/SignupPageEmail'
import SignupPageInfo from './welcome/SignupPageInfo'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/signup' element={<SignupPageEmail/>} />
        <Route path='/signup/info' element={<SignupPageInfo/>} />
      </Routes>
    </Router>
  );
}

export default App
