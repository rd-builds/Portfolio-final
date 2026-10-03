import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiGithub, FiLinkedin, FiCheck, FiFileText } from 'react-icons/fi';
import { SiKaggle, SiCodeforces } from 'react-icons/si';
import { personal, socials } from '../data/portfolio';
import GreenCharacter from './GreenCharacter';

const Contact = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  return (
    <section id="contact" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-5 sm:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-12"
        >
          <h2 className="font-body text-4xl md:text-5xl lg:text-6xl font-black text-center text-charcoal">
            LET'S BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
              SOMETHING AMAZING.
            </span>
          </h2>
          <p className="text-gray-500 text-center mt-4 text-lg">
            Have an idea, opportunity or project in mind? <br />
            Let's connect and create something impactful.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-12 relative">
          {/* Email + Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center md:items-start bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-accent-lavender/20 flex items-center justify-center text-accent-lavender">
                <FiMail size={20} />
              </div>
              <span className="text-sm font-medium text-charcoal">{personal.email}</span>
            </div>
            
            <div className="flex gap-3">
              <a href={socials.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-charcoal hover:text-white transition-colors">
                <FiGithub size={18} />
              </a>
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-charcoal hover:text-white transition-colors">
                <FiLinkedin size={18} />
              </a>
              <a href={socials.kaggle} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-charcoal hover:text-white transition-colors">
                <SiKaggle size={18} />
              </a>
              <a href={socials.codeforces} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-charcoal hover:text-white transition-colors">
                <SiCodeforces size={18} />
              </a>
            </div>
          </motion.div>

          {/* Open To */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center md:items-start bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            <h3 className="text-sm font-bold tracking-wider font-body text-charcoal mb-4 uppercase">Open To</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-charcoal font-medium">
                <FiCheck className="text-green-500" /> Internships
              </li>
              <li className="flex items-center gap-2 text-charcoal font-medium">
                <FiCheck className="text-green-500" /> Collaborations
              </li>
              <li className="flex items-center gap-2 text-charcoal font-medium">
                <FiCheck className="text-green-500" /> Full-time Opportunities
              </li>
            </ul>
          </motion.div>

          {/* Resume */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center md:items-start bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative"
          >
            <h3 className="text-sm font-bold tracking-wider font-body text-charcoal mb-4 uppercase">Resume</h3>
            <div className="flex items-center gap-3 mb-2">
              <div className="text-accent-pink">
                <FiFileText size={24} />
              </div>
              <div>
                <p className="font-medium text-charcoal">Riya_Duggal_Resume.pdf</p>
                <p className="text-xs text-gray-500">(Download my resume)</p>
              </div>
            </div>
            
            <a 
              href="/resume.pdf" 
              download 
              className="mt-4 bg-accent-pink text-charcoal rounded-full px-6 py-2 text-sm font-bold hover:scale-105 transition-transform inline-block w-full text-center md:w-auto"
            >
              DOWNLOAD PDF
            </a>

            <div className="absolute -bottom-8 -right-4 hidden md:block">
              <GreenCharacter />
            </div>
          </motion.div>
          
          <div className="flex justify-center mt-6 md:hidden">
              <GreenCharacter />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
