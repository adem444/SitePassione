import React, { useState, useEffect } from 'react';

// Import all existing components
import Header from '../layout/Header';
import DeadlineSection from '../layout/DeadlineSection';
import StatsSection from '../layout/StatsSection';
import CarouselSection from '../layout/CarouselSection';
import PointsSection from '../layout/PointsSection';
import MatchsSection from '../layout/MatchsSection';
import ClassementRecompenseSection from '../layout/ClassementRecompenseSection';
import FieldSection from '../layout/FieldSection';
import ReplacementsSection from '../layout/ReplacementsSection';
import LegendSection from '../layout/LegendSection';
import TransfersHistorySection from '../layout/TransfersHistorySection';
import PartnersSection from '../layout/PartnersSection';
import Footer from '../layout/Footer';

import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const HomePage = () => {
  const { logout } = useAuth();
  const [pointsModalOpen, setPointsModalOpen] = useState(false);
  const [currentPickteam, setCurrentPickteam] = useState(null);
  const [substitutePlayers, setSubstitutePlayers] = useState([]);
  const [loadingPickteam, setLoadingPickteam] = useState(true);
  const [currentFixtures, setCurrentFixtures] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [pickteamStats, setPickteamStats] = useState({
    classement: 0,
    ptsJournee: 0,
    totalPts: 0
  });

  // Handle round change
  const handleRoundChange = async (round, fixtures) => {
    console.log('HomePage - Round changed to:', round);
    setCurrentRound(round);
    setCurrentFixtures(fixtures || []);
    
    // Fetch pickteam for the new round
    await fetchPickteamForRound(round);
  };

  // Fetch pickteam for specific round
  const fetchPickteamForRound = async (round) => {
    try {
      setLoadingPickteam(true);
      console.log('HomePage - Fetching pickteam for round:', round);
      
      // Pass the round parameter to fetch pickteam for specific round
      const result = await api.getCurrentUserPickteam(round.toString());
      
      if (result.success && result.data) {
        // Process the pickteam data as before
        const transformedPlayers = result.data.players?.map(playerEntry => {
          const player = playerEntry.player;
          if (!player) return null;
          
          console.log('HomePage - Original player data:', { 
            name: player.name, 
            _id: player._id, 
            position: player.position 
          });
          
          let mappedPos;
          switch (player.position) {
            case 'Goalkeeper':
              mappedPos = 'gk';
              break;
            case 'Defender':
              mappedPos = 'def';
              break;
            case 'Midfielder':
              mappedPos = 'mid';
              break;
            case 'Attacker':
              mappedPos = 'att';
              break;
            default:
              console.warn('Unknown position:', player.position, 'for player:', player.name);
              mappedPos = 'att';
              break;
          }
          
          return {
            _id: player._id,
            id: player._id,
            name: player.name || 'Unknown Player',
            match: 'VS Opponent',
            jerseySrc: player.logo || '/jercy1/ess.webp',
            pos: mappedPos,
            club: player.team?.name || 'Unknown',
            clubLogo: player.team?.logo || '/ESS.png',
            status: playerEntry.isSubstituted ? 'Remplaçant' : 'Titulaire',
            selection: '0%',
            age: player.age || 25,
            nationality: player.nationality || 'Tunisien',
            role: playerEntry.captain ? 'Capitaine' : 
                  playerEntry.vicecaptain ? 'Vice-capitaine' : 'Joueur',
            upcoming: true,
            opponent: 'Opponent',
            opponentLogo: '/ESS.png',
            isHome: false,
            stats: { atk: false, value: player.points || 0 },
            isSubstituted: playerEntry.isSubstituted,
            // Availability status fields
            availabilityStatus: player.availabilityStatus || 'available',
            availabilityReason: player.availabilityReason || '',
            mvp: player.mvp || false,
            isInjured: player.isInjured || false,
            redCard: player.redCard || false,
          };
        }).filter(Boolean) || [];
        
        console.log('HomePage - Transformed players with IDs:', transformedPlayers.map(p => ({ name: p.name, _id: p._id, id: p.id })));
        
        const starters = transformedPlayers.filter(player => !player.isSubstituted);
        const substitutes = transformedPlayers.filter(player => player.isSubstituted);
        
        setCurrentPickteam(starters);
        setSubstitutePlayers(substitutes);
        
        // Extract pickteam statistics
        const stats = {
          classement: result.data.classement || 0,
          ptsJournee: result.data.ptsJournee || 0,
          totalPts: result.data.totalPts || 0
        };
        setPickteamStats(stats);
        console.log('HomePage - Pickteam stats:', stats);
      } else {
        console.log('HomePage - No pickteam found for round:', round);
        setCurrentPickteam([]);
        setSubstitutePlayers([]);
        setPickteamStats({ classement: 0, ptsJournee: 0, totalPts: 0 });
      }
    } catch (error) {
      console.error('HomePage - Error fetching pickteam for round:', error);
      setCurrentPickteam([]);
      setSubstitutePlayers([]);
      setPickteamStats({ classement: 0, ptsJournee: 0, totalPts: 0 });
    } finally {
      setLoadingPickteam(false);
    }
  };

  // Fetch current pickteam function
  const fetchPickteam = async () => {
    await fetchPickteamForRound(currentRound);
  };

  // Initial data fetch
  useEffect(() => {
    fetchPickteam();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header 
        onProfileClick={() => {}} 
        onLogout={logout} 
        onHelpClick={() => {}}
      />
      
      <DeadlineSection />
      
      <main className="w-full max-w-[1350px] mx-auto px-2 sm:px-4 md:px-6 flex flex-col gap-[20px]">
        <div className="hidden lg:flex flex-row gap-[20px] w-full">
                     <div className="flex-1 flex flex-col gap-[20px]">
             <div className="mt-8">
               <StatsSection onRoundChange={handleRoundChange} pickteamStats={pickteamStats} />
             </div>
            <div className="flex flex-row w-full gap-[20px] items-start">
              <div className="flex-1">
                <FieldSection players={currentPickteam} loading={loadingPickteam} onRefresh={fetchPickteam} />
              </div>
              <div className="flex-shrink-0 w-[150px] h-[648px]">
                <ReplacementsSection substitutes={substitutePlayers} loading={loadingPickteam} />
              </div>
            </div>
                         <LegendSection />
            {pointsModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in-up">
                <div className="bg-gradient-to-b from-[#232e1a] to-[#181818] rounded-2xl shadow-2xl w-full max-w-md mx-2 p-0 relative border-2 border-[#61B12C] flex flex-col" style={{ boxShadow: '0 8px 32px 0 rgba(98,177,44,0.18)' }}>
                  {/* Modal Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-[#2d4a1e] rounded-t-2xl bg-[#232e1a]">
                    <h2 className="text-white text-lg xs:text-xl font-extrabold uppercase tracking-wide" style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif', letterSpacing: '0.04em' }}>
                      Comment marquer des points
                    </h2>
                    <button
                      className="text-white bg-[#61B12C] hover:bg-[#4e7e32] rounded-full w-8 h-8 flex items-center justify-center font-bold text-xl shadow focus:outline-none focus:ring-2 focus:ring-[#61B12C]"
                      onClick={() => setPointsModalOpen(false)}
                      aria-label="Fermer"
                    >
                      ×
                    </button>
                  </div>

                  <div className="overflow-y-auto max-h-[70vh] px-2 xs:px-4 py-4 bg-[#181818] rounded-b-2xl">
                    <PointsSection />
                  </div>
                </div>
              </div>
            )}
            <TransfersHistorySection />
          </div>
          <div className="w-full max-w-[400px] flex flex-col gap-[20px]">
            <div className="mt-8">
              <CarouselSection />
            </div>
            <PointsSection />
            <MatchsSection fixtures={currentFixtures} loading={false} />
            <ClassementRecompenseSection />
          </div>
        </div>

        <div className="flex flex-col lg:hidden gap-[20px] w-full">
          <div className="mt-8">
            <CarouselSection />
          </div>
                     <div className="mt-8">
             <StatsSection onRoundChange={handleRoundChange} pickteamStats={pickteamStats} />
           </div>
                      <div className="flex flex-col gap-4 w-full">
              <FieldSection players={currentPickteam} loading={loadingPickteam} onRefresh={fetchPickteam} />
              <div className="w-full flex flex-row gap-2">
                <ReplacementsSection substitutes={substitutePlayers} loading={loadingPickteam} layout="row" />
              </div>
            </div>
                     <LegendSection 
             showCommentLink={true} 
             onCommentClick={() => setPointsModalOpen(true)} 
           />
          {pointsModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in-up">
              <div className="bg-[#181818] rounded-2xl shadow-2xl w-full max-w-md mx-2 p-0 relative animate-fade-in-up border-2 border-[#61B12C]">
                <button
                  className="absolute top-2 right-2 text-white bg-[#61B12C] rounded-full w-8 h-8 flex items-center justify-center font-bold text-xl"
                  onClick={() => setPointsModalOpen(false)}
                  aria-label="Fermer"
                >
                  ×
                </button>
                <PointsSection />
              </div>
            </div>
          )}
          <MatchsSection fixtures={currentFixtures} loading={false} />
          <TransfersHistorySection />
          <ClassementRecompenseSection />
        </div>
        
        <div>
          <PartnersSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage; 