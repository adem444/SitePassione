import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, Calendar, X, Settings, Users, Crown, Copy, UserMinus } from 'lucide-react';

const LeaguesModal = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState('ligues');
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedJournee, setSelectedJournee] = useState('all');
  const [showJourneeModal, setShowJourneeModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [privateCode, setPrivateCode] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [createFormData, setCreateFormData] = useState({ name: '' });
  const [isPrivateLeagueCreated, setIsPrivateLeagueCreated] = useState(false);
  const [showLeagueSettings, setShowLeagueSettings] = useState(false);
  const [showRoomCode, setShowRoomCode] = useState(false);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Mock data - only private leagues
  const myLeagues = [
    {
      id: 1,
      name: 'Ligue des Champions',
      manager: 'Ahmed Ben Ali',
      type: 'private',
      myRank: 3,
      isAdmin: false,
      roomCode: 'ABC123',
      members: [
        { id: 1, name: 'Mohamed Trabelsi', rank: 1, isAdmin: true },
        { id: 2, name: 'Ahmed Ben Ali', rank: 3, isAdmin: false },
        { id: 3, name: 'Sami Khelifi', rank: 2, isAdmin: false },
        { id: 4, name: 'Youssef Mansouri', rank: 4, isAdmin: false },
        { id: 5, name: 'Karim Zidane', rank: 5, isAdmin: false }
      ]
    },
    {
      id: 2,
      name: 'Ligue Amicale',
      manager: 'Mohamed Trabelsi',
      type: 'private',
      myRank: 1,
      isAdmin: true,
      roomCode: 'XYZ789',
      members: [
        { id: 1, name: 'Mohamed Trabelsi', rank: 1, isAdmin: true },
        { id: 2, name: 'Ahmed Ben Ali', rank: 2, isAdmin: false },
        { id: 3, name: 'Sami Khelifi', rank: 3, isAdmin: false }
      ]
    }
  ];

  const leagueTable = [
    { place: 1, name: 'Mohamed Trabelsi', journeePts: 45, totalPts: 312 },
    { place: 2, name: 'Ahmed Ben Ali', journeePts: 38, totalPts: 298 },
    { place: 3, name: 'Sami Khelifi', journeePts: 42, totalPts: 245 },
    { place: 4, name: 'Youssef Mansouri', journeePts: 35, totalPts: 234 },
    { place: 5, name: 'Karim Zidane', journeePts: 28, totalPts: 198 }
  ];

  const gameweeks = Array.from({ length: 30 }, (_, i) => i + 1);

  // Focus management and keyboard navigation
  useEffect(() => {
    if (!open) return;

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
  }, [open, onClose]);

  // Auto-hide error toast
  useEffect(() => {
    if (showErrorToast) {
      const timer = setTimeout(() => setShowErrorToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showErrorToast]);

  // Close journee modal on Escape
  useEffect(() => {
    if (!showJourneeModal) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setShowJourneeModal(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [showJourneeModal]);

  if (!open) return null;

  const borderStyle = { border: '0.5px solid #629F3F' };

  const handleCreateLeague = () => {
    if (!createFormData.name.trim()) {
      showError('Veuillez entrer un nom pour votre ligue');
      return;
    }

    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setPrivateCode(code);
    setSuccessMessage(`Ta ligue privée a été créée. Code d'invitation: ${code}`);
    setIsPrivateLeagueCreated(true);
    
    setShowCreateModal(false);
    setShowSuccessModal(true);
    setCreateFormData({ name: '' });
  };

  const handleJoinPrivateLeague = () => {
    if (!privateCode.trim()) {
      showError('Veuillez entrer un code d\'invitation');
      return;
    }

    // Simulate validation
    if (privateCode.length !== 6) {
      showError('Le code d\'invitation doit contenir 6 caractères');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      if (privateCode === 'ABC123' || privateCode === 'XYZ789') {
        setSuccessMessage('Vous avez rejoint la ligue avec succès!');
        setShowJoinModal(false);
        setShowSuccessModal(true);
        setPrivateCode('');
        setIsPrivateLeagueCreated(false);
      } else {
        showError('Code d\'invitation invalide');
      }
    }, 1000);
  };

  const showError = (message) => {
    setErrorMessage(message);
    setShowErrorToast(true);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setSuccessMessage('Code copié dans le presse-papiers!');
    setShowSuccessModal(true);
  };

  const copyToClipboardSilent = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleLeaveLeague = (leagueId) => {
    setConfirmAction({
      type: 'leave',
      leagueId,
      message: 'Êtes-vous sûr de vouloir quitter cette ligue?',
      confirmText: 'Quitter la ligue',
      cancelText: 'Annuler'
    });
    setShowConfirmModal(true);
  };

  const handleRemoveMember = (memberId, memberName) => {
    setConfirmAction({
      type: 'remove',
      memberId,
      memberName,
      message: `Êtes-vous sûr de vouloir retirer ${memberName} de la ligue?`,
      confirmText: 'Retirer',
      cancelText: 'Annuler'
    });
    setShowConfirmModal(true);
  };

  const handleCloseLeague = (leagueId, leagueName) => {
    setConfirmAction({
      type: 'close',
      leagueId,
      leagueName,
      message: `Êtes-vous sûr de vouloir fermer la ligue "${leagueName}"? Cette action est irréversible.`,
      confirmText: 'Fermer la ligue',
      cancelText: 'Annuler'
    });
    setShowConfirmModal(true);
  };

  const confirmActionHandler = () => {
    if (confirmAction.type === 'leave') {
      setSuccessMessage('Vous avez quitté la ligue avec succès');
      setShowSuccessModal(true);
      setSelectedLeague(null);
    } else if (confirmAction.type === 'remove') {
      setSuccessMessage(`${confirmAction.memberName} a été retiré de la ligue`);
      setShowSuccessModal(true);
      setShowLeagueSettings(false);
    } else if (confirmAction.type === 'close') {
      setSuccessMessage('La ligue a été fermée avec succès');
      setShowSuccessModal(true);
      setSelectedLeague(null);
      setShowLeagueSettings(false);
    }
    setShowConfirmModal(false);
    setConfirmAction(null);
  };

  const getCurrentLeague = () => {
    return myLeagues.find(league => league.id === selectedLeague?.id);
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 transition-opacity duration-300 ease-out"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="leagues-modal-title"
      >
        <div
          ref={modalRef}
          className={`
            bg-[#181818] rounded-t-2xl sm:rounded-2xl shadow-2xl relative border border-[#629F3F]
            w-full max-w-full sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[900px] xl:max-w-[1000px]
            max-h-[95vh] lg:max-h-[90vh] xl:max-h-[85vh]
            flex flex-col
            min-w-[280px]
            sm:overflow-hidden
            transition-all duration-300 ease-out
            ${typeof window !== 'undefined' && window.innerWidth < 640 ? 'rounded-b-none' : ''}
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 pt-6 sm:pt-6 pb-3 sm:pb-4 border-b border-[#2a2a2a] bg-gradient-to-b from-[#2d4a1e] to-[#181818] rounded-t-2xl min-h-[70px] sm:min-h-[unset]" style={{minHeight:'70px'}}>
            <h2
              id="leagues-modal-title"
              className="text-white text-2xl sm:text-2xl lg:text-3xl font-extrabold uppercase tracking-tight break-words leading-tight"
              style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif', letterSpacing: '0.04em' }}
            >
              LIGUES ENTRE AMIS
            </h2>
            <button
              ref={closeButtonRef}
              className="text-white bg-[#629F3F] rounded-full w-10 h-10 sm:w-10 sm:h-10 flex items-center justify-center font-bold text-2xl sm:text-xl z-20 shadow-lg hover:bg-[#4a7a2f] transition-colors duration-200 touch-manipulation ml-2"
              onClick={onClose}
              aria-label="Fermer la modale"
            >
              ×
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#2a2a2a] bg-[#181818]">
            <button
              className={`flex-1 py-4 px-6 text-center font-bold text-sm lg:text-base uppercase transition-colors duration-200 ${
                activeTab === 'ligues' 
                  ? 'text-[#629F3F] border-b-2 border-[#629F3F]' 
                  : 'text-white hover:text-[#629F3F]'
              }`}
              style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif' }}
              onClick={() => { setActiveTab('ligues'); setSelectedLeague(null); setShowLeagueSettings(false); }}
            >
              Mes Ligues
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-bold text-sm lg:text-base uppercase transition-colors duration-200 ${
                activeTab === 'actions' 
                  ? 'text-[#629F3F] border-b-2 border-[#629F3F]' 
                  : 'text-white hover:text-[#629F3F]'
              }`}
              style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif' }}
              onClick={() => setActiveTab('actions')}
            >
              Actions
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            {activeTab === 'ligues' && (
              <div className="space-y-4">
                {!selectedLeague ? (
                  <>
                    <div className="text-white text-lg font-bold mb-4" style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif' }}>
                      Mes Ligues Privées
                    </div>
                    
                    {/* League Cards */}
                    <div className="space-y-3">
                      {myLeagues.map((league) => (
                        <div 
                          key={league.id} 
                          className="rounded-lg p-4 cursor-pointer transition-all duration-200 hover:bg-[#232323] hover:scale-[1.02]" 
                          style={borderStyle}
                          onClick={() => setSelectedLeague(league)}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif' }}>
                                {league.name}
                              </h3>
                              <div className="space-y-1">
                                <p className="text-gray-300 text-sm">
                                  Manager: <span className="text-[#629F3F] font-bold">{league.manager}</span>
                                </p>
                                <p className="text-[#629F3F] font-bold text-sm">
                                  Mon Classement: {league.myRank}ème
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              {league.isAdmin ? (
                                <span className="text-[#629F3F] text-xs font-bold px-3 py-1 rounded-full bg-[#629F3F]/20 border border-[#629F3F] shadow-sm">
                                  ADMIN
                                </span>
                              ) : (
                                <span className="text-gray-400 text-xs font-bold px-3 py-1 rounded-full bg-gray-800/50 border border-gray-600">
                                  MEMBRE
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex items-center justify-between pt-3 border-t border-[#2a2a2a]">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400 text-xs">
                                {league.members.length} membres
                              </span>
                            </div>
                            {!league.isAdmin && (
                              <button 
                                className="text-red-400 hover:text-red-300 text-sm font-bold transition-colors duration-200 px-3 py-1 rounded hover:bg-red-900/20"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleLeaveLeague(league.id);
                                }}
                              >
                                Quitter
                              </button>
                            )}
                            {league.isAdmin && (
                              <span className="text-[#629F3F] text-xs font-bold px-3 py-1 rounded bg-[#629F3F]/10 border border-[#629F3F]/30">
                                Propriétaire
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    {/* League Details View */}
                    <div className="flex items-center justify-between mb-4">
                      <button 
                        onClick={() => { setSelectedLeague(null); setShowLeagueSettings(false); }}
                        className="text-[#629F3F] hover:text-[#4a7a2f] font-bold flex items-center gap-2 transition-colors duration-200"
                      >
                        ← Retour
                      </button>
                      <div className="flex items-center gap-3">
                        <h3 className="text-white font-bold text-xl" style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif' }}>
                          {selectedLeague.name}
                        </h3>
                        {getCurrentLeague()?.isAdmin && (
                          <button
                            onClick={() => setShowLeagueSettings(!showLeagueSettings)}
                            className="text-[#629F3F] hover:text-[#4a7a2f] p-2 rounded-full hover:bg-[#629F3F]/10 transition-colors duration-200"
                            title="Paramètres de la ligue"
                          >
                            <Settings size={20} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Admin Settings Panel */}
                    {showLeagueSettings && getCurrentLeague()?.isAdmin && (
                      <div className="mb-6 p-4 bg-[#232323] rounded-lg border border-[#629F3F]">
                        <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                          <Crown size={20} className="text-[#629F3F]" />
                          Paramètres Admin
                        </h4>
                        
                        {/* Room Code Section */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white font-bold">Code d'accès:</span>
                            <button
                              onClick={() => setShowRoomCode(!showRoomCode)}
                              className="text-[#629F3F] hover:text-[#4a7a2f] text-sm font-bold transition-colors duration-200"
                            >
                              {showRoomCode ? 'Masquer' : 'Afficher'}
                            </button>
                          </div>
                          {showRoomCode && (
                            <div className="bg-[#181818] border border-[#629F3F] rounded-lg p-3 flex items-center justify-between">
                              <span className="text-[#629F3F] font-bold text-lg tracking-wider font-mono">
                                {getCurrentLeague()?.roomCode}
                              </span>
                              <button
                                onClick={() => copyToClipboardSilent(getCurrentLeague()?.roomCode)}
                                className="text-[#629F3F] hover:text-[#4a7a2f] transition-colors duration-200"
                                title="Copier le code"
                              >
                                <Copy size={18} />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Members Management */}
                        <div className="mb-4">
                          <h5 className="text-white font-bold mb-3 flex items-center gap-2">
                            <Users size={18} />
                            Membres ({getCurrentLeague()?.members.length})
                          </h5>
                          <div className="space-y-2 max-h-40 overflow-y-auto">
                            {getCurrentLeague()?.members.map((member) => (
                              <div key={member.id} className="flex items-center justify-between p-2 bg-[#181818] rounded">
                                <div className="flex items-center gap-2">
                                  <span className="text-white font-bold">{member.name}</span>
                                  {member.isAdmin && (
                                    <span className="text-[#629F3F] text-xs font-bold px-2 py-1 rounded bg-[#629F3F]/20">
                                      ADMIN
                                    </span>
                                  )}
                                  <span className="text-gray-400 text-sm">#{member.rank}</span>
                                </div>
                                {!member.isAdmin && (
                                  <button
                                    onClick={() => handleRemoveMember(member.id, member.name)}
                                    className="text-red-400 hover:text-red-300 transition-colors duration-200"
                                    title="Retirer le membre"
                                  >
                                    <UserMinus size={16} />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Close League */}
                        <div className="pt-3 border-t border-[#2a2a2a]">
                          <button
                            onClick={() => handleCloseLeague(selectedLeague.id, selectedLeague.name)}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                          >
                            Fermer la Ligue
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Filter by Journée */}
                    <div className="mb-4">
                      <label className="text-white text-sm font-bold mb-2 block">Filtrer par Journée:</label>
                      <button
                        className="flex items-center space-x-2 bg-[#232323] text-white border border-[#629F3F] rounded px-3 py-2 w-full sm:w-auto focus:outline-none focus:border-[#4a7a2f] transition-colors duration-200"
                        onClick={() => setShowJourneeModal(true)}
                      >
                        <Calendar size={16} className="text-gray-400" />
                        <span className="font-bold">
                          {selectedJournee === 'all' ? 'Toutes les journées' : `${selectedJournee}ère Journée`}
                        </span>
                        <ChevronDown size={16} className="text-gray-400" />
                      </button>
                    </div>

                    {/* League Table */}
                    <div className="rounded-lg overflow-hidden" style={borderStyle}>
                      <div className="bg-[#629F3F] px-4 py-3">
                        <h4 className="text-white font-bold uppercase text-sm" style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif' }}>
                          Classement
                        </h4>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-[#232323]">
                            <tr className="text-white">
                              <th className="px-4 py-3 text-left font-bold">Place</th>
                              <th className="px-4 py-3 text-left font-bold">Nom de l'utilisateur</th>
                              <th className="px-4 py-3 text-center font-bold">Pts Journée</th>
                              <th className="px-4 py-3 text-center font-bold">Total Pts</th>
                            </tr>
                          </thead>
                          <tbody className="bg-[#181818] text-white">
                            {leagueTable.map((row, index) => (
                              <tr key={index} className="border-b border-[#2a2a2a] hover:bg-[#232323] transition-colors duration-200">
                                <td className="px-4 py-3 font-bold text-[#629F3F]">{row.place}</td>
                                <td className="px-4 py-3">{row.name}</td>
                                <td className="px-4 py-3 text-center font-bold">{row.journeePts}</td>
                                <td className="px-4 py-3 text-center font-bold text-[#629F3F]">{row.totalPts}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === 'actions' && (
              <div className="space-y-6">
                <div className="text-white text-lg font-bold mb-4" style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif' }}>
                  Actions Disponibles
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Create League Button */}
                  <button 
                    className="rounded-lg p-6 text-left transition-all duration-200 hover:bg-[#232323] border-2 border-[#629F3F] hover:border-[#4a7a2f] hover:scale-[1.02]" 
                    onClick={() => setShowCreateModal(true)}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 bg-[#629F3F] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">+</span>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg" style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif' }}>
                          Créer une Ligue
                        </h3>
                        <p className="text-gray-300 text-sm">
                          Créez votre propre ligue privée et invitez vos amis
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Join League Button */}
                  <button 
                    className="rounded-lg p-6 text-left transition-all duration-200 hover:bg-[#232323] border-2 border-[#629F3F] hover:border-[#4a7a2f] hover:scale-[1.02]"
                    onClick={() => setShowJoinModal(true)}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 bg-[#629F3F] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">🔍</span>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg" style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif' }}>
                          Rejoindre une Ligue
                        </h3>
                        <p className="text-gray-300 text-sm">
                          Rejoignez une ligue privée avec un code d'invitation
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Journee Selection Modal */}
      {showJourneeModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-[#181818] rounded-2xl shadow-2xl w-full max-w-md mx-2 p-0 relative animate-fade-in-up" style={{ boxShadow: '0 8px 32px 0 rgba(98,159,63,0.18)' }}>
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#222]">
              <h2 className="text-white font-heading text-2xl font-bold tracking-wide" style={{ color: '#629F3F' }}>
                Sélectionner la Journée
              </h2>
              <button
                className="text-gray-400 hover:text-white transition-colors p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-[#629F3F]"
                onClick={() => setShowJourneeModal(false)}
                aria-label="Fermer"
              >
                <X size={24} />
              </button>
            </div>
            {/* Modal Content with radio buttons */}
            <form className="max-h-96 overflow-y-auto py-2 pb-20 custom-scrollbar" onSubmit={e => { e.preventDefault(); setShowJourneeModal(false); }}>
              <fieldset>
                <legend className="sr-only">Choisir la journée</legend>
                <label
                  className={`flex items-center px-6 py-3 cursor-pointer font-heading text-lg transition-all duration-100 rounded-lg mb-1 select-none ${selectedJournee === 'all' ? 'bg-[#629F3F] text-white font-extrabold shadow' : 'text-white hover:bg-[#629F3F]/80 hover:text-white'} focus-within:bg-[#629F3F] focus-within:text-white`}
                  tabIndex={0}
                >
                  <span className="relative flex items-center mr-3">
                    <input
                      type="radio"
                      name="journee"
                      value="all"
                      checked={selectedJournee === 'all'}
                      onChange={() => setSelectedJournee('all')}
                      className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:border-[#629F3F] checked:bg-[#629F3F] focus:outline-none focus:ring-2 focus:ring-[#629F3F] transition-all"
                      style={{ minWidth: 20, minHeight: 20 }}
                      aria-checked={selectedJournee === 'all'}
                      aria-label="Toutes les journées"
                    />
                    <span
                      className={`absolute left-0 top-0 w-5 h-5 rounded-full border-2 pointer-events-none ${selectedJournee === 'all' ? 'border-[#629F3F] bg-[#629F3F]' : 'border-gray-400 bg-transparent'} flex items-center justify-center`}
                      aria-hidden="true"
                    >
                      {selectedJournee === 'all' && (
                        <span className="block w-2.5 h-2.5 rounded-full bg-white" />
                      )}
                    </span>
                  </span>
                  Toutes les journées
                </label>
                {gameweeks.map((num) => (
                  <label
                    key={num}
                    className={`flex items-center px-6 py-3 cursor-pointer font-heading text-lg transition-all duration-100 rounded-lg mb-1 last:mb-0 select-none ${selectedJournee === num ? 'bg-[#629F3F] text-white font-extrabold shadow' : 'text-white hover:bg-[#629F3F]/80 hover:text-white'} focus-within:bg-[#629F3F] focus-within:text-white`}
                    tabIndex={0}
                  >
                    <span className="relative flex items-center mr-3">
                      <input
                        type="radio"
                        name="journee"
                        value={num}
                        checked={selectedJournee === num}
                        onChange={() => setSelectedJournee(num)}
                        className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:border-[#629F3F] checked:bg-[#629F3F] focus:outline-none focus:ring-2 focus:ring-[#629F3F] transition-all"
                        style={{ minWidth: 20, minHeight: 20 }}
                        aria-checked={selectedJournee === num}
                        aria-label={`${num}ère Journée`}
                      />
                      <span
                        className={`absolute left-0 top-0 w-5 h-5 rounded-full border-2 pointer-events-none ${selectedJournee === num ? 'border-[#629F3F] bg-[#629F3F]' : 'border-gray-400 bg-transparent'} flex items-center justify-center`}
                        aria-hidden="true"
                      >
                        {selectedJournee === num && (
                          <span className="block w-2.5 h-2.5 rounded-full bg-white" />
                        )}
                      </span>
                    </span>
                    {`${num}ère Journée`}
                  </label>
                ))}
              </fieldset>
            </form>
            {/* Fixed confirm button */}
            <div className="fixed left-1/2 -translate-x-1/2 bottom-8 w-full max-w-md px-6 z-50 pointer-events-none">
              <button
                type="submit"
                className="bg-[#629F3F] hover:bg-[#4e7e32] text-white font-bold uppercase px-8 py-2 rounded-full text-base transition-all w-full pointer-events-auto"
                style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}
                onClick={() => setShowJourneeModal(false)}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create League Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-60 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 transition-opacity duration-300 ease-out">
          <div className="bg-[#181818] rounded-t-2xl sm:rounded-2xl shadow-2xl border border-[#629F3F] w-full max-w-full sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-md xl:max-w-md mx-2 sm:mx-0">
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-4 border-b border-[#2a2a2a]">
              <h3 className="text-white font-bold text-lg sm:text-xl" style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif' }}>
                Créer une Ligue Privée
              </h3>
              <button
                className="text-white bg-[#629F3F] rounded-full w-8 h-8 flex items-center justify-center font-bold hover:bg-[#4a7a2f] transition-colors duration-200"
                onClick={() => setShowCreateModal(false)}
              >
                ×
              </button>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="text-white text-sm font-bold mb-2 block">Nom de la Ligue</label>
                <input 
                  type="text" 
                  value={createFormData.name}
                  onChange={(e) => setCreateFormData({...createFormData, name: e.target.value})}
                  className="w-full bg-[#232323] text-white border border-[#629F3F] rounded px-3 py-2 focus:outline-none focus:border-[#4a7a2f] transition-colors duration-200"
                  placeholder="Ex: Ligue des Champions"
                />
              </div>
              <div className="bg-[#232323] border border-[#629F3F] rounded-lg p-3">
                <p className="text-gray-300 text-sm">
                  <span className="text-[#629F3F] font-bold">Note:</span> Toutes les ligues sont privées. 
                  Vous recevrez un code d'invitation pour partager avec vos amis.
                </p>
              </div>
              <button 
                className="w-full bg-[#629F3F] hover:bg-[#4a7a2f] text-white font-bold py-3 rounded-lg transition-colors duration-200"
                onClick={handleCreateLeague}
              >
                Créer la Ligue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Join League Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 z-60 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 transition-opacity duration-300 ease-out">
          <div className="bg-[#181818] rounded-t-2xl sm:rounded-2xl shadow-2xl border border-[#629F3F] w-full max-w-full sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-md xl:max-w-md mx-2 sm:mx-0">
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-4 border-b border-[#2a2a2a]">
              <h3 className="text-white font-bold text-lg sm:text-xl" style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif' }}>
                Rejoindre une Ligue Privée
              </h3>
              <button
                className="text-white bg-[#629F3F] rounded-full w-8 h-8 flex items-center justify-center font-bold hover:bg-[#4a7a2f] transition-colors duration-200"
                onClick={() => setShowJoinModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-white text-sm font-bold mb-2 block">Code d'invitation</label>
                  <div className="flex flex-col gap-2">
                    <input 
                      type="text" 
                      value={privateCode}
                      onChange={(e) => setPrivateCode(e.target.value.toUpperCase())}
                      className="w-full bg-[#232323] text-white border border-[#629F3F] rounded px-3 py-2 focus:outline-none focus:border-[#4a7a2f] transition-colors duration-200 font-mono text-center tracking-wider text-lg"
                      placeholder="ABC123"
                      maxLength={6}
                    />
                    <button 
                      className="w-full bg-[#629F3F] hover:bg-[#4a7a2f] text-white font-bold px-6 py-2 rounded transition-colors duration-200"
                      onClick={handleJoinPrivateLeague}
                    >
                      Rejoindre
                    </button>
                  </div>
                  <p className="text-gray-400 text-xs mt-2">
                    Le code doit contenir exactement 6 caractères
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-70 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 transition-opacity duration-300 ease-out">
          <div className="bg-[#181818] rounded-t-2xl sm:rounded-2xl shadow-2xl border border-[#629F3F] w-full max-w-full sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-md xl:max-w-md mx-2 sm:mx-0">
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-4 border-b border-[#2a2a2a]">
              <h3 className="text-white font-bold text-lg sm:text-xl" style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif' }}>
                ✅ Succès
              </h3>
              <button
                className="text-white bg-[#629F3F] rounded-full w-8 h-8 flex items-center justify-center font-bold hover:bg-[#4a7a2f] transition-colors duration-200"
                onClick={() => setShowSuccessModal(false)}
              >
                ×
              </button>
            </div>
            <div className="p-4 sm:p-6 text-center">
              <div className="w-16 h-16 bg-[#629F3F] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">✅</span>
              </div>
              <p className="text-gray-300 mb-4">{successMessage}</p>
              {isPrivateLeagueCreated && privateCode && (
                <div className="bg-[#232323] border border-[#629F3F] rounded-lg p-4 mb-4">
                  <p className="text-white text-sm mb-2">Code d'accès:</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-[#629F3F] font-bold text-2xl tracking-wider font-mono">{privateCode}</span>
                    <button
                      onClick={() => copyToClipboard(privateCode)}
                      className="text-[#629F3F] hover:text-[#4a7a2f] font-bold text-xl transition-colors duration-200"
                    >
                      📋
                    </button>
                  </div>
                </div>
              )}
              <button 
                className="w-full bg-[#629F3F] hover:bg-[#4a7a2f] text-white font-bold py-3 rounded-lg transition-colors duration-200"
                onClick={() => setShowSuccessModal(false)}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-80 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 transition-opacity duration-300 ease-out">
          <div className="bg-[#181818] rounded-t-2xl sm:rounded-2xl shadow-2xl border border-[#629F3F] w-full max-w-full sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-md xl:max-w-md mx-2 sm:mx-0">
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-4 border-b border-[#2a2a2a]">
              <h3 className="text-white font-bold text-lg sm:text-xl" style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif' }}>
                ⚠️ Confirmation
              </h3>
              <button
                className="text-white bg-[#629F3F] rounded-full w-8 h-8 flex items-center justify-center font-bold hover:bg-[#4a7a2f] transition-colors duration-200"
                onClick={() => setShowConfirmModal(false)}
              >
                ×
              </button>
            </div>
            <div className="p-4 sm:p-6 text-center">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">⚠️</span>
              </div>
              <p className="text-gray-300 mb-6">{confirmAction?.message}</p>
              <div className="flex gap-3">
                <button 
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition-colors duration-200"
                  onClick={() => setShowConfirmModal(false)}
                >
                  {confirmAction?.cancelText || 'Annuler'}
                </button>
                <button 
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors duration-200"
                  onClick={confirmActionHandler}
                >
                  {confirmAction?.confirmText || 'Confirmer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Toast */}
      {showErrorToast && (
        <div className="fixed top-4 right-4 z-90 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg border border-red-500 animate-fade-in-up">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            <span className="font-bold">{errorMessage}</span>
          </div>
        </div>
      )}
    </>
  );
};

LeaguesModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LeaguesModal; 