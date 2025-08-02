import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ReplacementModal from './ReplacementModal';
import TransfertModal from './TransfertModal';
import api from '../../utils/api';


const PlayerModal = ({ player, onClose, onRefresh }) => {
  console.log('PlayerModal - player prop:', player);
  console.log('PlayerModal - player type:', typeof player);
  if (player && typeof player === 'object') {
    console.log('PlayerModal - player keys:', Object.keys(player));
    Object.keys(player).forEach(key => {
      const value = player[key];
      console.log(`PlayerModal - player.${key}:`, value, 'type:', typeof value);
      if (typeof value === 'object' && value !== null) {
        console.log(`PlayerModal - player.${key} is object with keys:`, Object.keys(value));
        if (value.round !== undefined || value.total !== undefined || value.detail !== undefined || value._id !== undefined) {
          console.error(`PlayerModal - FOUND PROBLEMATIC OBJECT in player.${key}:`, value);
        }
      }
    });
  }
  const [showReplacementModal, setShowReplacementModal] = useState(false);
  const [showTransfertModal, setShowTransfertModal] = useState(false);
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);
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

  // Handle captain/vice-captain role updates
  const handleRoleUpdate = async (role) => {
    if (!player || !player._id) {
      console.error('Player ID not found for role update');
      return;
    }

    try {
      setIsUpdatingRole(true);
      
      let result;
      if (role === 'captain') {
        result = await api.makeCaptain(player._id);
      } else if (role === 'vice') {
        result = await api.makeViceCaptain(player._id);
      }

      if (result && result.success) {
        console.log(`${role === 'captain' ? 'Captain' : 'Vice-captain'} updated successfully:`, result.data);
        
        // Refresh the home page data
        if (onRefresh && typeof onRefresh === 'function') {
          onRefresh();
        }
        
        // Show success message
        alert(`${role === 'captain' ? 'Capitaine' : 'Vice-capitaine'} mis à jour avec succès!`);
      } else {
        console.error(`Failed to update ${role}:`, result?.message);
        alert(`Erreur lors de la mise à jour: ${result?.message || 'Erreur inconnue'}`);
      }
    } catch (error) {
      console.error(`Error updating ${role}:`, error);
      alert('Erreur lors de la mise à jour. Veuillez réessayer.');
    } finally {
      setIsUpdatingRole(false);
    }
  };

  console.log('PlayerModal - Starting render...');
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
               {(() => {
                 console.log('PlayerModal - Rendering player.name:', player.name, 'type:', typeof player.name);
                 if (typeof player.name === 'object') {
                   console.error('PlayerModal - player.name is an object!', player.name);
                   return 'Unknown Player';
                 }
                 return player.name || 'Unknown Player';
               })()}
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
                       alt={`Logo de ${typeof player.club === 'string' ? player.club : 'Unknown'}`}
                      className="w-6 h-6 object-contain flex-shrink-0"
                      loading="lazy"
                    />
                  )}
                  <span
                    className="text-white text-base lg:text-lg xl:text-xl font-medium"
                    style={{ fontFamily: 'Gotham SSM, Bebas Neue, sans-serif' }}
                  >
                     {(() => {
                       console.log('PlayerModal - Rendering player.club:', player.club, 'type:', typeof player.club);
                       if (typeof player.club === 'object') {
                         console.error('PlayerModal - player.club is an object!', player.club);
                         return 'Unknown Club';
                       }
                       return typeof player.club === 'string' ? player.club : 'Unknown Club';
                     })()}
                  </span>
                </div>
                <div className="text-white text-xs lg:text-base xl:text-lg font-medium" style={{ fontFamily: 'Gotham SSM, Bebas Neue, sans-serif' }}>
                  Statut : <span className="font-bold text-[#629F3F]">{typeof player.status === 'string' ? player.status : 'Titulaire'}</span>
                </div>
                  <div>
                    <span
                      className="bg-[#181818] border border-[#629F3F] text-[#629F3F] font-bold text-xs lg:text-base xl:text-lg px-3 py-1 rounded uppercase inline-block"
                      style={{ fontFamily: 'Gotham SSM, Bebas Neue, sans-serif' }}
                    >
                                               ATK | {(() => {
                          console.log('PlayerModal - Rendering player.stats:', player.stats, 'type:', typeof player.stats);
                          if (typeof player.stats === 'object' && player.stats !== null) {
                            console.log('PlayerModal - player.stats.value:', player.stats.value, 'type:', typeof player.stats.value);
                            if (Array.isArray(player.stats.value)) {
                              console.log('PlayerModal - player.stats.value is an array:', player.stats.value);
                              console.log('PlayerModal - player.stats.value[0]:', player.stats.value[0], 'type:', typeof player.stats.value[0]);
                              if (player.stats.value[0] && typeof player.stats.value[0] === 'object') {
                                console.log('PlayerModal - player.stats.value[0] is an object with keys:', Object.keys(player.stats.value[0]));
                                // Check if it has a value property
                                if (player.stats.value[0].value !== undefined) {
                                  console.log('PlayerModal - player.stats.value[0].value:', player.stats.value[0].value);
                                  return player.stats.value[0].value;
                                } else if (player.stats.value[0].total !== undefined) {
                                  console.log('PlayerModal - player.stats.value[0].total:', player.stats.value[0].total);
                                  return player.stats.value[0].total;
                                } else {
                                  console.log('PlayerModal - No usable value found in stats array element, using default');
                                  return 9;
                                }
                              } else if (typeof player.stats.value[0] === 'number') {
                                return player.stats.value[0];
                              } else {
                                console.log('PlayerModal - First element is not a number or usable object, using default');
                                return 9;
                              }
                            } else if (typeof player.stats.value === 'number') {
                              return player.stats.value;
                            } else {
                              return 9;
                            }
                          } else if (typeof player.stats === 'number') {
                            return player.stats;
                          } else {
                            return 9;
                          }
                        })()} VP
                    </span>
                  </div>
               
              </div>
              {/* Jersey Image Section */}
              <div className="flex-shrink-0 self-center">
                <img
                  src={player.jerseySrc}
                   alt={`Maillot de ${typeof player.name === 'string' ? player.name : 'Unknown Player'}`}
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
                  {typeof player.selection === 'string' ? player.selection : '0%'}
                </span>
              </div>
              <div className="rounded-lg p-3 flex flex-col items-start gap-1 player-modal-card" style={{ border: '0.5px solid #629F3F' }}>
                <span className="text-[#629F3F] text-xs font-bold uppercase leading-tight" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>
                  Age
                </span>
                <span className="text-white text-sm font-bold leading-tight" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>
                  {typeof player.age === 'number' ? player.age : 25} ans
                </span>
              </div>
              <div className="rounded-lg p-3 flex flex-col items-start gap-1 player-modal-card" style={{ border: '0.5px solid #629F3F' }}>
                <span className="text-[#629F3F] text-xs font-bold uppercase leading-tight" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>
                  Nationalité
                </span>
                <span className="text-white text-sm font-bold leading-tight" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>
                  {typeof player.nationality === 'string' ? player.nationality : 'Tunisien'}
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
                       alt={`Logo de ${typeof player.opponent === 'string' ? player.opponent : 'Unknown'}`} 
                      className="w-6 h-6 lg:w-8 lg:h-8 object-contain flex-shrink-0" 
                      loading="lazy"
                    />
                  )}
                  <span className="text-white text-sm lg:text-base font-bold truncate" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>
                    {typeof player.opponent === 'string' ? player.opponent : 'Unknown'}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center min-w-[80px] lg:min-w-[120px]">
                  <span className="text-white text-lg lg:text-2xl xl:text-3xl font-extrabold" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>
                    {player.name === 'ADEM MHIRI' ? '5 - 0' : (typeof player.score === 'string' ? player.score : '-- : --')}
                  </span>
                  <span className="text-[#629F3F] font-bold text-xs lg:text-sm">VS</span>
                </div>
                <div className="flex items-center gap-2 lg:gap-3 flex-1 min-w-0 justify-end">
                  {player.clubLogo && (
                    <img 
                      src={player.clubLogo} 
                       alt={`Logo de ${typeof player.club === 'string' ? player.club : 'Unknown'}`} 
                      className="w-6 h-6 lg:w-8 lg:h-8 object-contain flex-shrink-0" 
                      loading="lazy"
                    />
                  )}
                  <span className="text-white text-sm lg:text-base font-bold truncate" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>
                    {typeof player.club === 'string' ? player.club : 'Unknown'}
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
            {player.name !== 'ADEM MHIRI' && !player.isSubstituted && (
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
                        ${player.role === 'Capitaine' ? 'bg-[#629F3F] text-white border-[#629F3F]' : 'bg-[#181818] text-white border-[#629F3F] hover:bg-[#232323]'}
                        ${isUpdatingRole ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                      aria-pressed={player.role === 'Capitaine'}
                      onClick={() => !isUpdatingRole && handleRoleUpdate('captain')}
                      disabled={isUpdatingRole}
                    >
                      {isUpdatingRole ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          TRAITEMENT...
                        </span>
                      ) : (
                      <span className="truncate">Capitaine</span>
                      )}
                    </button>
                    <button
                      type="button"
                      className={`flex-1 min-w-[140px] min-h-[52px] border font-bold text-base xl:text-lg py-3 lg:py-4 rounded-lg flex items-center justify-center gap-3 uppercase transition-colors duration-200 touch-manipulation relative
                        ${player.role === 'Vice-capitaine' ? 'bg-[#629F3F] text-white border-[#629F3F]' : 'bg-[#181818] text-white border-[#629F3F] hover:bg-[#232323]'}
                        ${isUpdatingRole ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                      aria-pressed={player.role === 'Vice-capitaine'}
                      onClick={() => !isUpdatingRole && handleRoleUpdate('vice')}
                      disabled={isUpdatingRole}
                    >
                      {isUpdatingRole ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          TRAITEMENT...
                        </span>
                      ) : (
                      <span className="truncate">Vice - Capitaine</span>
                      )}
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
            
            {/* Show message for replacement players */}
            {player.name !== 'ADEM MHIRI' && player.isSubstituted && (
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                <div className="flex-1">
                  <div className="text-white font-bold uppercase text-sm lg:text-base mb-3 lg:mb-4 text-left" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif', letterSpacing:'0.04em'}}>
                    INFORMATION
                  </div>
                  <div className="bg-[#2a2a2a] border border-[#629F3F] rounded-lg p-4">
                    <p className="text-white text-sm lg:text-base text-center" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>
                      Les joueurs en remplacement ne peuvent pas avoir d'actions ou de changements de rôle.
                    </p>
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
          onRefresh={onRefresh}
        />
      )}
      {showTransfertModal && (
        <TransfertModal
          open={showTransfertModal}
          onClose={() => setShowTransfertModal(false)}
          player={player}
          onRefresh={onRefresh}
        />
      )}
    </>
  );
};

PlayerModal.propTypes = {
  player: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onRefresh: PropTypes.func,
};

export default PlayerModal;

