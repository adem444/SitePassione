import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Auth Components
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

// Team Components
import TeamSelection from './components/team/TeamSelection';

// HomePage Components
import HomePage from './components/HomePage/HomePage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Default route redirects directly to team selection */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Auth routes - commented out for direct access */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected routes - now accessible directly */}
            <Route path="/team-selection" element={
              // <ProtectedRoute>
                <TeamSelection />
              // </ProtectedRoute>
            } />
            
            <Route path="/home" element={
              // <ProtectedRoute>
                <HomePage />
              // </ProtectedRoute>
            } />
            
            {/* Catch all other routes and redirect to team selection */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 