import React from 'react';
import SectionHeader from './SectionHeader';
import { technologies } from '../data/portfolio';

const flowSteps = ['LEARN', 'BUILD', 'EXPERIMENT', 'REPEAT'];

const TechStack = () => {
  const items = technologies;

  return (
    <section id="skills" className="py-20">
      <SectionHeader
        title="TECH I WORK WITH"
        className="text-4xl md:text-5xl lg:text-6xl"
      />

      {/* Subtle subtitle below the heading */}
      <p className="text-center text-sm sm:text-base text-gray-500 font-medium px-6 -mt-12 mb-8 max-w-2xl mx-auto leading-relaxed">
        The tools I use to turn ideas into working products.
      </p>

      {/* Full-width marquee banner */}
      <div className="mt-0 overflow-hidden">
        <div
          className="flex w-max tech-marquee hover:[animation-play-state:paused]"
        >
          {/* Set 1 */}
          {items.map((tech, i) => (
            <div key={`a-${i}`} className="flex items-center gap-2.5 px-6 py-3 shrink-0">
              <tech.icon style={{ color: tech.color }} size={28} />
              <span className="text-sm font-medium text-gray-600 whitespace-nowrap tracking-wide">
                {tech.name}
              </span>
              <span className="text-gray-300 ml-3">•</span>
            </div>
          ))}
          {/* Set 2 — duplicate for seamless loop */}
          {items.map((tech, i) => (
            <div key={`b-${i}`} className="flex items-center gap-2.5 px-6 py-3 shrink-0">
              <tech.icon style={{ color: tech.color }} size={28} />
              <span className="text-sm font-medium text-gray-600 whitespace-nowrap tracking-wide">
                {tech.name}
              </span>
              <span className="text-gray-300 ml-3">•</span>
            </div>
          ))}
          {/* Set 3 — triple for extra coverage on wide screens */}
          {items.map((tech, i) => (
            <div key={`c-${i}`} className="flex items-center gap-2.5 px-6 py-3 shrink-0">
              <tech.icon style={{ color: tech.color }} size={28} />
              <span className="text-sm font-medium text-gray-600 whitespace-nowrap tracking-wide">
                {tech.name}
              </span>
              <span className="text-gray-300 ml-3">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Flow card: LEARN → BUILD → EXPERIMENT → REPEAT */}
      <div className="flex justify-center px-5 sm:px-8 mt-8">
        <div className="group inline-flex flex-wrap items-center justify-center gap-y-3 gap-x-1 sm:gap-x-2 bg-gradient-to-b from-white/90 to-accent-lavender/10 border border-accent-lavender/40 rounded-2xl px-6 sm:px-10 py-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-accent-lavender/70 hover:shadow-lg hover:shadow-accent-lavender/20 hover:scale-[1.01]">
          {flowSteps.map((step, index) => (
            <React.Fragment key={step}>
              {index > 0 && (
                <span className="text-purple-400 text-sm sm:text-base select-none mx-1 transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              )}
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-charcoal uppercase whitespace-nowrap">
                {step}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;