import React, { useState } from 'react';
import './App.css';

import Header from './components/layout/Header';
import DeadlineSection from './components/layout/DeadlineSection';
import StatsSection from './components/layout/StatsSection';
import CarouselSection from './components/layout/CarouselSection';
import PointsSection from './components/layout/PointsSection';
import MatchsSection from './components/layout/MatchsSection';
import ClassementRecompenseSection from './components/layout/ClassementRecompenseSection';
import FieldSection from './components/layout/FieldSection';
import ReplacementsSection from './components/layout/ReplacementsSection';
import LegendSection from './components/layout/LegendSection';
import TransfersHistorySection from './components/layout/TransfersHistorySection';
import PartnersSection from './components/layout/PartnersSection';

function App() {
  const [pointsModalOpen, setPointsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <DeadlineSection />
      <main className="w-full max-w-[1350px] mx-auto px-2 sm:px-4 md:px-6 flex flex-col gap-[20px]">
        {/* Desktop Layout (now only for lg and up) */}
        <div className="hidden lg:flex flex-row gap-[20px] w-full">
          <div className="flex-1 flex flex-col gap-[20px]">
            <div className="mt-8"><StatsSection /></div>
            <div className="flex flex-row w-full gap-[20px] items-start">
              <div className="flex-1"><FieldSection /></div>
              <div className="flex-shrink-0 w-[150px] h-[648px]"><ReplacementsSection /></div>
            </div>
            <LegendSection />
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
            <TransfersHistorySection />
          </div>
          <div className="w-full max-w-[400px] flex flex-col gap-[20px]">
            <div className="mt-8"><CarouselSection /></div>
            <PointsSection />
            <MatchsSection />
            <ClassementRecompenseSection />
          </div>
        </div>
        {/* Mobile/Tablet Layout (applies to <lg) */}
        <div className="flex flex-col lg:hidden gap-[20px] w-full">
          <div className="mt-8"><CarouselSection /></div>
          <div className="mt-8"><StatsSection /></div>
          <div className="flex flex-col gap-4 w-full">
            <FieldSection />
            <div className="w-full flex flex-row gap-2"><ReplacementsSection layout="row" /></div>
          </div>
          <LegendSection showCommentLink={true} onCommentClick={() => setPointsModalOpen(true)} />
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
          <MatchsSection />
          <ClassementRecompenseSection />
          <TransfersHistorySection />
        </div>
        <div>
        <PartnersSection />
        </div>
      </main>
    </div>
  );
}

export default App;

