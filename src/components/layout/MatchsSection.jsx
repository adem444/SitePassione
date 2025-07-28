import React from 'react';

const matches = [
  { home: 'EST', homeLogo: '/EST.png', away: 'ESS', awayLogo: '/ESS.png', status: 'A venir' },
  { home: 'EST', homeLogo: '/EST.png', away: 'ESS', awayLogo: '/ESS.png', status: 'A venir' },
  { home: 'EST', homeLogo: '/EST.png', away: 'ESS', awayLogo: '/ESS.png', status: 'A venir' },
  { home: 'EST', homeLogo: '/EST.png', away: 'ESS', awayLogo: '/ESS.png', status: 'A venir' },
];

const rowBg = [
  'bg-[#181818]',
  'bg-[#111]',
];

const MatchsSection = () => (
  <section className="w-full mt-6 shadow-lg border border-[#353535]" style={{borderRadius:0}}>
    <div className="w-full bg-[#629F3F] px-4 py-3" style={{borderRadius:0}}>
      <h2 className="text-white text-xl font-bold tracking-wide uppercase text-center" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>MATCHS DE LA JOURNÉE</h2>
    </div>
    <div className="p-0">
      <table className="w-full text-white text-xs sm:text-sm">
        <tbody>
          {matches.map((m, i) => (
            <tr key={i} className={`${rowBg[i % 2]} transition-all`}>
              <td className="py-4 pl-4 align-middle">
                <span className="inline-flex items-center bg-[#bdbdbd] text-white text-[12px] sm:text-[13px] px-3 py-1 rounded font-bold uppercase" style={{fontFamily:'Gotham SSM, Bebas Neue, sans-serif', letterSpacing:'0.04em'}}>{m.status}</span>
              </td>
              <td className="text-center font-bold text-base align-middle" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>
                <span className="inline-flex items-center gap-3">
                  <span className="text-white text-lg font-bold uppercase" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>{m.home}</span>
                  <span className="flex items-center justify-center w-9 h-9">
                    <img src={m.homeLogo} alt={m.home} className="w-8 h-8 object-contain" style={{display:'block'}} />
                  </span>
                </span>
              </td>
              <td className="text-center align-middle">
                <span className="inline-block w-8 h-8 border-2 border-[#61B12C] rounded bg-transparent mx-2 align-middle"></span>
                <span className="inline-block w-8 h-8 border-2 border-[#61B12C] rounded bg-transparent mx-2 align-middle"></span>
              </td>
              <td className="text-center font-bold text-base align-middle pr-4" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>
                <span className="inline-flex items-center gap-3">
                  <span className="flex items-center justify-center w-9 h-9">
                    <img src={m.awayLogo} alt={m.away} className="w-8 h-8 object-contain" style={{display:'block'}} />
                  </span>
                  <span className="text-white text-lg font-bold uppercase" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>{m.away}</span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default MatchsSection; 