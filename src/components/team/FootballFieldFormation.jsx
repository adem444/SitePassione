import React from "react";
import PlayerCard from "../ui/PlayerCard";

const FootballFieldFormation = ({
  players,
  budget,
  onAddPlayer,
  onReplacePlayer,
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
                      match="VS Opponent"
                      jerseySrc={player.jersey}
                      onClick={() => onReplacePlayer && onReplacePlayer(player)}
                    />
                  ) : (
                    <div
                      className="w-full h-full bg-black/30 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-green-400 transition-colors"
                      onClick={() => onAddPlayer && onAddPlayer(row.key)}
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
