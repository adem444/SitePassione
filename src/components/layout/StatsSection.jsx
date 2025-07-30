import React, { useState } from 'react';
import { ChevronDown, Calendar, X } from 'lucide-react';

const StatsSection = () => {
  const [selectedGameweek, setSelectedGameweek] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const stats = {
    rankingPosition: 0,
    weeklyPoints: 0,
    ranking: '-',
    totalPoints: 0,
  };

  const gameweeks = Array.from({ length: 30 }, (_, i) => i + 1);
  const green = '#629F3F';

  // Close modal on Escape
  React.useEffect(() => {
    if (!modalOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [modalOpen]);

  return (
    <section 
      className="relative border-b px-3 py-2 sm:px-4 sm:py-3 md:px-6 lg:px-8 w-full bg-[#141414] border-2 border-[#1D1D1D]"
    >
      {/* Modal for Gameweek Selection */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-[#181818] rounded-2xl shadow-2xl w-full max-w-md mx-2 p-0 relative animate-fade-in-up" style={{ boxShadow: '0 8px 32px 0 rgba(98,159,63,0.18)' }}>
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#222]">
              <h2 className="text-white font-heading text-2xl font-bold tracking-wide" style={{ color: green }}>
                Sélectionner la Journée
              </h2>
              <button
                className="text-gray-400 hover:text-white transition-colors p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-[#629F3F]"
                onClick={() => setModalOpen(false)}
                aria-label="Fermer"
              >
                <X size={24} />
              </button>
            </div>
            {/* Modal Content with radio buttons */}
            <form className="max-h-96 overflow-y-auto py-2 pb-20 custom-scrollbar" onSubmit={e => { e.preventDefault(); setModalOpen(false); }}>
              <fieldset>
                <legend className="sr-only">Choisir la journée</legend>
                {gameweeks.map((num) => (
                  <label
                    key={num}
                    className={`flex items-center px-6 py-3 cursor-pointer font-heading text-lg transition-all duration-100 rounded-lg mb-1 last:mb-0 select-none ${selectedGameweek === num ? 'bg-[#629F3F] text-white font-extrabold shadow' : 'text-white hover:bg-[#629F3F]/80 hover:text-white'} focus-within:bg-[#629F3F] focus-within:text-white`}
                    tabIndex={0}
                  >
                    <span className="relative flex items-center mr-3">
                      <input
                        type="radio"
                        name="gameweek"
                        value={num}
                        checked={selectedGameweek === num}
                        onChange={() => setSelectedGameweek(num)}
                        className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:border-[#629F3F] checked:bg-[#629F3F] focus:outline-none focus:ring-2 focus:ring-[#629F3F] transition-all"
                        style={{ minWidth: 20, minHeight: 20 }}
                        aria-checked={selectedGameweek === num}
                        aria-label={`${num}ère Journée`}
                      />
                      {/* Custom radio indicator */}
                      <span
                        className={`absolute left-0 top-0 w-5 h-5 rounded-full border-2 pointer-events-none ${selectedGameweek === num ? 'border-[#629F3F] bg-[#629F3F]' : 'border-gray-400 bg-transparent'} flex items-center justify-center`}
                        aria-hidden="true"
                      >
                        {selectedGameweek === num && (
                          <span className="block w-2.5 h-2.5 rounded-full bg-white" />
                        )}
                      </span>
                    </span>
                    {`${num}ère Journée`}
                  </label>
                ))}
              </fieldset>
              {/* Padding bottom for fixed button */}
            </form>
            {/* Fixed confirm button */}
            <div className="fixed left-1/2 -translate-x-1/2 bottom-8 w-full max-w-md px-6 z-50 pointer-events-none">
              <button
                type="submit"
                form=""
                className="bg-gradient-to-r from-[#629F3F] to-[#4e7e32] hover:from-[#4e7e32] hover:to-[#3d5f28] text-white font-bold uppercase px-8 py-4 rounded-full text-lg transition-all w-full pointer-events-auto shadow-2xl transform hover:scale-105 border-2 border-[#629F3F]/30"
                style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif', boxShadow: '0 8px 32px 0 rgba(98,159,63,0.3)'}}
                onClick={() => setModalOpen(false)}
              >
                ✓ Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="mx-auto py-2 sm:py-3">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-3 lg:space-y-0">
          {/* Mobile: Top Row - Gameweek and Status */}
          <div className="flex lg:hidden items-center justify-between w-full">
            {/* Gameweek Selector */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                className="flex items-center space-x-2 bg-transparent border-none shadow-none outline-none focus:outline-none focus:ring-2 focus:ring-[#629F3F] font-heading text-lg font-bold p-0 m-0 hover:opacity-80 transition-all"
                style={{ boxShadow: 'none' }}
                onClick={() => setModalOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={modalOpen}
                aria-label="Sélectionner la journée"
                type="button"
              >
                <Calendar size={20} className="text-gray-400" />
                <span className="text-white font-heading text-lg tracking-wide select-none">
                  {selectedGameweek}ère Journée
                </span>
                <ChevronDown size={20} className="text-gray-400" />
              </button>
            </div>
            {/* Status Badge */}
            <span className="text-white px-3 py-1 font-medium text-xs sm:text-sm rounded-lg" style={{ background: green }}>
              EN COURS
            </span>
          </div>

          {/* Desktop: Left Side - Gameweek Selector */}
          <div className="hidden lg:flex items-center space-x-4 flex-1">
            <button
              className="flex items-center space-x-2 bg-transparent border-none shadow-none outline-none focus:outline-none focus:ring-2 focus:ring-[#629F3F] font-heading text-xl font-bold p-0 m-0 hover:opacity-80 transition-all"
              style={{ boxShadow: 'none' }}
              onClick={() => setModalOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={modalOpen}
              aria-label="Sélectionner la journée"
              type="button"
            >
              <Calendar size={24} className="text-gray-400" />
              <span className="text-white font-heading text-xl tracking-wide select-none">
                {selectedGameweek}ère Journée
              </span>
              <ChevronDown size={24} className="text-gray-400" />
            </button>
          </div>

          {/* Stats Section - Single line on mobile, responsive on desktop */}
          <div className="flex items-center justify-center space-x-4 sm:space-x-6 lg:space-x-8 xl:space-x-10 text-center w-full ">
            {[
              { value: stats.rankingPosition, label: 'Classement /J' },
              { value: stats.weeklyPoints, label: 'Pts journée' },
              { value: stats.ranking, label: 'Classement' },
              { value: stats.totalPoints, label: 'Total pts' },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white">
                  {item.value}
                </div>
                <div className="text-xs sm:text-sm md:text-base mt-1" style={{ color: green, fontWeight: 600 }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Right Side - Status */}
          <div className="hidden lg:block flex-shrink-0">
            <span className="text-white px-6 py-3 font-medium text-sm rounded-lg block text-center" style={{ background: green }}>
              EN COURS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
