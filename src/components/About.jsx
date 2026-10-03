import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import BrowserFrame from './BrowserFrame';
import { aboutParagraphs, personal, stats } from '../data/portfolio.js';

const ease = [0.22, 1, 0.36, 1];

// Broad, organic hand-drawn squiggle — one loose stroke travelling from
// near the left viewport edge to the right edge.
const SQUIGGLE_PATH =
  "M 24 190 C 90 105, 150 60, 220 85 " +
  "C 290 110, 310 205, 380 235 C 450 265, 500 195, 550 135 " +
  "C 600 75, 680 55, 750 115 C 820 175, 845 250, 920 220 " +
  "C 995 190, 1035 125, 1176 150";

// One or two key phrases per paragraph get a soft lavender wash.
const accentPhrases = {
  // 0: ["a builder before anything else"],
  // 1: ["genuinely solve problems"],
};

function renderParagraph(text, phrases = []) {
  if (!phrases.length) return text;
  const segments = [];
  let remaining = text;
  phrases.forEach((phrase, i) => {
    const idx = remaining.indexOf(phrase);
    if (idx === -1) return;
    if (idx > 0) segments.push(remaining.slice(0, idx));
    segments.push(
      <span key={i} className="about-accent">
        {phrase}
      </span>
    );
    remaining = remaining.slice(idx + phrase.length);
  });
  if (remaining) segments.push(remaining);
  return segments.length ? segments : text;
}

// Smooth soft reveal used across the heading, tagline and paragraphs.
const reveal = (inView) => ({
  opacity: inView ? 1 : 0,
  y: inView ? 0 : 22,
  filter: inView ? "blur(0px)" : "blur(4px)",
});

const About = () => {
  const sectionRef = useRef(null);

  // Bidirectional visibility (no triggerOnce) for heading, text and stats.
  const [headingRef, headingInView] = useInView({ threshold: 0.1 });
  const [textRef, textInView] = useInView({ threshold: 0.12 });
  const [statsRef, statsInView] = useInView({ threshold: 0.25 });

  // Scroll-progress-driven squiggle: draws as About enters, stays while
  // active, then rolls back as About leaves — in BOTH directions.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "end 0.4"],
  });
  const drawProgress = useTransform(scrollYProgress, [0, 0.35, 0.6, 1], [0, 1, 1, 0]);
  const dashOffset = useTransform(drawProgress, [0, 1], [1, 0]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 px-5 sm:px-8 mx-auto w-full max-w-[1600px]"
    >
      {/* Squiggle — one broad hand-drawn stroke, full viewport width,
          behind About content only. Subtle (opacity 0.2), thick, drawn
          left→right and retracted when leaving, in both directions. */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-screen -translate-x-1/2 -translate-y-1/2 overflow-hidden opacity-20"
        aria-hidden="true"
      >
        <svg
          className="block w-full"
          viewBox="0 0 1200 300"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          <motion.path
            className="about-squiggle"
            d={SQUIGGLE_PATH}
            pathLength="1"
            style={{ strokeDasharray: 1, strokeDashoffset: dashOffset }}
          />
        </svg>
      </div>

      <div className="relative z-10">
        {/* About heading — bold, confident, modern sans-serif */}
        <motion.h2
          ref={headingRef}
          initial={{ opacity: 0, y: 26, filter: "blur(4px)" }}
          animate={reveal(headingInView)}
          transition={{ duration: 0.85, ease }}
          className="mb-12 text-center font-body text-4xl font-black tracking-tight text-charcoal sm:text-5xl lg:text-6xl"
        >
          ABOUT ME<span className="text-purple-700">.</span>
        </motion.h2>

        <div className="about-grid mt-4 gap-10 md:gap-x-8 lg:gap-x-10">
          {/* TEXT: eyebrow + handwritten tagline + about copy */}
          <div ref={textRef} className="about-area-text">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={reveal(textInView)}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              className="mb-6 font-mono text-[11px] font-semibold tracking-[0.3em] uppercase text-purple-700/70"
            >
              01 / About Me
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 22, filter: "blur(4px)" }}
              animate={reveal(textInView)}
              transition={{ duration: 0.85, delay: 0.2, ease }}
              className="mb-9"
            >
              <div className="mt-1 block -rotate-1 font-handwritten text-4xl font-semibold text-purple-700 sm:text-5xl">
                "I build what I wish existed."
              </div>
            </motion.p>

            <div className="space-y-6">
              {aboutParagraphs.map((para, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 22, filter: "blur(4px)" }}
                  animate={reveal(textInView)}
                  transition={{ duration: 0.85, delay: 0.34 + index * 0.15, ease }}
                  className="font-body text-[17px] font-medium leading-9 text-charcoal"
                >
                  {renderParagraph(para, accentPhrases[index])}
                </motion.p>
              ))}
            </div>
          </div>

          {/* PHOTO / browser frame + tiny personal detail */}
          <div className="about-area-photo flex items-center justify-center">
            <div className="relative">
              {/* Soft lavender offset layer behind the Polaroid */}
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[96%] w-[92%] -translate-x-1/2 -translate-y-1/2 rotate-[-3deg] rounded-[1.9rem] bg-[#E9D5FF]/60"
              />
              <BrowserFrame
                src={personal.profileImage}
                alt="Profile photo placeholder"
                sizeClass="max-w-[330px] sm:max-w-[360px]"
              />
              {/* Tiny sparkle doodle */}
              <svg
                className="absolute -left-4 -top-5 z-10 h-7 w-7 rotate-12 text-purple-400 animate-float"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0l2.2 9.8L24 12l-9.8 2.2L12 24l-2.2-9.8L0 12l9.8-2.2L12 0z" />
              </svg>
            </div>
          </div>

          {/* STATS panel */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 26 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
            transition={{ duration: 0.6, ease }}
            className="about-area-stats grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-gray-200 bg-gray-200/70 shadow-sm sm:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 14, scale: 0.97 }}
                animate={statsInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 14, scale: 0.97 }}
                transition={{ duration: 0.5, delay: 0.08 + index * 0.08, ease }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="group flex flex-col items-center justify-center bg-white/95 px-4 py-6 text-center transition-colors duration-300 hover:bg-[#F6EEFF]"
              >
                <motion.span className="text-3xl font-extrabold leading-none text-charcoal transition-colors duration-300 group-hover:text-purple-700">
                  {stat.value}
                </motion.span>
                <span className="mt-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-gray-400 transition-colors duration-300 group-hover:text-gray-600">
                  {stat.label}
                </span>
                {stat.sub && (
                  <span className="mt-0.5 font-mono text-[9px] text-gray-300 transition-colors duration-300 group-hover:text-gray-400">
                    {stat.sub}
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;