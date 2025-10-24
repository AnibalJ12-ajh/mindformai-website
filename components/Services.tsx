
import React from 'react';
import { motion } from 'framer-motion';
import { 
    ConsultationIcon, 
    DevelopmentIcon, 
    DataPlatformIcon, 
    CybersecurityIcon, 
    GenerativeAiIcon, 
    PartnershipsIcon 
} from './Icons';

const services = [
    { 
      icon: <ConsultationIcon className="h-12 w-12 text-blue-400" />,
      title: "Consultoría y evaluación de IA",
      description: "Convertimos la incertidumbre en un plan de acción concreto. Identificamos las oportunidades de mayor impacto en su rentabilidad y diseñamos una hoja de ruta precisa para su transformación digital, garantizando el máximo retorno de la inversión."
    },
    { 
      icon: <DevelopmentIcon className="h-12 w-12 text-blue-400" />,
      title: "Desarrollo y servicios de IA multiplataforma",
      description: "Materializamos sus ideas en herramientas inteligentes. Construimos soluciones de IA a medida que se integran perfectamente en su ecosistema tecnológico actual, potenciando sus operaciones y la experiencia de sus clientes sin interrumpir su negocio."
    },
    { 
      icon: <DataPlatformIcon className="h-12 w-12 text-blue-400" />,
      title: "Plataforma de Datos y soluciones de IA en el borde (Edge)",
      description: "Llevamos la inteligencia al punto de acción. Desarrollamos infraestructuras de datos y soluciones de Edge AI que procesan información en tiempo real, directamente en sus dispositivos, optimizando la velocidad y la seguridad sin depender de la nube."
    },
    { 
      icon: <CybersecurityIcon className="h-12 w-12 text-blue-400" />,
      title: "Servicios de ciberseguridad con IA",
      description: "Blindamos su operación contra ciberamenazas avanzadas, utilizando IA para anticipar y neutralizar riesgos antes de que impacten su negocio y garantizando así su continuidad operativa."
    },
    { 
      icon: <GenerativeAiIcon className="h-12 w-12 text-blue-400" />,
      title: "IA generativa multimodal",
      description: "Potenciamos la creatividad y la eficiencia a una escala sin precedentes. Utilizamos IA generativa para automatizar la creación de contenido, acelerar la innovación y analizar datos complejos, abriendo nuevas dimensiones de productividad para su equipo."
    },
    { 
      icon: <PartnershipsIcon className="h-12 w-12 text-blue-400" />,
      title: "Alianzas y oportunidades de crecimiento",
      description: "Más que un proveedor, somos su socio en el crecimiento. Colaboramos estrechamente con usted para co-crear nuevos modelos de negocio impulsados por IA, actuando como su brazo de innovación para conquistar nuevos mercados y asegurar su liderazgo a futuro."
    },
];

const ServiceCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => {
    return (
        <motion.div
            className="bg-blue-900/20 p-8 rounded-lg border border-blue-800/50 flex flex-col items-center text-center"
            whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(46, 116, 222, 0.2)" }}
            transition={{ duration: 0.2 }}
        >
            <div className="h-16 w-16 mb-4 flex items-center justify-center">{icon}</div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-400">{description}</p>
        </motion.div>
    );
};

const Services: React.FC = () => {
  return (
    <section className="py-20 mt-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-blue-400">Nuestros Servicios Detallados</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
            <ServiceCard 
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
            />
        ))}
      </div>
    </section>
  );
};

export default Services;
