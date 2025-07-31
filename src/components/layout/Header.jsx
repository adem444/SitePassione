import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, User, LogOut, HelpCircle } from 'lucide-react';
import EditProfileModal from '../modals/EditProfileModal';
import HelpModal from '../modals/HelpModal';
import { useAuth } from '../../context/AuthContext';

const Header = ({ onProfileClick, onHelpClick, onLogout }) => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log('Déconnexion...');
    setIsDropdownOpen(false);
    logout();
    if (onLogout) {
      onLogout();
    }
  };

  const handleProfileClick = () => {
    setEditProfileOpen(true);
    setIsDropdownOpen(false);
    if (onProfileClick) {
      onProfileClick();
    }
  };

  const handleHelpClick = () => {
    setHelpModalOpen(true);
    if (onHelpClick) {
      onHelpClick();
    }
  };

  const handleProfileSave = (updatedProfile) => {
    // TODO: handle profile save (API call, state update, etc.)
    setEditProfileOpen(false);
    // Optionally show a success message
  };

  return (
    <header className="bg-black border-b border-gray-800 w-full z-50">
      <div className="max-w-screen-xl mx-auto px-3 md:px-py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/logo.png" 
              alt="Logo"
              className="w-40 h-20 object-contain"
            />
          </div>

          {/* Right Side - Help Button and Profile */}
          <div className="flex items-center space-x-3">
            {/* Help Button */}
            <button
              onClick={handleHelpClick}
              className="flex items-center space-x-2 px-4 py-2 bg-[#629F3F] hover:bg-[#4a7a2f] text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <HelpCircle size={18} />
              <span className="hidden sm:inline">Aide</span>
            </button>

            {/* Profile */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 sm:space-x-3 px-2 py-2 transition-all"
              >
                <img
                  src={user?.logo || "/avatar.jpg"}
                  alt="Profile"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                />
                <span className="text-white font-medium text-sm sm:text-base hidden sm:inline">
                  {user?.name || user?.username || 'Utilisateur'}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 z-50">
                  <div className="bg-[#181818] border border-[#629F3F] rounded-2xl shadow-2xl py-2 text-white animate-fade-in-up" style={{ boxShadow: '0 8px 32px 0 rgba(98,159,63,0.18)' }}>
                    <button
                      onClick={handleProfileClick}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-left font-heading text-lg rounded-xl hover:bg-[#629F3F] hover:text-white focus:bg-[#629F3F] focus:text-white transition-all"
                    >
                      <User size={20} />
                      <span className="text-lg font-heading">Profil</span>
                    </button>

                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-left rounded-xl font-heading text-lg text-red-400 hover:bg-[#629F3F] hover:text-white focus:bg-[#629F3F] focus:text-white transition-all"
                    >
                      <LogOut size={20} />
                      <span className="text-lg font-heading">Déconnexion</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        open={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
        onSave={handleProfileSave}
        user={user}
      />

      {/* Help Modal */}
      <HelpModal
        open={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
      />
    </header>
  );
};

export default Header;
