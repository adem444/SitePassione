import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import api from '../../utils/api';



const posteColors = {
  GK: 'bg-[#2d4a1e]',
  DEF: 'bg-[#3a5d3c]',
  MIL: 'bg-[#4e7c4a]',
  ATK: 'bg-[#629F3F]',
};

const ReplacementModal = ({ open, onClose, player, onRefresh }) => {
  console.log('ReplacementModal - player prop:', player);
  console.log('ReplacementModal - player type:', typeof player);
  console.log('ReplacementModal - player keys:', player ? Object.keys(player) : 'null');
  if (player && typeof player === 'object') {
    Object.keys(player).forEach(key => {
      console.log(`ReplacementModal - player.${key}:`, player[key], 'type:', typeof player[key]);
    });
  }
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPoste, setFilterPoste] = useState('');
  const [pickteamPlayers, setPickteamPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Fetch pickteam players when modal opens
  useEffect(() => {
    if (open) {
      fetchPickteamPlayers();
    }
  }, [open]);

  // Fetch current pickteam players
  const fetchPickteamPlayers = async () => {
    try {
      setLoading(true);
      const result = await api.getCurrentUserPickteam();
      
      console.log('ReplacementModal - API result:', result);
      
      if (result.success && result.data) {
        // Transform pickteam data to match the table format
        const transformedPlayers = result.data.players?.map(playerEntry => {
          const player = playerEntry.player;
          if (!player) return null;
          
          // Map position to poste format
          let poste;
          switch (player.position) {
            case 'Goalkeeper':
              poste = 'GK';
              break;
            case 'Defender':
              poste = 'DEF';
              break;
            case 'Midfielder':
              poste = 'MIL';
              break;
            case 'Attacker':
              poste = 'ATK';
              break;
            default:
              poste = 'ATK';
              break;
          }
          
          // Ensure all values are primitive types
          const playerName = typeof player.name === 'string' ? player.name : 
                            typeof player.name === 'object' ? JSON.stringify(player.name) : 
                            'Unknown Player';
          
          return {
            id: String(player._id || player.id || Math.random()),
            clubLogo: String(player.team?.logo || '/ESS.png'),
            poste: String(poste),
            name: String(playerName),
            vp: Number(player.price || 6),
            pts: Number(player.points || 0),
            isSubstituted: Boolean(playerEntry.isSubstituted),
            // Store the original player data for API calls
            originalPlayer: player,
            originalPlayerEntry: playerEntry
          };
        }).filter(Boolean) || [];
        
        console.log('ReplacementModal - Transformed players:', transformedPlayers);
        setPickteamPlayers(transformedPlayers);
      } else {
        console.log('ReplacementModal - No pickteam data');
        setPickteamPlayers([]);
      }
    } catch (error) {
      console.error('Error fetching pickteam players:', error);
      setPickteamPlayers([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter and search functionality - only show replacement players
  const filteredReplacements = useMemo(() => {
    return pickteamPlayers
      .filter(p => {
        // Only show replacement players (isSubstituted: true)
        return p.isSubstituted === true;
      })
      .filter(p => {
        // Exclude the current player being replaced
        const currentPlayerId = player?._id || player?.id;
        const pickteamPlayerId = p.id;
        return currentPlayerId !== pickteamPlayerId;
      })
      .filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPoste = !filterPoste || p.poste === filterPoste;
        return matchesSearch && matchesPoste;
      });
  }, [pickteamPlayers, searchTerm, filterPoste, player]);

  const uniquePostes = useMemo(() => {
    return [...new Set(pickteamPlayers.map(p => p.poste))];
  }, [pickteamPlayers]);

  // Focus management and keyboard navigation
  useEffect(() => {
    if (open && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
      
      // Arrow key navigation for table rows
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const currentIndex = filteredReplacements.findIndex(p => p.id === selectedId);
        let newIndex;
        
        if (e.key === 'ArrowDown') {
          newIndex = currentIndex < filteredReplacements.length - 1 ? currentIndex + 1 : 0;
        } else {
          newIndex = currentIndex > 0 ? currentIndex - 1 : filteredReplacements.length - 1;
        }
        
        if (filteredReplacements[newIndex]) {
          setSelectedId(filteredReplacements[newIndex].id);
        }
      }
      
      // Enter key to confirm selection
      if (e.key === 'Enter' && selectedId) {
        handleConfirm();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose, selectedId, filteredReplacements]);

  // Reset selection when filters change
  useEffect(() => {
    if (selectedId && !filteredReplacements.find(p => p.id === selectedId)) {
      setSelectedId(null);
    }
  }, [filteredReplacements, selectedId]);

  if (!open) return null;

  // Safety check to ensure player is not an object being rendered
  if (player && typeof player === 'object' && player !== null) {
    console.log('ReplacementModal - player object keys:', Object.keys(player));
    
    // Check if any player properties are objects that shouldn't be rendered
    const problematicKeys = Object.keys(player).filter(key => {
      const value = player[key];
      return typeof value === 'object' && value !== null && !Array.isArray(value);
    });
    
    if (problematicKeys.length > 0) {
      console.warn('ReplacementModal - Found problematic object keys:', problematicKeys);
      console.warn('ReplacementModal - Problematic values:', problematicKeys.map(key => ({ key, value: player[key] })));
    }
  }

  const handleRowClick = (playerId) => {
    setSelectedId(playerId);
  };

  const handleConfirm = async () => {
    if (selectedId) {
      try {
        setConfirming(true);
        
        // Get the selected replacement player
        const replacementPlayer = filteredReplacements.find(p => p.id === selectedId);
        
        if (replacementPlayer) {
          const playerName = typeof player?.name === 'string' ? player.name : 'Unknown Player';
          const replacementName = typeof replacementPlayer.name === 'string' ? replacementPlayer.name : 'Unknown Player';
          console.log('Replacing player:', playerName, 'with:', replacementName);
          
          // Debug: Log the player objects to understand the ID structure
          console.log('ReplacementModal - Current player object:', player);
          console.log('ReplacementModal - Replacement player object:', replacementPlayer);
          console.log('ReplacementModal - Current player ID options:', {
            playerId: player.id,
            player_id: player._id,
            playerIdFromProps: player.id,
            playerIdFromProps_id: player._id
          });
          
          // Find the current player in the pickteam data to get the correct ID
          const currentPlayerInPickteam = pickteamPlayers.find(p => 
            p.originalPlayer && p.originalPlayer.name === player.name
          );
          
          // Extract the correct player IDs
          const currentPlayerId = currentPlayerInPickteam?.originalPlayer?._id || player.id || player._id;
          const replacementPlayerId = replacementPlayer.originalPlayer?._id || replacementPlayer.id;
          
          console.log('ReplacementModal - Extracted IDs:', {
            currentPlayerId,
            replacementPlayerId,
            currentPlayerName: player.name,
            replacementPlayerName: replacementPlayer.name
          });
          
          if (!currentPlayerId) {
            throw new Error(`Current player ID not found for player: ${player.name}`);
          }
          
          if (!replacementPlayerId) {
            throw new Error(`Replacement player ID not found for player: ${replacementPlayer.name}`);
          }
          
          // Call the API to swap players
          const result = await api.swapPlayers(
            currentPlayerId,           // Current player ID
            replacementPlayerId,       // Replacement player ID
            '1' // Current round (you can get this from API if needed)
          );
          
                     if (result.success) {
             console.log('Players swapped successfully:', result.data);
             alert(`Remplacement effectué: ${playerName} remplacé par ${replacementName}`);
             
             // Refresh the home page data
             if (onRefresh && typeof onRefresh === 'function') {
               onRefresh();
             }
             
             onClose();
           } else {
             console.error('Failed to swap players:', result.message);
             alert(`Erreur lors du remplacement: ${result.message}`);
           }
        }
      } catch (error) {
        console.error('Error performing replacement:', error);
        alert('Erreur lors du remplacement. Veuillez réessayer.');
      } finally {
        setConfirming(false);
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="replacement-modal-title"
    >
      <div
        ref={modalRef}
        className={`
          bg-[#181818] rounded-t-2xl sm:rounded-2xl shadow-2xl relative border border-[#629F3F]
          w-full max-w-full sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[1200px] xl:max-w-[1400px]
          max-h-[95vh] lg:max-h-[90vh] xl:max-h-[85vh]
          flex flex-col
          min-w-[320px]
          sm:overflow-hidden
          transition-all duration-300 ease-out
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 pt-6 sm:pt-6 pb-3 sm:pb-4 border-b border-[#2a2a2a] bg-gradient-to-b from-[#2d4a1e] to-[#181818] rounded-t-2xl min-h-[70px] sm:min-h-[unset]" style={{minHeight:'70px'}}>
          <div>
            <h2 
              id="replacement-modal-title"
              className="text-white text-2xl sm:text-xl lg:text-2xl xl:text-3xl font-extrabold uppercase tracking-tight leading-tight" 
              style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}
            >
              JOUEURS REMPLAÇANTS
            </h2>
                         <span className="text-white text-sm sm:text-base lg:text-lg font-medium" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>
               Sélectionnez un joueur pour remplacer {typeof player?.name === 'string' ? player.name.toUpperCase() : typeof player?.name === 'object' ? 'CE JOUEUR' : 'CE JOUEUR'}
             </span>
          </div>
          <button
            ref={closeButtonRef}
            className="text-white bg-[#629F3F] rounded-full w-10 h-10 sm:w-10 sm:h-10 flex items-center justify-center font-bold text-2xl sm:text-xl z-20 shadow-lg hover:bg-[#4a7a2f] transition-colors duration-200 touch-manipulation ml-2"
            onClick={onClose}
            aria-label="Fermer la modale"
          >
            ×
          </button>
        </div>

      
       

        {/* Search and Filter Section */}
        <div className="px-4 sm:px-6 lg:px-8 py-4 border-b border-[#2a2a2a]">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Rechercher un joueur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-[#0F0F0F] border border-[#2A3C2A] text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#629F3F] transition-colors"
              style={{ fontFamily: 'Gotham SSM, sans-serif' }}
            />
            <select
              value={filterPoste}
              onChange={(e) => setFilterPoste(e.target.value)}
              className="bg-[#0F0F0F] border border-[#2A3C2A] text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#629F3F] transition-colors"
              style={{ fontFamily: 'Gotham SSM, sans-serif' }}
            >
              <option value="">Tous les postes</option>
              {uniquePostes.map(poste => (
                <option key={poste} value={poste}>{poste}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table/Body */}
        <div className="flex-1 overflow-y-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 lg:py-20 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#629F3F] mb-4"></div>
              <p className="text-white text-lg lg:text-xl font-medium" style={{fontFamily:'Gotham SSM, sans-serif'}}>
                Chargement des joueurs...
              </p>
            </div>
          ) : filteredReplacements.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 lg:py-20 text-center">
              <div className="text-gray-400 text-4xl lg:text-6xl mb-4 lg:mb-6">🔍</div>
              <p className="text-white text-lg lg:text-xl font-medium mb-2" style={{fontFamily:'Gotham SSM, sans-serif'}}>
                Aucun joueur trouvé
              </p>
              <p className="text-gray-400 text-sm lg:text-base" style={{fontFamily:'Gotham SSM, sans-serif'}}>
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto lg:overflow-visible">
              <table className="w-full text-sm lg:text-base border-separate border-spacing-y-2 min-w-[600px]">
                <thead className="sticky top-0 bg-[#181818] z-10">
                  <tr className="text-white uppercase text-left" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>
                    <th className="font-bold px-2 sm:px-4 py-2 sm:py-3 bg-[#2a2a2a] rounded-l-lg text-xs lg:text-sm">EQUIPE</th>
                    <th className="font-bold px-2 sm:px-4 py-2 sm:py-3 bg-[#2a2a2a] text-xs lg:text-sm">POSTE</th>
                    <th className="font-bold px-2 sm:px-4 py-2 sm:py-3 bg-[#2a2a2a] text-xs lg:text-sm">NOM</th>
                    <th className="font-bold px-2 sm:px-4 py-2 sm:py-3 bg-[#2a2a2a] text-xs lg:text-sm">VP</th>
                    <th className="font-bold px-2 sm:px-4 py-2 sm:py-3 bg-[#2a2a2a] text-xs lg:text-sm">PTS</th>
                    <th className="font-bold px-2 sm:px-4 py-2 sm:py-3 bg-[#2a2a2a] rounded-r-lg text-xs lg:text-sm">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                                     {filteredReplacements.map((p, index) => (
                     <tr
                       key={p.id}
                       className={`transition-all duration-200 cursor-pointer rounded-lg ${selectedId === p.id ? 'bg-[#22391a] ring-2 ring-[#629F3F] shadow-lg transform scale-[1.02]' : 'hover:bg-[#2a2a2a] hover:shadow-md active:bg-[#333333]'}`}
                       onClick={() => handleRowClick(p.id)}
                       onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleRowClick(p.id); } }}
                       tabIndex={0}
                       role="button"
                       aria-label={`Sélectionner ${typeof p.name === 'string' ? p.name : 'Unknown'}, ${p.poste}, ${p.vp} VP, ${p.pts} points`}
                     >
                      <td className="px-2 sm:px-4 py-2 sm:py-3">
                        <img src={p.clubLogo} alt={`Logo de l'équipe`} className="w-8 h-8 sm:w-10 sm:h-10 object-contain" loading="lazy" />
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3">
                        <span className={`text-white text-xs sm:text-sm px-2 py-1 rounded uppercase font-bold ${posteColors[p.poste] || 'bg-[#629F3F]'}`} style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>{p.poste}</span>
                      </td>
                                                                   <td className="px-2 sm:px-4 py-2 sm:py-3">
                         <span className="text-white font-bold text-sm sm:text-base" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>
                           {typeof p.name === 'string' ? p.name : typeof p.name === 'object' ? JSON.stringify(p.name) : 'Unknown'}
                         </span>
                       </td>
                                              <td className="px-2 sm:px-4 py-2 sm:py-3">
                         <span className="text-white font-bold text-sm sm:text-base" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>{String(p.vp || 0)}</span>
                       </td>
                       <td className="px-2 sm:px-4 py-2 sm:py-3">
                         <span className="text-[#629F3F] font-bold text-sm sm:text-base" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>{String(p.pts || 0)}</span>
                       </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-center align-middle">
                        <div className="flex items-center justify-center">
                          <input 
                            type="radio" 
                            name="remplacement" 
                            checked={selectedId === p.id} 
                            onChange={() => handleRowClick(p.id)} 
                            className="accent-[#629F3F] w-5 h-5" 
                            tabIndex={-1} 
                            aria-hidden="true" 
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer/Sticky Actions for mobile */}
        <div className="flex flex-col sm:flex-row gap-3 px-4 sm:px-6 lg:px-8 pb-6 lg:pb-8 pt-4 lg:pt-6 bg-[#181818] border-t border-[#2a2a2a]">
          <button
            className="flex-1 min-w-[120px] min-h-[48px] border border-[#629F3F] text-white font-bold py-3 rounded-lg flex items-center justify-center text-base uppercase hover:bg-[#2a2a2a] active:bg-[#333333] transition-all duration-200 touch-manipulation shadow-lg hover:shadow-xl"
            style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif', borderWidth: '0.5px'}}
            onClick={onClose}
          >
            ANNULER
          </button>
          <button
            className={`flex-1 min-w-[120px] min-h-[48px] bg-[#629F3F] text-white font-bold py-3 rounded-lg flex items-center justify-center text-base uppercase transition-all duration-200 touch-manipulation shadow-lg ${selectedId && !confirming ? 'hover:bg-[#4a7a2f] hover:shadow-xl active:bg-[#3d6628] cursor-pointer transform hover:scale-105' : 'opacity-50 cursor-not-allowed'}`}
            style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}
            disabled={!selectedId || confirming}
            onClick={handleConfirm}
            aria-describedby={selectedId ? undefined : 'confirm-disabled-help'}
          >
            {confirming ? (
              <span className="truncate flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                TRAITEMENT...
              </span>
            ) : (
              <>
                <span className="truncate">CONFIRMER</span>
                {selectedId && (
                  <span className="ml-2 text-xs bg-[#4a7a2f] px-2 py-1 rounded hidden sm:inline-block">
                    {(() => {
                      const selectedPlayer = filteredReplacements.find(p => p.id === selectedId);
                      const playerName = selectedPlayer?.name;
                      if (typeof playerName === 'string') {
                        return playerName.split(' ')[0];
                      } else if (typeof playerName === 'object') {
                        return 'Unknown';
                      } else {
                        return 'Unknown';
                      }
                    })()}
                  </span>
                )}
              </>
            )}
          </button>
          {!selectedId && (
            <div id="confirm-disabled-help" className="sr-only">Veuillez sélectionner un joueur pour confirmer le remplacement</div>
          )}
        </div>

     
      </div>
    </div>
  );
};

ReplacementModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  player: PropTypes.object,
  onRefresh: PropTypes.func,
};

export default ReplacementModal;

