import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlayerCard from '../ui/PlayerCard';
import PlayerModal from '../modals/PlayerModal';

const defaultReplacements = [
  { name: 'REM 1', match: 'VS C AFRICAIN', jerseySrc: 'jercy1/jerjis.webp' },
  { name: 'REM 2', match: 'VS C AFRICAIN', jerseySrc: 'jercy1/kairouane.webp' },
  { name: 'REM 3', match: 'VS C AFRICAIN', jerseySrc: 'jercy1/cab.webp' },
  { name: 'REM 4', match: 'VS C AFRICAIN', jerseySrc: 'jercy1/slimane.webp' },
];

const ReplacementsSection = ({ substitutes = [], loading = false, layout = "column" }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  // Show loading state
  if (loading) {
    return (
      <section className="w-full flex flex-col items-center justify-center min-h-[60px] sm:min-h-[80px] md:min-h-[100px] py-2" style={{background:'#141414', border:'1px solid #1D1D1D', borderRadius:0, marginTop:20}}>
        <h4 className="text-white font-bold uppercase text-center text-base xs:text-l sm:text-s md:text-l mb-2 lg:mb-10" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif', lineHeight:'32px'}}>REMPLAÇANTS</h4>
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#629F3F]"></div>
        </div>
      </section>
    );
  }

  // Use substitutes if provided, otherwise use default replacements
  const displayPlayers = substitutes.length > 0 ? substitutes : defaultReplacements;

  return (
    <section className="w-full flex flex-col items-center justify-center min-h-[60px] sm:min-h-[80px] md:min-h-[100px] py-2" style={{background:'#141414', border:'1px solid #1D1D1D', borderRadius:0, marginTop:20}}>
      <h2 className="text-white font-bold uppercase text-center text-base xs:text-lg sm:text-xl md:text-2xl mb-2 lg:mb-10" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif', lineHeight:'32px'}}>REMPLAÇANTS</h2>
      <div className={`flex ${layout === "row" ? "flex-row" : "flex-row lg:flex-col"} items-center justify-center gap-2 lg:gap-9 lg:items-stretch lg:justify-between w-full`}>
        {displayPlayers.map((p, i) => (
          <PlayerCard 
            key={i} 
            name={p.name} 
            match={p.match} 
            jerseySrc={p.jerseySrc} 
            onClick={() => setSelectedPlayer(p)}
            role={p.role}
          />
        ))}
      </div>
      {selectedPlayer && (
        <PlayerModal
          player={selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </section>
  );
};

ReplacementsSection.propTypes = {
  substitutes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      match: PropTypes.string.isRequired,
      jerseySrc: PropTypes.string.isRequired,
      role: PropTypes.string,
    })
  ),
  loading: PropTypes.bool,
  layout: PropTypes.oneOf(['row', 'column']),
};

export default ReplacementsSection; 