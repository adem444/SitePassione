import React, { useState, useEffect } from 'react';
import LeaguesModal from '../modals/LeaguesModal';

const CarouselSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showLeaguesModal, setShowLeaguesModal] = useState(false);

  const slides = [
    {
      id: 1,
      image: '/avatar.png',
      alt: 'Eagle Logo'
    },
    {
      id: 2,
      image: '/Mercato-Marche-Transfert.jpg',
      alt: 'Logo'
    },
    {
      id: 3,
      image: '/avatar.png',
      alt: 'Avatar'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Auto-advance every 5 seconds
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <>
      <div className="w-full flex flex-col items-center">
        {/* Carousel Container - Fully Responsive */}
        <div className="relative overflow-hidden w-full h-[150px] sm:h-36 md:h-40 lg:h-44 xl:h-48">
          {/* Current Slide Image */}
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].alt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Carousel Dots - Responsive spacing */}
        <div className="flex justify-center space-x-2 sm:space-x-3 mt-3 sm:mt-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 transition-colors duration-200 transform rotate-45 ${
                index === currentSlide ? '' : 'bg-white/50 hover:bg-white/70'
              }`}
              style={index === currentSlide ? { background: '#629F3F' } : {}}
            />
          ))}
        </div>

        {/* Leagues Button - Full width with cup icon */}
        <button
          onClick={() => setShowLeaguesModal(true)}
          className="w-full mt-4 bg-[#629F3F] hover:bg-[#4a7a2f] text-white font-bold py-3 px-4  flex items-center justify-center gap-3 transition-colors duration-200 uppercase text-sm sm:text-base lg:text-lg"
          style={{ fontFamily: 'Bebas Neue, Gotham SSM, sans-serif' }}
        >
          <img 
            src="/cup.svg" 
            alt="Cup Icon" 
            className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" 
            loading="lazy"
          />
          <span>LIGUES ENTRE AMIS</span>
        </button>
      </div>

      {/* Leagues Modal */}
      <LeaguesModal
        open={showLeaguesModal}
        onClose={() => setShowLeaguesModal(false)}
      />
    </>
  );
};

export default CarouselSection; 