import React, { useEffect, useRef, useState } from 'react';
import api from '../../utils/api';

const PartnersSection = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const carouselRef = useRef(null);

  // Fetch sponsors from API
  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await api.getCarouselByType('sponsors');
        
        if (result.success && result.data && result.data.images) {
          // Transform carousel images to partners format
          const sponsorsData = result.data.images.map((image, index) => ({
            logo: image.url,
            link: image.link || '#',
            name: image.title || `Sponsor ${index + 1}`
          }));
          
          setPartners(sponsorsData);
        } else {
          console.log('No sponsors carousel found or no images');
          setPartners([]);
        }
      } catch (error) {
        console.error('Error fetching sponsors:', error);
        setError('Failed to load sponsors');
        setPartners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  // Carousel animation effect
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || partners.length === 0) return;

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
  }, [partners]);

  return (
    <section className="py-8 w-full">
      <div className="max-w-[1350px] mx-auto px-4">
        <h2 className="text-white font-bold uppercase mb-6 text-left" style={{fontFamily:'Bebas Neue, Gotham SSM, sans-serif', fontSize:'28px', letterSpacing: '0.04em'}}>
          NOS PARTENAIRES
        </h2>
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#629F3F]"></div>
            <span className="ml-3 text-white">Chargement des partenaires...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-400">{error}</p>
          </div>
        ) : partners.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Aucun partenaire disponible</p>
          </div>
        ) : (
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
                      onError={(e) => {
                        e.target.src = '/adidas.svg'; // Fallback image
                      }}
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
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