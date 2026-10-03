import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import IntroScreen from "../components/IntroScreen";
import Navbar from "../components/Navbar";
import Ruler from "../components/Ruler";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import TechStack from "../components/TechStack";
import Achievements from "../components/Achievements";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import YouTracker from "../components/YouTracker";

const HomePage = () => {
  const [introFinished, setIntroFinished] = useState(false);
  const { hash } = useLocation();

  // Arriving from a detail page back-link (e.g. /#achievements) should land
  // directly on the requested section, so the intro overlay is skipped.
  const skipIntro = hash === "#achievements";

  return (
    <div className="font-body text-charcoal min-h-screen relative">
      {!skipIntro && <IntroScreen onComplete={() => setIntroFinished(true)} />}
      
      <Navbar />
      
      {/* Top scale measurement ruler right below the sticky navbar space */}
      <div className="pt-20">
        <Ruler />
      </div>

      <main>
        <Hero />
        <About />
        <Projects />
        <TechStack />
        <Achievements />
        <Contact />
      </main>

      <Footer />
      <YouTracker />
    </div>
  );
};

export default HomePage;
