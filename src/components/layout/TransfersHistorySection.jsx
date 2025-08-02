import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

// Default data for when no transfers/replacements exist
const defaultTransfers = [];
const defaultReplacements = [];

const TransfersHistorySection = () => {
  const [tab, setTab] = useState('transferts');
  const [transfers, setTransfers] = useState(defaultTransfers);
  const [replacements, setReplacements] = useState(defaultReplacements);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch transfer and replacement history
  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      
             const result = await api.getCurrentUserPickteam();
      
      if (result.success && result.data) {
        const pickteam = result.data;
        
        // Process transfers
        const transferData = [];
        if (pickteam.playerTransfert && Array.isArray(pickteam.playerTransfert)) {
          pickteam.playerTransfert.forEach(transfer => {
            if (transfer.playerIn && transfer.playerOut) {
              // Player in (transfer in)
              transferData.push({
                logo: transfer.playerIn?.team?.logo || '/ESS.png',
                name: transfer.playerIn?.name || 'Unknown Player',
                info: `${transfer.playerIn?.team?.name || 'Unknown'} - ${transfer.playerIn?.position || 'Unknown'}`,
                type: 'in',
                date: transfer._id ? new Date(transfer._id).toLocaleDateString() : 'Today'
              });
              
              // Player out (transfer out)
              transferData.push({
                logo: transfer.playerOut?.team?.logo || '/ESS.png',
                name: transfer.playerOut?.name || 'Unknown Player',
                info: `${transfer.playerOut?.team?.name || 'Unknown'} - ${transfer.playerOut?.position || 'Unknown'}`,
                type: 'out',
                date: transfer._id ? new Date(transfer._id).toLocaleDateString() : 'Today'
              });
            }
          });
        }
        
        // Process replacements
        const replacementData = [];
        if (pickteam.playerReplace && Array.isArray(pickteam.playerReplace)) {
          pickteam.playerReplace.forEach(replacement => {
            if (replacement.playerIn && replacement.playerOut) {
              // Player in (replacement in)
              replacementData.push({
                logo: replacement.playerIn?.team?.logo || '/ESS.png',
                name: replacement.playerIn?.name || 'Unknown Player',
                info: `${replacement.playerIn?.team?.name || 'Unknown'} - ${replacement.playerIn?.position || 'Unknown'}`,
                type: 'in',
                date: replacement._id ? new Date(replacement._id).toLocaleDateString() : 'Today'
              });
              
              // Player out (replacement out)
              replacementData.push({
                logo: replacement.playerOut?.team?.logo || '/ESS.png',
                name: replacement.playerOut?.name || 'Unknown Player',
                info: `${replacement.playerOut?.team?.name || 'Unknown'} - ${replacement.playerOut?.position || 'Unknown'}`,
                type: 'out',
                date: replacement._id ? new Date(replacement._id).toLocaleDateString() : 'Today'
              });
            }
          });
        }
        
        setTransfers(transferData);
        setReplacements(replacementData);
      } else {
        console.error('Failed to fetch transfer history:', result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error('Error fetching transfer history:', error);
      setError('Failed to load transfer history');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchHistory();
  }, []);

  const data = tab === 'transferts' ? transfers : replacements;
  
  // Show loading state
  if (loading) {
    return (
      <section className="w-full bg-[#141414] border border-[#1D1D1D] rounded-none">
        <div className="flex flex-col sm:flex-row items-center justify-between px-2 sm:px-4 md:px-8 pt-6 pb-2 gap-2 sm:gap-4">
          <h2 className="text-white font-bold uppercase text-base sm:text-lg md:text-2xl" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>HISTORIQUE DES TRANSFERTS & REMPLACEMENTS</h2>
          <span className="inline-block bg-[#629F3F] text-white font-bold uppercase rounded px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm md:text-base" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>1ère journée</span>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-2 border-[#629F3F] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-white ml-3">Chargement de l'historique...</span>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="w-full bg-[#141414] border border-[#1D1D1D] rounded-none">
        <div className="flex flex-col sm:flex-row items-center justify-between px-2 sm:px-4 md:px-8 pt-6 pb-2 gap-2 sm:gap-4">
          <h2 className="text-white font-bold uppercase text-base sm:text-lg md:text-2xl" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>HISTORIQUE DES TRANSFERTS & REMPLACEMENTS</h2>
          <span className="inline-block bg-[#629F3F] text-white font-bold uppercase rounded px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm md:text-base" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>1ère journée</span>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="text-red-400 mb-2">Erreur de chargement</div>
            <button 
              onClick={fetchHistory}
              className="bg-[#629F3F] text-white px-4 py-2 rounded hover:bg-[#4e7e32] transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#141414] border border-[#1D1D1D] rounded-none">
      <div className="flex flex-col sm:flex-row items-center justify-between px-2 sm:px-4 md:px-8 pt-6 pb-2 gap-2 sm:gap-4">
        <h2 className="text-white font-bold uppercase text-base sm:text-lg md:text-2xl" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>HISTORIQUE DES TRANSFERTS & REMPLACEMENTS</h2>
        <span className="inline-block bg-[#629F3F] text-white font-bold uppercase rounded px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm md:text-base" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif'}}>1ère journée</span>
      </div>
      <div className="flex items-center px-2 sm:px-4 md:px-8 pb-0 pt-2 w-full">
        <div className="flex w-full gap-2 sm:gap-4">
          <button onClick={()=>setTab('transferts')} className={`flex-1 flex items-center justify-center px-2 sm:px-8 py-2 sm:py-3 font-bold uppercase text-xs sm:text-base transition-all ${tab==='transferts' ? 'bg-[#629F3F] text-white' : 'bg-[#222] text-white'} border-none`} style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif', borderRadius:0}}>
            <img src="/transfert.svg" alt="Transfert" className="mr-2 w-5 h-5 inline-block align-middle" />
            TRANSFERTS
          </button>
          <button onClick={()=>setTab('remplacements')} className={`flex-1 flex items-center justify-center px-2 sm:px-8 py-2 sm:py-3 font-bold uppercase text-xs sm:text-base transition-all ${tab==='remplacements' ? 'bg-[#629F3F] text-white' : 'bg-[#222] text-white'} border-none`} style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif', borderRadius:0}}>
            <img src="/remplacement.svg" alt="Remplacement" className="mr-2 w-5 h-5 inline-block align-middle" />
            REMPLACEMENTS
          </button>
        </div>
      </div>
      <div className="w-full px-2 sm:px-4 md:px-8 pb-6 pt-2">
        {data.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="text-gray-400 mb-2">Aucun {tab === 'transferts' ? 'transfert' : 'remplacement'} pour le moment</div>
              <div className="text-gray-500 text-sm">Les {tab === 'transferts' ? 'transferts' : 'remplacements'} apparaîtront ici</div>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-8">
            <div className="flex-1">
              <div className="text-[#bdbdbd] font-bold uppercase mb-2 text-xs sm:text-sm md:text-base" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>Entrées</div>
              {data.filter(t => t.type === 'in').map((t,i)=>(
                <div key={i} className="flex items-center py-2 sm:py-3 border-b border-[#222] last:border-0 gap-2 sm:gap-4">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="mr-1 sm:mr-3"><path d="M12 19V5M5 12l7-7 7 7" stroke="#629F3F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
        )}
      </div>
    </section>
  );
};

export default TransfersHistorySection; 