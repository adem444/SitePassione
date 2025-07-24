import React, { useState } from 'react';
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
    name: 'Raki Aouani',
    vp: 9,
    pts: 30,
  },
  {
    id: 3,
    clubLogo: '/ESS.png',
    poste: 'MIL',
    name: 'Raki Aouani',
    vp: 9,
    pts: 30,
  },
  {
    id: 4,
    clubLogo: '/ESS.png',
    poste: 'ATK',
    name: 'Raki Aouani',
    vp: 9,
    pts: 30,
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

  if (!open) return null;

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
        <div className="bg-gradient-to-b from-[#2d4a1e] to-[#181818] rounded-t-2xl px-3 xs:px-6 md:px-8 pt-4 xs:pt-8 pb-1 flex flex-col gap-1 xs:gap-2">
          <h2 className="text-white text-base xs:text-lg sm:text-xl md:text-2xl font-extrabold uppercase tracking-tight truncate" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>JOUEURS REMPLAÇANTS</h2>
          <span className="text-white text-xs xs:text-sm md:text-base font-medium truncate" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>Sélectionnez un joueur pour remplacer {player?.name?.toUpperCase()}</span>
        </div>
        {/* Table */}
        <div className="flex-1 overflow-y-auto px-3 xs:px-6 md:px-8 py-2">
          <table className="min-w-full text-xs xs:text-sm md:text-base border-separate border-spacing-y-2">
            <thead>
              <tr className="text-white uppercase text-left" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>
                <th className="font-bold px-2 py-1">EQUIPE</th>
                <th className="font-bold px-2 py-1">POSTE</th>
                <th className="font-bold px-2 py-1">NOM</th>
                <th className="font-bold px-2 py-1">VP</th>
                <th className="font-bold px-2 py-1">PTS</th>
                <th className="font-bold px-2 py-1">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {mockReplacements.map((p) => (
                <tr
                  key={p.id}
                  className={`transition-all duration-200 ${selectedId === p.id ? 'bg-[#22391a]' : ''}`}
                  onClick={() => setSelectedId(p.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <td className="px-2 py-2">
                    <img src={p.clubLogo} alt="Club" className="w-7 h-7 xs:w-8 xs:h-8 object-contain" />
                  </td>
                  <td className="px-2 py-2">
                    <span className={`text-white text-[10px] xs:text-xs md:text-base px-2 py-0.5 rounded uppercase font-bold ${posteColors[p.poste] || 'bg-[#629F3F]'}`}
                      style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>{p.poste}</span>
                  </td>
                  <td className="px-2 py-2">
                    <span className="text-white font-bold md:text-lg" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>{p.name}</span>
                  </td>
                  <td className="px-2 py-2">
                    <span className="text-white font-bold md:text-lg" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>{p.vp}</span>
                  </td>
                  <td className="px-2 py-2">
                    <span className="text-white font-bold md:text-lg" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>{p.pts}</span>
                  </td>
                  <td className="px-2 py-2 text-center">
                    <input
                      type="radio"
                      name="remplacement"
                      checked={selectedId === p.id}
                      onChange={() => setSelectedId(p.id)}
                      className="accent-[#629F3F] w-4 h-4"
                      tabIndex={-1}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Actions */}
        <div className="flex flex-row gap-4 px-3 xs:px-6 md:px-8 pb-5 pt-2">
          <button
            className="flex-1 border border-[#629F3F] text-white font-bold py-2 xs:py-2.5 md:py-3 rounded-lg flex items-center justify-center text-xs xs:text-lg md:text-xl uppercase"
            style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif', borderWidth: '0.5px'}}
            onClick={onClose}
          >
            ANNULER
          </button>
          <button
            className={`flex-1 bg-[#629F3F] text-white font-bold py-2 xs:py-2.5 md:py-3 rounded-lg flex items-center justify-center text-xs xs:text-lg md:text-xl uppercase transition-opacity duration-150 ${selectedId ? '' : 'opacity-50 cursor-not-allowed'}`}
            style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}
            disabled={!selectedId}
            onClick={() => selectedId && onClose()}
          >
            CONFIRMER
          </button>
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