import React from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { SiKaggle, SiCodeforces } from 'react-icons/si';
import { personal, navLinks, socials } from '../data/portfolio';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="font-body text-xl font-extrabold tracking-wider">
            RIYA DUGGAL
          </div>
          <div className="flex gap-6 flex-wrap">
            <a href="#about" className="text-sm text-gray-400 hover:text-white transition">About</a>
            <a href="#projects" className="text-sm text-gray-400 hover:text-white transition">Projects</a>
            <a href="#skills" className="text-sm text-gray-400 hover:text-white transition">Skills</a>
            <a href="#achievements" className="text-sm text-gray-400 hover:text-white transition">Achievements</a>
            <a href="#contact" className="text-sm text-gray-400 hover:text-white transition">Contact</a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition">Resume</a>
          </div>
        </div>

        <div className="w-full h-px bg-gray-700 my-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-gray-500">
            © 2026 Riya Duggal. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-charcoal transition text-gray-400"
              aria-label="GitHub"
            >
              <FiGithub />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-charcoal transition text-gray-400"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </a>
            <a
              href={socials.kaggle}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-charcoal transition text-gray-400"
              aria-label="Kaggle"
            >
              <SiKaggle />
            </a>
            <a
              href={socials.codeforces}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-charcoal transition text-gray-400"
              aria-label="Codeforces"
            >
              <SiCodeforces />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-charcoal transition text-gray-400"
              aria-label="Email"
            >
              <FiMail />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
