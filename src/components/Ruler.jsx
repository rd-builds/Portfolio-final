import React, { useState, useEffect } from 'react';

const Ruler = () => {
  const [offsetX, setOffsetX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Generate numbers from 100 to 2000 in increments of 100
  const ticks = Array.from({ length: 20 }, (_, i) => (i + 1) * 100);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let animFrameId;
    let targetX = 0;
    let currentX = 0;

    const handleMouseMove = (e) => {
      // Calculate offset from center of window (-40px to +40px max shift)
      const centerX = window.innerWidth / 2;
      targetX = ((e.clientX - centerX) / centerX) * 40;
    };

    const updateRuler = () => {
      currentX += (targetX - currentX) * 0.08;
      setOffsetX(currentX);
      animFrameId = requestAnimationFrame(updateRuler);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animFrameId = requestAnimationFrame(updateRuler);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrameId);
    };
  }, [isMobile]);

  return (
    <div className="w-full border-b border-gray-200/60 bg-cream/50 backdrop-blur-xs py-1.5 px-4 overflow-hidden select-none pointer-events-none z-30">
      <div 
        className="flex items-end justify-between max-w-[1400px] mx-auto opacity-70 transition-transform duration-75 ease-out"
        style={{
          transform: `translateX(${isMobile ? 0 : offsetX}px)`,
        }}
      >
        {ticks.map((num) => (
          <div key={num} className="flex flex-col items-center gap-0.5 min-w-[40px]">
            <div className="flex items-end gap-1 h-3">
              <div className="w-px h-3 bg-gray-500" />
              <div className="w-px h-1.5 bg-gray-300 hidden sm:block" />
              <div className="w-px h-2 bg-gray-300 hidden md:block" />
              <div className="w-px h-1.5 bg-gray-300 hidden sm:block" />
            </div>
            <span className="font-mono text-[9px] text-gray-500 tracking-tighter">
              {num}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ruler;
