import React, { useState } from 'react';
import PropTypes from 'prop-types';

const steps = {
  SELECT: 0,
  CONFIRM: 1,
  SUCCESS: 2,
};

// Mock player data
const mockPlayers = Array.from({ length: 20 }).map((_, i) => ({
  name: `Player ${i + 1}`,
  club: 'Etoile Sportive Du Sahel',
  clubLogo: '/ESS.png',
  poste: 'DEF',
  vp: 6 + (i % 10),
  percent: `${(Math.random() * 30).toFixed(1)}%`,
}));

const TransfertModal = ({ open, onClose }) => {
  // Modal step and selected player state
  const [step, setStep] = useState(steps.SELECT);
  const [selectedPlayer, setSelectedPlayer] = useState(mockPlayers[0]);
  const [searchTerm, setSearchTerm] = useState("");

  if (!open) return null;

  // Filter players by search term
  const filteredPlayers = mockPlayers.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Header for all steps
  const renderHeader = (title, subtitle) => (
    <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 pt-6 pb-3 border-b border-[#2a2a2a] bg-gradient-to-b from-[#2d4a1e] to-[#181818] rounded-t-2xl">
      <div>
        <h2 className="text-white text-2xl lg:text-3xl font-extrabold uppercase tracking-tight" style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif' }}>{title}</h2>
        {subtitle && <span className="text-white text-sm lg:text-lg font-medium" style={{ fontFamily: 'Gotham SSM, Bebas Neue, sans-serif' }}>{subtitle}</span>}
      </div>
      <button
        className="text-white bg-[#629F3F] rounded-full w-10 h-10 flex items-center justify-center font-bold text-2xl hover:bg-[#4a7a2f] transition-colors duration-200"
        onClick={onClose}>
        ×
      </button>
    </div>
  );

  // Step 1: SELECT - Player list
  const renderSelectStep = () => (
    <>
      {renderHeader('Marché des transferts', 'Recherchez et sélectionnez un joueur à acheter')}
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-4">
        {/* Alert */}
        <div className="bg-[#181818] border border-[#FFD166] rounded-lg px-4 py-3 text-yellow-400 font-bold text-sm" style={{ fontFamily: 'Gotham SSM, Bebas Neue, sans-serif' }}>
          RAKI AOUANI a été retiré temporairement de votre équipe (+6 VP ajoutés au budget)
        </div>
        {/* Stat cards */}
        <div className="flex flex-row gap-3">
          <div className="flex-1 bg-[#181818] border border-[#629F3F] rounded-lg flex flex-col items-center justify-center py-3 min-w-[120px]">
            <span className="text-[#629F3F] text-xs font-bold uppercase">ÉQUIPE</span>
            <span className="text-white text-lg font-bold">14/15</span>
          </div>
          <div className="flex-1 bg-[#181818] border border-[#629F3F] rounded-lg flex flex-col items-center justify-center py-3 min-w-[120px]">
            <span className="text-[#629F3F] text-xs font-bold uppercase">BUDGET</span>
            <span className="text-white text-lg font-bold">11 VP</span>
          </div>
        </div>
        {/* Search/filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            className="flex-1 bg-transparent border border-[#629F3F] rounded-lg px-4 py-2 text-white placeholder-gray-400"
            placeholder="Rechercher un joueur.."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <select className="w-full sm:w-56 bg-[#181818] border border-[#629F3F] rounded-lg px-4 py-2 text-white">
            <option>Tous Les Equipes</option>
          </select>
        </div>
        {/* Table - scrollable, sticky header */}
        <div className="overflow-y-auto max-h-[50vh] sm:max-h-[60vh] min-h-0">
          <table className="w-full text-sm border-separate border-spacing-y-2">
            <thead className="sticky top-0 bg-[#181818] z-10">
              <tr className="text-white uppercase text-left">
                <th className="font-bold px-4 py-3 bg-[#2a2a2a] rounded-l-lg text-xs">EQUIPE</th>
                <th className="font-bold px-4 py-3 bg-[#2a2a2a] text-xs">NOM</th>
                <th className="font-bold px-4 py-3 bg-[#2a2a2a] text-xs">VP</th>
                <th className="font-bold px-4 py-3 bg-[#2a2a2a] text-xs">% D'ACHAT</th>
                <th className="font-bold px-4 py-3 bg-[#2a2a2a] rounded-r-lg text-xs text-right">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-white py-8">Aucun joueur trouvé.</td>
                </tr>
              ) : (
                filteredPlayers.map((p, idx) => (
                  <tr className="bg-[#181818] rounded-lg" key={p.name + idx}>
                    <td className="px-4 py-3 align-middle"><img src={p.clubLogo} alt="logo" className="w-8 h-8 object-contain" /></td>
                    <td className="px-4 py-3 text-white font-bold align-middle">{p.name}</td>
                    <td className="px-4 py-3 text-white font-bold align-middle">{p.vp}</td>
                    <td className="px-4 py-3 text-white font-bold align-middle">{p.percent}</td>
                    <td className="px-4 py-3 align-middle text-right">
  <button
    className="min-w-[56px] sm:min-w-[72px] min-h-[36px] sm:min-h-[42px] bg-[#629F3F] text-white font-semibold text-sm sm:text-base rounded-lg hover:bg-[#4a7a2f] px-2 sm:px-4 transition-all duration-200"
    onClick={() => {
      setSelectedPlayer(p);
      setStep(steps.CONFIRM);
    }}
  >
    SELECTIONNER
  </button>
</td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  // Step 2: CONFIRM - Confirm transfer
  const renderConfirmStep = () => (
    <>
      {renderHeader('Marché des transferts', 'Confirmez le transfert du joueur')}
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-4">
        {/* Alert */}
        <div className="bg-[#181818] border border-[#FFD166] rounded-lg px-4 py-3 text-yellow-400 font-bold text-sm" style={{ fontFamily: 'Gotham SSM, Bebas Neue, sans-serif' }}>
          RAKI AOUANI a été retiré temporairement de votre équipe (+6 VP ajoutés au budget)
        </div>
        {/* Stat cards */}
        <div className="flex flex-row gap-3">
          <div className="flex-1 bg-[#181818] border border-[#629F3F] rounded-lg flex flex-col items-center justify-center py-3 min-w-[120px]">
            <span className="text-[#629F3F] text-xs font-bold uppercase">ÉQUIPE</span>
            <span className="text-white text-lg font-bold">15/15</span>
          </div>
          <div className="flex-1 bg-[#181818] border border-[#629F3F] rounded-lg flex flex-col items-center justify-center py-3 min-w-[120px]">
            <span className="text-[#629F3F] text-xs font-bold uppercase">BUDGET</span>
            <span className="text-white text-lg font-bold">5 VP</span>
          </div>
        </div>
        {/* Transfer cards */}
        <div className="flex flex-col gap-4">
          {/* Player out (visual) */}
          <div className="bg-[#181818] border border-[#629F3F] rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={selectedPlayer.clubLogo} alt="logo" className="w-10 h-10 object-contain" />
              <div>
                <div className="text-white font-bold text-lg" style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif' }}>{selectedPlayer.name}</div>
                <div className="text-[#bdbdbd] text-xs" style={{ fontFamily: 'Gotham SSM, Bebas Neue, sans-serif' }}>{selectedPlayer.club}</div>
                <span className="bg-[#22391a] text-[#629F3F] font-bold text-xs px-2 py-1 rounded uppercase inline-block mt-1" style={{ fontFamily: 'Gotham SSM, Bebas Neue, sans-serif' }}>{selectedPlayer.poste}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[#bdbdbd] text-xs" style={{ fontFamily: 'Gotham SSM, Bebas Neue, sans-serif' }}>PRIX DE TRANSFERT</span>
              <div className="text-[#629F3F] font-bold text-lg" style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif' }}>{selectedPlayer.vp} VP</div>
            </div>
          </div>
          {/* Transfer visual (arrows/icons) */}
          <div className="flex items-center justify-center gap-4">
            <span className="text-[#bdbdbd] text-2xl">⇄</span>
          </div>
          {/* Player in (visual) */}
          <div className="bg-[#181818] border border-[#629F3F] rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={selectedPlayer.clubLogo} alt="logo" className="w-10 h-10 object-contain" />
              <div>
                <div className="text-white font-bold text-lg" style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif' }}>{selectedPlayer.name}</div>
                <div className="text-[#bdbdbd] text-xs" style={{ fontFamily: 'Gotham SSM, Bebas Neue, sans-serif' }}>{selectedPlayer.club}</div>
                <span className="bg-[#22391a] text-[#629F3F] font-bold text-xs px-2 py-1 rounded uppercase inline-block mt-1" style={{ fontFamily: 'Gotham SSM, Bebas Neue, sans-serif' }}>{selectedPlayer.poste}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Footer actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button className="flex-1 border border-[#629F3F] text-white font-bold py-3 rounded-lg text-base uppercase hover:bg-[#2a2a2a]" onClick={() => setStep(steps.SELECT)}>RETOUR</button>
          <button className="flex-1 bg-[#629F3F] text-white font-bold py-3 rounded-lg text-base uppercase hover:bg-[#4a7a2f]" onClick={() => setStep(steps.SUCCESS)}>CONFIRMER</button>
        </div>
      </div>
    </>
  );

  // Step 3: SUCCESS - Success message
  const renderSuccessStep = () => (
    <>
      {renderHeader('Transfert Reussi', 'Le Joueur a été ajouté à votre équipe')}
      <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 gap-6">
        <div className="rounded-full bg-[#181818] border-4 border-[#629F3F] w-24 h-24 flex items-center justify-center mb-6">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#629F3F"/><path d="M16 25.5L22 31.5L34 19.5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div className="text-white text-2xl font-extrabold uppercase mb-2" style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif' }}>Transfert Reussi !</div>
        <div className="text-white text-base text-center" style={{ fontFamily: 'Gotham SSM, Bebas Neue, sans-serif' }}>{selectedPlayer.name} a été ajouté à votre équipe</div>
      </div>
    </>
  );

  // Main modal rendering
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4">
      <div className="bg-[#181818] rounded-t-2xl sm:rounded-2xl shadow-2xl border border-[#629F3F] w-full max-w-[1400px] max-h-[95vh] flex flex-col min-w-[280px] overflow-hidden">
        <div className="overflow-y-auto max-h-[95vh]">
          {step === steps.SELECT && renderSelectStep()}
          {step === steps.CONFIRM && renderConfirmStep()}
          {step === steps.SUCCESS && renderSuccessStep()}
        </div>
      </div>
    </div>
  );
};

TransfertModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TransfertModal;
