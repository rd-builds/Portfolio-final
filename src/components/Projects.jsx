import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from 'framer-motion';
import { FiGithub } from 'react-icons/fi';
import { projects } from '../data/portfolio.js';
import SectionHeader from './SectionHeader';

const TOTAL_PROJECTS = projects.length; // 4

/**
 * 3 transitions across 4 projects:
 * Transition 0 (01 → 02): 01 exits upper-left,  02 enters lower-right
 * Transition 1 (02 → 03): 02 exits upper-right, 03 enters lower-left
 * Transition 2 (03 → 04): 03 exits lower-left,  04 enters upper-right
 */
const VECTORS = [
  // 01 → 02
  {
    exit:  { x: -500, y: -250, z: -120, rx: 7,  ry: -5, rz: -3, s: 0.88 },
    entry: { x:  500, y:  250, z: -120, rx: -7, ry:  5, rz:  3, s: 0.88 },
  },
  // 02 → 03
  {
    exit:  { x:  500, y: -250, z: -120, rx: 7,  ry:  5, rz:  3, s: 0.88 },
    entry: { x: -500, y:  250, z: -120, rx: -7, ry: -5, rz: -3, s: 0.88 },
  },
  // 03 → 04
  {
    exit:  { x: -500, y:  250, z: -120, rx: -7, ry: -5, rz: -3, s: 0.88 },
    entry: { x:  500, y: -250, z: -120, rx:  7, ry:  5, rz:  3, s: 0.88 },
  },
];

/**
 * Milestone keyframes across stageProgress [0, 1]:
 * 4 cards, 3 transitions:
 * Card 0 centered: 0.00 -> 0.08
 * Transition 0 (01->02): 0.08 -> 0.36
 * Card 1 centered: 0.36 -> 0.42
 * Transition 1 (02->03): 0.42 -> 0.70
 * Card 2 centered: 0.70 -> 0.76
 * Transition 2 (03->04): 0.76 -> 0.98
 * Card 3 centered: 0.98 -> 1.00
 */
const T0_START = 0.05;
const T0_END   = 0.32;
const T1_START = 0.39;
const T1_END   = 0.66;
const T2_START = 0.73;
const T2_END   = 0.94;

