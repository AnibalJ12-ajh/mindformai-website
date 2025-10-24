import React from 'react';
import { InnovationIcon, ExcellenceIcon, TrustIcon, UserIcon } from './Icons';
import { motion } from 'framer-motion';

const ValueCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => {
    return (
        <div className="bg-blue-900/10 p-6 rounded-lg border border-blue-800/30 flex flex-col items-center text-center">
            <div className="mb-4 text-blue-400">{icon}</div>
            <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
    );
};

const founders = [
    { name: 'Miguel Ibernón', title: 'Fundador', description: 'Liderando la visión estratégica y la innovación en MindFormAI para redefinir el futuro de la inteligencia artificial.' },
    { name: 'Anibal Joseph', title: 'Cofundador', description: 'Ingeniero en Sistemas y Computación con especialización en Inteligencia Artificial y Arquitectura en la nube.' },
    { name: 'José Moreno', title: 'Cofundador', description: 'Ingeniero en Sistemas y Computación con especialización en Inteligencia Artificial y Arquitectura en la nube.' }
];

const FounderCard: React.FC<{ name: string; title: string; description: string }> = ({ name, title, description }) => {
    return (
        <motion.div
            className="bg-gradient-to-br from-[#101c42] to-[#0a1024] p-6 rounded-lg border border-blue-800/40 text-center flex flex-col items-center shadow-lg h-full"
            whileHover={{ y: -8, boxShadow: "0px 12px 25px rgba(46, 116, 222, 0.25)" }}
            transition={{ duration: 0.3 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
        >
            <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center">
                    <UserIcon className="h-12 w-12 text-white" />
                </div>
                <div className="absolute top-0 left-0 w-24 h-24 rounded-full bg-blue-400/30 animate-ping -z-10"></div>
            </div>
            <h3 className="text-xl font-bold mb-1 text-white">{name}</h3>
            <p className="text-sm font-medium text-blue-400 mb-3">{title}</p>
            <p className="text-gray-400 text-sm leading-relaxed flex-grow">{description}</p>
        </motion.div>
    );
};


const About: React.FC = () => {
  return (
    <section className="py-20 mt-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-blue-400">Sobre Nosotros</h2>
        <p className="text-lg text-gray-300 leading-relaxed mb-16">
          En MindFormAI, combinamos innovación, experiencia y tecnología para ofrecer soluciones de inteligencia artificial que impulsan la eficiencia y la toma de decisiones. Nuestro compromiso es transformar los procesos empresariales a través de la automatización y el análisis inteligente de datos.
        </p>
      </div>
       <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
             <ValueCard
                icon={<InnovationIcon className="h-10 w-10" />}
                title="Innovación con Propósito"
                description="Transformamos los desafíos complejos en soluciones prácticas, adaptadas con precisión a las necesidades de su organización."
             />
             <ValueCard
                icon={<ExcellenceIcon className="h-10 w-10" />}
                title="Excelencia Técnica"
                description="Nuestro equipo convierte la innovación en sistemas listos para producción que se adaptan y escalan con principios de ingeniería robustos."
             />
             <ValueCard
                icon={<TrustIcon className="h-10 w-10" />}
                title="Confianza y Ética"
                description="Priorizamos el desarrollo responsable de IA, garantizando la transparencia y prácticas éticas en cada solución que ofrecemos."
             />
        </div>

        <div className="mt-24">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-12 text-blue-400">Nuestros Fundadores</h2>
            </div>
            <motion.div 
              className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={{
                visible: { transition: { staggerChildren: 0.2 } }
              }}
            >
                {founders.map((founder) => (
                    <FounderCard 
                        key={founder.name}
                        name={founder.name}
                        title={founder.title}
                        description={founder.description}
                    />
                ))}
            </motion.div>
        </div>
    </section>
  );
};

export default About;