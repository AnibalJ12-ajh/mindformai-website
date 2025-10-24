import React from 'react';
import { motion } from 'framer-motion';
import { LogisticsIcon, BankingIcon, RetailIcon } from './Icons';

const industryData = [
    {
        icon: <LogisticsIcon className="h-12 w-12 text-blue-400" />,
        title: "Logística y Cadena de Suministro",
        description: "Optimizamos el corazón logístico de las Américas, potenciando la eficiencia desde el Canal hasta la entrega final.",
        points: [
            "Optimización de rutas de transporte en tiempo real.",
            "Predicción de demanda y gestión de inventarios.",
            "Automatización de operaciones en puertos y almacenes.",
            "Mantenimiento predictivo de flotas y maquinaria."
        ]
    },
    {
        icon: <BankingIcon className="h-12 w-12 text-blue-400" />,
        title: "Sector Bancario y Financiero",
        description: "Fortalecemos el centro financiero de Panamá con IA, garantizando seguridad, cumplimiento y una experiencia de cliente superior.",
        points: [
            "Detección de fraude y prevención de lavado de dinero.",
            "Análisis avanzado de riesgo crediticio.",
            "Asesores virtuales y chatbots para atención 24/7.",
            "Personalización de productos y servicios financieros."
        ]
    },
    {
        icon: <RetailIcon className="h-12 w-12 text-blue-400" />,
        title: "Retail y Consumo Masivo",
        description: "Revolucionamos la experiencia de compra, anticipando las necesidades del consumidor panameño para impulsar las ventas.",
        points: [
            "Sistemas de recomendación y marketing personalizado.",
            "Optimización de precios y promociones.",
            "Análisis de afluencia en tiendas físicas.",
            "Gestión inteligente de la cadena de suministro."
        ]
    }
];

const IndustryCard: React.FC<{ icon: React.ReactNode; title: string; description: string; points: string[] }> = ({ icon, title, description, points }) => {
    return (
        <motion.div
            className="bg-gradient-to-br from-[#101c42] to-[#0a1024] p-8 rounded-lg border border-blue-800/40 flex flex-col shadow-lg h-full"
            whileHover={{ y: -8, boxShadow: "0px 12px 25px rgba(46, 116, 222, 0.25)" }}
            transition={{ duration: 0.3 }}
             variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
        >
            <div className="h-16 w-16 mb-6 flex items-center">{icon}</div>
            <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed flex-grow">{description}</p>
            <ul className="space-y-2 text-gray-300 text-sm">
                {points.map((point, index) => (
                    <li key={index} className="flex items-start">
                        <svg className="w-4 h-4 mr-3 mt-1 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <span>{point}</span>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};


const UseCases: React.FC = () => {
  return (
    <section className="py-20 mt-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-blue-400">Aplicaciones para Industrias Clave en Panamá</h2>
        <p className="text-gray-400 mt-2 max-w-3xl mx-auto">
          Desarrollamos soluciones de IA a la medida para los motores económicos de la región, generando un impacto tangible y una ventaja competitiva sostenible.
        </p>
      </div>
       <motion.div
          className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }
          }}
        >
        {industryData.map((industry, index) => (
            <IndustryCard
                key={index}
                icon={industry.icon}
                title={industry.title}
                description={industry.description}
                points={industry.points}
            />
        ))}
      </motion.div>
    </section>
  );
};

export default UseCases;