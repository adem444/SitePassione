import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    // Clear authentication data using AuthContext
    logout();
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="text-[#629F3F] hover:text-[#4a7a2f] font-medium"
      style={{ fontFamily: 'Gotham SSM, sans-serif' }}
    >
      Se déconnecter
    </button>
  );
};

export default Logout; 