function useCardTransforms(stageProgress, i, isMobile) {
  const amp = isMobile ? 0.5 : 1.0;

  // -------------------------------------------------------------
  // CARD 0 (Project 01)
  // Starts centered at p=0. Exits during T0 [0.08, 0.36] toward upper-left.
  // -------------------------------------------------------------
  if (i === 0) {
    const v = VECTORS[0].exit;
    const mid = T0_START + (T0_END - T0_START) * 0.5; // 0.22

    const x = useTransform(stageProgress, [0, T0_START, T0_END], [0, 0, v.x * amp]);
    const y = useTransform(stageProgress, [0, T0_START, T0_END], [0, 0, v.y * amp]);
    const z = useTransform(stageProgress, [0, T0_START, T0_END], [0, 0, v.z]);
    const scale = useTransform(stageProgress, [0, T0_START, T0_END], [1, 1, v.s]);
    const rotateX = useTransform(stageProgress, [0, T0_START, T0_END], [0, 0, v.rx]);
    const rotateY = useTransform(stageProgress, [0, T0_START, T0_END], [0, 0, v.ry]);
    const rotateZ = useTransform(stageProgress, [0, T0_START, T0_END], [0, 0, v.rz]);

    // Opaque until mid-transition (0.22), then fades to 0 as it leaves
    const opacity = useTransform(stageProgress, [0, T0_START, mid, T0_END], [1, 1, 0.9, 0]);
    const zIndex = useTransform(stageProgress, (p) => (p < mid ? 25 : 10));
    const pointerEvents = useTransform(stageProgress, (p) => (p < mid ? 'auto' : 'none'));

    return { x, y, z, scale, rotateX, rotateY, rotateZ, opacity, zIndex, pointerEvents };
  }

  // -------------------------------------------------------------
  // CARD 1 (Project 02)
  // Enters during T0 [0.08, 0.36] from lower-right.
  // Centered [0.36, 0.42].
  // Exits during T1 [0.42, 0.70] toward upper-right.
  // -------------------------------------------------------------
  if (i === 1) {
    const vIn = VECTORS[0].entry;
    const vOut = VECTORS[1].exit;
    const midIn = T0_START + (T0_END - T0_START) * 0.5; // 0.22
    const midOut = T1_START + (T1_END - T1_START) * 0.5; // 0.56

    const x = useTransform(
      stageProgress,
      [T0_START, T0_END, T1_START, T1_END],
      [vIn.x * amp, 0, 0, vOut.x * amp]
    );
    const y = useTransform(
      stageProgress,
      [T0_START, T0_END, T1_START, T1_END],
      [vIn.y * amp, 0, 0, vOut.y * amp]
    );
    const z = useTransform(
      stageProgress,
      [T0_START, T0_END, T1_START, T1_END],
      [vIn.z, 0, 0, vOut.z]
    );
    const scale = useTransform(
      stageProgress,
      [T0_START, T0_END, T1_START, T1_END],
      [vIn.s, 1, 1, vOut.s]
    );
    const rotateX = useTransform(
      stageProgress,
      [T0_START, T0_END, T1_START, T1_END],
      [vIn.rx, 0, 0, vOut.rx]
    );
    const rotateY = useTransform(
      stageProgress,
      [T0_START, T0_END, T1_START, T1_END],
      [vIn.ry, 0, 0, vOut.ry]
    );
    const rotateZ = useTransform(
      stageProgress,
      [T0_START, T0_END, T1_START, T1_END],
      [vIn.rz, 0, 0, vOut.rz]
    );

    // Fades in from 0 -> 1 during entry (0.08 -> 0.22), stays 1, then fades 1 -> 0 during exit (0.56 -> 0.70)
    const opacity = useTransform(
      stageProgress,
      [0, T0_START, midIn, T1_START, midOut, T1_END, 1],
      [0, 0, 1, 1, 0.9, 0, 0]
    );
    const zIndex = useTransform(stageProgress, (p) => (p >= midIn && p < midOut ? 25 : 15));
    const pointerEvents = useTransform(stageProgress, (p) => (p >= midIn && p < midOut ? 'auto' : 'none'));

    return { x, y, z, scale, rotateX, rotateY, rotateZ, opacity, zIndex, pointerEvents };
  }

  // -------------------------------------------------------------
  // CARD 2 (Project 03)
  // Enters during T1 [0.42, 0.70] from lower-left.
  // Centered [0.70, 0.76].
  // Exits during T2 [0.76, 0.98] toward lower-left.
  // -------------------------------------------------------------
  if (i === 2) {
    const vIn = VECTORS[1].entry;
    const vOut = VECTORS[2].exit;
    const midIn = T1_START + (T1_END - T1_START) * 0.5; // 0.56
    const midOut = T2_START + (T2_END - T2_START) * 0.5; // 0.87

    const x = useTransform(
      stageProgress,
      [T1_START, T1_END, T2_START, T2_END],
      [vIn.x * amp, 0, 0, vOut.x * amp]
    );
    const y = useTransform(
      stageProgress,
      [T1_START, T1_END, T2_START, T2_END],
      [vIn.y * amp, 0, 0, vOut.y * amp]
    );
    const z = useTransform(
      stageProgress,
      [T1_START, T1_END, T2_START, T2_END],
      [vIn.z, 0, 0, vOut.z]
    );
    const scale = useTransform(
      stageProgress,
      [T1_START, T1_END, T2_START, T2_END],
      [vIn.s, 1, 1, vOut.s]
    );
    const rotateX = useTransform(
      stageProgress,
      [T1_START, T1_END, T2_START, T2_END],
      [vIn.rx, 0, 0, vOut.rx]
    );
    const rotateY = useTransform(
      stageProgress,
      [T1_START, T1_END, T2_START, T2_END],
      [vIn.ry, 0, 0, vOut.ry]
    );
    const rotateZ = useTransform(
      stageProgress,
      [T1_START, T1_END, T2_START, T2_END],
      [vIn.rz, 0, 0, vOut.rz]
    );

    // Fades in during entry (0.42 -> 0.56), stays 1, then fades 1 -> 0 during exit (0.87 -> 0.98)
    const opacity = useTransform(
      stageProgress,
      [0, T1_START, midIn, T2_START, midOut, T2_END, 1],
      [0, 0, 1, 1, 0.9, 0, 0]
    );
    const zIndex = useTransform(stageProgress, (p) => (p >= midIn && p < midOut ? 25 : 15));
    const pointerEvents = useTransform(stageProgress, (p) => (p >= midIn && p < midOut ? 'auto' : 'none'));

    return { x, y, z, scale, rotateX, rotateY, rotateZ, opacity, zIndex, pointerEvents };
  }

  // -------------------------------------------------------------
  // CARD 3 (Project 04)
  // Enters during T2 [0.76, 0.98] from upper-right.
  // Stays centered through 1.0.
  // -------------------------------------------------------------
  const vIn = VECTORS[2].entry;
  const midIn = T2_START + (T2_END - T2_START) * 0.5; // 0.87

  const x = useTransform(stageProgress, [T2_START, T2_END, 1], [vIn.x * amp, 0, 0]);
  const y = useTransform(stageProgress, [T2_START, T2_END, 1], [vIn.y * amp, 0, 0]);
  const z = useTransform(stageProgress, [T2_START, T2_END, 1], [vIn.z, 0, 0]);
  const scale = useTransform(stageProgress, [T2_START, T2_END, 1], [vIn.s, 1, 1]);
  const rotateX = useTransform(stageProgress, [T2_START, T2_END, 1], [vIn.rx, 0, 0]);
  const rotateY = useTransform(stageProgress, [T2_START, T2_END, 1], [vIn.ry, 0, 0]);
  const rotateZ = useTransform(stageProgress, [T2_START, T2_END, 1], [vIn.rz, 0, 0]);

  // Fades in during entry (0.76 -> 0.87), stays 1 through the end
  const opacity = useTransform(stageProgress, [0, T2_START, midIn, 1], [0, 0, 1, 1]);
  const zIndex = useTransform(stageProgress, (p) => (p >= midIn ? 25 : 15));
  const pointerEvents = useTransform(stageProgress, (p) => (p >= midIn ? 'auto' : 'none'));

  return { x, y, z, scale, rotateX, rotateY, rotateZ, opacity, zIndex, pointerEvents };
}

