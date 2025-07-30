import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FootballFieldFormation from './FootballFieldFormation'
import PartnersSection from './PartnersSection'

const SelectionneJoueur = () => {
  const navigate = useNavigate()
  const [positions, setPositions] = useState([
    { name: 'GARDIENS', count: 0, max: 2, selected: 0 },
    { name: 'DÉFENSEURS', count: 0, max: 5, selected: 0 },
    { name: 'MILIEUX', count: 0, max: 5, selected: 0 },
    { name: 'ATTAQUANTS', count: 0, max: 3, selected: 0 }
  ])

  const [budget, setBudget] = useState(100)
  const [selectedPosition, setSelectedPosition] = useState(null)
  const [showPlayerList, setShowPlayerList] = useState(false)
  const [playerToReplace, setPlayerToReplace] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTeam, setSelectedTeam] = useState("Tous Les Equipes")

  // Function to get team logo - using a default placeholder since images don't exist
  const getTeamLogo = (teamCode) => {
    // Return a default placeholder or use a public image if available
    return '/logo.png' // Using the existing logo.png as a fallback
  }

  // Available players data with team information
  const availablePlayers = [
    // Goalkeepers
    { id: "gk1", name: "Raki Aouani", position: "GK", price: 4, rating: 88, team: "ESS" },
    { id: "gk2", name: "Mouez Hassen", position: "GK", price: 4, rating: 87, team: "CA" },
    { id: "gk3", name: "Aymen Dahmen", position: "GK", price: 4, rating: 89, team: "CSS" },
    { id: "gk4", name: "Bechir Ben Said", position: "GK", price: 4, rating: 86, team: "USM" },
    { id: "gk5", name: "Moez Ben Cherifia", position: "GK", price: 4, rating: 85, team: "EST" },
    { id: "gk6", name: "Aymen Mathlouthi", position: "GK", price: 4, rating: 84, team: "CA" },
    { id: "gk7", name: "Farouk Ben Mustapha", position: "GK", price: 4, rating: 83, team: "CSS" },
    { id: "gk8", name: "Moez Balbouli", position: "GK", price: 4, rating: 82, team: "USM" },
    { id: "gk9", name: "Hamza Jelassi", position: "GK", price: 4, rating: 81, team: "MET" },
    { id: "gk10", name: "Anis Ben Slimane", position: "GK", price: 4, rating: 80, team: "JSO" },
    { id: "gk11", name: "Ghailene Chaalali", position: "GK", price: 4, rating: 82, team: "BGD" },
    { id: "gk12", name: "Youssef Msakni", position: "GK", price: 4, rating: 79, team: "SOL" },
    { id: "gk13", name: "Naim Sliti", position: "GK", price: 4, rating: 81, team: "ASG" },
    { id: "gk14", name: "Firas Ben Arbi", position: "GK", price: 4, rating: 80, team: "ZAR" },
    { id: "gk15", name: "Seifeddine Jaziri", position: "GK", price: 4, rating: 83, team: "JSK" },
    { id: "gk16", name: "Taha Yassine Khenissi", position: "GK", price: 4, rating: 82, team: "MON" },
    { id: "gk17", name: "Wahbi Khazri", position: "GK", price: 4, rating: 80, team: "ST" },
    { id: "gk18", name: "Hamza Lahmar", position: "GK", price: 4, rating: 83, team: "OB" },
    
    // Defenders
    { id: "def1", name: "Dylan Bronn", position: "DEF", price: 4, rating: 90, team: "CSS" },
    { id: "def2", name: "Montassar Talbi", position: "DEF", price: 4, rating: 89, team: "USM" },
    { id: "def3", name: "Yassine Meriah", position: "DEF", price: 4, rating: 88, team: "CA" },
    { id: "def4", name: "Bilel Ifa", position: "DEF", price: 4, rating: 87, team: "EST" },
    { id: "def5", name: "Hamza Jelassi", position: "DEF", price: 4, rating: 86, team: "ESS" },
    { id: "def6", name: "Oussama Haddadi", position: "DEF", price: 4, rating: 85, team: "CA" },
    { id: "def7", name: "Ali Maaloul", position: "DEF", price: 4, rating: 84, team: "CSS" },
    { id: "def8", name: "Wajdi Kechrida", position: "DEF", price: 4, rating: 83, team: "USM" },
    { id: "def9", name: "Ellyes Skhiri", position: "DEF", price: 4, rating: 87, team: "MET" },
    { id: "def10", name: "Aissa Laidouni", position: "DEF", price: 4, rating: 86, team: "JSO" },
    { id: "def11", name: "Ferjani Sassi", position: "DEF", price: 4, rating: 85, team: "BGD" },
    { id: "def12", name: "Hamza Lahmar", position: "DEF", price: 4, rating: 84, team: "SOL" },
    { id: "def13", name: "Anis Ben Slimane", position: "DEF", price: 4, rating: 88, team: "ASG" },
    { id: "def14", name: "Ghailene Chaalali", position: "DEF", price: 4, rating: 83, team: "ZAR" },
    { id: "def15", name: "Youssef Msakni", position: "DEF", price: 4, rating: 87, team: "JSK" },
    { id: "def16", name: "Naim Sliti", position: "DEF", price: 4, rating: 85, team: "MON" },
    { id: "def17", name: "Firas Ben Arbi", position: "DEF", price: 4, rating: 84, team: "ST" },
    { id: "def18", name: "Seifeddine Jaziri", position: "DEF", price: 4, rating: 86, team: "OB" },
    
    // Midfielders
    { id: "mid1", name: "Ellyes Skhiri", position: "MID", price: 4, rating: 92, team: "CSS" },
    { id: "mid2", name: "Aissa Laidouni", position: "MID", price: 4, rating: 91, team: "USM" },
    { id: "mid3", name: "Ferjani Sassi", position: "MID", price: 4, rating: 90, team: "CA" },
    { id: "mid4", name: "Hamza Lahmar", position: "MID", price: 4, rating: 89, team: "EST" },
    { id: "mid5", name: "Anis Ben Slimane", position: "MID", price: 4, rating: 88, team: "ESS" },
    { id: "mid6", name: "Ghailene Chaalali", position: "MID", price: 4, rating: 87, team: "CA" },
    { id: "mid7", name: "Hamza Jelassi", position: "MID", price: 4, rating: 86, team: "CSS" },
    { id: "mid8", name: "Youssef Msakni", position: "MID", price: 4, rating: 85, team: "USM" },
    { id: "mid9", name: "Naim Sliti", position: "MID", price: 4, rating: 89, team: "MET" },
    { id: "mid10", name: "Firas Ben Arbi", position: "MID", price: 4, rating: 88, team: "JSO" },
    { id: "mid11", name: "Seifeddine Jaziri", position: "MID", price: 4, rating: 90, team: "BGD" },
    { id: "mid12", name: "Taha Yassine Khenissi", position: "MID", price: 4, rating: 87, team: "SOL" },
    { id: "mid13", name: "Wahbi Khazri", position: "MID", price: 4, rating: 91, team: "ASG" },
    { id: "mid14", name: "Hamza Lahmar", position: "MID", price: 4, rating: 86, team: "ZAR" },
    { id: "mid15", name: "Moez Ben Cherifia", position: "MID", price: 4, rating: 89, team: "JSK" },
    { id: "mid16", name: "Aymen Dahmen", position: "MID", price: 4, rating: 88, team: "MON" },
    { id: "mid17", name: "Bechir Ben Said", position: "MID", price: 4, rating: 87, team: "ST" },
    { id: "mid18", name: "Moez Balbouli", position: "MID", price: 4, rating: 90, team: "OB" },
    
    // Attackers
    { id: "att1", name: "Seifeddine Jaziri", position: "ATT", price: 4, rating: 94, team: "CSS" },
    { id: "att2", name: "Taha Yassine Khenissi", position: "ATT", price: 4, rating: 93, team: "USM" },
    { id: "att3", name: "Wahbi Khazri", position: "ATT", price: 4, rating: 92, team: "CA" },
    { id: "att4", name: "Hamza Jelassi", position: "ATT", price: 4, rating: 91, team: "EST" },
    { id: "att5", name: "Firas Ben Arbi", position: "ATT", price: 4, rating: 90, team: "ESS" },
    { id: "att6", name: "Youssef Msakni", position: "ATT", price: 4, rating: 89, team: "CSS" },
    { id: "att7", name: "Naim Sliti", position: "ATT", price: 4, rating: 88, team: "USM" },
    { id: "att8", name: "Hamza Lahmar", position: "ATT", price: 4, rating: 87, team: "CA" },
    { id: "att9", name: "Ellyes Skhiri", position: "ATT", price: 4, rating: 93, team: "MET" },
    { id: "att10", name: "Aissa Laidouni", position: "ATT", price: 4, rating: 92, team: "JSO" },
    { id: "att11", name: "Ferjani Sassi", position: "ATT", price: 4, rating: 91, team: "BGD" },
    { id: "att12", name: "Hamza Lahmar", position: "ATT", price: 4, rating: 90, team: "SOL" },
    { id: "att13", name: "Anis Ben Slimane", position: "ATT", price: 4, rating: 94, team: "ASG" },
    { id: "att14", name: "Ghailene Chaalali", position: "ATT", price: 4, rating: 89, team: "ZAR" },
    { id: "att15", name: "Youssef Msakni", position: "ATT", price: 4, rating: 93, team: "JSK" },
    { id: "att16", name: "Naim Sliti", position: "ATT", price: 4, rating: 91, team: "MON" },
    { id: "att17", name: "Firas Ben Arbi", position: "ATT", price: 4, rating: 92, team: "ST" },
    { id: "att18", name: "Seifeddine Jaziri", position: "ATT", price: 4, rating: 95, team: "OB" },
  ]

  // Define the formation positions (4-3-3 formation)
  const [players, setPlayers] = useState([
    // Goalkeepers (row 1)
    { id: "gk1", position: "GK", row: 1, col: 2 },
    { id: "gk2", position: "GK", row: 1, col: 3 },

    // Defense (row 2) - 5 players
    { id: "def1", position: "DEF", row: 2, col: 0 },
    { id: "def2", position: "DEF", row: 2, col: 1 },
    { id: "def3", position: "DEF", row: 2, col: 2 },
    { id: "def4", position: "DEF", row: 2, col: 3 },
    { id: "def5", position: "DEF", row: 2, col: 4 },

    // Midfield (row 3) - 5 players
    { id: "mid1", position: "MID", row: 3, col: 0 },
    { id: "mid2", position: "MID", row: 3, col: 1 },
    { id: "mid3", position: "MID", row: 3, col: 2 },
    { id: "mid4", position: "MID", row: 3, col: 3 },
    { id: "mid5", position: "MID", row: 3, col: 4 },

    // Attack (row 4) - 3 players
    { id: "att1", position: "ATT", row: 4, col: 1 },
    { id: "att2", position: "ATT", row: 4, col: 2 },
    { id: "att3", position: "ATT", row: 4, col: 3 },
  ])

  const totalSelected = positions.reduce((sum, pos) => sum + pos.selected, 0)
  const totalMax = positions.reduce((sum, pos) => sum + pos.max, 0)

  // Update position counts based on selected players
  const updatePositionCounts = () => {
    const newPositions = positions.map(pos => {
      const positionKey = pos.name === 'GARDIENS' ? 'GK' : 
                         pos.name === 'DÉFENSEURS' ? 'DEF' : 
                         pos.name === 'MILIEUX' ? 'MID' : 'ATT'
      const selectedCount = players.filter(p => p.position === positionKey && p.name).length
      return { ...pos, selected: selectedCount }
    })
    setPositions(newPositions)
  }

  // Handle position click
  const handlePositionClick = (positionName) => {
    const positionKey = positionName === 'GARDIENS' ? 'GK' : 
                       positionName === 'DÉFENSEURS' ? 'DEF' : 
                       positionName === 'MILIEUX' ? 'MID' : 'ATT'
    
    const currentPosition = positions.find(p => p.name === positionName)
    if (currentPosition && currentPosition.selected < currentPosition.max) {
      setSelectedPosition(positionKey)
      setShowPlayerList(true)
    }
  }

  // Handle player selection
  const handlePlayerSelect = (selectedPlayer) => {
    if (budget < selectedPlayer.price) {
      alert("Not enough budget!")
      return
    }

    if (playerToReplace) {
      // Replacing an existing player
      handlePlayerReplace(playerToReplace, selectedPlayer)
      setPlayerToReplace(null)
    } else {
      // Adding a new player
      // Find the first empty slot for this position
      const emptySlot = players.find(p => p.position === selectedPlayer.position && !p.name)
      
      if (emptySlot) {
        setPlayers(prev => 
          prev.map(p => 
            p.id === emptySlot.id ? 
            { ...p, name: selectedPlayer.name, team: selectedPlayer.team } : p
          )
        )

        setBudget(prev => prev - selectedPlayer.price)
        
        // Keep the list open but show all players for next selection
        setSelectedPosition(null) // This will show all players
      }
    }
  }

  // Handle player replacement
  const handlePlayerReplace = (playerToReplace, newPlayer) => {
    if (budget < newPlayer.price) {
      alert("Not enough budget!")
      return
    }

    // Add the cost of the new player
    setBudget(prev => prev - newPlayer.price)
    
    // Replace the player
    setPlayers(prev => 
      prev.map(p => 
        p.id === playerToReplace.id ? 
        { ...p, name: newPlayer.name, team: newPlayer.team } : p
      )
    )
    
    // Keep the list open for more selections
    setSelectedPosition(null)
  }

  // Update position counts whenever players change
  useEffect(() => {
    updatePositionCounts()
  }, [players])

  // Handle add player button click
  const handleAddPlayer = (position) => {
    const positionName = position === 'GK' ? 'GARDIENS' : 
                        position === 'DEF' ? 'DÉFENSEURS' : 
                        position === 'MID' ? 'MILIEUX' : 'ATTAQUANTS'
    
    const currentPosition = positions.find(p => p.name === positionName)
    if (currentPosition && currentPosition.selected < currentPosition.max) {
      setSelectedPosition(position)
      setShowPlayerList(true)
      setPlayerToReplace(null)
    }
  }

  // Handle player replacement click
  const handleReplacePlayer = (player) => {
    setPlayerToReplace(player)
    setSelectedPosition(player.position)
    setShowPlayerList(true)
  }

  const getProgressPercentage = (selected, max) => {
    return Math.min((selected / max) * 100, 100)
  }

  // Get unique teams for filter dropdown
  const uniqueTeams = ["Tous Les Equipes", ...Array.from(new Set(availablePlayers.map(p => p.team)))]

  // Filter players by selected position, search term, and team
  const filteredPlayers = availablePlayers.filter(player => {
    const matchesPosition = !selectedPosition || player.position === selectedPosition
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTeam = selectedTeam === "Tous Les Equipes" || player.team === selectedTeam
    
    return matchesPosition && matchesSearch && matchesTeam
  })

  return (
    <>
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #1D1D1D;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #629F3F;
            border-radius: 4px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #4a7a2f;
          }
        `}
      </style>
      <div className="min-h-screen text-white flex">
      {/* Main Content */}
      <div className="flex-1">
      {/* Top Section - Position Selection */}
      <div className="mb-8 p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {positions.map((position, index) => (
            <div
              key={index}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedPosition === (position.name === 'GARDIENS' ? 'GK' : 
                                     position.name === 'DÉFENSEURS' ? 'DEF' : 
                                     position.name === 'MILIEUX' ? 'MID' : 'ATT')
                  ? 'border-green-400 bg-gray-700' 
                  : 'border-gray-600 hover:border-green-300'
              }`}
              onClick={() => handlePositionClick(position.name)}
            >
              <div className="text-center">
                <h3 className="font-semibold text-sm mb-2">{position.name}</h3>
                <p className="text-green-400 font-bold text-lg">
                  {position.selected}/{position.max}
                </p>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div
                    className="bg-green-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage(position.selected, position.max)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

              {/* Main Content Area */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* Football Field - 60% width on desktop */}
          <div className="order-1 xl:order-1 xl:col-span-3">
            <FootballFieldFormation 
              players={players}
              budget={budget}
              onAddPlayer={handleAddPlayer}
              onReplacePlayer={handleReplacePlayer}
            />
          </div>

          {/* Right Section - Players List or Instructions & Action Button - 40% width on desktop */}
          <div className="order-2 xl:order-2 xl:col-span-2 m-4 xl:m-0 p-6 rounded-lg flex flex-col justify-between min-h-[500px]" style={{ backgroundColor: '#1D1D1D' }}>
            {showPlayerList ? (
              // Players List
              <div className="flex-1">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white text-lg font-bold">
                    {playerToReplace 
                      ? `Replace ${playerToReplace.name}`
                      : selectedPosition 
                        ? `SÉLECTIONNER ${selectedPosition === "GK" ? "GARDIEN" : 
                            selectedPosition === "DEF" ? "DÉFENSEUR" : 
                            selectedPosition === "MID" ? "MILIEU" : "ATTAQUANT"}`
                        : "SÉLECTIONNER JOUEUR"
                    }
                  </h3>
                  <button 
                    onClick={() => setShowPlayerList(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                {/* Search and Filter Section */}
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Rechercher un joueur.."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{backgroundColor: '#1D1D1D', border: '1px solid #629F3F'}}
                      className="w-full px-3 py-2  border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
                    />
                  </div>
                  <div className="flex-1">
                    <select
                    style={{backgroundColor: '#1D1D1D' , border: '1px solid #629F3F'}}
                      value={selectedTeam}
                      onChange={(e) => setSelectedTeam(e.target.value)}
                      className="w-full px-3 py-2  border rounded-lg text-white focus:outline-none focus:border-green-400"
                    >
                      {uniqueTeams.map((team) => (
                        <option key={team} value={team}>
                          {team}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div 
                  className="space-y-2 max-h-[700px] overflow-y-auto custom-scrollbar"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#629F3F #1D1D1D'
                  }}
                >
                  {filteredPlayers.map((player) => {
                    // Check if this player is already selected in the formation
                    const isSelected = players.some(p => p.name === player.name && p.team === player.team);
                    
                    return (
                      <div
                        key={player.id}
                        onClick={() => handlePlayerSelect(player)}
                        style={{
                          backgroundColor: isSelected ? '#629F3F' : '#1D1D1D',
                          border: '1px solid #629F3F'
                        }}
                        className="p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                      >
                      <div className=" items-center justify-between">
                        <div className="flex  items-center gap-3">
                          {/* Team Logo */}
                          <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                            <img 
                              src={getTeamLogo(player.team)} 
                              alt={`${player.team} logo`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {/* Player Info */}
                          <div>
                            <div className="text-white font-semibold">{player.name}</div>
                            <div style={{color: isSelected ? 'white' : '#CCCCCC',}} className="text-gray-400 text-sm">{player.team}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {/* Price */}
                          <div style={{color: isSelected ? 'white' : '#629F3F',}} className=" font-bold">{player.price} VP</div>
                          {/* Radio Button */}
                          <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  );
                  })}
                </div>
              </div>
            ) : (
              // Instructions
              <div className="flex-1 flex items-center justify-center">
              <p className="text-center text-gray-300 text-lg">
                Cliquez sur une position pour sélectionner des joueurs
              </p>
            </div>
            )}
            <br/>
            <div className="mt-auto">
              <button
                className={`w-full py-4 px-6 rounded-lg border-2 font-bold text-lg transition-all ${
                  totalSelected === totalMax
                    ? 'border-green-400 bg-green-400 text-gray-900 hover:bg-green-300'
                    : 'border-green-400 text-green-400 bg-transparent opacity-50 cursor-not-allowed'
                }`}
                disabled={totalSelected !== totalMax}
                onClick={() => {
                  if (totalSelected === totalMax) {
                    navigate('/dashboard')
                  }
                }}
              >
                COMPLETER VOTRE ÉQUIPE ({totalSelected}/{totalMax})
              </button>
            </div>
          </div>
        </div>
      </div>
    

    </div>
    <br/>
    <PartnersSection />
    </>
  )
}

export default SelectionneJoueur