import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GreenCharacter from './GreenCharacter';

const phrases = [
  "Hey there!",
  "Welcome.",
  "Currently building, learning & figuring it out.",
  "Ready to see what’s brewing?"
];

const IntroScreen = ({ onComplete }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout;
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting && displayedText.length < currentPhrase.length) {
      // Slower natural typing speed (~110ms per character)
      timeout = setTimeout(() => {
        setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
      }, 110);
    } else if (!isDeleting && displayedText.length === currentPhrase.length) {
      // Finished typing phrase
      if (phraseIndex < phrases.length - 1) {
        // Pause briefly before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 500);
      } else {
        // Final phrase "let's do this." finished
        timeout = setTimeout(() => {
          setIsComplete(true);
          setTimeout(() => {
            onComplete();
          }, 600);
        }, 600);
      }
    } else if (isDeleting && displayedText.length > 0) {
      // Fast deletion
      timeout = setTimeout(() => {
        setDisplayedText(currentPhrase.slice(0, displayedText.length - 1));
      }, 35);
    } else if (isDeleting && displayedText.length === 0) {
      // Move to next phrase
      setIsDeleting(false);
      setPhraseIndex((prev) => prev + 1);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, phraseIndex, onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-cream flex flex-col justify-between p-8 sm:p-12 md:p-16 select-none pointer-events-auto"
        >
          {/* Top Header Bar */}
          <div className="flex justify-between items-center w-full z-10">
            <span className="font-mono text-xs text-gray-400 font-semibold tracking-wider uppercase">
              01 &nbsp; GREETING
            </span>
            <span className="font-mono text-xs text-gray-400 font-semibold tracking-widest">
              &#123; 0{phraseIndex + 1} / 0{phrases.length} &#125;
            </span>
          </div>

          {/* Center Main Typing Area */}
          <div className="flex flex-col items-center justify-center my-auto z-10 text-center px-4">
            <div className="relative inline-flex items-center">
              {/* Pastel Purple Highlighter Underline Effect */}
              <span className="absolute bottom-1 left-0 right-0 h-4 bg-purple-200/70 rounded-md transform -rotate-1 -z-10 scale-105" />
              
              <h1 className="font-handwritten text-4xl sm:text-6xl md:text-7xl font-bold text-charcoal tracking-wide leading-tight">
                {displayedText}
              </h1>
              
              {/* Natural Blinking Purple Cursor */}
              <span className="w-1 sm:w-1.5 h-8 sm:h-12 bg-purple-500 inline-block animate-pulse ml-1 rounded-full align-middle" />
            </div>

            {/* Subtext */}
            <p className="font-mono text-xs sm:text-sm text-gray-400 tracking-[0.25em] mt-10 animate-pulse">
              . . . &nbsp; just a sec &nbsp; . . .
            </p>

            {/* View Portfolio Button */}
            <button
              onClick={() => {
                setIsComplete(true);
                setTimeout(() => {
                  onComplete();
                }, 600);
              }}
              className="mt-6 font-mono text-xs sm:text-sm text-charcoal border border-gray-300 rounded-full px-6 py-2.5 hover:bg-charcoal hover:text-cream transition-all duration-300 tracking-wider"
            >
              VIEW PORTFOLIO →
            </button>
          </div>

          {/* Bottom Bar: Green Character + Sparkle Doodle */}
          <div className="flex justify-between items-end w-full z-10">
            {/* Bottom-left Green Character */}
            <div className="scale-75 origin-bottom-left">
              <GreenCharacter />
            </div>

            {/* Bottom-right 4-Point Star Sparkle */}
            <div className="text-gray-400 font-mono text-2xl animate-spin" style={{ animationDuration: '12s' }}>
              ✦
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroScreen;
