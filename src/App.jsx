import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Header from './components/layout/Header';
import DeadlineSection from './components/layout/DeadlineSection';
import StatsSection from './components/layout/StatsSection';
import CarouselSection from './components/layout/CarouselSection';
import PointsSection from './components/layout/PointsSection';
import MatchsSection from './components/layout/MatchsSection';
import ClassementRecompenseSection from './components/layout/ClassementRecompenseSection';
import FieldSection from './components/layout/FieldSection';
import ReplacementsSection from './components/layout/ReplacementsSection';
import LegendSection from './components/layout/LegendSection';
import TransfersHistorySection from './components/layout/TransfersHistorySection';
import PartnersSection from './components/layout/PartnersSection';
import EditProfileModal from './components/modals/EditProfileModal';
import Footer from './components/layout/Footer';
import SelectionneJoueur from './components/layout/SelectionneJoueur';
import Login from './components/layout/login';
import Signup from './components/layout/signup';

function App() {
  const [pointsModalOpen, setPointsModalOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasTeam, setHasTeam] = useState(false);

  // Mock user data (replace with real user data as needed)
  const user = {
    avatar: '/avatar.jpg',
    name: 'ADEM MHIRI',
    email: 'adem.mhiri@email.com',
  };

  const handleProfileSave = (updatedProfile) => {
    // TODO: handle profile save (API call, state update, etc.)
    setEditProfileOpen(false);
    // Optionally show a success message
  };

  // Main dashboard component
  const Dashboard = () => (
    <div className="min-h-screen bg-black text-white">
      <Header onProfileClick={() => setEditProfileOpen(true)} />
      <EditProfileModal
        open={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
        user={user}
        onSave={handleProfileSave}
      />
      <DeadlineSection />
      <main className="w-full max-w-[1350px] mx-auto px-2 sm:px-4 md:px-6 flex flex-col gap-[20px]">
        <div className="hidden lg:flex flex-row gap-[20px] w-full">
          <div className="flex-1 flex flex-col gap-[20px]">
            <div className="mt-8"><StatsSection /></div>
            <div className="flex flex-row w-full gap-[20px] items-start">
              <div className="flex-1"><FieldSection /></div>
              <div className="flex-shrink-0 w-[150px] h-[648px]"><ReplacementsSection /></div>
            </div>
            <LegendSection />
            {pointsModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in-up">
                <div className="bg-gradient-to-b from-[#232e1a] to-[#181818] rounded-2xl shadow-2xl w-full max-w-md mx-2 p-0 relative border-2 border-[#61B12C] flex flex-col" style={{ boxShadow: '0 8px 32px 0 rgba(98,177,44,0.18)' }}>
                  {/* Modal Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-[#2d4a1e] rounded-t-2xl bg-[#232e1a]">
                    <h2 className="text-white text-lg xs:text-xl font-extrabold uppercase tracking-wide" style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif', letterSpacing: '0.04em' }}>Comment marquer des points</h2>
                    <button
                      className="text-white bg-[#61B12C] hover:bg-[#4e7e32] rounded-full w-8 h-8 flex items-center justify-center font-bold text-xl shadow focus:outline-none focus:ring-2 focus:ring-[#61B12C]"
                      onClick={() => setPointsModalOpen(false)}
                      aria-label="Fermer"
                    >
                      ×
                    </button>
                  </div>

                  <div className="overflow-y-auto max-h-[70vh] px-2 xs:px-4 py-4 bg-[#181818] rounded-b-2xl">
                    <PointsSection />
                  </div>
                </div>
              </div>
            )}
            <TransfersHistorySection />
          </div>
          <div className="w-full max-w-[400px] flex flex-col gap-[20px]">
            <div className="mt-8"><CarouselSection /></div>
            <PointsSection />
            <MatchsSection />
            <ClassementRecompenseSection />
          </div>
        </div>

        <div className="flex flex-col lg:hidden gap-[20px] w-full">
          <div className="mt-8"><CarouselSection /></div>
          <div className="mt-8"><StatsSection /></div>
          <div className="flex flex-col gap-4 w-full">
            <FieldSection />
            <div className="w-full flex flex-row gap-2"><ReplacementsSection layout="row" /></div>
          </div>
          <LegendSection showCommentLink={true} onCommentClick={() => setPointsModalOpen(true)} />
          {pointsModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in-up">
              <div className="bg-[#181818] rounded-2xl shadow-2xl w-full max-w-md mx-2 p-0 relative animate-fade-in-up border-2 border-[#61B12C]">
                <button
                  className="absolute top-2 right-2 text-white bg-[#61B12C] rounded-full w-8 h-8 flex items-center justify-center font-bold text-xl"
                  onClick={() => setPointsModalOpen(false)}
                  aria-label="Fermer"
                >
                  ×
                </button>
                <PointsSection />
              </div>
            </div>
          )}
          <MatchsSection />
          <TransfersHistorySection />
          <ClassementRecompenseSection />
        </div>
        <div>
          <PartnersSection />
        </div>
      </main>
    </div>
  );

  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Team Selection Route */}
          <Route path="/selectionne-joueur" element={<SelectionneJoueur />} />
          
          {/* Main Dashboard Route - Protected */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Default redirect to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 