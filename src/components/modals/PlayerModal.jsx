import React from 'react';
import PropTypes from 'prop-types';

const PlayerModal = ({ player, onClose }) => {
  if (!player) return null;

  const borderStyle = { border: '0.5px solid #629F3F' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div
        className={`
          bg-[#181818] rounded-2xl shadow-2xl relative border border-[#629F3F]
          w-[95vw] max-w-[370px] xs:max-w-[420px] sm:max-w-[520px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[900px] 2xl:max-w-[1000px]
          min-h-[280px] lg:min-h-[320px]
          flex flex-col justify-center
        `}
        style={{ minWidth: 220 }}
      >
        {/* Close button */}
        <button
          className="absolute top-2 right-2 xs:top-4 xs:right-4 text-white bg-[#629F3F] rounded-full w-6 h-6 xs:w-8 xs:h-8 flex items-center justify-center font-bold text-base xs:text-xl z-20 shadow"
          onClick={onClose}
          aria-label="Fermer"
        >
          ×
        </button>

        {/* Header */}
        <div className="bg-gradient-to-b from-[#2d4a1e] to-[#181818] rounded-t-2xl px-3 xs:px-6 md:px-8 pt-4 xs:pt-8 pb-1 flex flex-row items-start justify-between gap-2 xs:gap-4">
          <div className="flex flex-col gap-1 xs:gap-2 flex-1 min-w-0">
            <h2 className="text-white text-base xs:text-lg sm:text-xl md:text-2xl font-extrabold uppercase tracking-tight truncate" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>{player.name}</h2>
            <div className="flex items-center gap-1 xs:gap-2 mt-1">
              {player.clubLogo && <img src={player.clubLogo} alt="Club" className="w-4 h-4 xs:w-5 xs:h-5 object-contain" />}
              <span className="text-white text-xs xs:text-sm md:text-base font-medium truncate" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>{player.club}</span>
            </div>
            <div className="flex items-center gap-1 xs:gap-2 mt-2">
              {player.stats?.atk && (
                <span className="bg-[#181818] border border-[#629F3F] text-[#629F3F] font-bold text-[10px] xs:text-xs md:text-sm px-2 py-0.5 rounded uppercase" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>ATK | {player.stats.value} VP</span>
              )}
            </div>
            <div className="text-white text-[10px] xs:text-xs md:text-sm mt-2" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>Statut : <span className="font-bold">{player.status}</span></div>
          </div>
          <img src={player.jerseySrc} alt="Jersey" className="w-20 xs:w-16 md:w-30 object-contain drop-shadow-md mt-1 flex-shrink-0" />
        </div>

        {/* Info grid */}
        <div className="bg-[#181818] px-3 xs:px-6 md:px-8 pt-2 pb-0 flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2 xs:gap-3">
            <div className="rounded-lg p-2 xs:p-2.5 md:p-3 flex flex-col items-start gap-0.5" style={borderStyle}>
              <span className="text-[#629F3F] text-[10px] xs:text-xs md:text-sm font-bold uppercase leading-tight" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>Sélection journée</span>
              <span className="text-white text-xs xs:text-base md:text-lg font-bold leading-tight" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>{player.selection}</span>
            </div>
            <div className="rounded-lg p-2 xs:p-2.5 md:p-3 flex flex-col items-start gap-0.5" style={borderStyle}>
              <span className="text-[#629F3F] text-[10px] xs:text-xs md:text-sm font-bold uppercase leading-tight" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>Age</span>
              <span className="text-white text-xs xs:text-base md:text-lg font-bold leading-tight" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>{player.age} ans</span>
            </div>
          </div>
          <div className="rounded-lg p-2 xs:p-2.5 md:p-3 flex flex-col items-start gap-0.5 mt-2" style={borderStyle}>
            <span className="text-[#629F3F] text-[10px] xs:text-xs md:text-sm font-bold uppercase leading-tight" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>Nationalité</span>
            <span className="text-white text-xs xs:text-base md:text-lg font-bold leading-tight" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>{player.nationality}</span>
          </div>
        </div>

        {/* Match info with score */}
        <div className="px-3 xs:px-6 md:px-8 pt-2">
          <div className="rounded-lg overflow-hidden flex flex-col" style={borderStyle}>
            <div className="flex items-center justify-between bg-[#629F3F] px-2 xs:px-4 md:px-6 py-2 xs:py-2.5">
              <span className="text-white font-bold uppercase text-[10px] xs:text-xs md:text-sm" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>Journée 1</span>
              <span className="text-white font-bold text-[10px] xs:text-xs md:text-sm px-2 py-0.5 rounded bg-[#2d4a1e]" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>{player.upcoming ? 'A VENIR' : 'TERMINÉ'}</span>
            </div>
            <div className="flex items-center justify-between bg-[#181818] px-2 xs:px-4 md:px-6 py-2 xs:py-3 gap-2 xs:gap-3">
              <div className="flex items-center gap-1 xs:gap-2 md:gap-3">
                {player.opponentLogo && <img src={player.opponentLogo} alt="Opponent" className="w-5 h-5 xs:w-6 xs:h-8 object-contain" />}
                <span className="text-white text-[10px] xs:text-xs md:text-base font-bold" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>{player.opponent}</span>
              </div>
              <div className="flex flex-col items-center justify-center min-w-[40px] xs:min-w-[60px] md:min-w-[80px]">
                <span className="text-white text-base xs:text-lg md:text-2xl font-extrabold" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>
                  {player.name === 'ADEM MHIRI' ? '5 - 0' : (player.score ?? '-- : --')}
                </span>
                <span className="text-[#629F3F] font-bold text-[10px] xs:text-xs md:text-sm">VS</span>
              </div>
              <div className="flex items-center gap-1 xs:gap-2 md:gap-3">
                {player.clubLogo && <img src={player.clubLogo} alt="Club" className="w-5 h-5 xs:w-6 xs:h-8 object-contain" />}
                <span className="text-white text-[10px] xs:text-xs md:text-base font-bold" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>{player.club}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Role de joueur */}
        {player.name !== 'ADEM MHIRI' && (
          <div className="px-3 xs:px-6 md:px-8 pt-3 xs:pt-4">
            <div className="text-white font-bold uppercase text-xs xs:text-base md:text-xl mb-2 text-left" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif', letterSpacing:'0.04em'}}>ROLE DE JOUEUR</div>
            <div className="flex flex-row gap-2 xs:gap-3">
              <button className="flex-1 bg-[#629F3F] text-white font-bold py-2 xs:py-2.5 md:py-3 rounded-lg flex items-center justify-center gap-2 xs:gap-2.5 text-xs xs:text-lg md:text-xl uppercase" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>
                <span className="bg-white text-[#629F3F] rounded-full w-6 h-6 xs:w-7 xs:h-7 md:w-9 md:h-9 flex items-center justify-center font-bold text-xs xs:text-lg md:text-xl">C</span>
                Capitaine
              </button>
              <button className="flex-1 bg-[#181818] border border-[#629F3F] text-white font-bold py-2 xs:py-2.5 md:py-3 rounded-lg flex items-center justify-center gap-2 xs:gap-2.5 text-xs xs:text-lg md:text-xl uppercase" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>
                <span className="bg-[#629F3F] text-white rounded-full w-6 h-6 xs:w-7 xs:h-7 md:w-9 md:h-9 flex items-center justify-center font-bold text-xs xs:text-lg md:text-xl">V</span>
                Vice - Capitaine
              </button>
            </div>
          </div>
        )}

        {/* Actions */}
        {player.name !== 'ADEM MHIRI' && (
          <div className="px-3 xs:px-6 md:px-8 pt-3 xs:pt-4 pb-5">
            <div className="text-white font-bold uppercase text-xs xs:text-base md:text-xl mb-2 text-left" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif', letterSpacing:'0.04em'}}>ACTIONS</div>
            <div className="flex flex-row gap-2 xs:gap-3">
              <button className="flex-1 border border-[#629F3F] text-white font-bold py-2 xs:py-2.5 md:py-3 rounded-lg flex items-center justify-center gap-2 xs:gap-2.5 text-xs xs:text-lg md:text-xl uppercase" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif', borderWidth: '0.5px'}}>
                <img src="/remplacement.svg" alt="Remplacer" className="w-5 h-5 xs:w-6 xs:h-7 md:w-8 md:h-8" />
                Remplacer
              </button>
              <button className="flex-1 border border-[#629F3F] text-white font-bold py-2 xs:py-2.5 md:py-3 rounded-lg flex items-center justify-center gap-2 xs:gap-2.5 text-xs xs:text-lg md:text-xl uppercase" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif', borderWidth: '0.5px'}}>
                <img src="/transfert.svg" alt="Transfert" className="w-5 h-5 xs:w-6 xs:h-7 md:w-8 md:h-8" />
                Transfert
              </button>
            </div>
          </div>
        )}

        {/* Statistics Table for ADEM MHIRI */}
        {player.name === 'ADEM MHIRI' && (
          <div className="px-3 xs:px-6 md:px-8 pt-3 xs:pt-4 pb-5">
            <div className="flex flex-col items-center">
              <div className="bg-[#181818] rounded-lg p-2 mb-2 w-full max-w-xs flex flex-col items-center border border-[#629F3F]">
                <span className="text-[#629F3F] font-bold text-xs xs:text-base md:text-lg mb-1" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif', padding: '4px 18px', display: 'inline-block', letterSpacing: '0.04em'}}>
                  15 PTS
                </span>
              </div>
              <div className="overflow-x-auto w-full">
                <table className="min-w-full text-xs xs:text-sm md:text-base border-separate border-spacing-y-1">
                  <thead>
                    <tr className="bg-[#629F3F] text-white">
                      <th className="px-2 py-1 rounded-tl-lg">Statistiques</th>
                      <th className="px-2 py-1">Valeur</th>
                      <th className="px-2 py-1 rounded-tr-lg">Pts</th>
                    </tr>
                  </thead>
                  <tbody className="bg-[#181818] text-white">
                    <tr>
                      <td className="px-2 py-1">Minutes jouer</td>
                      <td className="px-2 py-1">90</td>
                      <td className="px-2 py-1">+2</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-1">Minutes jouer</td>
                      <td className="px-2 py-1">90</td>
                      <td className="px-2 py-1">+2</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-1">Minutes jouer</td>
                      <td className="px-2 py-1">90</td>
                      <td className="px-2 py-1">+2</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-1">Minutes jouer</td>
                      <td className="px-2 py-1">90</td>
                      <td className="px-2 py-1">+2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

PlayerModal.propTypes = {
  player: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default PlayerModal; 