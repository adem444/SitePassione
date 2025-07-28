import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlayerCard from '../ui/PlayerCard';

const mockSquad = [
  { name: 'SALAH EDDINE GHDESMI', match: 'VS EST', jerseySrc: '/jercy1/ess.webp', pos: 'gk' },
  { name: 'ADEM MHIRI', match: 'VS CA', jerseySrc: '/jercy1/est .webp', pos: 'def' },
  { name: 'GHDAMSI', match: 'VS CA', jerseySrc: '/jercy1/ca.webp', pos: 'def' },
  { name: 'DEF 3', match: 'VS CA', jerseySrc: '/jercy1/usm 2.webp', pos: 'def' },
  { name: 'DEF 4', match: 'VS CA', jerseySrc: '/jercy1/usbg.webp', pos: 'def' },
  { name: 'DEF 5', match: 'VS CA', jerseySrc: '/jercy1/usbg.webp', pos: 'def' },
  { name: 'MID 1', match: 'VS CA', jerseySrc: '/jercy1/marsa.webp', pos: 'mid' },
  { name: 'MID 2', match: 'VS CA', jerseySrc: '/jercy1/st.webp', pos: 'mid' },
  { name: 'MID 3', match: 'VS CA', jerseySrc: '/jercy1/beja.webp', pos: 'mid' },
  { name: 'ATT 1', match: 'VS CA', jerseySrc: '/jercy1/css.webp', pos: 'att' },
  { name: 'ATT 2', match: 'VS CA', jerseySrc: '/jercy1/as gabes.webp', pos: 'att' },
];

const POSITIONS = [
  { key: 'gk', label: 'Gardien' },
  { key: 'def', label: 'Défenseurs' },
  { key: 'mid', label: 'Milieux' },
  { key: 'att', label: 'Attaquants' },
];

const groupPlayersByPosition = (players) => {
  const grouped = { gk: [], def: [], mid: [], att: [] };
  players.forEach((p) => {
    if (grouped[p.pos]) grouped[p.pos].push(p);
  });
  return grouped;
};

const ClassementPlayerModal = ({ player, onClose }) => {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const squad = mockSquad;
  const grouped = groupPlayersByPosition(squad);

  useEffect(() => {
    closeButtonRef.current?.focus();
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!player) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div
className="
bg-[#181818] rounded-t-2xl sm:rounded-2xl shadow-2xl relative border border-[#629F3F]
w-full sm:max-w-[90vw] md:max-w-[95vw] lg:max-w-[1000px] xl:max-w-[1100px]
max-h-[95vh] flex flex-col overflow-hidden transition-all duration-300 ease-out
"

      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-8 pt-6 pb-3 border-b border-[#2a2a2a] bg-gradient-to-b from-[#2d4a1e] to-[#181818] rounded-t-2xl">
          <div className="flex items-center gap-4">
            <img
              src="/avatar.png"
              alt="avatar"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-[#629F3F] shadow-lg"
            />
            <div className="flex flex-col">
              <span
                className="text-white font-bold text-xl sm:text-2xl uppercase"
                style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif' }}
              >
                {player.name}
              </span>
              <span
                className="text-[#bdbdbd] text-sm sm:text-base mt-1 font-semibold"
                style={{ fontFamily: 'Gotham SSM, sans-serif' }}
              >
                <span className="px-2 py-1 rounded bg-[#232323] shadow text-white font-bold">
                  {player.points} PTS
                </span>
              </span>
              <span
                className="text-[#629F3F] text-sm sm:text-base font-bold mt-1"
                style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif' }}
              >
                Rang {player.rank}
              </span>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            className="text-white bg-[#629F3F] rounded-full w-10 h-10 flex items-center justify-center text-2xl z-20 shadow-lg hover:bg-[#4a7a2f] transition"
            onClick={onClose}
            aria-label="Fermer"
          >
            ×
          </button>
        </div>

        {/* Team Title */}
        <h3
          className="text-white text-lg sm:text-2xl font-bold text-center mt-3 sm:mt-4 uppercase tracking-wide"
          style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif' }}
        >
ÉQUIPE TIKI-TAKA        </h3>

        {/* Stadium & Players */}
        <div className="flex-1 w-full overflow-auto pb-4">
          <div
            className="w-full max-w-[900px] mx-auto px-2 sm:px-4 md:px-8 min-h-[350px] md:min-h-0 md:aspect-[4/3] xl:aspect-auto xl:h-[648px] bg-no-repeat bg-center bg-cover block relative flex flex-col justify-center gap-y-6 md:gap-y-8 lg:gap-y-12"
            style={{
              backgroundImage: 'url(/stadium.svg)',
              backgroundColor: '#222',
              overflow: 'visible',
            }}
            role="region"
            aria-label="Stade de football"
          >
            <div className="absolute inset-0 flex flex-col justify-evenly z-10 px-1 sm:px-4 py-2 gap-2 sm:gap-3">
              {POSITIONS.map(
                (pos) =>
                  grouped[pos.key].length > 0 && (
                    <div
                      key={pos.key}
                      className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 w-full"
                    >
                      {grouped[pos.key].map((p, j) => (
                        <div
                          key={j}
                          className="flex justify-center pointer-events-auto"
                          style={{
                            flex: '1 1 clamp(64px, 16vw, 120px)',
                            maxWidth: 'clamp(72px, 20vw, 140px)',
                          }}
                        >
                          <PlayerCard {...p} />
                        </div>
                      ))}
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ClassementPlayerModal.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    rank: PropTypes.number.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default ClassementPlayerModal;
