import React from 'react';

const items = [
  { icon: (<span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#61B12C] text-white font-bold text-sm" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>C</span>), label: 'CAPITAINE' },
  { icon: (<span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white font-bold text-sm" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>V</span>), label: 'VICE CAPITAINE' },
  { icon: (<img src="/statuts/mvp.svg" alt="MVP" className="w-6 h-6" />), label: 'MVP' },
  { icon: (<img src="/statuts/absent.svg" alt="Ne jouera pas" className="w-6 h-6" />), label: 'NE JOUERA PAS' },
  { icon: (<img src="/statuts/incertain.svg" alt="Incertain de jouer" className="w-6 h-6" />), label: 'INCERTAIN DE JOUER' },
];

const LegendSection = ({ showCommentLink, onCommentClick }) => (
  <section className="w-full max-w-full md:max-w-none mx-auto relative bg-[#141414] border border-[#1D1D1D] rounded-none px-1 sm:px-2 md:px-4 py-3">
    {/* Comment link for mobile only */}
    {showCommentLink && (
      <button
        className="absolute top-2 right-2 text-white font-bold uppercase underline text-xs z-10 md:hidden"
        style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}
        onClick={onCommentClick}
      >
        Comment marquer des points
      </button>
    )}
    {/* Desktop: one row, Mobile: custom grid */}
    <div className="hidden md:flex w-full items-center justify-center gap-6">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          {item.icon}
          <span className="text-white font-bold uppercase text-base" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>{item.label}</span>
        </div>
      ))}
    </div>
    {/* Mobile: custom grid as per image, more compact, centered */}
    <div className="flex flex-col md:hidden w-full py-4 mt-4 mx-auto text-center">
      <div className="grid grid-cols-3 gap-x-3 gap-y-3 mb-3 mx-auto">
        <div className="flex items-center gap-3 col-span-1 justify-center">{items[0].icon}<span className="text-white font-bold uppercase text-[11px]" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>{items[0].label}</span></div>
        <div className="flex items-center gap-3 col-span-1 justify-center">{items[1].icon}<span className="text-white font-bold uppercase text-[11px]" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>{items[1].label}</span></div>
        <div className="flex items-center gap-3 col-span-1 justify-center">{items[2].icon}<span className="text-white font-bold uppercase text-[11px]" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>{items[2].label}</span></div>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-3 mx-auto">
        <div className="flex items-center gap-3 col-span-1 justify-center">{items[3].icon}<span className="text-white font-bold uppercase text-[11px]" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>{items[3].label}</span></div>
        <div className="flex items-center gap-3 col-span-1 justify-center">{items[4].icon}<span className="text-white font-bold uppercase text-[11px]" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif'}}>{items[4].label}</span></div>
      </div>
    </div>
  </section>
);

export default LegendSection; 