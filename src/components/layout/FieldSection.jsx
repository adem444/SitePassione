import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlayerCard from '../ui/PlayerCard';
import PlayerModal from '../modals/PlayerModal';

// Utility to group players by position
function groupPlayersByPosition(players) {
  const grouped = { gk: [], def: [], mid: [], att: [] };
  players.forEach((p) => {
    if (grouped[p.pos]) grouped[p.pos].push(p);
  });
  return grouped;
}

const defaultPlayers = [
  {
    name: 'SALAH EDDINE GHDESMI',
    match: 'VS Esperence Sportive De Tunis',
    jerseySrc: '/jercy1/ess.webp',
    pos: 'gk',
    club: 'Etoile Sportive Du Sahel',
    clubLogo: '/EST.png',
    status: 'Certain de jouer',
    selection: '15,3%',
    age: 26,
    nationality: 'Tunisien',
    role: 'Capitaine',
    upcoming: true,
    opponent: 'Esperence Sportive De Tunis',
    opponentLogo: '/EST.png',
    isHome: false,
    stats: { atk: true, value: 9 },
  },
  {
    name: 'ADEM MHIRI',
    match: 'VS Club Africain',
    jerseySrc: '/jercy1/est .webp',
    pos: 'def',
    club: 'Etoile Sportive Du Sahel',
    clubLogo: '/EST.png',
    status: 'Certain de jouer',
    selection: '12,1%',
    age: 24,
    nationality: 'Tunisien',
    role: 'Défenseur',
    upcoming: false, // Mark as finished
    opponent: 'Club Africain',
    opponentLogo: '/ESS.png',
    isHome: false,
    stats: { atk: false, value: 7 },
  },
  {
    name: 'GHDAMSI',
    match: 'VS Club Africain',
    jerseySrc: 'jercy1/ca.webp',
    pos: 'def',
    club: 'Etoile Sportive Du Sahel',
    clubLogo: '/EST.png',
    status: 'Incertain',
    selection: '8,7%',
    age: 27,
    nationality: 'Tunisien',
    role: 'Défenseur',
    upcoming: false,
    opponent: 'Club Africain',
    opponentLogo: '/ESS.png',
    isHome: false,
    stats: { atk: false, value: 6 },
  },
  { name: 'DEF 3', match: 'VS Club Africain', jerseySrc: 'jercy1/usm 2.webp', pos: 'def' },
  { name: 'DEF 4', match: 'VS Club Africain', jerseySrc: 'jercy1/usbg.webp', pos: 'def' },
  { name: 'DEF 5', match: 'VS Club Africain', jerseySrc: 'jercy1/marsa.webp', pos: 'mid' },
  { name: 'MID 1', match: 'VS Club Africain', jerseySrc: 'jercy1/st.webp', pos: 'mid' },
  { name: 'MID 2', match: 'VS Club Africain', jerseySrc: 'jercy1/beja.webp', pos: 'mid' },
  { name: 'MID 3', match: 'VS Club Africain', jerseySrc: 'jercy1/omran.webp', pos: 'mid' },
  { name: 'ATT 1', match: 'VS Club Africain', jerseySrc: 'jercy1/css.webp', pos: 'att' },
  { name: 'ATT 2', match: 'VS Club Africain', jerseySrc: 'jercy1/as gabes.webp', pos: 'att' },
];

const POSITIONS = ['gk', 'def', 'mid', 'att'];

const FieldSection = ({ players = defaultPlayers }) => {
  // Group players by their position
  const grouped = groupPlayersByPosition(players);

  // Modal state
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  return (
    <section className="w-full bg-black mt-6" aria-label="Mon équipe sur le terrain">
      <div className="flex flex-col sm:flex-row items-start justify-between px-0 pt-4 pb-2">
        <h2 className="text-white font-bold uppercase text-2xl sm:text-3xl md:text-4xl lg:text-[36px] leading-tight text-left" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>MON ÉQUIPE TIKI-TAKA</h2>
        <span className="inline-block bg-black border border-[#629F3F] text-[#629F3F] font-bold uppercase rounded-full px-4 py-1 text-sm sm:text-base mt-2 sm:mt-0" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif', letterSpacing:'0.04em'}}>
          Formation {grouped.def.length}-{grouped.mid.length}-{grouped.att.length}
        </span>
      </div>
      {/* Stadium area with player cards */}
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
        {POSITIONS.map((pos, i) => (
          grouped[pos].length > 0 && (
            <div
              key={pos}
              className="flex flex-row items-center justify-center gap-2 md:gap-10 lg:gap-12 w-full"
              style={{ maxWidth: 600, margin: '0 auto' }}
              role="group"
              aria-label={pos === 'gk' ? 'Gardien' : pos === 'def' ? 'Défenseurs' : pos === 'mid' ? 'Milieux' : 'Attaquants'}
            >
              {grouped[pos].map((p, j) => (
                <div
                  key={j}
                  className="flex-1 flex justify-center aspect-[110/120] drop-shadow-md"
                  style={{
                    maxWidth: grouped[pos].length > 5 ? `${100 / grouped[pos].length}%` : '90px',
                  }}
                >
                  <PlayerCard
                    name={p.name}
                    match={p.match}
                    jerseySrc={p.jerseySrc}
                    onClick={() => setSelectedPlayer(p)}
                  />
                </div>
              ))}
            </div>
          )
        ))}
        {selectedPlayer && (
          <PlayerModal
            player={selectedPlayer}
            onClose={() => setSelectedPlayer(null)}
          />
        )}
      </div>
    </section>
  );
};

FieldSection.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      match: PropTypes.string.isRequired,
      jerseySrc: PropTypes.string.isRequired,
      pos: PropTypes.string.isRequired,
    })
  ),
};

export default FieldSection; 