import React from 'react';
import { motion } from 'framer-motion';

const BrowserFrame = ({ src, alt, sizeClass = 'max-w-[300px] sm:max-w-[320px]' }) => {
  return (
    <div className={`relative mx-auto w-full ${sizeClass}`}>
      {/* PROFILE / 01 micro-label (top-left, floating above frame) */}
      <div className="absolute -top-4 -left-2 sm:-left-3 z-10 pointer-events-none">
        <span className="font-mono text-[10px] font-semibold tracking-[0.3em] uppercase text-charcoal/40">
          {/* PROFILE&nbsp;/&nbsp;01 */}
        </span>
      </div>

      {/* CSE • AI + WEB annotation (top-right) */}
      <div className="absolute -top-4 right-0 z-10 pointer-events-none hidden sm:flex items-center gap-2">
        <span className="font-mono text-[10px] font-semibold tracking-[0.2em] uppercase text-charcoal/40">
          CSE • AI + WEB
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -6, rotate: -0.6 }}
        className="relative group rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-xl transition-shadow duration-300 hover:shadow-2xl"
      >
        {/* Top bar */}
        <div className="h-9 bg-gray-100 flex items-center px-4 gap-1.5 border-b border-gray-200/70">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
          <div className="flex-1 mx-3 h-4 bg-gray-200 rounded-full"></div>
        </div>

        {/* Image area */}
        <div className="aspect-[4/5] w-full relative overflow-hidden">
          <img
            src={src}
            alt={alt}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Bottom status bar */}
        <div className="px-4 py-2.5 flex items-center gap-2 border-t border-gray-100">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span className="font-mono text-[10px] text-gray-400 font-medium tracking-[0.2em] uppercase">
            // Open for work
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default BrowserFrame;
