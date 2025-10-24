
import React from 'react';
import BrainCircuitGraphic from './BrainCircuitGraphic';
import { Section } from '../types';
import { 
    ConsultationIcon, 
    DevelopmentIcon, 
    DataPlatformIcon, 
    CybersecurityIcon, 
    GenerativeAiIcon, 
    PartnershipsIcon 
} from './Icons';
import { motion } from 'framer-motion';

interface HeroProps {
    setActiveSection: (section: Section) => void;
}

const ArrowRightIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const homeServices = [
    { title: 'Consultoría y evaluación de IA', icon: <ConsultationIcon className="h-10 w-10 mx-auto mb-4" /> },
    { title: 'Desarrollo y servicios de IA multiplataforma', icon: <DevelopmentIcon className="h-10 w-10 mx-auto mb-4" /> },
    { title: 'Plataforma de Datos y soluciones de IA en el borde (Edge)', icon: <DataPlatformIcon className="h-10 w-10 mx-auto mb-4" /> },
    { title: 'Servicios de ciberseguridad con IA', icon: <CybersecurityIcon className="h-10 w-10 mx-auto mb-4" /> },
    { title: 'IA generativa multimodal', icon: <GenerativeAiIcon className="h-10 w-10 mx-auto mb-4" /> },
    { title: 'Alianzas y oportunidades de crecimiento', icon: <PartnershipsIcon className="h-10 w-10 mx-auto mb-4" /> },
];

const HomeServiceCard: React.FC<{ title: string; icon: React.ReactNode; onClick: () => void }> = ({ title, icon, onClick }) => {
    return (
        <motion.div
            onClick={onClick}
            className="text-center p-6 cursor-pointer border-t border-r border-blue-800/30 hover:border-blue-800/50 transition-colors duration-300 h-full flex flex-col justify-center"
            whileHover={{ backgroundColor: 'rgba(23, 37, 84, 0.5)', scale: 1.05 }}
            transition={{ duration: 0.2 }}
        >
            <div className="text-blue-400">{icon}</div>
            <h3 className="font-semibold text-white/90 text-sm md:text-base leading-tight">{title}</h3>
        </motion.div>
    );
};


const Hero: React.FC<HeroProps> = ({ setActiveSection }) => {
  return (
    <>
        <section className="w-full pt-20 mt-20">
            <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-4 sm:px-6 lg:px-8">
                <div className="text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500 leading-tight">
                        Liderando la Transformación con Inteligencia Artificial en Panamá
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto md:mx-0 mb-8">
                        Creamos soluciones tecnológicas innovadoras que transforman la forma en que las empresas operan y crecen.
                    </p>
                    <button 
                        onClick={() => setActiveSection(Section.Servicios)}
                        className="bg-white text-blue-900 font-bold py-3 px-8 rounded-lg hover:bg-gray-200 transition-transform duration-200 hover:scale-105 inline-flex items-center"
                    >
                        Descubre más
                        <ArrowRightIcon className="h-5 w-5 ml-2" />
                    </button>
                </div>
                <div className="flex justify-center items-center">
                    <BrainCircuitGraphic />
                </div>
            </div>
        </section>

        <section className="w-full py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-white/90 mb-10">
                    Servicios integrales de desarrollo de IA para potenciar tu negocio
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-l border-b border-blue-800/30 bg-black/20 rounded-md overflow-hidden">
                    {homeServices.map((service, index) => (
                        <HomeServiceCard
                            key={index}
                            title={service.title}
                            icon={service.icon}
                            onClick={() => setActiveSection(Section.Servicios)}
                        />
                    ))}
                </div>
            </div>
        </section>
    </>
  );
};

export default Hero;