// ─── Single Project Card ──────────────────────────────────────────────────────

function ProjectCard({ project, transforms }) {
  const { x, y, z, scale, rotateX, rotateY, rotateZ, opacity, zIndex, pointerEvents } =
    transforms;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-10"
      style={{
        zIndex,
        opacity,
        willChange: 'transform, opacity',
        pointerEvents,
      }}
    >
      <motion.div
        className="w-full max-w-[1100px] rounded-3xl overflow-hidden transition-all duration-300 hover:border-white"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(255, 255, 255, 0.7)',
          boxShadow:
            '0 24px 50px -12px rgba(0, 0, 0, 0.22), 0 0 25px rgba(3, 79, 70, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
          x,
          y,
          z,
          scale,
          rotateX,
          rotateY,
          rotateZ,
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          willChange: 'transform',
        }}
      >
        <div className="p-6 sm:p-8 md:p-10 lg:p-12 grid md:grid-cols-[1fr_1.1fr] gap-6 md:gap-8 lg:gap-12 items-center project-card-grid">
          {/* ── Left: Project Details ── */}
          <div>
            <p
              className="text-xs sm:text-sm font-bold font-body tracking-widest uppercase flex items-center gap-2"
              style={{ color: '#034f46' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#034f46] inline-block" />
              PROJECT {project.number}
            </p>

            <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-extrabold font-body mt-2.5 text-[#111827] leading-tight tracking-tight">
              {project.title}
            </h3>

            <p className="text-[#374151] mt-3 sm:mt-4 leading-relaxed font-body text-sm sm:text-base font-normal">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-4 sm:mt-5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-xs font-semibold text-[#034f46] bg-[#034f46]/[0.08] border border-[#034f46]/[0.15] backdrop-blur-sm shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 sm:mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#034f46] hover:bg-[#023b34] transition-all duration-200 shadow-sm hover:shadow group w-fit"
            >
              <FiGithub className="text-base sm:text-lg" />
              <span>VIEW ON GITHUB</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          {/* ── Right: Project Preview Frame ── */}
          <div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-black/[0.08]">
              <div className="bg-gray-100/90 px-3 sm:px-4 py-2 flex items-center justify-between border-b border-gray-200/80">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <span className="text-[10px] font-mono font-medium text-gray-400 tracking-wider uppercase">Preview</span>
              </div>
              <div className="bg-white overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto object-cover transform transition-transform duration-500 hover:scale-[1.02]"
                    loading="lazy"
                    onError={(e) => {
                      const el = e.currentTarget;
                      if (el.dataset.svgFallback) {
                        el.style.display = 'none';
                        return;
                      }
                      el.dataset.svgFallback = '1';
                      fetch(el.src)
                        .then((r) => r.text())
                        .then((text) => {
                          if (text.trim().startsWith('<svg')) {
                            el.src =
                              'data:image/svg+xml;charset=utf-8,' +
                              encodeURIComponent(text);
                          } else {
                            el.style.display = 'none';
                          }
                        })
                        .catch(() => {
                          el.style.display = 'none';
                        });
                    }}
                  />
                ) : (
                  <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 font-body font-bold tracking-widest text-sm">
                      Coming Soon
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Project Indicator ────────────────────────────────────────────────────────

function Indicator({ activeIndex }) {
  const safeIdx = Number.isFinite(activeIndex) ? activeIndex : 0;
  const label = String(safeIdx + 1).padStart(2, '0');
  return (
    <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
      <div className="relative flex items-center" style={{ gap: '6px' }}>
        {projects.map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full transition-colors duration-300"
            style={{
              backgroundColor:
                i === safeIdx
                  ? 'rgba(255,255,255,1)'
                  : 'rgba(255,255,255,0.25)',
            }}
          />
        ))}
      </div>
      <span className="text-xs font-body font-semibold tracking-wider text-white/60 ml-1">
        {label} / 0{TOTAL_PROJECTS}
      </span>
    </div>
  );
}

function IndicatorMobile({ activeIndex }) {
  const safeIdx = Number.isFinite(activeIndex) ? activeIndex : 0;
  const label = String(safeIdx + 1).padStart(2, '0');
  return (
    <div className="sm:hidden pb-5 flex justify-center flex-shrink-0">
      <span className="text-xs font-body font-semibold tracking-wider text-white/60">
        {label} / 0{TOTAL_PROJECTS}
      </span>
    </div>
  );
}

// ─── Main Projects Component ──────────────────────────────────────────────────

const Projects = () => {
  const sectionRef = useRef(null);

  // Active project index for safe indicator display (never NaN)
  const [activeIndex, setActiveIndex] = useState(0);

  // Responsive check
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // 1. Dynamic rounded corners on entry: 80px -> 0px as section enters viewport
  const { scrollYProgress: entryProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
    layoutEffect: false,
  });
  const borderRadius = useTransform(entryProgress, [0, 1], [80, 0]);
  const smoothBR = useSpring(borderRadius, { stiffness: 80, damping: 26 });

  // 2. Full stage scroll progress [0, 1] across the 500vh section
  const { scrollYProgress: stageProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
    layoutEffect: false,
  });

  // Keep active project indicator safely updated
  useMotionValueEvent(stageProgress, 'change', (p) => {
    if (!Number.isFinite(p)) return;
    if (p < 0.185) {
      setActiveIndex(0);
    } else if (p < 0.525) {
      setActiveIndex(1);
    } else if (p < 0.835) {
      setActiveIndex(2);
    } else {
      setActiveIndex(3);
    }
  });

  // Per-card transforms (hooks called in static order)
  const t0 = useCardTransforms(stageProgress, 0, isMobile);
  const t1 = useCardTransforms(stageProgress, 1, isMobile);
  const t2 = useCardTransforms(stageProgress, 2, isMobile);
  const t3 = useCardTransforms(stageProgress, 3, isMobile);
  const allTransforms = [t0, t1, t2, t3];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="projects-section"
      style={{
        backgroundColor: '#034f46',
        height: '650vh', // Extended scroll space so transitions are gentle and comfortable
        position: 'relative',
        overflow: 'visible', // Must be visible for sticky to work!
      }}
    >
      {/* ── Sticky 100vh viewport stage ── */}
      <div
        className="project-sticky-viewport"
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden', // Clips flying cards cleanly with no horizontal scrollbar
        }}
      >
        <motion.div
          className="project-stage"
          style={{
            borderTopLeftRadius: smoothBR,
            borderTopRightRadius: smoothBR,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            height: '100%',
            backgroundColor: '#034f46',
          }}
        >
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 h-full flex flex-col">
            {/* Header row */}
            <div className="pt-16 sm:pt-20 pb-2 sm:pb-3 flex items-center justify-between gap-4 flex-shrink-0">
              <SectionHeader title="THINGS I'VE BUILT" className="!text-white !mb-0" />
              <Indicator activeIndex={activeIndex} />
            </div>

            {/* 3D Floating Cards Perspective Container */}
            <div
              className="flex-1 relative"
              style={{
                perspective: '1400px',
                perspectiveOrigin: '50% 50%',
              }}
            >
              {projects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  transforms={allTransforms[i]}
                />
              ))}
            </div>

            {/* Mobile indicator */}
            <IndicatorMobile activeIndex={activeIndex} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
