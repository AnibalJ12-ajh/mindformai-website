import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import UseCases from './components/UseCases';
import Schedule from './components/Schedule';
import { Section } from './types';
import { AnimatePresence, motion } from 'framer-motion';

const sectionComponents: { [key in Section]: React.ComponentType<any> } = {
  [Section.Inicio]: Hero,
  [Section.SobreNosotros]: About,
  [Section.Servicios]: Services,
  [Section.CasosDeUso]: UseCases,
  [Section.Contacto]: Contact,
  [Section.Agendar]: Schedule,
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.Inicio);

  const CurrentSection = sectionComponents[activeSection];

  const sectionVariants = {
    initial: {
      opacity: 0,
      y: 30,
      scale: 0.98,
      filter: 'blur(4px)',
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        // FIX: Add 'as const' to ensure TypeScript infers a tuple for the cubic-bezier easing value, which is required by Framer Motion's types.
        ease: [0.43, 0.13, 0.23, 0.96] as const,
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.98,
      filter: 'blur(4px)',
      transition: {
        duration: 0.3,
        // FIX: Add 'as const' to ensure TypeScript infers a tuple for the cubic-bezier easing value, which is required by Framer Motion's types.
        ease: [0.43, 0.13, 0.23, 0.96] as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1024] via-[#0b122b] to-[#121c42] flex flex-col">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-grow flex items-center justify-center container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            <CurrentSection setActiveSection={setActiveSection} />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default App;
