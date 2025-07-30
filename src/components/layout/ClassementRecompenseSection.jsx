import React, { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import ClassementPlayerModal from '../modals/ClassementPlayerModal';
import { FaGift } from 'react-icons/fa';

const journees = Array.from({ length: 30 }, (_, i) => i + 1);

const classement = [
  { rank: 1, name: 'ADAM BEN ALI', points: 156 },
  { rank: 2, name: 'YASSINE KHALIL', points: 142 },
  { rank: 3, name: 'OMAR SLIM', points: 137 },
  { rank: 4, name: 'FOULEN FOULEN', points: 120 },
  { rank: 5, name: 'FOULEN FOULEN', points: 118 },
  { rank: 6, name: 'FOULEN FOULEN', points: 115 },
  { rank: 7, name: 'FOULEN FOULEN', points: 108 },
];

const prix = [
  { place: 1, label: '1000 TND' },
  { place: 2, label: '500 TND' },
  { place: 3, label: '250 TND' },
  { place: 4, label: 'SMARTPHONE' },
  { place: 5, label: 'SMARTPHONE' },
  { place: 6, label: 'SMARTPHONE' },
  { place: 7, label: 'SMARTPHONE' },
  { place: 8, label: 'SMARTPHONE' },
  { place: 9, label: 'SMARTPHONE' },
  { place: 10, label: 'SÉJOUR EN HÔTEL' },
  { place: 11, label: 'SÉJOUR EN HÔTEL' },
  { place: 12, label: 'SÉJOUR EN HÔTEL' },
];

const rankBg = [
  'bg-[#E6C657] text-black', // 1st gold
  'bg-[#A7A9AC] text-black', // 2nd silver
  'bg-[#B86B3C] text-white', // 3rd bronze
  'bg-[#222] text-white',    // 4th+
  'bg-[#222] text-white',
  'bg-[#222] text-white',
  'bg-[#222] text-white',
  'bg-[#222] text-white',
  'bg-[#222] text-white',
  'bg-[#222] text-white',
  'bg-[#222] text-white',
  'bg-[#222] text-white',
];

const rowBg = [
  'bg-[#181818]',
  'bg-[#111]',
];

const ClassementRecompenseSection = () => {
  const [selectedJournee, setSelectedJournee] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [tempJournee, setTempJournee] = useState(selectedJournee);
  const [activeTab, setActiveTab] = useState('classement');
  const [selectedClassementPlayer, setSelectedClassementPlayer] = useState(null);

  // Modal close on outside click
  React.useEffect(() => {
    function handle(e) {
      if (modalOpen && e.target.classList.contains('modal-overlay')) setModalOpen(false);
    }
    if (modalOpen) document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [modalOpen]);

  return (
    <section className="w-full mt-6 shadow-lg border border-[#353535]" style={{borderRadius:0}}>
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List className="flex border-b border-[#353535]">
          <Tabs.Trigger value="classement" className={`flex-1 px-4 py-3 text-xl font-bold uppercase tracking-wide text-center transition ${activeTab === 'classement' ? 'bg-[#629F3F] text-white' : 'bg-black text-[#bdbdbd]'} focus:outline-none`} style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif', borderRadius:0}}>
            <span className="text-xl font-bold uppercase text-center w-full block" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif', letterSpacing:'0.04em'}}>CLASSEMENT</span>
          </Tabs.Trigger>
          <Tabs.Trigger value="prix" className={`px-4 py-3 flex items-center justify-center transition ${activeTab === 'prix' ? 'bg-[#629F3F] text-white' : 'bg-black text-[#bdbdbd]'} focus:outline-none`} aria-label="Prix" style={{borderRadius:0}}>
            <FaGift size={28} color="#fff" />
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="classement" className="p-0">
          {/* Filter section with modal */}
          <div className="flex items-center gap-4 px-4 py-3
           bg-black border-b border-[#353535] justify-center" style={{borderRadius:0}}>
            <span className="text-[#629F3F] text-base font-bold uppercase tracking-wide" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>JOURNÉE</span>
            <button
              className="flex items-center justify-between min-w-[170px] px-2 py-2 bg-[#181818] border-2 border-[#629F3F] text-white text-base font-bold uppercase rounded-full focus:outline-none focus:border-[#629F3F] focus:shadow-[0_0_0_2px_#629F3F] transition-all"
              style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}
              onClick={() => { setTempJournee(selectedJournee); setModalOpen(true); }}
              type="button"
            >
              {selectedJournee === 'all' ? 'Toutes' : `Journée ${selectedJournee}`}
              <span className="ml-3 flex items-center">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="#629F3F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </button>
          </div>
          {/* Modal for selecting journée - match StatsSection style */}
          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in-up modal-overlay">
              <div className="bg-[#181818] rounded-2xl shadow-2xl w-full max-w-md mx-2 p-0 relative animate-fade-in-up border-2 border-[#629F3F]" style={{ boxShadow: '0 8px 32px 0 rgba(98,159,63,0.18)' }}>
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#222]">
                  <h2 className="text-white font-heading text-2xl font-bold tracking-wide" style={{ color: '#629F3F' }}>
                    Sélectionner la Journée
                  </h2>
                  <button
                    className="text-gray-400 hover:text-white transition-colors p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-[#629F3F]"
                    onClick={() => setModalOpen(false)}
                    aria-label="Fermer"
                  >
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="#fff" strokeWidth="2" d="M6 6l12 12M6 18L18 6"/></svg>
                  </button>
                </div>
                {/* Modal Content with radio buttons */}
                <form className="max-h-96 overflow-y-auto py-2 pb-20 custom-scrollbar" onSubmit={e => { e.preventDefault(); setSelectedJournee(tempJournee); setModalOpen(false); }}>
                  <fieldset>
                    <legend className="sr-only">Choisir la journée</legend>
                    {['all', ...journees].map((num) => (
                      <label
                        key={num}
                        className={`flex items-center px-2 sm:px-4 py-2 cursor-pointer font-heading text-base sm:text-lg transition-all duration-100 rounded-lg mb-1 last:mb-0 select-none ${tempJournee === num ? 'bg-[#629F3F] text-white font-extrabold shadow' : 'text-white hover:bg-[#629F3F]/80 hover:text-white'} focus-within:bg-[#629F3F] focus-within:text-white`}
                        tabIndex={0}
                      >
                        <span className="relative flex items-center mr-3">
                          <input
                            type="radio"
                            name="journee"
                            value={num}
                            checked={tempJournee === num}
                            onChange={() => setTempJournee(num)}
                            className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:border-[#629F3F] checked:bg-[#629F3F] focus:outline-none focus:ring-2 focus:ring-[#629F3F] transition-all"
                            style={{ minWidth: 20, minHeight: 20 }}
                            aria-checked={tempJournee === num}
                            aria-label={num === 'all' ? 'Toutes' : `Journée ${num}`}
                          />
                          {/* Custom radio indicator */}
                          <span
                            className={`absolute left-0 top-0 w-5 h-5 rounded-full border-2 pointer-events-none ${tempJournee === num ? 'border-[#629F3F] bg-[#629F3F]' : 'border-gray-400 bg-transparent'} flex items-center justify-center`}
                            aria-hidden="true"
                          >
                            {tempJournee === num && (
                              <span className="block w-2.5 h-2.5 rounded-full bg-white" />
                            )}
                          </span>
                        </span>
                        {num === 'all' ? 'Toutes' : `Journée ${num}`}
                      </label>
                    ))}
                  </fieldset>
                  {/* Padding bottom for fixed button */}
                </form>
                {/* Fixed confirm button */}
                <div className="fixed left-1/2 -translate-x-1/2 bottom-2 sm:bottom-4 md:bottom-8 w-full max-w-md px-2 sm:px-6 z-50 pointer-events-none">
                  <button
                    type="submit"
                    form=""
                    className="bg-gradient-to-r from-[#629F3F] to-[#4e7e32] hover:from-[#4e7e32] hover:to-[#3d5f28] text-white font-bold uppercase px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg transition-all w-full pointer-events-auto shadow-2xl transform hover:scale-105 border-2 border-[#629F3F]/30"
                    style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif', boxShadow: '0 8px 32px 0 rgba(98,159,63,0.3)'}}
                    onClick={() => { setSelectedJournee(tempJournee); setModalOpen(false); }}
                  >
                    ✓ Confirmer
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="border-b border-[#222]" />
          {/* Classement table with fixed height and scrollable body */}
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full text-white text-xs sm:text-sm">
              <tbody>
                {classement.map((row, i) => (
                  <tr key={i} className={`${rowBg[i % 2]} transition-all`}>
                    <td className={`py-3 w-10 text-center align-middle font-bold text-lg ${rankBg[i]}`} style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif', width:'40px', minWidth:'40px', maxWidth:'40px'}}>{row.rank}</td>
                    <td className="py-3 w-12 align-middle" style={{width:'48px', minWidth:'48px', maxWidth:'48px'}}>
                      <span className="flex items-center justify-center w-10 h-10">
                        <img src="/avatar.png" alt="avatar" className="w-8 h-8 object-contain" style={{display:'block', width:'32px', height:'32px'}} />
                      </span>
                    </td>
                    <td className="py-3 align-middle" style={{minWidth:'120px'}}>
                      <div className="leading-tight text-left">
                        <span className="block font-bold text-base uppercase text-white" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif', fontSize:'16px', lineHeight:'20px'}}>{row.name}</span>
                        <span className="block text-xs text-[#bdbdbd] font-semibold" style={{fontFamily:'Gotham SSM, sans-serif', fontSize:'13px', lineHeight:'16px'}}>{row.points} PTS</span>
                      </div>
                    </td>
                    <td className="py-3 w-12 align-middle text-center" style={{width:'48px', minWidth:'48px', maxWidth:'48px'}}>
                      <button className="bg-[#629F3F] hover:bg-[#4e7e32] rounded p-2 flex items-center justify-center mx-auto" title="Voir" style={{borderRadius:'6px', width:'32px', height:'32px'}}
                        onClick={() => setSelectedClassementPlayer(row)}
                      >
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8a3 3 0 100 6 3 3 0 000-6z"/></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Tabs.Content>
        <Tabs.Content value="prix" className="p-0">
          <table className="w-full text-white text-xs sm:text-sm">
            <tbody>
              {prix.map((row, i) => (
                <tr key={i} className={`${rowBg[i % 2]} transition-all ${i < prix.length - 1 ? 'border-b border-[#353535]' : ''}`}> 
                  <td className={`py-4 px-6 w-10 text-center align-middle font-bold text-lg ${rankBg[i]}`} style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif', width:'40px', minWidth:'40px', maxWidth:'40px'}}>{row.place}</td>
                  <td className="py-4 px-6 align-middle" colSpan={2}>
                    <div className="flex items-center h-full min-h-[40px]">
                      <span className="block font-bold uppercase text-white" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif', fontSize:'24px', lineHeight:'32px', textShadow:'0 2px 8px #629F3F55'}}>{row.label}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Tabs.Content>
      </Tabs.Root>
      {selectedClassementPlayer && (
        <ClassementPlayerModal
          player={selectedClassementPlayer}
          onClose={() => setSelectedClassementPlayer(null)}
        />
      )}
    </section>
  );
};

export default ClassementRecompenseSection; 