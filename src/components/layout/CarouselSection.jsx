import React, { useState, useEffect } from 'react';
import LeaguesModal from '../modals/LeaguesModal';
import api from '../../utils/api';

const CarouselSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showLeaguesModal, setShowLeaguesModal] = useState(false);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch carousel images
  const fetchCarouselSlides = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to get home carousel first, then fallback to all carousels
      let result = await api.getCarouselByType('home');
      
      if (!result.success || !result.data || result.data.length === 0) {
        // If home carousel not found, try to get all carousels
        result = await api.getAllCarousels();
        
        if (result.success && result.data && result.data.length > 0) {
          // Find the first active carousel
          const activeCarousel = result.data.find(carousel => carousel.isActive);
          if (activeCarousel) {
            result.data = activeCarousel;
          } else {
            // If no active carousel, use the first one
            result.data = result.data[0];
          }
        }
      }
      
      if (result.success && result.data && result.data.images && result.data.images.length > 0) {
        // Transform carousel images for the component
        const carouselSlides = result.data.images
          .filter(image => image.url) // Only images with URL
          .sort((a, b) => a.order - b.order) // Sort by order
          .map((image, index) => ({
            id: image._id || index + 1,
            image: image.url,
            alt: image.title || 'Carousel Image',
            title: image.title,
            link: image.link
          }));
        
        setSlides(carouselSlides);
      } else {
        console.error('Failed to fetch carousel:', result.message);
        setError(result.message);
        // Fallback to default slides if no carousel found
        setSlides([
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
        ]);
      }
    } catch (error) {
      console.error('Error fetching carousel slides:', error);
      setError('Failed to load carousel slides');
      // Fallback to default slides
      setSlides([
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
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch carousel slides on component mount
  useEffect(() => {
    fetchCarouselSlides();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Auto-advance every 5 seconds
    return () => clearInterval(timer);
  }, [slides.length]);

  // Show loading state
  if (loading) {
    return (
      <div className="w-full flex flex-col items-center">
        <div className="relative overflow-hidden w-full h-[150px] sm:h-36 md:h-40 lg:h-44 xl:h-48 bg-gray-800 flex items-center justify-center">
          <div className="flex items-center">
            <div className="w-8 h-8 border-2 border-[#629F3F] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-white ml-3">Chargement du carousel...</span>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && slides.length === 0) {
    return (
      <div className="w-full flex flex-col items-center">
        <div className="relative overflow-hidden w-full h-[150px] sm:h-36 md:h-40 lg:h-44 xl:h-48 bg-gray-800 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-400 mb-2">Erreur de chargement</div>
            <button 
              onClick={fetchCarouselSlides}
              className="bg-[#629F3F] text-white px-4 py-2 rounded hover:bg-[#4e7e32] transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex flex-col items-center">
        {/* Carousel Container - Fully Responsive */}
        <div className="relative overflow-hidden w-full h-[150px] sm:h-36 md:h-40 lg:h-44 xl:h-48">
          {/* Current Slide Image */}
          <img
            src={slides[currentSlide]?.image || '/avatar.png'}
            alt={slides[currentSlide]?.alt || 'Carousel Image'}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Carousel Dots - Responsive spacing */}
        {slides.length > 1 && (
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
        )}

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