import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { hackathonsData } from '../data/achievementsData';
import DetailCard from '../components/DetailCard';

const HackathonsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="checker-grid-light min-h-screen text-[#171717] font-body selection:bg-[#E8D5F9] selection:text-[#382347]">
      {/* ── Top Bar: Back to Achievements Section ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-8 sm:pt-12">
        <Link
          to="/#achievements"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase border border-[#E4DED7] bg-white text-[#171717] hover:bg-[#E8D5F9] hover:text-[#382347] hover:border-[#E8D5F9] transition-all duration-200 shadow-xs active:scale-95"
        >
          <span>←</span>
          <span>BACK TO HOME</span>
        </Link>
      </div>

      {/* ── Editorial Header ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 pt-10 sm:pt-16 pb-12 sm:pb-20 text-center">
        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ amount: 0.5 }}
          transition={{ duration: 0.45 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-[#E8D5F9] text-[#382347] border border-[#E4DED7] mb-6 shadow-2xs"
        >
          <span>HACKATHONS &amp; SHOWCASES</span>
        </motion.div>

        {/* Large Centered Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#171717] tracking-tight leading-none uppercase"
          style={{ letterSpacing: '-0.03em' }}
        >
          Hackathons
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.5 }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-[#706B68] max-w-2xl mx-auto leading-relaxed font-normal"
        >
          A chronicle of high-pressure builds, sleepless nights, rapid prototyping, and engineering solutions under extreme time constraints.
        </motion.p>
      </div>

      {/* ── 4 Large Cards Section ── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 pb-28">
        <div className="space-y-8">
          {hackathonsData.map((item, index) => (
            <DetailCard
              key={item.id}
              item={item}
              index={index}
              galleryLabel="VIEW GALLERY"
            />
          ))}
        </div>

        {/* Bottom Navigation Prompt */}
        <div className="mt-20 pt-12 border-t border-[#E4DED7] flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            to="/#achievements"
            className="text-sm font-bold text-[#382347] hover:bg-[#E8D5F9] transition-colors underline underline-offset-4"
          >
            ← Back to main portfolio
          </Link>
          <div className="flex items-center gap-4 text-xs font-mono text-[#706B68]">
            <Link to="/certifications" className="hover:text-[#382347] transition-colors">
              Certifications →
            </Link>
            <span>•</span>
            <Link to="/club-roles" className="hover:text-[#382347] transition-colors">
              Club Roles →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonsPage;
