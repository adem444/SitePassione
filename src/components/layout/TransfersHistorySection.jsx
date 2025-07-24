import React, { useState } from 'react';

const transfers = [
  { logo: '/ESS.png', name: 'RAED GAZEH', info: 'ESS - GK', type: 'in' },
  { logo: '/ESS.png', name: 'RAED GAZEH', info: 'ESS - GK', type: 'out' },
  { logo: '/ESS.png', name: 'RAED GAZEH', info: 'ESS - GK', type: 'in' },
  { logo: '/ESS.png', name: 'RAED GAZEH', info: 'ESS - GK', type: 'out' },           
  
];
const replacements = [
  { logo: '/ESS.png', name: 'RAED GAZEH', info: 'ESS - GK', type: 'in' },
  { logo: '/ESS.png', name: 'RAED GAZEH', info: 'ESS - GK', type: 'out' },
  { logo: '/ESS.png', name: 'RAED GAZEH', info: 'ESS - GK', type: 'in' },
  { logo: '/ESS.png', name: 'RAED GAZEH', info: 'ESS - GK', type: 'out' },
  { logo: '/ESS.png', name: 'RAED GAZEH', info: 'ESS - GK', type: 'in' },
  { logo: '/ESS.png', name: 'RAED GAZEH', info: 'ESS - GK', type: 'out' },
];

const TransfersHistorySection = () => {
  const [tab, setTab] = useState('transferts');
  const data = tab === 'transferts' ? transfers : replacements;
  return (
    <section className="w-full bg-[#141414] border border-[#1D1D1D] rounded-none">
      <div className="flex flex-col sm:flex-row items-center justify-between px-2 sm:px-4 md:px-8 pt-6 pb-2 gap-2 sm:gap-4">
        <h2 className="text-white font-bold uppercase text-base sm:text-lg md:text-2xl" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>HISTORIQUE DES TRANSFERTS & REMPLACEMENTS</h2>
        <span className="inline-block bg-[#61B12C] text-white font-bold uppercase rounded px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm md:text-base" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>1ère journée</span>
      </div>
      <div className="flex items-center px-2 sm:px-4 md:px-8 pb-0 pt-2 w-full">
        <div className="flex w-full gap-2 sm:gap-4">
          <button onClick={()=>setTab('transferts')} className={`flex-1 flex items-center justify-center px-2 sm:px-8 py-2 sm:py-3 font-bold uppercase text-xs sm:text-base transition-all ${tab==='transferts' ? 'bg-[#61B12C] text-white' : 'bg-[#222] text-white'} border-none`} style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif', borderRadius:0}}>
            <img src="/transfert.svg" alt="Transfert" className="mr-2 w-5 h-5 inline-block align-middle" />
            TRANSFERTS
          </button>
          <button onClick={()=>setTab('remplacements')} className={`flex-1 flex items-center justify-center px-2 sm:px-8 py-2 sm:py-3 font-bold uppercase text-xs sm:text-base transition-all ${tab==='remplacements' ? 'bg-[#61B12C] text-white' : 'bg-[#222] text-white'} border-none`} style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif', borderRadius:0}}>
            <img src="/remplacement.svg" alt="Remplacement" className="mr-2 w-5 h-5 inline-block align-middle" />
            REMPLACEMENTS
          </button>
        </div>
      </div>
      <div className="w-full px-2 sm:px-4 md:px-8 pb-6 pt-2">
        <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-8">
          <div className="flex-1">
            <div className="text-[#bdbdbd] font-bold uppercase mb-2 text-xs sm:text-sm md:text-base" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>Entrées</div>
            {data.filter(t => t.type === 'in').map((t,i)=>(
              <div key={i} className="flex items-center py-2 sm:py-3 border-b border-[#222] last:border-0 gap-2 sm:gap-4">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="mr-1 sm:mr-3"><path d="M12 19V5M5 12l7-7 7 7" stroke="#61B12C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <img src={t.logo} alt="logo" className="w-6 h-6 sm:w-8 sm:h-8 object-contain mr-1 sm:mr-3" />
                <div className="flex flex-col mr-1 sm:mr-3">
                  <span className="text-white font-bold uppercase text-xs sm:text-base" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>{t.name}</span>
                  <span className="text-[#bdbdbd] text-[10px] sm:text-xs uppercase" style={{fontFamily:'Gotham SSM, sans-serif'}}>{t.info}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex-1">
            <div className="text-[#bdbdbd] font-bold uppercase mb-2 text-xs sm:text-sm md:text-base" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>Sorties</div>
            {data.filter(t => t.type === 'out').map((t,i)=>(
              <div key={i} className="flex items-center py-2 sm:py-3 border-b border-[#222] last:border-0 gap-2 sm:gap-4">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="mr-1 sm:mr-3"><path d="M12 5v14M5 12l7 7 7-7" stroke="#F44336" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <img src={t.logo} alt="logo" className="w-6 h-6 sm:w-8 sm:h-8 object-contain mr-1 sm:mr-3" />
                <div className="flex flex-col mr-1 sm:mr-3">
                  <span className="text-white font-bold uppercase text-xs sm:text-base" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>{t.name}</span>
                  <span className="text-[#bdbdbd] text-[10px] sm:text-xs uppercase" style={{fontFamily:'Gotham SSM, sans-serif'}}>{t.info}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransfersHistorySection; 