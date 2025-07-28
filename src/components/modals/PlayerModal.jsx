import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ReplacementModal from './ReplacementModal';
import TransfertModal from './TransfertModal';


const PlayerModal = ({ player, onClose }) => {
  const [showReplacementModal, setShowReplacementModal] = useState(false);
  const [showTransfertModal, setShowTransfertModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null); // 'captain' or 'vice'
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  if (!player) return null;

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

  const borderStyle = { border: '0.5px solid #629F3F' };

  return (
    <>
      <div 
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 transition-opacity duration-300 ease-out player-modal-backdrop"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="player-modal-title"
      >
        <div
          ref={modalRef}
          className={`
            bg-[#181818] rounded-t-2xl sm:rounded-2xl shadow-2xl relative border border-[#629F3F]
            w-full max-w-full sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[1200px] xl:max-w-[1400px]
            max-h-[95vh] lg:max-h-[90vh] xl:max-h-[85vh]
            flex flex-col
            min-w-[280px]
            sm:overflow-hidden
            transition-all duration-300 ease-out
            player-modal-animate
            ${typeof window !== 'undefined' && window.innerWidth < 640 ? 'rounded-b-none' : ''}
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 pt-6 sm:pt-6 pb-3 sm:pb-4 border-b border-[#2a2a2a] bg-gradient-to-b from-[#2d4a1e] to-[#181818] rounded-t-2xl min-h-[70px] sm:min-h-[unset]" style={{minHeight:'70px'}}>
            <h2
              id="player-modal-title"
              className="text-white text-2xl sm:text-2xl lg:text-3xl font-extrabold uppercase tracking-tight break-words leading-tight"
              style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif', letterSpacing: '0.04em' }}
            >
              {player.name}
            </h2>
            <button
              ref={closeButtonRef}
              className="text-white bg-[#629F3F] rounded-full w-10 h-10 sm:w-10 sm:h-10 flex items-center justify-center font-bold text-2xl sm:text-xl z-20 shadow-lg hover:bg-[#4a7a2f] transition-colors duration-200 touch-manipulation ml-2 player-modal-close"
              onClick={onClose}
              aria-label="Fermer la modale"
            >
              ×
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
            {/* Club, Statut, ATK/VP & Jersey Image Row */}
            <div className="flex flex-row items-center gap-4 mb-4">
              {/* Info Section */}
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  {player.clubLogo && (
                    <img
                      src={player.clubLogo}
                      alt={`Logo de ${player.club}`}
                      className="w-6 h-6 object-contain flex-shrink-0"
                      loading="lazy"
                    />
                  )}
                  <span
                    className="text-white text-base lg:text-lg xl:text-xl font-medium"
                    style={{ fontFamily: 'Gotham SSM, Bebas Neue, sans-serif' }}
                  >
                    {player.club}
                  </span>
                </div>
                <div className="text-white text-xs lg:text-base xl:text-lg font-medium" style={{ fontFamily: 'Gotham SSM, Bebas Neue, sans-serif' }}>
                  Statut : <span className="font-bold text-[#629F3F]">{player.status}</span>
                </div>
                  <div>
                    <span
                      className="bg-[#181818] border border-[#629F3F] text-[#629F3F] font-bold text-xs lg:text-base xl:text-lg px-3 py-1 rounded uppercase inline-block"
                      style={{ fontFamily: 'Gotham SSM, Bebas Neue, sans-serif' }}
                    >
                      ATK | {player.stats?.value || 9} VP
                    </span>
                  </div>
               
              </div>
              {/* Jersey Image Section */}
              <div className="flex-shrink-0 self-center">
                <img
                  src={player.jerseySrc}
                  alt={`Maillot de ${player.name}`}
                  className="w-20 sm:w-24 lg:w-28 xl:w-32 object-contain drop-shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Info Cards Row: Selection, Age, Nationalité */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="rounded-lg p-3 flex flex-col items-start gap-1 player-modal-card" style={{ border: '0.5px solid #629F3F' }}>
                <span className="text-[#629F3F] text-xs font-bold uppercase leading-tight" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>
                  Sélection journée
                </span>
                <span className="text-white text-sm font-bold leading-tight" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>
                  {player.selection}
                </span>
              </div>
              <div className="rounded-lg p-3 flex flex-col items-start gap-1 player-modal-card" style={{ border: '0.5px solid #629F3F' }}>
                <span className="text-[#629F3F] text-xs font-bold uppercase leading-tight" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>
                  Age
                </span>
                <span className="text-white text-sm font-bold leading-tight" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>
                  {player.age} ans
                </span>
              </div>
              <div className="rounded-lg p-3 flex flex-col items-start gap-1 player-modal-card" style={{ border: '0.5px solid #629F3F' }}>
                <span className="text-[#629F3F] text-xs font-bold uppercase leading-tight" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>
                  Nationalité
                </span>
                <span className="text-white text-sm font-bold leading-tight" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>
                  {player.nationality}
                </span>
              </div>
            </div>

            {/* Match Info */}
            <div className="rounded-lg overflow-hidden" style={borderStyle}>
              <div className="flex items-center justify-between bg-[#629F3F] px-4 lg:px-6 py-2 lg:py-3">
                <span className="text-white font-bold uppercase text-xs lg:text-sm" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>
                  Journée 1
                </span>
                <span className="text-white font-bold text-xs lg:text-sm px-3 py-1 rounded bg-[#2d4a1e]" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>
                  {player.upcoming ? 'A VENIR' : 'TERMINÉ'}
                </span>
              </div>
              <div className="flex items-center justify-between bg-[#181818] px-4 lg:px-6 py-3 lg:py-4 gap-4">
                <div className="flex items-center gap-2 lg:gap-3 flex-1 min-w-0">
                  {player.opponentLogo && (
                    <img 
                      src={player.opponentLogo} 
                      alt={`Logo de ${player.opponent}`} 
                      className="w-6 h-6 lg:w-8 lg:h-8 object-contain flex-shrink-0" 
                      loading="lazy"
                    />
                  )}
                  <span className="text-white text-sm lg:text-base font-bold truncate" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>
                    {player.opponent}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center min-w-[80px] lg:min-w-[120px]">
                  <span className="text-white text-lg lg:text-2xl xl:text-3xl font-extrabold" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>
                    {player.name === 'ADEM MHIRI' ? '5 - 0' : (player.score ?? '-- : --')}
                  </span>
                  <span className="text-[#629F3F] font-bold text-xs lg:text-sm">VS</span>
                </div>
                <div className="flex items-center gap-2 lg:gap-3 flex-1 min-w-0 justify-end">
                  {player.clubLogo && (
                    <img 
                      src={player.clubLogo} 
                      alt={`Logo de ${player.club}`} 
                      className="w-6 h-6 lg:w-8 lg:h-8 object-contain flex-shrink-0" 
                      loading="lazy"
                    />
                  )}
                  <span className="text-white text-sm lg:text-base font-bold truncate" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>
                    {player.club}
                  </span>
                </div>
              </div>
            </div>

            {/* Statistics for ADEM MHIRI */}
            {player.name === 'ADEM MHIRI' && (
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                <div className="bg-[#181818] rounded-lg p-4 lg:p-6 flex flex-col items-center border border-[#629F3F] lg:flex-shrink-0">
                  <span className="text-[#629F3F] font-bold text-xl lg:text-2xl xl:text-3xl" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif', letterSpacing: '0.04em'}}>
                    15 PTS
                  </span>
                </div>
                <div className="flex-1 overflow-x-auto">
                  <table className="w-full text-sm lg:text-base border-separate border-spacing-y-1">
                    <thead>
                      <tr className="bg-[#629F3F] text-white">
                        <th className="px-4 py-2 lg:py-3 text-left rounded-tl-lg font-bold" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>
                          Statistiques
                        </th>
                        <th className="px-4 py-2 lg:py-3 text-center font-bold" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>
                          Valeur
                        </th>
                        <th className="px-4 py-2 lg:py-3 text-center rounded-tr-lg font-bold" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>
                          Pts
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-[#181818] text-white">
                      {[
                        { stat: 'Minutes jouées', value: '90', points: '+2' },
                        { stat: 'Buts marqués', value: '2', points: '+10' },
                        { stat: 'Passes décisives', value: '1', points: '+5' },
                        { stat: 'Cartons jaunes', value: '0', points: '0' }
                      ].map((item, index) => (
                        <tr key={index} className="border-b border-[#2a2a2a]">
                          <td className="px-4 py-2" style={{fontFamily:'Gotham SSM, sans-serif'}}>
                            {item.stat}
                          </td>
                          <td className="px-4 py-2 text-center font-bold" style={{fontFamily:'Bebas Neue, sans-serif'}}>
                            {item.value}
                          </td>
                          <td className="px-4 py-2 text-center font-bold text-[#629F3F]" style={{fontFamily:'Bebas Neue, sans-serif'}}>
                            {item.points}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}



            {/* Actions Section  */}
            {player.name !== 'ADEM MHIRI' && (
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                {/* Role de joueur */}
                <div className="flex-1">
                  <div className="text-white font-bold uppercase text-sm lg:text-base mb-3 lg:mb-4 text-left" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif', letterSpacing:'0.04em'}}>
                    ROLE DE JOUEUR
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      className={`flex-1 min-w-[140px] min-h-[52px] border font-bold text-base xl:text-lg py-3 lg:py-4 rounded-lg flex items-center justify-center gap-3 uppercase transition-colors duration-200 touch-manipulation relative
                        ${selectedRole === 'captain' ? 'bg-[#629F3F] text-white border-[#629F3F]' : 'bg-[#181818] text-white border-[#629F3F] hover:bg-[#232323]'}
                      `}
                      aria-pressed={selectedRole === 'captain'}
                      onClick={() => setSelectedRole(selectedRole === 'captain' ? null : 'captain')}
                    >
                      <span className="truncate">Capitaine</span>
              
                    </button>
                    <button
                      type="button"
                      className={`flex-1 min-w-[140px] min-h-[52px] border font-bold text-base xl:text-lg py-3 lg:py-4 rounded-lg flex items-center justify-center gap-3 uppercase transition-colors duration-200 touch-manipulation relative
                        ${selectedRole === 'vice' ? 'bg-[#629F3F] text-white border-[#629F3F]' : 'bg-[#181818] text-white border-[#629F3F] hover:bg-[#232323]'}
                      `}
                      aria-pressed={selectedRole === 'vice'}
                      onClick={() => setSelectedRole(selectedRole === 'vice' ? null : 'vice')}
                    >
                     
                      <span className="truncate">Vice - Capitaine</span>
                     
                    </button>
                  </div>
                </div>
                {/* Actions */}
                <div className="flex-1">
                  <div className="text-white font-bold uppercase text-sm lg:text-base mb-3 lg:mb-4 text-left" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif', letterSpacing:'0.04em'}}>
                    ACTIONS
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      className="flex-1 min-w-[140px] min-h-[52px] border border-[#629F3F] text-white font-bold text-base xl:text-lg py-3 lg:py-4 rounded-lg flex items-center justify-center gap-3 uppercase cursor-pointer hover:bg-[#2a2a2a] transition-colors duration-200 touch-manipulation"
                      style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif', borderWidth: '0.5px'}} 
                      onClick={() => { setShowReplacementModal(true); setShowTransfertModal(false); }}
                    >
                      <img 
                        src="/remplacement.svg" 
                        alt="" 
                        className="w-7 h-7 flex-shrink-0" 
                        loading="lazy"
                      />
                      <span className="truncate">Remplacer</span>
                    </button>
                    <button className="flex-1 min-w-[140px] min-h-[52px] border border-[#629F3F] text-white font-bold text-base xl:text-lg py-3 lg:py-4 rounded-lg flex items-center justify-center gap-3 uppercase hover:bg-[#2a2a2a] transition-colors duration-200 touch-manipulation" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif', borderWidth: '0.5px'}} onClick={() => { setShowTransfertModal(true); setShowReplacementModal(false); }}>
                      <img 
                        src="/transfert.svg" 
                        alt="" 
                        className="w-7 h-7 flex-shrink-0" 
                        loading="lazy"
                      />
                      <span className="truncate">Transfert</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {showReplacementModal && (
        <ReplacementModal
          open={showReplacementModal}
          onClose={() => { 
            setShowReplacementModal(false); 
          }}
          player={player}
        />
      )}
      {showTransfertModal && (
        <TransfertModal
          open={showTransfertModal}
          onClose={() => setShowTransfertModal(false)}
        />
      )}
    </>
  );
};

PlayerModal.propTypes = {
  player: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default PlayerModal;

