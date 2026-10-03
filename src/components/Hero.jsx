import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';
import { personal } from '../data/portfolio.js';

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  const heroRef = useRef(null);
  const nameCardRef = useRef(null);
  const contrastWindowRef = useRef(null);

  // Check mobile screen
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 60FPS Cursor tracking & Snipping Tool Contrast Window (Requirements 1-11, 16, 19)
  useEffect(() => {
    if (isMobile) return;

    let animFrameId;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let hasMouseMoved = false;
    let isInsideNameArea = false;

    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const heroRect = heroRef.current.getBoundingClientRect();

      // Clamp mouse coordinates inside hero boundary
      const relX = e.clientX - heroRect.left;
      const relY = e.clientY - heroRect.top;

      if (relX >= 0 && relX <= heroRect.width && relY >= 0 && relY <= heroRect.height) {
        targetX = Math.max(15, Math.min(heroRect.width - 50, relX));
        targetY = Math.max(15, Math.min(heroRect.height - 40, relY));
        hasMouseMoved = true;
      }

      // Check if cursor is specifically inside the RIYA DUGGAL hit area (nameCardRef)
      if (nameCardRef.current) {
        const nameRect = nameCardRef.current.getBoundingClientRect();
        isInsideNameArea = (
          e.clientX >= nameRect.left &&
          e.clientX <= nameRect.right &&
          e.clientY >= nameRect.top &&
          e.clientY <= nameRect.bottom
        );
      }
    };

    const updateLoop = () => {
      if (hasMouseMoved) {
        // Smooth lerp interpolation for the snipping-tool contrast window
        currentX += (targetX - currentX) * 0.14;
        currentY += (targetY - currentY) * 0.14;

        // Snipping Tool Contrast Window follows cursor & expands/shrinks
        if (contrastWindowRef.current) {
          const contrastElem = contrastWindowRef.current;
          contrastElem.style.transform = `translate3d(${currentX - 240}px, ${currentY - 140}px, 0)`;

          if (isInsideNameArea) {
            // Expand outward from marker
            contrastElem.style.width = '480px';
            contrastElem.style.height = '280px';
            contrastElem.style.opacity = '1';
            contrastElem.style.borderRadius = '24px';
          } else {
            // Shrink back into marker
            contrastElem.style.width = '24px';
            contrastElem.style.height = '24px';
            contrastElem.style.opacity = '0';
            contrastElem.style.borderRadius = '50%';
          }
        }
      }

      animFrameId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animFrameId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrameId);
    };
  }, [isMobile]);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[92vh] pt-24 pb-16 flex flex-col items-center justify-center overflow-hidden font-body text-charcoal select-none bg-transparent"
    >
      
      {/* ─── SNIPPING TOOL CONTRAST SELECTION WINDOW (Requirements 1-7, 9-10) ─── */}
      {!isMobile && (
        <div
          ref={contrastWindowRef}
          className="absolute top-0 left-0 z-0 pointer-events-none bg-charcoal shadow-2xl transition-all duration-400 ease-out opacity-0 border border-gray-700/50"
          style={{
            willChange: 'transform, width, height, opacity, border-radius',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          }}
        />
      )}

      {/* ─── PLAYFUL FLOATING ARROW TAGS ─── */}
      <div className="absolute inset-0 pointer-events-none w-full h-full overflow-hidden z-10">
        {/* Floating Tag 1: CHITKARA UNIVERSITY (Pastel Mint) — RIGHT side */}
        <motion.div
          animate={{ x: [0, 0, -36, 0, 0], y: [0, 0, -10, 0, 0], rotate: [5, 5, 7, 5, 5] }}
          transition={{ duration: 8, times: [0, 0.1, 0.48, 0.85, 1], repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] right-8 sm:right-16 lg:right-24"
        >
          <div className="relative bg-[#A7F3D0] text-charcoal px-4 py-2 rounded-xl text-xs font-bold tracking-wider shadow-sm flex items-center gap-2 transform rotate-6 border border-charcoal/10">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            BRB, Building Something
            <div className="absolute -bottom-1.5 left-4 w-3 h-3 bg-[#A7F3D0] rotate-45 border-r border-b border-charcoal/10" />
          </div>
        </motion.div>

        {/* Floating Tag 2: ALWAYS LEARNING (Pastel Orange) — LEFT side */}
        <motion.div
          animate={{ x: [0, 0, 34, 0, 0], y: [0, 0, 10, 0, 0], rotate: [-4, -4, -6, -4, -4] }}
          transition={{ duration: 9, times: [0, 0.1, 0.48, 0.85, 1], repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          className="absolute top-[38%] left-8 sm:left-16 lg:left-24"
        >
          <div className="relative bg-[#FED7AA] text-charcoal px-4 py-2 rounded-xl text-xs font-bold tracking-wider shadow-sm flex items-center gap-2 transform -rotate-6 border border-charcoal/10">
            <span className="text-sm">⚡</span>
            CURRENTLY UPGRADING MYSELF.
            <div className="absolute -top-1.5 right-4 w-3 h-3 bg-[#FED7AA] rotate-45 border-t border-l border-charcoal/10" />
          </div>
        </motion.div>

        {/* ─── SUBTLE DESIGN ACCENTS (minimal, editorial, balanced) ─── */}
        {/* 1. Top-left: numbered marker + dashed corner */}
        <div className="absolute top-24 left-10 hidden md:flex flex-col items-start gap-2 text-charcoal/30">
          <span className="w-10 h-10 rounded-md border border-dashed border-charcoal/20 flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-charcoal/25 rounded-full" />
          </span>
          <span className="text-[9px] font-mono tracking-[0.25em]">01</span>
        </div>

        {/* 2. Top-right: thin rule + micro-label */}
        <div className="absolute top-28 right-10 hidden lg:flex items-center gap-2 text-[9px] font-mono tracking-[0.25em] text-charcoal/35">
          <span className="w-8 h-px bg-charcoal/25" />
          WEB + AI
        </div>

        {/* 3. Bottom-left: crosshair mark + coordinate */}
        <div className="absolute bottom-20 left-10 hidden md:flex items-center gap-2 text-[9px] font-mono tracking-[0.2em] text-charcoal/35">
          <span className="relative w-2.5 h-2.5 flex items-center justify-center">
            <span className="absolute inset-0 border border-charcoal/30 rounded-full" />
            <span className="w-0.5 h-full bg-charcoal/25" />
            <span className="absolute h-0.5 w-full bg-charcoal/25" />
          </span>
          RDX / 01
        </div>

        {/* 4. Bottom-right: status label */}
        <div className="absolute bottom-20 right-10 hidden md:flex items-center gap-2 text-[9px] font-mono tracking-[0.2em] text-charcoal/35">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          AVAILABLE
        </div>
      </div>

      {/* ─── MAIN HERO COMPOSITION (With Mix-Blend Difference Contrast) ─── */}
      <div className="z-20 flex flex-col items-center text-center px-4 sm:px-6 md:px-8 max-w-4xl w-full mix-blend-difference text-white">
        
        {/* Top Tilted Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-4 w-full mix-blend-normal">
          <motion.div
            initial={{ opacity: 0, y: 15, rotate: -6 }}
            animate={{ opacity: 1, y: 0, rotate: -6 }}
            transition={{ duration: 0.5 }}
            className="bg-[#A7F3D0] text-charcoal px-4 py-2 rounded-lg text-xs font-semibold shadow-sm border border-charcoal/10 transform -rotate-6"
          >
            Currently at Chitkara University
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15, rotate: 5 }}
            animate={{ opacity: 1, y: 0, rotate: 5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#FDE68A] text-charcoal px-4 py-2 rounded-lg text-xs font-semibold shadow-sm border border-charcoal/10 transform rotate-6"
          >
            CSE (AI & Future Tech) Student
          </motion.div>
        </div>

        {/* ─── RIYA DUGGAL INTERACTIVE HIT AREA ─── */}
        <div
          ref={nameCardRef}
          className="relative w-full max-w-3xl rounded-3xl p-4 sm:p-6 md:p-8 my-2 transition-all duration-300"
        >
          {/* Handwritten "my name is" */}
          <div className="relative inline-block mb-1">
            <span className="font-handwritten text-3xl sm:text-4xl tracking-wide italic">
              my name is
            </span>
            <svg className="w-28 sm:w-36 h-3 mx-auto opacity-80 mt-0.5" viewBox="0 0 100 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8 C25 2, 75 10, 97 4 M5 10 C35 4, 65 11, 95 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          {/* HUGE DISTINCTIVE PIXEL DISPLAY FONT ONLY FOR "RIYA DUGGAL" (Requirement 16 & 17) */}
          <h1
            className="font-pixel text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider my-3 leading-none drop-shadow-sm uppercase"
            style={{ fontFamily: '"Silkscreen", "Press Start 2P", monospace' }}
          >
            RIYA DUGGAL
          </h1>

          {/* Subtitle */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4 text-xs sm:text-sm md:text-base font-bold tracking-[0.25em] uppercase">
            <span>AI EXPLORER</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lavender" />
            <span>WEB DEVELOPER</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-mint" />
            <span>PROBLEM SOLVER</span>
          </div>

          {/* Statement */}
          <p className="text-lg sm:text-xl md:text-2xl mt-6 font-medium max-w-xl leading-relaxed mix-blend-normal text-gray-500">
            I turn <span className="font-bold italic text-purple-600">"what if?"</span> into <span className="font-bold underline decoration-4 underline-offset-4 text-green-600">"let's build it."</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4 mix-blend-normal z-30"
        >
          <button
            onClick={scrollToProjects}
            className="flex items-center gap-2 bg-charcoal text-cream rounded-full px-8 py-3.5 text-sm font-bold tracking-wider hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-md"
          >
            <span>EXPLORE MY WORK</span>
            <FiArrowDown className="w-4 h-4 animate-bounce" />
          </button>

          <a
            href={personal.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-charcoal hover:text-black underline underline-offset-4 transition-colors py-2 px-4 bg-white/80 rounded-full border border-gray-200 shadow-xs"
          >
            Resume
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
