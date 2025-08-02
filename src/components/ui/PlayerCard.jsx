import React from 'react';
import PropTypes from 'prop-types';

function abbreviateName(name) {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  return parts[parts.length - 1].toUpperCase();
}

const CARD_WIDTH_CLASSES = "w-[52px] min-[350px]:w-[60px] min-[400px]:w-[68px] sm:w-[80px] md:w-[100px] lg:w-[120px] xl:w-[120px] max-w-[120px]";

const PlayerCard = ({ name, match, jerseySrc, onClick, role }) => (
  <div
    className={`relative flex flex-col items-center aspect-[110/120] ${CARD_WIDTH_CLASSES} mx-auto transition-transform duration-200 md:hover:scale-105`}
    onClick={onClick}
    style={{ cursor: onClick ? 'pointer' : 'default' }}
  >
    <div className="relative w-full h-full border-2 border-white rounded-md flex items-center justify-center overflow-visible bg-black/30">
      {/* Captain/Vice-captain icons */}
      {role && (role === 'Capitaine' || role === 'Vice-capitaine') && (
        <div className="absolute top-1 right-1 z-20">
          <div className={`w-4 h-4 rounded-full flex items-center justify-center text-white font-bold text-xs ${
            role === 'Capitaine' ? 'bg-green-500' : 'bg-blue-500'
          }`}>
            {role === 'Capitaine' ? 'C' : 'V'}
          </div>
        </div>
      )}
      
      <img
        src={jerseySrc}
        alt="Jersey"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 w-3/4 object-contain z-0"
        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}
      />
      <div className="absolute bottom-0 left-0 w-full flex flex-col z-10">
        <div
          className="bg-white border-b border-black px-1 py-0.5 font-extrabold uppercase text-center text-black tracking-tight truncate"
          style={{
            fontFamily: 'Bebas Neue, Gotham SSM, sans-serif',
            fontSize: 'clamp(8px, 2vw, 15px)',
            lineHeight: 1.1,
          }}
          title={name}
        >
          {abbreviateName(name)}
        </div>
        <div
          className="bg-black bg-opacity-40 px-1 py-0.5 font-bold uppercase text-center text-white tracking-wide rounded-b-md truncate"
          style={{
            fontFamily: 'Gotham SSM, Bebas Neue, sans-serif',
            fontSize: 'clamp(7px, 1.5vw, 13px)',
            lineHeight: 1.1,
          }}
          title={match}
        >
          {match}
        </div>
      </div>
    </div>
  </div>
);

PlayerCard.propTypes = {
  name: PropTypes.string.isRequired,
  match: PropTypes.string.isRequired,
  jerseySrc: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  role: PropTypes.string,
};

export default PlayerCard;
