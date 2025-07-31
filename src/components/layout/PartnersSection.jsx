import React, { useEffect, useRef } from 'react';

const partners = [
  { logo: '/adidas.svg', link: 'https://www.adidas.com/', name: 'Adidas' },
  { logo: '/adidas.svg', link: 'https://www.adidas.com/', name: 'Adidas' },
  { logo: '/adidas.svg', link: 'https://www.adidas.com/', name: 'Adidas' },
  { logo: '/adidas.svg', link: 'https://www.adidas.com/', name: 'Adidas' },
  { logo: '/adidas.svg', link: 'https://www.adidas.com/', name: 'Adidas' },
  { logo: '/adidas.svg', link: 'https://www.adidas.com/', name: 'Adidas' },
  { logo: '/adidas.svg', link: 'https://www.adidas.com/', name: 'Adidas' },
  { logo: '/adidas.svg', link: 'https://www.adidas.com/', name: 'Adidas' },
  { logo: '/adidas.svg', link: 'https://www.adidas.com/', name: 'Adidas' },
];

const PartnersSection = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationId;
    let scrollPosition = 0;
    const scrollSpeed = 1;

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Reset when we've scrolled the width of one set of partners
      if (scrollPosition >= carousel.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      carousel.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    // Start automatic scrolling
    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="py-8 w-full">
      <div className="max-w-[1350px] mx-auto px-4">
        <h2 className="text-white font-bold uppercase mb-6 text-left" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif', fontSize:'28px', letterSpacing: '0.04em'}}>
          NOS PARTENAIRES
        </h2>
        
        <div className="overflow-x-auto">
          <div 
            ref={carouselRef}
            className="flex items-center gap-6 md:gap-8 lg:gap-10"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {/* First set of partners */}
            {partners.map((partner, index) => (
              <a 
                key={`first-${index}`}
                href={partner.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-shrink-0"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-[#1D1D1D] border border-[#2A3C2A] rounded-lg p-3 flex items-center justify-center">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`} 
                    className="w-full h-full object-contain"
                  />
                </div>
              </a>
            ))}
            
            {/* Duplicate set for infinite loop */}
            {partners.map((partner, index) => (
              <a 
                key={`second-${index}`}
                href={partner.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-shrink-0"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-[#1D1D1D] border border-[#2A3C2A] rounded-lg p-3 flex items-center justify-center">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`} 
                    className="w-full h-full object-contain"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
        
        .overflow-x-auto {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
    </section>
  );
};

export default PartnersSection; 