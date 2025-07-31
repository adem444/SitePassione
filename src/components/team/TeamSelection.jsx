import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, Check, Users, DollarSign, User, LogOut, HelpCircle, Trophy, X, Filter, Plus, UserPlus, AlertTriangle } from 'lucide-react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import PartnersSection from '../layout/PartnersSection';
import FootballFieldFormation from './FootballFieldFormation';
import api from '../../utils/api';

const TeamSelection = () => {
  const navigate = useNavigate();
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('Tous Les Equipes');
  const [activeFilter, setActiveFilter] = useState('GK'); // Default to GK
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Dynamic data states
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState({
    Goalkeeper: [],
    Defender: [],
    Midfielder: [],
    Attacker: []
  });
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(null);
  const [loadedPositions, setLoadedPositions] = useState(new Set()); // Track loaded positions
  const [loadingPosition, setLoadingPosition] = useState(''); // Track which position is loading
  const [opponents, setOpponents] = useState({}); // Store opponent data for each team

  // Fetch teams and players on component mount
  useEffect(() => {
    fetchTeams();
    // Load GK players by default
    loadPlayersByPosition('GK');
  }, []);

  const fetchTeams = async () => {
    setLoadingData(true);
    setError(null);
    
    try {
      // Fetch teams only
      const teamsResponse = await api.getAllTeams();
      console.log('Teams response:', teamsResponse);
      
      if (teamsResponse && teamsResponse.teams) {
        setTeams(teamsResponse.teams);
        // Fetch opponents for each team
        await fetchOpponents(teamsResponse.teams);
      } else {
        // Use fallback teams if API response is invalid
        const fallbackTeams = [
          { _id: '1', name: 'ESS' },
          { _id: '2', name: 'EST' },
          { _id: '3', name: 'CA' },
          { _id: '4', name: 'CAB' },
          { _id: '5', name: 'CSS' },
          { _id: '6', name: 'USBG' },
          { _id: '7', name: 'USM' }
        ];
        setTeams(fallbackTeams);
        await fetchOpponents(fallbackTeams);
      }
    } catch (error) {
      console.error('Error fetching teams:', error);
      setError('Failed to load teams. Please try again.');
      
      // Set fallback teams if API fails
      const fallbackTeams = [
        { _id: '1', name: 'ESS' },
        { _id: '2', name: 'EST' },
        { _id: '3', name: 'CA' },
        { _id: '4', name: 'CAB' },
        { _id: '5', name: 'CSS' },
        { _id: '6', name: 'USBG' },
        { _id: '7', name: 'USM' }
      ];
      setTeams(fallbackTeams);
      await fetchOpponents(fallbackTeams);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchOpponents = async (teamsList) => {
    try {
      const opponentsData = {};
      
      for (const team of teamsList) {
        try {
          // Fetch opponent data for this team
          const opponentResponse = await api.getTeamOpponents(team._id);
          console.log(`Opponents for ${team.name}:`, opponentResponse);
          
          if (opponentResponse && opponentResponse.opponents && opponentResponse.opponents.length > 0) {
            opponentsData[team.name] = opponentResponse.opponents;
          } else {
            // No matches found for this team
            opponentsData[team.name] = [];
          }
        } catch (error) {
          console.error(`Error fetching opponents for ${team.name}:`, error);
          // No opponents found
          opponentsData[team.name] = [];
        }
      }
      
      setOpponents(opponentsData);
      console.log('All opponents data:', opponentsData);
    } catch (error) {
      console.error('Error fetching opponents:', error);
      // Set empty opponents for all teams
      const emptyOpponents = {};
      teamsList.forEach(team => {
        emptyOpponents[team.name] = [];
      });
      setOpponents(emptyOpponents);
    }
  };

  // Get opponent for a specific player
  const getPlayerOpponent = (player) => {
    if (!player || !player.team) return '-';
    
    const teamOpponents = opponents[player.team];
    if (teamOpponents && teamOpponents.length > 0) {
      return `VS ${teamOpponents[0]}`;
    }
    
    // No matches found for this team
    return '-';
  };

  const loadPlayersByPosition = async (position) => {
    console.log('Loading players for position:', position);
    
    // Don't reload if already loaded
    if (loadedPositions.has(position)) {
      console.log('Position already loaded:', position);
      return;
    }

    setLoadingPosition(position);
    
    try {
      const positionMap = {
        'GK': 'Goalkeeper',
        'DEF': 'Defender', 
        'MID': 'Midfielder',
        'FWD': 'Attacker'
      };

      const backendPosition = positionMap[position];
      if (!backendPosition) {
        console.error('Invalid position:', position);
        return;
      }

      console.log('Fetching players for backend position:', backendPosition);
      const playersResponse = await api.getPlayersByPosition(backendPosition);
      console.log(`${position} players response:`, playersResponse);
      
      if (playersResponse && playersResponse.data) {
        setPlayers(prev => ({
          ...prev,
          [backendPosition]: playersResponse.data
        }));
      } else {
        // Use fallback data if API response is invalid
        const fallbackData = {
          'GK': mockPlayers.GK,
          'DEF': mockPlayers.DEF,
          'MID': mockPlayers.MID,
          'FWD': mockPlayers.FWD
        };
        
        setPlayers(prev => ({
          ...prev,
          [backendPosition]: fallbackData[position] || []
        }));
      }
      
      setLoadedPositions(prev => new Set([...prev, position]));
      console.log('Position loaded successfully:', position);
    } catch (error) {
      console.error(`Error fetching ${position} players:`, error);
      
      // Use fallback data for this position
      const fallbackData = {
        'GK': mockPlayers.GK,
        'DEF': mockPlayers.DEF,
        'MID': mockPlayers.MID,
        'FWD': mockPlayers.FWD
      };
      
      const positionMap = {
        'GK': 'Goalkeeper',
        'DEF': 'Defender', 
        'MID': 'Midfielder',
        'FWD': 'Attacker'
      };
      
      setPlayers(prev => ({
        ...prev,
        [positionMap[position]]: fallbackData[position] || []
      }));
      
      setLoadedPositions(prev => new Set([...prev, position]));
    } finally {
      setLoadingPosition('');
    }
  };

  // Handle position filter change
  const handlePositionChange = (newPosition) => {
    console.log('Position changed to:', newPosition);
    setActiveFilter(newPosition);
    loadPlayersByPosition(newPosition);
  };

  // Transform backend player data to frontend format
  const transformPlayerData = (backendPlayers) => {
    if (!Array.isArray(backendPlayers)) {
      console.warn('backendPlayers is not an array:', backendPlayers);
      return [];
    }

    return backendPlayers.map(player => {
      try {
        // Map backend position to frontend position
        const positionMap = {
          'Goalkeeper': 'GK',
          'Defender': 'DEF',
          'Midfielder': 'MID',
          'Attacker': 'FWD'
        };

        const frontendPosition = positionMap[player.position] || player.position;
        
        return {
          id: player._id || player.id || Math.random().toString(),
          name: player.name || 'Unknown Player',
          team: player.team?.name || player.team || 'Unknown',
          position: frontendPosition, // Use frontend position key
          price: player.value_passionne || 6, // Default price if not set
          points: player.stats?.goals || 0, // Use goals as points for now
          jersey: player.logo || '/jercy1/ess.webp', // Use player photo or default
          clubLogo: player.team?.logo || '/ESS.png', // Use team logo or default
          selectedBy: player.selectedBy || '0%'
        };
      } catch (error) {
        console.error('Error transforming player:', player, error);
        return {
          id: Math.random().toString(),
          name: 'Error Player',
          team: 'Unknown',
          position: 'Unknown',
          price: 6,
          points: 0,
          jersey: '/jercy1/ess.webp',
          clubLogo: '/ESS.png',
          selectedBy: '0%'
        };
      }
    });
  };

  // Get transformed players for current filter
  const getFilteredPlayers = () => {
    try {
      const positionMap = {
        'GK': 'Goalkeeper',
        'DEF': 'Defender', 
        'MID': 'Midfielder',
        'FWD': 'Attacker'
      };

      const backendPosition = positionMap[activeFilter];
      const backendPlayers = players[backendPosition] || [];
      
      console.log('Getting filtered players for:', activeFilter, 'backend position:', backendPosition, 'players:', backendPlayers);
      
      const transformedPlayers = transformPlayerData(backendPlayers);
      console.log('Transformed players:', transformedPlayers);
      
      const filteredPlayers = transformedPlayers.filter(player => {
        const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTeam = selectedTeam === 'Tous Les Equipes' || player.team === selectedTeam;
        
        return matchesSearch && matchesTeam;
      });
      
      console.log('Final filtered players:', filteredPlayers);
      return filteredPlayers;
    } catch (error) {
      console.error('Error filtering players:', error);
      return [];
    }
  };

  // Mock player data (fallback if API fails)
  const mockPlayers = {
    GK: [
      { id: 1, name: 'Raki Aouani', team: 'ESS', position: 'Goalkeeper', price: 6, points: 85, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
      { id: 2, name: 'Raki Aouani', team: 'ESS', position: 'Goalkeeper', price: 6, points: 78, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
    ],
    DEF: [
      { id: 7, name: 'Raki Aouani', team: 'ESS', position: 'Defender', price: 6, points: 92, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
      { id: 8, name: 'Raki Aouani', team: 'ESS', position: 'Defender', price: 6, points: 88, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
    ],
    MID: [
      { id: 13, name: 'Raki Aouani', team: 'ESS', position: 'Midfielder', price: 6, points: 105, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
      { id: 14, name: 'Raki Aouani', team: 'ESS', position: 'Midfielder', price: 6, points: 98, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
    ],
    FWD: [
      { id: 19, name: 'Raki Aouani', team: 'ESS', position: 'Attacker', price: 12, points: 115, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
      { id: 20, name: 'Raki Aouani', team: 'ESS', position: 'Attacker', price: 6, points: 108, jersey: '/jercy1/ess.webp', clubLogo: '/ESS.png' },
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

  // Check if a team has reached its limit (3 players)
  const isTeamAtLimit = (teamName) => {
    return selectedPlayers.filter(player => player.team === teamName).length >= 3;
  };

  // Check if a specific player's team is at limit
  const isPlayerTeamAtLimit = (player) => {
    const playerTeam = player.team || 'Unknown';
    return isTeamAtLimit(playerTeam);
  };

  const getTotalBudget = () => {
    return selectedPlayers.reduce((total, player) => total + (player.price || 0), 0);
  };

  const getTotalPoints = () => {
    return selectedPlayers.filter(player => player && player.name).reduce((total, player) => total + (player.points || 0), 0);
  };

  const handlePlayerSelect = (player) => {
    console.log('Player selected:', player);
    
    // Check if player is already selected
    const isAlreadySelected = selectedPlayers.some(p => p.id === player.id);
    
    if (isAlreadySelected) {
      console.log('Player already selected, removing:', player.name);
      // Remove player if already selected
      setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
      return;
    }

    // Add null checks and safe property access
    if (!player || !player.position) {
      console.error('Invalid player data:', player);
      return;
    }

    // Check team limit (max 3 players per team)
    const playerTeam = player.team || 'Unknown';
    const teamPlayerCount = selectedPlayers.filter(p => p.team === playerTeam).length;
    
    if (teamPlayerCount >= 3) {
      alert(`Vous ne pouvez sélectionner que 3 joueurs maximum par équipe. Vous avez déjà ${teamPlayerCount} joueurs de ${playerTeam}.`);
      return;
    }

    const positionCount = getSelectedCount(player.position);
    const positionReq = positionRequirements[player.position];
    
    if (!positionReq) {
      console.error('Invalid position:', player.position);
      return;
    }
    
    const maxAllowed = positionReq.max;
    
    if (positionCount >= maxAllowed) {
      alert(`Vous ne pouvez sélectionner que ${maxAllowed} joueur(s) pour la position ${positionReq.label}`);
      return;
    }

    if (getTotalBudget() + (player.price || 0) > 100) {
      alert('Budget dépassé! Vous devez respecter le budget de 100 VP.');
      return;
    }

    console.log('Adding player to team:', player.name);
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

    // Create 4-4-2 formation with substitutes
    const formation = create442Formation(selectedPlayers);

    setShowConfirmModal(true);
  };

  // Create 4-4-2 formation with substitutes
  const create442Formation = (players) => {
    // Group players by position
    const gkPlayers = players.filter(p => p.position === 'GK');
    const defPlayers = players.filter(p => p.position === 'DEF');
    const midPlayers = players.filter(p => p.position === 'MID');
    const fwdPlayers = players.filter(p => p.position === 'FWD');

    // 4-4-2 formation: 1 GK, 4 DEF, 4 MID, 2 FWD, 4 substitutes
    const formation = {
      starting11: {
        goalkeeper: gkPlayers.slice(0, 1), // 1 GK
        defenders: defPlayers.slice(0, 4), // 4 DEF
        midfielders: midPlayers.slice(0, 4), // 4 MID
        forwards: fwdPlayers.slice(0, 2), // 2 FWD
      },
      substitutes: [
        ...gkPlayers.slice(1, 2), // 1 GK sub
        ...defPlayers.slice(4, 6), // 2 DEF subs
        ...midPlayers.slice(4, 6), // 2 MID subs
        ...fwdPlayers.slice(2, 3), // 1 FWD sub
      ].filter(Boolean), // Remove undefined entries
      formation: '4-4-2',
      totalBudget: getTotalBudget(),
      totalPoints: getTotalPoints()
    };

    console.log('Formation created:', formation);
    return formation;
  };

  const handleFinalConfirm = async () => {
    setIsLoading(true);
    
    try {
      // Create the final team formation
      const formation = create442Formation(selectedPlayers);
      
      console.log('Submitting team formation:', formation);
      
      // Submit team to backend
      const teamData = {
        players: selectedPlayers.map(p => p.id),
        formation: "4-4-2",
        budget: formation.totalBudget,
        points: formation.totalPoints
      };
      
      console.log('Team data being sent to backend:', teamData);
      
      // Call API to save team
      const response = await api.createTeam(teamData);
      
      if (response.success) {
        console.log('Team created successfully:', response);
        
        // Show success message
        if (response.message && response.message.includes('simulated')) {
          alert('Votre équipe a été créée avec succès! (Mode simulation - backend non disponible)');
        } else {
          alert('Votre équipe a été créée avec succès!');
        }
      
      navigate('/home');
      } else {
        throw new Error(response.message || 'Erreur lors de la création de l\'équipe');
      }
    } catch (error) {
      console.error('Error creating team:', error);
      alert('Erreur lors de la création de l\'équipe. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
      setShowConfirmModal(false);
    }
  };

  // Get all players and filter based on active filter
  const allPlayers = getFilteredPlayers();
  const filteredPlayers = allPlayers;

  const handleAddPlayer = (position) => {
    // Only show modal on mobile devices (screen width < 1024px)
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setActiveFilter(position);
      setShowPlayerModal(true);
    }
  };

  // Original Desktop Player Selection Panel
  const PlayerSelectionPanel = () => {
    // Add error boundary and null checks
    try {
      if (!filteredPlayers || !Array.isArray(filteredPlayers)) {
        return (
          <section className="relative px-4 py-6 w-full bg-[#141414] border border-[#1D1D1D]">
            <div className="text-center py-8">
              <div className="text-gray-400 text-sm" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                Chargement des joueurs...
              </div>
            </div>
          </section>
        );
      }

      return (
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
            const isLoading = loadingPosition === filter.key;
            const isLoaded = loadedPositions.has(filter.key);
            
            return (
              <button
                key={filter.key}
                onClick={() => handlePositionChange(filter.key)}
                disabled={isLoading}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#629F3F] text-white shadow-lg'
                    : isLoading
                    ? 'bg-[#0F0F0F] text-gray-500 cursor-not-allowed'
                    : 'bg-[#0F0F0F] text-gray-400 hover:bg-[#1D1D1D] hover:text-white'
                }`}
                style={{ fontFamily: 'Gotham SSM, sans-serif' }}
              >
                <span>{filter.label}</span>
                {isLoading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                {!isLoaded && !isLoading && (
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                )}
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
                  {teams && teams.map((team) => (
                    <option key={team._id} value={team.name}>
                      {team.name}
                    </option>
                  ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>

        {/* Players List */}
        <div className="space-y-2 max-h-80 overflow-y-auto" style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#629F3F #0F0F0F'
        }}>
          {loadingPosition === activeFilter ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#629F3F] mx-auto mb-4"></div>
              <div className="text-gray-400 text-sm" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                Chargement des joueurs...
              </div>
            </div>
          ) : filteredPlayers.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-sm" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                Aucun joueur trouvé
              </div>
            </div>
          ) : (
            filteredPlayers.map((player) => {
                  if (!player || !player.id) {
                    return null; // Skip invalid players
                  }
                  
              const isSelected = selectedPlayers.some(p => p.id === player.id);
              const positionCount = getSelectedCount(player.position);
                  const maxAllowed = positionRequirements[player.position]?.max || 5;
              const isMaxReached = positionCount >= maxAllowed && !isSelected;
              const isTeamLimitReached = isPlayerTeamAtLimit(player) && !isSelected;
              const isDisabled = isMaxReached || isTeamLimitReached;
              
              return (
                <div
                  key={player.id}
                  className={`p-4 border transition-all duration-200 cursor-pointer ${
                    isSelected 
                      ? 'bg-[#629F3F] border-[#629F3F] shadow-lg' 
                      : isDisabled
                      ? 'bg-[#0F0F0F] border-[#1D1D1D] opacity-50 cursor-not-allowed'
                      : 'bg-[#0F0F0F] border-[#2A3C2A] hover:border-[#629F3F] hover:bg-[#1D1D1D]'
                  }`}
                  onClick={() => !isDisabled && handlePlayerSelect(player)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                            src={player.clubLogo || '/ESS.png'}
                            alt={`${player.team || 'Unknown'} logo`}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-white'}`} style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                              {player.name || 'Unknown Player'}
                        </div>
                        <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-400'}`} style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                              {player.team || 'Unknown'} • {positionRequirements[player.position]?.label || player.position || 'Unknown'}
                              {isTeamLimitReached && !isSelected && (
                                <span className="text-red-400 ml-1">(Équipe complète)</span>
                              )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-[#629F3F]'}`} style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                              {player.price || 6} VP
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
                }).filter(Boolean) // Remove null entries
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
    } catch (error) {
      console.error('Error in PlayerSelectionPanel:', error);
      return (
        <section className="relative px-4 py-6 w-full bg-[#141414] border border-[#1D1D1D]">
          <div className="text-center py-8">
            <div className="text-red-400 text-sm" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
              Erreur lors du chargement des joueurs
            </div>
            <button
              onClick={() => {
                fetchTeams();
                loadPlayersByPosition('GK');
              }}
              className="mt-4 bg-[#629F3F] text-white px-4 py-2 rounded-lg hover:bg-[#4e7e32] transition-colors"
              style={{ fontFamily: 'Gotham SSM, sans-serif' }}
            >
              Réessayer
            </button>
          </div>
        </section>
      );
    }
  };

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

    // Use the same filtered players as desktop
    const mobileFilteredPlayers = filteredPlayers;

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
                const isLoading = loadingPosition === filter.key;
                const isLoaded = loadedPositions.has(filter.key);
                
                return (
                  <button
                    key={filter.key}
                    onClick={() => handlePositionChange(filter.key)}
                    disabled={isLoading}
                    className={`flex items-center justify-center space-x-1 px-2 py-2 text-xs font-medium transition-all rounded-md ${
                      isActive
                        ? 'bg-[#629F3F] text-white'
                        : isLoading
                        ? 'bg-[#1D1D1D] text-gray-500 cursor-not-allowed'
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
                    {isLoading && (
                      <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin ml-1"></div>
                    )}
                    {!isLoaded && !isLoading && (
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full ml-1"></div>
                    )}
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
                {teams && teams.map((team) => (
                  <option key={team._id} value={team.name}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Players List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {loadingPosition === activeFilter ? (
                <div className="flex items-center justify-center h-32 p-4">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#629F3F] mx-auto mb-2"></div>
                    <div className="text-gray-400 text-sm" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                      Chargement des joueurs...
                    </div>
                  </div>
                </div>
              ) : mobileFilteredPlayers.length === 0 ? (
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
                mobileFilteredPlayers.map((player) => {
                  if (!player || !player.id) {
                    return null; // Skip invalid players
                  }
                  
                  const isSelected = selectedPlayers.some(p => p.id === player.id);
                  const positionCount = getSelectedCount(player.position);
                  const maxAllowed = positionRequirements[player.position]?.max || 5;
                  const isMaxReached = positionCount >= maxAllowed && !isSelected;
                  const isTeamLimitReached = isPlayerTeamAtLimit(player) && !isSelected;
                  const isDisabled = isMaxReached || isTeamLimitReached;
                  
                  return (
                    <div
                      key={player.id}
                      className={`p-3 border transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-[#629F3F] border-[#629F3F]' 
                          : isDisabled
                          ? 'bg-[#1D1D1D] border-[#1D1D1D] opacity-50 cursor-not-allowed'
                          : 'bg-[#1D1D1D] border-[#2A3C2A] hover:border-[#629F3F]'
                      }`}
                      onClick={() => !isDisabled && handlePlayerSelect(player)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={player.clubLogo || '/ESS.png'}
                            alt={`${player.team || 'Unknown'} logo`}
                            className="w-6 h-6 rounded-full"
                          />
                          <div>
                            <div className={`font-medium text-sm ${isSelected ? 'text-white' : 'text-white'}`} style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                              {player.name || 'Unknown Player'}
                            </div>
                            <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-400'}`} style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                              {player.team || 'Unknown'}
                              {isTeamLimitReached && !isSelected && (
                                <span className="text-red-400 ml-1">(Équipe complète)</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-right">
                            <div className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-[#629F3F]'}`} style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                              {player.price || 6} VP
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
                }).filter(Boolean) // Remove null entries
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

    // Create formation for display
    const formation = create442Formation(selectedPlayers);

    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity duration-300 ease-out"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        role="dialog"
        aria-modal="true"
      >
        <div className="bg-[#181818] rounded-2xl shadow-2xl relative border border-[#629F3F] w-full max-w-lg mx-4 p-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-[#629F3F] rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="text-white" size={32} />
            </div>
            <h3 className="text-white text-xl font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              CONFIRMER L'ÉQUIPE
            </h3>
            
            {/* Formation Details */}
            <div className="bg-[#0F0F0F] rounded-lg p-4 space-y-3">
              <div className="text-[#629F3F] font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                FORMATION: 4-4-2
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-400 mb-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                    Titulaires (11)
                  </div>
                  <div className="text-white" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                    • 1 Gardien<br/>
                    • 4 Défenseurs<br/>
                    • 4 Milieux<br/>
                    • 2 Attaquants
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                    Remplaçants (4)
                  </div>
                  <div className="text-white" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                    • 1 Gardien<br/>
                    • 2 Défenseurs<br/>
                    • 1 Milieu<br/>
                    • 0 Attaquant
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                  Budget: {getTotalBudget()} VP
                </span>
                <span className="text-gray-400" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                  Points: {getTotalPoints()}
                </span>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
              Êtes-vous sûr de vouloir créer votre équipe avec cette formation ?
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

      {/* Loading State */}
      {loadingData && (
        <div className="w-full max-w-[1350px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#629F3F] mx-auto mb-4"></div>
              <p className="text-gray-400" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
                Chargement des données...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loadingData && (
        <div className="w-full max-w-[1350px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6">
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 text-center">
            <p className="text-red-400 mb-4" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
              {error}
            </p>
            <button
              onClick={() => {
                fetchTeams();
                loadPlayersByPosition('GK');
              }}
              className="bg-[#629F3F] text-white px-4 py-2 rounded-lg hover:bg-[#4e7e32] transition-colors"
              style={{ fontFamily: 'Gotham SSM, sans-serif' }}
            >
              Réessayer
            </button>
          </div>
        </div>
      )}

      {/* Main Content Container */}
      {!loadingData && !error && (
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
              onSelectPlayer={handlePlayerSelect}
              availablePlayers={players}
              activeFilter={activeFilter}
              onPositionChange={handlePositionChange}
              setShowPlayerModal={setShowPlayerModal}
              getPlayerOpponent={getPlayerOpponent}
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
      )}

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