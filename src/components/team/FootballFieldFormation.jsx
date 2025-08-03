import React from "react";
import PlayerCard from "../ui/PlayerCard";

const FootballFieldFormation = ({
  players,
  budget,
  onAddPlayer,
  onReplacePlayer,
  onSelectPlayer, // New prop for selecting players
  availablePlayers, // New prop for available players
  activeFilter, // New prop for current position filter
  onPositionChange, // New prop for changing position filter
  setShowPlayerModal, // Prop to control existing modal
  getPlayerOpponent, // Function to get opponent for a player
}) => {
  // Group players by position for display
  const groupedPlayers = {
    GK: players.filter((p) => p.position === "GK" && p.name),
    DEF: players.filter((p) => p.position === "DEF" && p.name),
    MID: players.filter((p) => p.position === "MID" && p.name),
    FWD: players.filter((p) => p.position === "FWD" && p.name),
  };

  // Fixed formation positions
  const formation = {
    GK: 2,   // 2 goalkeepers
    DEF: 5,  // 5 defenders
    MID: 5,  // 5 midfielders
    FWD: 3   // 3 forwards
  };

  // Position rows configuration
  const positionRows = [
    { key: "GK", label: "Gardiens", count: formation.GK },
    { key: "DEF", label: "Défenseurs", count: formation.DEF },
    { key: "MID", label: "Milieux", count: formation.MID },
    { key: "FWD", label: "Attaquants", count: formation.FWD },
  ];

  // Handle player click to show available players
  const handlePlayerClick = (position) => {
    console.log('Football field position clicked:', position);
    
    if (onPositionChange) {
      console.log('Calling onPositionChange with:', position);
      onPositionChange(position);
    }
    
    // On mobile, show the existing modal
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      console.log('Mobile device detected, showing modal');
      if (setShowPlayerModal) {
        setShowPlayerModal(true);
      }
    } else {
      console.log('Desktop device detected, position filter updated');
    }
    // On desktop, the right panel will automatically show the selected position
  };

  return (
    <section className="w-full bg-black mt-6" aria-label="Mon équipe sur le terrain">
      {/* Stadium Container */}
      <div
        className="w-full h-[550px] sm:h-[580px] md:h-[500px] lg:h-[600px] xl:h-[580px] bg-no-repeat bg-center bg-cover flex flex-col justify-evenly px-2 sm:px-4 md:px-0 gap-y-4 sm:gap-y-5 md:gap-y-6 lg:gap-y-8"
        style={{
          backgroundImage: "url(/stadium.svg)",
          backgroundColor: "#222",
        }}
        role="region"
        aria-label="Stade de football"
      >
        {/* Render each position row */}
        {positionRows.map((row) => (
          <div
            key={row.key}
            className="flex justify-center items-center gap-x-2 sm:gap-x-4 md:gap-x-6 lg:gap-x-8"
            role="group"
            aria-label={row.label}
          >
            {/* Render player slots for this position */}
            {Array.from({ length: row.count }, (_, index) => {
              const player = groupedPlayers[row.key][index];

              return (
                <div
                  key={index}
                  className="flex justify-center items-center rounded-xl w-[clamp(65px,15vw,90px)] h-[clamp(80px,17vw,110px)] sm:w-[clamp(70px,14vw,95px)] sm:h-[clamp(90px,16vw,120px)] md:w-[clamp(65px,12vw,85px)] md:h-[clamp(80px,14vw,100px)] lg:w-[clamp(70px,10vw,90px)] lg:h-[clamp(90px,12vw,110px)] xl:w-[clamp(75px,9vw,95px)] xl:h-[clamp(95px,11vw,115px)]"
                >
                  {player ? (
                    <PlayerCard
                      name={player.name}
                      match={getPlayerOpponent ? getPlayerOpponent(player) : "VS Opponent"}
                      jerseySrc={player.jersey}
                      onClick={() => handlePlayerClick(row.key)}
                      role={player.role}
                      availabilityStatus={player.availabilityStatus}
                      mvp={player.mvp}
                      isInjured={player.isInjured}
                      redCard={player.redCard}
                    />
                  ) : (
                    <div
                      className="w-full h-full bg-black/30 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-green-400 transition-colors"
                      onClick={() => handlePlayerClick(row.key)}
                    >
                      <span className="text-gray-400 text-[clamp(16px,4vw,26px)] font-bold">+</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FootballFieldFormation;
