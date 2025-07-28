import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';

const mockReplacements = [
  {
    id: 1,
    clubLogo: '/ESS.png',
    poste: 'GK',
    name: 'Raki Aouani',
    vp: 9,
    pts: 30,
  },
  {
    id: 2,
    clubLogo: '/ESS.png',
    poste: 'DEF',
    name: 'Ahmed Ben Salem',
    vp: 12,
    pts: 45,
  },
  {
    id: 3,
    clubLogo: '/ESS.png',
    poste: 'MIL',
    name: 'Mohamed Khalil',
    vp: 15,
    pts: 52,
  },
  {
    id: 4,
    clubLogo: '/ESS.png',
    poste: 'ATK',
    name: 'Youssef Msakni',
    vp: 18,
    pts: 67,
  },

];

const posteColors = {
  GK: 'bg-[#2d4a1e]',
  DEF: 'bg-[#3a5d3c]',
  MIL: 'bg-[#4e7c4a]',
  ATK: 'bg-[#629F3F]',
};

const ReplacementModal = ({ open, onClose, player }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPoste, setFilterPoste] = useState('');
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Filter and search functionality
  const filteredReplacements = useMemo(() => {
    return mockReplacements.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPoste = !filterPoste || p.poste === filterPoste;
      return matchesSearch && matchesPoste;
    });
  }, [searchTerm, filterPoste]);

  const uniquePostes = useMemo(() => {
    return [...new Set(mockReplacements.map(p => p.poste))];
  }, []);

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

  const handleRowClick = (playerId) => {
    setSelectedId(playerId);
  };

  const handleConfirm = () => {
    if (selectedId) {
      console.log('Replacing player with ID:', selectedId);
      onClose();
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
              Sélectionnez un joueur pour remplacer {player?.name?.toUpperCase()}
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

      
       

        {/* Table/Body */}
        <div className="flex-1 overflow-y-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-6">
          {filteredReplacements.length === 0 ? (
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
                      aria-label={`Sélectionner ${p.name}, ${p.poste}, ${p.vp} VP, ${p.pts} points`}
                    >
                      <td className="px-2 sm:px-4 py-2 sm:py-3">
                        <img src={p.clubLogo} alt={`Logo de l'équipe`} className="w-8 h-8 sm:w-10 sm:h-10 object-contain" loading="lazy" />
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3">
                        <span className={`text-white text-xs sm:text-sm px-2 py-1 rounded uppercase font-bold ${posteColors[p.poste] || 'bg-[#629F3F]'}`} style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>{p.poste}</span>
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3">
                        <span className="text-white font-bold text-sm sm:text-base" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>{p.name}</span>
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3">
                        <span className="text-white font-bold text-sm sm:text-base" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>{p.vp}</span>
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3">
                        <span className="text-[#629F3F] font-bold text-sm sm:text-base" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>{p.pts}</span>
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-center align-middle">
                        <div className="flex items-center justify-center">
                          <input type="radio" name="remplacement" checked={selectedId === p.id} onChange={() => handleRowClick(p.id)} className="accent-[#629F3F] w-5 h-5" tabIndex={-1} aria-hidden="true" />
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
            className={`flex-1 min-w-[120px] min-h-[48px] bg-[#629F3F] text-white font-bold py-3 rounded-lg flex items-center justify-center text-base uppercase transition-all duration-200 touch-manipulation shadow-lg ${selectedId ? 'hover:bg-[#4a7a2f] hover:shadow-xl active:bg-[#3d6628] cursor-pointer transform hover:scale-105' : 'opacity-50 cursor-not-allowed'}`}
            style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}
            disabled={!selectedId}
            onClick={handleConfirm}
            aria-describedby={selectedId ? undefined : 'confirm-disabled-help'}
          >
            <span className="truncate">CONFIRMER</span>
            {selectedId && (
              <span className="ml-2 text-xs bg-[#4a7a2f] px-2 py-1 rounded hidden sm:inline-block">{filteredReplacements.find(p => p.id === selectedId)?.name?.split(' ')[0]}</span>
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
};

export default ReplacementModal;

