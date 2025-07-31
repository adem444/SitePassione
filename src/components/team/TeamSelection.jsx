import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, Check, Users, DollarSign, User, LogOut, HelpCircle, Trophy, X, Filter, Plus, UserPlus, AlertTriangle } from 'lucide-react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import PartnersSection from '../layout/PartnersSection';
import FootballFieldFormation from './FootballFieldFormation';

const TeamSelection = () => {
  const navigate = useNavigate();
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('Tous Les Equipes');
  const [activeFilter, setActiveFilter] = useState('GK');
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Mock player data (replace with real API data)
  const players = {
    GK: [
      { id: 1, name: 'Raki Aouani', team: 'ESS', position: 'GK', price: 6, points: 85, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
      { id: 2, name: 'Raki Aouani', team: 'ESS', position: 'GK', price: 6, points: 78, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
      { id: 3, name: 'Raki Aouani', team: 'ESS', position: 'GK', price: 6, points: 72, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
      { id: 4, name: 'Raki Aouani', team: 'ESS', position: 'GK', price: 6, points: 70, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
      { id: 5, name: 'Raki Aouani', team: 'ESS', position: 'GK', price: 6, points: 68, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
      { id: 6, name: 'Raki Aouani', team: 'ESS', position: 'GK', price: 6, points: 65, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
    ],
    DEF: [
      { id: 7, name: 'Raki Aouani', team: 'ESS', position: 'DEF', price: 6, points: 92, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
      { id: 8, name: 'Raki Aouani', team: 'ESS', position: 'DEF', price: 6, points: 88, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
      { id: 9, name: 'Raki Aouani', team: 'ESS', position: 'DEF', price: 6, points: 85, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
      { id: 10, name: 'Raki Aouani', team: 'ESS', position: 'DEF', price: 6, points: 82, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
      { id: 11, name: 'Raki Aouani', team: 'ESS', position: 'DEF', price: 6, points: 80, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
      { id: 12, name: 'Raki Aouani', team: 'ESS', position: 'DEF', price: 6, points: 78, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
    ],
    MID: [
      { id: 13, name: 'Raki Aouani', team: 'ESS', position: 'MID', price: 6, points: 105, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
      { id: 14, name: 'Raki Aouani', team: 'ESS', position: 'MID', price: 6, points: 98, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
      { id: 15, name: 'Raki Aouani', team: 'ESS', position: 'MID', price: 6, points: 92, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
      { id: 16, name: 'Raki Aouani', team: 'ESS', position: 'MID', price: 6, points: 88, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
      { id: 17, name: 'Raki Aouani', team: 'ESS', position: 'MID', price: 6, points: 85, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
      { id: 18, name: 'Raki Aouani', team: 'ESS', position: 'MID', price: 6, points: 82, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
    ],
    FWD: [
      { id: 19, name: 'Raki Aouani', team: 'ESS', position: 'FWD', price: 12, points: 115, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
      { id: 20, name: 'Raki Aouani', team: 'ESS', position: 'FWD', price: 6, points: 108, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
      { id: 21, name: 'Raki Aouani', team: 'ESS', position: 'FWD', price: 6, points: 102, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
      { id: 22, name: 'Raki Aouani', team: 'ESS', position: 'FWD', price: 6, points: 95, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
      { id: 23, name: 'Raki Aouani', team: 'ESS', position: 'FWD', price: 6, points: 90, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
      { id: 24, name: 'Raki Aouani', team: 'ESS', position: 'FWD', price: 6, points: 85, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
      { id: 25, name: 'Raki Aouani', team: 'ESS', position: 'FWD', price: 12, points: 115, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
      { id: 26, name: 'Raki Aouani', team: 'ESS', position: 'FWD', price: 6, points: 108, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
      { id: 27, name: 'Raki Aouani', team: 'ESS', position: 'FWD', price: 6, points: 102, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
      { id: 28, name: 'Raki Aouani', team: 'ESS', position: 'FWD', price: 6, points: 95, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
      { id: 29, name: 'Raki Aouani', team: 'ESS', position: 'FWD', price: 6, points: 90, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
      { id: 30, name: 'Raki Aouani', team: 'ESS', position: 'FWD', price: 6, points: 85, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
    ]
  };

  const positionRequirements = {
    GK: { min: 1, max: 2, label: 'GARDIENS' },
    DEF: { min: 3, max: 5, label: 'DÉFENSEURS' },
    MID: { min: 3, max: 5, label: 'MILIEUX' },
    FWD: { min: 1, max: 3, label: 'ATTAQUANTS' }
  };

  const positionFilters = [
    { key: 'GK', label: 'GARDIENS' },
    { key: 'DEF', label: 'DÉFENSEURS' },
    { key: 'MID', label: 'MILIEUX' },
    { key: 'FWD', label: 'ATTAQUANTS' }
  ];

  const getSelectedCount = (position) => {
    return selectedPlayers.filter(player => player.position === position).length;
  };

  const getTotalBudget = () => {
    return selectedPlayers.reduce((total, player) => total + player.price, 0);
  };

  const getTotalPoints = () => {
    return selectedPlayers.filter(player => player.name).reduce((total, player) => total + player.points, 0);
  };

  const handlePlayerSelect = (player) => {
    // Check if player is already selected
    const isAlreadySelected = selectedPlayers.some(p => p.id === player.id);
    
    if (isAlreadySelected) {
      // Remove player if already selected
      setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
      return;
    }

    const positionCount = getSelectedCount(player.position);
    const maxAllowed = positionRequirements[player.position].max;
    
    if (positionCount >= maxAllowed) {
      alert(`Vous ne pouvez sélectionner que ${maxAllowed} joueur(s) pour la position ${positionRequirements[player.position].label}`);
      return;
    }

    if (getTotalBudget() + player.price > 100) {
      alert('Budget dépassé! Vous devez respecter le budget de 100 VP.');
      return;
    }

    // Add player to the beginning of the array (top of the list)
    setSelectedPlayers([player, ...selectedPlayers]);
  };

  const handlePlayerRemove = (playerId) => {
    setSelectedPlayers(selectedPlayers.filter(player => player.id !== playerId));
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleConfirmTeam = async () => {
    const totalPlayers = selectedPlayers.length;
    const minRequired = Object.values(positionRequirements).reduce((sum, req) => sum + req.min, 0);
    
    if (totalPlayers < minRequired) {
      alert(`Vous devez sélectionner au moins ${minRequired} joueurs.`);
      return;
    }

    if (totalPlayers < 15) {
      alert('Vous devez sélectionner exactement 15 joueurs pour compléter votre équipe.');
      return;
    }

    setShowConfirmModal(true);
  };

  const handleFinalConfirm = async () => {
    setIsLoading(true);
    
    try {
      console.log('Creating team with:', {
        players: selectedPlayers,
        budget: getTotalBudget(),
        totalPoints: getTotalPoints()
      });
      
      navigate('/home');
    } catch (error) {
      alert('Erreur lors de la création de l\'équipe. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
      setShowConfirmModal(false);
    }
  };

  // Get all players and filter based on active filter
  const allPlayers = Object.values(players).flat();
  const filteredPlayers = allPlayers.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = selectedTeam === 'Tous Les Equipes' || player.team === selectedTeam;
    const matchesPosition = player.position === activeFilter;
    
    return matchesSearch && matchesTeam && matchesPosition;
  });

  const handleAddPlayer = (position) => {
    // Only show modal on mobile devices (screen width < 1024px)
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setActiveFilter(position);
      setShowPlayerModal(true);
    }
  };

  // Original Desktop Player Selection Panel
  const PlayerSelectionPanel = () => (
    <section className="relative px-4 py-6 w-full bg-[#141414] border border-[#1D1D1D]">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            SÉLECTIONNER VOS JOUEURS
          </h3>
          <p className="text-gray-400 text-sm" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
            Cliquez sur un joueur pour l'ajouter à votre équipe
          </p>
        </div>

        {/* Position Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          {positionFilters.map((filter) => {
            const isActive = activeFilter === filter.key;
            return (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#629F3F] text-white shadow-lg'
                    : 'bg-[#0F0F0F] text-gray-400 hover:bg-[#1D1D1D] hover:text-white'
                }`}
                style={{ fontFamily: 'Gotham SSM, sans-serif' }}
              >
                <span>{filter.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search and Team Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher un joueur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0F0F0F] border border-[#2A3C2A] text-white pl-10 pr-4 py-3 focus:outline-none focus:border-[#629F3F] transition-colors"
              style={{ fontFamily: 'Gotham SSM, sans-serif' }}
            />
          </div>
          <div className="relative">
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="w-full bg-[#0F0F0F] border border-[#2A3C2A] text-white px-4 py-3 focus:outline-none focus:border-[#629F3F] transition-colors appearance-none"
              style={{ fontFamily: 'Gotham SSM, sans-serif' }}
            >
              <option value="Tous Les Equipes">Tous Les Equipes</option>
              <option value="ESS">ESS</option>
              <option value="EST">EST</option>
              <option value="CA">CA</option>
              <option value="CAB">CAB</option>
              <option value="CSS">CSS</option>
              <option value="USBG">USBG</option>
              <option value="USM">USM</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>

        {/* Players List */}
        <div className="space-y-2 max-h-80 overflow-y-auto" style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#629F3F #0F0F0F'
        }}>
          {filteredPlayers.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-sm" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                Aucun joueur trouvé
              </div>
            </div>
          ) : (
            filteredPlayers.map((player) => {
              const isSelected = selectedPlayers.some(p => p.id === player.id);
              const positionCount = getSelectedCount(player.position);
              const maxAllowed = positionRequirements[player.position].max;
              const isMaxReached = positionCount >= maxAllowed && !isSelected;
              
              return (
                <div
                  key={player.id}
                  className={`p-4 border transition-all duration-200 cursor-pointer ${
                    isSelected 
                      ? 'bg-[#629F3F] border-[#629F3F] shadow-lg' 
                      : isMaxReached
                      ? 'bg-[#0F0F0F] border-[#1D1D1D] opacity-50 cursor-not-allowed'
                      : 'bg-[#0F0F0F] border-[#2A3C2A] hover:border-[#629F3F] hover:bg-[#1D1D1D]'
                  }`}
                  onClick={() => !isMaxReached && handlePlayerSelect(player)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={player.clubLogo}
                        alt={`${player.team} logo`}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-white'}`} style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                          {player.name}
                        </div>
                        <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-400'}`} style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                          {player.team} • {positionRequirements[player.position].label}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-[#629F3F]'}`} style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                          {player.price} VP
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected 
                          ? 'bg-white border-white' 
                          : 'border-gray-400'
                      }`}>
                        {isSelected && <div className="w-2 h-2 bg-[#629F3F] rounded-full"></div>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Confirm Button (Desktop Only) */}
        <div className="hidden lg:block text-center pt-4">
          <button
            onClick={handleConfirmTeam}
            disabled={isLoading || selectedPlayers.length !== 15}
            className={`w-full px-6 py-4 font-semibold transition-all duration-200 text-lg ${
              isLoading || selectedPlayers.length !== 15
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#629F3F] to-[#4e7e32] text-white hover:from-[#4e7e32] hover:to-[#629F3F] shadow-lg'
            }`}
            style={{ fontFamily: 'Gotham SSM, sans-serif' }}
          >
            {isLoading ? 'CRÉATION...' : `COMPLETER VOTRE EQUIPE (${selectedPlayers.length}/15)`}
          </button>
        </div>
      </div>
    </section>
  );

  // Professional Mobile Player Selection Modal
  const MobilePlayerModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    // Focus management and keyboard navigation
    useEffect(() => {
      if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      }

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }, [onClose]);

    const filteredPlayers = allPlayers.filter(player => {
      const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTeam = selectedTeam === 'Tous Les Equipes' || player.team === selectedTeam;
      const matchesPosition = player.position === activeFilter;
      
      return matchesSearch && matchesTeam && matchesPosition;
    });

    return (
      <div 
        className="fixed inset-0 z-50 flex items-end justify-center bg-black/95 backdrop-blur-sm transition-opacity duration-300 ease-out"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="player-selection-modal-title"
      >
        <div
          ref={modalRef}
          className="bg-[#181818] rounded-t-2xl shadow-2xl relative border border-[#629F3F] w-full max-h-[90vh] flex flex-col min-w-[280px] transition-all duration-300 ease-out transform translate-y-0"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#2a2a2a] bg-gradient-to-b from-[#2d4a1e] to-[#181818] rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-[#629F3F] rounded-full"></div>
              <h2
                id="player-selection-modal-title"
                className="text-white text-xl font-extrabold uppercase tracking-tight"
                style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif', letterSpacing: '0.04em' }}
              >
                SÉLECTIONNER VOS JOUEURS
              </h2>
            </div>
            <button
              ref={closeButtonRef}
              className="text-white bg-[#629F3F] rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl z-20 shadow-lg hover:bg-[#4a7a2f] transition-colors duration-200 touch-manipulation"
              onClick={onClose}
              aria-label="Fermer la modale"
            >
              ×
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {/* Position Tabs */}
            <div className="grid grid-cols-2 gap-1 bg-[#0F0F0F] p-1 rounded-lg">
              {positionFilters.map((filter) => {
                const isActive = activeFilter === filter.key;
                const count = getSelectedCount(filter.key);
                const max = positionRequirements[filter.key].max;
                
                return (
                  <button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                    className={`flex items-center justify-center space-x-1 px-2 py-2 text-xs font-medium transition-all rounded-md ${
                      isActive
                        ? 'bg-[#629F3F] text-white'
                        : 'bg-[#1D1D1D] text-gray-400 hover:text-white'
                    }`}
                    style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                  >
                    <span className="truncate">{filter.label}</span>
                    <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs font-bold ${
                      isActive ? 'bg-white/20' : 'bg-[#629F3F]/20 text-[#629F3F]'
                    }`}>
                      {count}/{max}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search and Team Filter */}
            <div className="flex flex-col space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#1D1D1D] border border-[#2A3C2A] text-white pl-10 pr-3 py-3 text-sm focus:outline-none focus:border-[#629F3F] rounded-lg"
                  style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                />
              </div>
              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="bg-[#1D1D1D] border border-[#2A3C2A] text-white px-4 py-3 text-sm focus:outline-none focus:border-[#629F3F] rounded-lg appearance-none"
                style={{ fontFamily: 'Gotham SSM, sans-serif' }}
              >
                <option value="Tous Les Equipes">Toutes les équipes</option>
                <option value="ESS">ESS</option>
                <option value="EST">EST</option>
                <option value="CA">CA</option>
                <option value="CAB">CAB</option>
                <option value="CSS">CSS</option>
                <option value="USBG">USBG</option>
                <option value="USM">USM</option>
              </select>
            </div>

            {/* Players List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredPlayers.length === 0 ? (
                <div className="flex items-center justify-center h-32 p-4">
                  <div className="text-center">
                    <div className="text-gray-400 text-sm mb-2" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                      Aucun joueur trouvé
                    </div>
                    <div className="text-gray-500 text-xs" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                      Essayez de modifier vos filtres
                    </div>
                  </div>
                </div>
              ) : (
                filteredPlayers.map((player) => {
                  const isSelected = selectedPlayers.some(p => p.id === player.id);
                  const positionCount = getSelectedCount(player.position);
                  const maxAllowed = positionRequirements[player.position].max;
                  const isMaxReached = positionCount >= maxAllowed && !isSelected;
                  
                  return (
                    <div
                      key={player.id}
                      className={`p-3 border transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-[#629F3F] border-[#629F3F]' 
                          : isMaxReached
                          ? 'bg-[#1D1D1D] border-[#1D1D1D] opacity-50 cursor-not-allowed'
                          : 'bg-[#1D1D1D] border-[#2A3C2A] hover:border-[#629F3F]'
                      }`}
                      onClick={() => !isMaxReached && handlePlayerSelect(player)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={player.clubLogo}
                            alt={`${player.team} logo`}
                            className="w-6 h-6 rounded-full"
                          />
                          <div>
                            <div className={`font-medium text-sm ${isSelected ? 'text-white' : 'text-white'}`} style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                              {player.name}
                            </div>
                            <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-400'}`} style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                              {player.team}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-right">
                            <div className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-[#629F3F]'}`} style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                              {player.price} VP
                            </div>
                          </div>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected 
                              ? 'bg-white border-white' 
                              : 'border-gray-400'
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 bg-[#629F3F] rounded-full"></div>}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Confirmation Modal
  const ConfirmationModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
    if (!isOpen) return null;

    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity duration-300 ease-out"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        role="dialog"
        aria-modal="true"
      >
        <div className="bg-[#181818] rounded-2xl shadow-2xl relative border border-[#629F3F] w-full max-w-md mx-4 p-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-[#629F3F] rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="text-white" size={32} />
            </div>
            <h3 className="text-white text-xl font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              CONFIRMER L'ÉQUIPE
            </h3>
            <p className="text-gray-400 text-sm" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
              Êtes-vous sûr de vouloir créer votre équipe avec {selectedPlayers.length} joueurs ?
            </p>
            <div className="flex space-x-3 pt-4">
              <button
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-[#1D1D1D] text-white font-semibold rounded-lg hover:bg-[#2A2A2A] transition-colors disabled:opacity-50"
                style={{ fontFamily: 'Gotham SSM, sans-serif' }}
              >
                ANNULER
              </button>
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-[#629F3F] text-white font-semibold rounded-lg hover:bg-[#4e7e32] transition-colors disabled:opacity-50"
                style={{ fontFamily: 'Gotham SSM, sans-serif' }}
              >
                {isLoading ? 'CRÉATION...' : 'CONFIRMER'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header 
        onProfileClick={() => {}} 
        onHelpClick={() => {}} 
        onLogout={handleLogout}
      />

      {/* Deadline Banner */}
      <div className="relative h-32">
        <div className="absolute inset-0">
          <img 
            src="/Deadline.svg" 
            alt="Deadline Background" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-[1350px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6">
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Field Section */}
          <div className="space-y-4">
            {/* Original Team Stats Section */}
            <section className="relative px-3 py-2 sm:px-4 sm:py-2 md:px-5 lg:px-6 w-full bg-[#141414] border border-[#1D1D1D] mb-6">
              <div className="mx-auto py-1 sm:py-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0F0F0F] border border-[#2A3C2A] rounded-md p-4">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Users className="text-[#629F3F]" size={20} />
                      <span className="text-sm font-semibold text-white" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                        ÉQUIPE
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-center text-[#629F3F]" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                      {selectedPlayers.length}/15
                    </div>
                  </div>
                  
                  <div className="bg-[#0F0F0F] border border-[#2A3C2A] rounded-md p-4">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <DollarSign className="text-[#629F3F]" size={20} />
                      <span className="text-sm font-semibold text-white" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                        BUDGET
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-center text-[#629F3F]" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                      {100 - getTotalBudget()} VP
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Football Field Layout */}
            <FootballFieldFormation 
              players={selectedPlayers}
              budget={100 - getTotalBudget()}
              onAddPlayer={handleAddPlayer}
              onReplacePlayer={(player) => handlePlayerRemove(player.id)}
            />

            {/* Mobile Add Players Button - Better UI */}
            <div className="lg:hidden">
              <div className="bg-[#141414] border border-[#1D1D1D] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <UserPlus className="text-[#629F3F]" size={20} />
                    <span className="text-white font-semibold" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                      JOUEURS SÉLECTIONNÉS
                    </span>
                  </div>
                  <span className="text-[#629F3F] font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    {selectedPlayers.length}/15
                  </span>
                </div>
                <button
                  onClick={() => setShowPlayerModal(true)}
                  className="w-full bg-gradient-to-r from-[#629F3F] to-[#4e7e32] text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:from-[#4e7e32] hover:to-[#629F3F] transition-all duration-200 shadow-lg"
                  style={{ fontFamily: 'Gotham SSM, sans-serif' }}
                >
                  <Plus size={18} />
                  <span>AJOUTER DES JOUEURS</span>
                </button>
              </div>
            </div>

            {/* Mobile Confirm Button - Outside Modal */}
            <div className="lg:hidden text-center mt-6">
              <button
                onClick={handleConfirmTeam}
                disabled={isLoading || selectedPlayers.length !== 15}
                className={`w-full max-w-md px-8 py-4 font-semibold transition-all duration-200 text-lg ${
                  isLoading || selectedPlayers.length !== 15
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#629F3F] to-[#4e7e32] text-white hover:from-[#4e7e32] hover:to-[#629F3F] shadow-lg'
                }`}
                style={{ fontFamily: 'Gotham SSM, sans-serif' }}
              >
                {isLoading ? 'CRÉATION...' : `COMPLETER VOTRE EQUIPE (${selectedPlayers.length}/15)`}
              </button>
            </div>
          </div>

          {/* Right Column - Original Desktop Player Selection */}
          <div className="hidden lg:block space-y-4">
            <PlayerSelectionPanel />
          </div>
        </div>
      </div>

      {/* Mobile Modal */}
      <MobilePlayerModal 
        isOpen={showPlayerModal}
        onClose={() => setShowPlayerModal(false)}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleFinalConfirm}
        isLoading={isLoading}
      />

      {/* Partners Section */}
      <PartnersSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TeamSelection; 