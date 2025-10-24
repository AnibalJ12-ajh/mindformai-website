import React, { useState } from 'react';
import { Section } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuIcon, CloseIcon } from './Icons';

interface HeaderProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = Object.values(Section).filter(item => item !== Section.Agendar);

  const handleNavClick = (item: Section) => {
    setActiveSection(item);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleNavClick(Section.Inicio)}
          >
            <img src="https://storage.googleapis.com/aistudio-hosting/story-images/c71b694b-4497-44f2-9858-a89e4367f223/images/logo.png" alt="MindFormAI Logo" className="h-10 w-auto" />
            <span className="text-2xl font-bold tracking-wider">MindFormAI</span>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="relative px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
              >
                {item}
                {activeSection === item && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
                    layoutId="underline"
                  />
                )}
              </button>
            ))}
          </nav>
           <button 
             onClick={() => handleNavClick(Section.Agendar)}
             className="hidden md:block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-transform duration-200 hover:scale-105"
           >
             Agendar Consulta
           </button>
           <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-black/50 backdrop-blur-md overflow-hidden"
          >
            <nav className="flex flex-col items-center space-y-2 py-4">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className="relative w-full px-3 py-3 text-lg font-medium text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {item}
                   {activeSection === item && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-0.5 bg-blue-400"
                      layoutId="mobile-underline"
                    />
                  )}
                </button>
              ))}
              <button
                onClick={() => handleNavClick(Section.Agendar)}
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-lg transition-transform duration-200 hover:scale-105"
              >
                Agendar Consulta
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;