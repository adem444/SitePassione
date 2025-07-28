import React from 'react';

const partners = [
  { logo: '/adidas.png', link: 'https://www.adidas.com/' },
  { logo: '/partner1.svg', link: '#' },
  { logo: '/partner2.svg', link: '#' },
  { logo: '/partner3.svg', link: '#' },
];

const PartnersSection = () => (
  <section className="pt-4 pb-8 w-full">
    <div className="max-w-[950px] mx-auto px-4">
      <h2 className="text-white font-bold uppercase mb-4 text-center" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif', fontSize:'28px'}}>NOS PARTENAIRES</h2>
      <div className="flex flex-row flex-nowrap items-center gap-12 overflow-x-auto md:gap-24 md:overflow-x-visible md:justify-start custom-scrollbar-hide" style={{width:'100%'}}>
        {partners.map((p, i) => (
          <a key={i} href={p.link} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
            <img src={p.logo} alt="partner" className="h-20 w-20 object-contain rounded-none" style={{background:'#222', padding:'8px'}} />
          </a>
        ))}
      </div>
    </div>
    <style>{`
      .custom-scrollbar-hide::-webkit-scrollbar { display: none; }
      .custom-scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    `}</style>
  </section>
);

export default PartnersSection; 