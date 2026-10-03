import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { navLinks, personal } from '../data/portfolio.js';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-spy: highlight the navbar item for the section currently in view
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);

    const handleSpy = () => {
      const trigger = window.innerHeight * 0.4;
      let current = '';
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= trigger) {
          current = section.getAttribute('id') || '';
        }
      }
      setActiveSection(current);
    };

    handleSpy();
    window.addEventListener('scroll', handleSpy, { passive: true });
    window.addEventListener('resize', handleSpy);
    return () => {
      window.removeEventListener('scroll', handleSpy);
      window.removeEventListener('resize', handleSpy);
    };
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Close mobile menu if open

    if (href === '#' || href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream/75 backdrop-blur-md shadow-sm border-b border-charcoal/5 py-4'
          : 'bg-cream/40 backdrop-blur-md border-b border-charcoal/5 py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* LEFT: Logo / Name + small descriptive label */}
          <div className="flex items-baseline gap-3 z-50 relative">
            <a
              href="#"
              onClick={(e) => scrollToSection(e, '#')}
              className="font-body text-xl sm:text-2xl font-extrabold text-charcoal tracking-wider whitespace-nowrap"
            >
              {personal?.name?.toUpperCase() || 'RIYA DUGGAL'}
            </a>
            
          </div>

          {/* CENTER: Desktop Links */}
          <nav className="hidden lg:flex items-center lg:space-x-5 xl:space-x-7">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={index}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative font-body text-sm uppercase tracking-widest font-medium py-2 px-3.5 rounded-lg whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? 'text-purple-700 bg-accent-lavender/60'
                      : 'text-charcoal hover:text-purple-600 hover:bg-accent-lavender/30 hover:-translate-y-0.5'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* RIGHT: Desktop Resume Button */}
          <div className="hidden lg:block">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-charcoal text-cream px-6 py-2.5 rounded-full font-body text-sm font-medium hover:bg-charcoal/90 transition-transform hover:scale-105 active:scale-95"
            >
              <span>Resume</span>
              <FiDownload className="text-lg" />
            </a>
          </div>

          {/* MOBILE: Hamburger Button */}
          <button
            className="lg:hidden z-50 text-charcoal p-2 focus:outline-none relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <HiX className="text-3xl" />
            ) : (
              <HiMenuAlt3 className="text-3xl" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE: Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-cream z-40 flex flex-col items-center justify-center min-h-screen p-6"
          >
            <nav className="flex flex-col items-center space-y-8 mb-12">
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.a
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index + 0.2, duration: 0.3 }}
                    key={index}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`font-body text-3xl font-bold transition-colors duration-300 ${
                      isActive ? 'text-purple-700' : 'text-charcoal hover:text-purple-600'
                    }`}
                  >
                    {link.label}
                  </motion.a>
                );
              })}
            </nav>

            <motion.a
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: navLinks.length * 0.1 + 0.2, duration: 0.3 }}
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-charcoal text-cream px-8 py-4 rounded-full font-body font-bold text-lg hover:bg-charcoal/90 transition-transform active:scale-95 w-full justify-center max-w-xs shadow-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Download Resume</span>
              <FiDownload className="text-xl" />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;