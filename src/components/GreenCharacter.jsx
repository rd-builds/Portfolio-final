import React, { useRef, useState, useEffect } from 'react';
import useMousePosition from '../hooks/useMousePosition';

const GreenCharacter = () => {
  const { x, y } = useMousePosition();
  const characterRef = useRef(null);
  const [pupilOffset, setPupilOffset] = useState({ dx: 0, dy: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(pointer: coarse), (max-width: 767px)');
      setIsMobile(mediaQuery.matches);
      
      const listener = (e) => setIsMobile(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  useEffect(() => {
    if (isMobile) {
      setPupilOffset({ dx: 0, dy: 0 });
      return;
    }

    if (characterRef.current) {
      const rect = characterRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const angle = Math.atan2(y - centerY, x - centerX);
      const maxDistance = 3;
      
      const distance = Math.min(
        maxDistance,
        Math.hypot(x - centerX, y - centerY) / 50 
      );

      setPupilOffset({
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance
      });
    }
  }, [x, y, isMobile]);

  return (
    <div 
      ref={characterRef}
      className={`relative w-24 h-24 ${isMobile ? 'animate-pulse' : 'animate-bounce'}`}
      style={{ animationDuration: '3s' }}
    >
      <div className="absolute inset-0 bg-green-400 rounded-full shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}>
        {/* Highlight/shine */}
        <div className="absolute top-2 right-4 w-6 h-4 bg-white opacity-40 rounded-full transform rotate-12"></div>
      </div>
      
      {/* Eyes container */}
      <div className="absolute top-6 left-0 right-0 flex justify-center gap-2">
        {/* Left Eye */}
        <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-inner overflow-hidden relative">
          <div 
            className="w-2.5 h-2.5 bg-charcoal rounded-full absolute"
            style={{ transform: `translate(${pupilOffset.dx}px, ${pupilOffset.dy}px)` }}
          />
        </div>
        {/* Right Eye */}
        <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-inner overflow-hidden relative">
          <div 
            className="w-2.5 h-2.5 bg-charcoal rounded-full absolute"
            style={{ transform: `translate(${pupilOffset.dx}px, ${pupilOffset.dy}px)` }}
          />
        </div>
      </div>
    </div>
  );
};

export default GreenCharacter;
