import React, { useState, useEffect } from 'react';

const DeadlineSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 10,
    hours: 12,
    minutes: 36,
  });

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59 };
        }
        return prev;
      });
    }, 60000); // update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[166px] flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #000000 0%, #629F3F 100%)' }}>
      {/* Eagle Image in top-right */}
      <img
        src="/eagle.png" // Place eagle image as /public/eagle.png
        alt="Eagle"
        className="absolute top-0 -right-16 md:right-0 h-[150%] md:h-[220%] w-auto object-contain opacity-70 pointer-events-none"
      />

      {/* Content */}
      <div className="w-full px-4 md:px-[40px] z-10">
        <div className="text-center">
          <h1 className="text-white text-2xl lg:text-3xl font-bold mb-4 uppercase">
            JOURNÉE 1 DEADLINE
          </h1>

          <div className="inline-block px-6 py-4  bg-black/30 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-6 text-white">
              {/* Days */}
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold">
                  {timeLeft.days.toString().padStart(2, '0')}
                </div>
                <div className="text-sm uppercase tracking-wide mt-1">Jours</div>
              </div>

              {/* Separator */}
              <div className="text-3xl lg:text-4xl font-bold">:</div>

              {/* Hours */}
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </div>
                <div className="text-sm uppercase tracking-wide mt-1">Heures</div>
              </div>

              {/* Separator */}
              <div className="text-3xl lg:text-4xl font-bold">:</div>

              {/* Minutes */}
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </div>
                <div className="text-sm uppercase tracking-wide mt-1">Mins</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeadlineSection;
