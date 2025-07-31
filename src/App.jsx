import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Auth Components
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

// Team Components
import TeamSelection from './components/team/TeamSelection';

// HomePage Components
import HomePage from './components/HomePage/HomePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route redirects to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Team selection route */}
          <Route path="/team-selection" element={<TeamSelection />} />
          
          {/* Home page route (after team confirmation) */}
          <Route path="/home" element={<HomePage />} />
          
          {/* Catch all other routes and redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 