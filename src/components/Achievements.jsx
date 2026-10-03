import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import EditableImage from './EditableImage';
import { mainCategories } from '../data/achievementsData';

// ─── Color tokens ──────────────────────────────────────────────
const C = {
  bg:        '#000000',
  text:      '#ffffeb',
  divider:   'rgba(255,255,235,0.15)',
  hoverBg:   '#f0d7ff',
  hoverText: '#111111',
  hoverSub:  '#3a1a5e',
};

// ─── Animation ease ────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1];

// ─── Row Component ─────────────────────────────────────────────
const CategoryRow = ({ cat, index, isMobile, isActive, onActivate, onDeactivate }) => {
  const navigate = useNavigate();

  const handleRowClick = () => {
    if (cat.isClickable && cat.route) {
      navigate(cat.route);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.12 }}
      transition={{ duration: 0.55, delay: index * 0.07, ease }}
    >
      {/* Top divider */}
      <div style={{ height: '1px', background: C.divider }} />

      <motion.div
        onMouseEnter={() => !isMobile && onActivate()}
        onMouseLeave={() => !isMobile && onDeactivate()}
        onClick={handleRowClick}
        animate={{
          backgroundColor: isActive ? C.hoverBg : C.bg,
        }}
        transition={{ duration: 0.38, ease: 'easeOut' }}
        style={{
          cursor: cat.isClickable ? 'pointer' : 'default',
          overflow: 'hidden',
          transition: 'background-color 0.38s ease',
        }}
        className="group px-6 sm:px-10 lg:px-16 xl:px-24 select-none"
      >
        {/* ── Main Category Row ── */}
        <div className="flex items-center justify-between py-7 md:py-9 gap-6">
          <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                color: isActive ? C.hoverSub : 'rgba(255,255,235,0.4)',
                fontWeight: 700,
                letterSpacing: '0.1em',
              }}
              className="shrink-0"
            >
              0{index + 1}
            </span>

            <motion.h3
              animate={{ color: isActive ? C.hoverText : C.text }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
              style={{
                fontSize: 'clamp(1.3rem, 3.2vw, 2.7rem)',
                fontWeight: 900,
                letterSpacing: '-0.01em',
                lineHeight: 1.1,
                textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif',
              }}
              className="truncate"
            >
              {cat.title}
            </motion.h3>
          </div>

          {/* Badge & Action Indicator */}
          <div className="flex items-center gap-3 shrink-0">
            <motion.span
              animate={{
                color: isActive ? C.hoverSub : 'rgba(255,255,235,0.5)',
                borderColor: isActive ? 'rgba(100,50,160,0.3)' : 'rgba(255,255,235,0.18)',
                backgroundColor: isActive ? 'rgba(255,255,255,0.6)' : 'transparent',
              }}
              transition={{ duration: 0.32 }}
              style={{
                border: '1px solid',
                borderRadius: '999px',
                padding: '4px 12px',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                fontFamily: 'Inter, sans-serif',
              }}
              className="hidden sm:inline-block"
            >
              {cat.badge}
            </motion.span>

            {cat.isClickable ? (
              <motion.span
                animate={{
                  x: isActive ? 4 : 0,
                  color: isActive ? C.hoverText : 'rgba(255,255,235,0.4)',
                }}
                transition={{ duration: 0.25 }}
                className="text-lg font-bold"
              >
                →
              </motion.span>
            ) : (
              <span
                style={{ color: isActive ? C.hoverSub : 'rgba(255,255,235,0.25)' }}
                className="text-xs font-mono font-medium"
              >
                [SOON]
              </span>
            )}
          </div>
        </div>

        {/* ── Expanded Content on Hover ── */}
        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              key="expanded"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease }}
              style={{ overflow: 'hidden' }}
            >
              <div className="pb-8 md:pb-10 pt-2 flex flex-col sm:flex-row items-start gap-6 md:gap-10 border-t border-black/10">
                {/* ── Visual Image Block ── */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: 10 }}
                  transition={{ duration: 0.35, delay: 0.05, ease }}
                  style={{
                    flexShrink: 0,
                    width: 'clamp(120px, 20vw, 180px)',
                    height: 'clamp(90px, 14vw, 130px)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid rgba(0,0,0,0.12)',
                    background: '#ffffeb',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                    userSelect: 'none',
                  }}
                >
                  <EditableImage
                    src={cat.image}
                    alt={`${cat.title} preview`}
                    placeholder="IMAGE SLOT"
                  />
                </motion.div>

                {/* ── Description + Link prompt ── */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.35, delay: 0.08, ease }}
                  className="flex-1 flex flex-col justify-between"
                >
                  <p
                    style={{
                      color: C.hoverSub,
                      fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
                      lineHeight: 1.6,
                      fontWeight: 400,
                      maxWidth: '600px',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {cat.description}
                  </p>

                  {cat.isClickable && (
                    <div className="mt-4 flex items-center gap-2">
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          letterSpacing: '0.12em',
                          color: '#5b21b6',
                          textTransform: 'uppercase',
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-purple-300 shadow-2xs"
                      >
                        CLICK TO VIEW →
                      </span>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// ─── Main Section ──────────────────────────────────────────────
const Achievements = () => {
  const [activeId, setActiveId] = useState(null);

  const isMobile =
    typeof window !== 'undefined' &&
    (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);

  return (
    <section
      id="achievements"
      style={{ backgroundColor: C.bg, fontFamily: 'Inter, sans-serif' }}
      className="relative z-10"
    >
      {/* ── Centered Editorial Heading ── */}
      <div style={{ textAlign: 'center', padding: 'clamp(70px,11vw,130px) 24px clamp(40px,6vw,80px)' }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.6 }}
          transition={{ duration: 0.45, ease }}
          style={{
            color: 'rgba(255,255,235,0.45)',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}
        >
          Recognition &amp; Records
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.08, ease }}
          style={{
            color: C.text,
            fontSize: 'clamp(2.2rem, 6vw, 5.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            textTransform: 'uppercase',
            margin: '0 auto',
            maxWidth: '960px',
          }}
        >
          Achievements &amp;<br />Participation
        </motion.h2>
      </div>

      {/* ── Category Rows ── */}
      <div style={{ maxWidth: '1500px', margin: '0 auto', paddingBottom: 'clamp(70px,11vw,130px)' }}>
        {mainCategories.map((cat, i) => (
          <CategoryRow
            key={cat.id}
            cat={cat}
            index={i}
            isMobile={isMobile}
            isActive={activeId === cat.id}
            onActivate={() => setActiveId(cat.id)}
            onDeactivate={() => setActiveId(null)}
          />
        ))}
        {/* Bottom divider */}
        <div style={{ height: '1px', background: C.divider }} />
      </div>
    </section>
  );
};

export default Achievements;
