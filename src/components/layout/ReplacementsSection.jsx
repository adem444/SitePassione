import React from 'react';
import PropTypes from 'prop-types';
import PlayerCard from '../ui/PlayerCard';

const replacements = [
  { name: 'REM 1', match: 'VS C AFRICAIN', jerseySrc: '/ess.webp' },
  { name: 'REM 2', match: 'VS C AFRICAIN', jerseySrc: '/ess.webp' },
  { name: 'REM 3', match: 'VS C AFRICAIN', jerseySrc: '/ess.webp' },
  { name: 'REM 4', match: 'VS C AFRICAIN', jerseySrc: '/ess.webp' },
];

const ReplacementsSection = () => (
  <section className="w-full flex flex-col items-center justify-center min-h-[60px] sm:min-h-[80px] md:min-h-[100px] py-2" style={{background:'#141414', border:'1px solid #1D1D1D', borderRadius:0, marginTop:20}}>
    <h2 className="text-white font-bold uppercase text-center text-base xs:text-lg sm:text-xl md:text-2xl mb-2 lg:mb-10" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif', lineHeight:'32px'}}>REMPLAÇANTS</h2>
    <div className="flex flex-row lg:flex-col items-center justify-center gap-2 lg:gap-9 lg:items-stretch lg:justify-between w-full">
      {replacements.map((p, i) => (
        <PlayerCard key={i} name={p.name} match={p.match} jerseySrc={p.jerseySrc} />
      ))}
    </div>
  </section>
);

export default ReplacementsSection; 