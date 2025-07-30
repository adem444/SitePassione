import React from "react";
import PlayerCard from '../ui/PlayerCard';

const FootballFieldFormation = ({ 
  players, 
  budget, 
  onAddPlayer,
  onReplacePlayer
}) => {
  // Group players by position for display
  const groupedPlayers = {
    GK: players.filter(p => p.position === "GK" && p.name),
    DEF: players.filter(p => p.position === "DEF" && p.name),
    MID: players.filter(p => p.position === "MID" && p.name),
    ATT: players.filter(p => p.position === "ATT" && p.name)
  };

  return (
    <section className="w-full bg-black mt-6" aria-label="Mon équipe sur le terrain">


      {/* Header Stats */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
        <div
          style={{ borderColor: 'rgb(98, 159, 63)', backgroundColor: 'rgb(20, 20, 20)' }}
          className="border rounded-lg px-6 md:px-10 py-6 text-center w-full md:w-[300px]"
        >
          <div className="text-gray-400 text-sm flex items-center justify-center gap-1">
            <span className="text-white">👥</span>
            ÉQUIPE
          </div>
          <div className="text-white text-3xl font-bold">
            {players.filter(p => p.name).length}/15
          </div>
        </div>
        <div
          style={{ borderColor: 'rgb(98, 159, 63)', backgroundColor: 'rgb(20, 20, 20)' }}
          className="border rounded-lg px-6 md:px-10 py-6 text-center w-full md:w-[300px]"
        >
          <div className="text-gray-400 text-sm flex items-center justify-center gap-1">
            <span className="text-white">💰</span>
            BUDGET
          </div>
          <div className="text-white text-3xl font-bold">{budget} VP</div>
        </div>
      </div>

      {/* Stadium area with fixed formation */}
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
        {/* Fixed Formation Layout */}
        
        {/* Goalkeepers Row - Fixed 2 positions */}
        <div className="flex flex-row items-center justify-center gap-2 md:gap-10 lg:gap-12 w-full" style={{ maxWidth: 600, margin: '0 auto' }}>
          {Array.from({ length: 2 }, (_, index) => {
            const player = groupedPlayers.GK[index];
            return (
              <div key={index} className="flex-1 flex justify-center aspect-[110/120] drop-shadow-md" style={{ maxWidth: '90px' }}>
                {player ? (
                  <PlayerCard
                    name={player.name}
                    match="VS Opponent"
                    jerseySrc="/jercy1/ess.webp"
                    onClick={() => onReplacePlayer && onReplacePlayer(player)}
                  />
                ) : (
                  <div 
                    className="w-full h-full bg-black/30 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-green-400 transition-colors"
                    onClick={() => onAddPlayer && onAddPlayer("GK")}
                  >
                    <span className="text-gray-400 text-2xl font-bold">+</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Defenders Row - Fixed 5 positions */}
        <div className="flex flex-row items-center justify-center gap-2 md:gap-10 lg:gap-12 w-full" style={{ maxWidth: 600, margin: '0 auto' }}>
          {Array.from({ length: 5 }, (_, index) => {
            const player = groupedPlayers.DEF[index];
            return (
              <div key={index} className="flex-1 flex justify-center aspect-[110/120] drop-shadow-md" style={{ maxWidth: '90px' }}>
                {player ? (
                  <PlayerCard
                    name={player.name}
                    match="VS Opponent"
                    jerseySrc="/jercy1/ess.webp"
                    onClick={() => onReplacePlayer && onReplacePlayer(player)}
                  />
                ) : (
                  <div 
                    className="w-full h-full bg-black/30 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-green-400 transition-colors"
                    onClick={() => onAddPlayer && onAddPlayer("DEF")}
                  >
                    <span className="text-gray-400 text-2xl font-bold">+</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Midfielders Row - Fixed 5 positions */}
        <div className="flex flex-row items-center justify-center gap-2 md:gap-10 lg:gap-12 w-full" style={{ maxWidth: 600, margin: '0 auto' }}>
          {Array.from({ length: 5 }, (_, index) => {
            const player = groupedPlayers.MID[index];
            return (
              <div key={index} className="flex-1 flex justify-center aspect-[110/120] drop-shadow-md" style={{ maxWidth: '90px' }}>
                {player ? (
                  <PlayerCard
                    name={player.name}
                    match="VS Opponent"
                    jerseySrc="/jercy1/ess.webp"
                    onClick={() => onReplacePlayer && onReplacePlayer(player)}
                  />
                ) : (
                  <div 
                    className="w-full h-full bg-black/30 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-green-400 transition-colors"
                    onClick={() => onAddPlayer && onAddPlayer("MID")}
                  >
                    <span className="text-gray-400 text-2xl font-bold">+</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Attackers Row - Fixed 3 positions */}
        <div className="flex flex-row items-center justify-center gap-2 md:gap-10 lg:gap-12 w-full" style={{ maxWidth: 600, margin: '0 auto' }}>
          {Array.from({ length: 3 }, (_, index) => {
            const player = groupedPlayers.ATT[index];
            return (
              <div key={index} className="flex-1 flex justify-center aspect-[110/120] drop-shadow-md" style={{ maxWidth: '90px' }}>
                {player ? (
                  <PlayerCard
                    name={player.name}
                    match="VS Opponent"
                    jerseySrc="/jercy1/ess.webp"
                    onClick={() => onReplacePlayer && onReplacePlayer(player)}
                  />
                ) : (
                  <div 
                    className="w-full h-full bg-black/30 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-green-400 transition-colors"
                    onClick={() => onAddPlayer && onAddPlayer("ATT")}
                  >
                    <span className="text-gray-400 text-2xl font-bold">+</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FootballFieldFormation;