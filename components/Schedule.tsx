import React, { useState } from 'react';
import { UserIcon, CheckIcon } from './Icons';
import { motion, AnimatePresence } from 'framer-motion';
import Calendar from './Calendar';

const BulletPoint: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start space-x-4">
        <div className="flex-shrink-0 mt-1">
            <CheckIcon className="h-6 w-6 text-green-400" />
        </div>
        <p className="text-gray-300">{children}</p>
    </li>
);

const timeSlots = [
    '09:00', '10:00', '11:00', '12:00',
    '14:00', '15:00', '16:00', '17:00'
];

const Schedule: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    const isFormComplete = selectedDate && selectedTime && fullName;

    const formatDate = (date: Date | null): string => {
        if (!date) return 'No seleccionada';
        return date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <section className="py-20 mt-10 w-full">
            <div className="text-center max-w-4xl mx-auto mb-16">
                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500">
                    Agende su Consulta Estratégica de IA
                </h2>
                <p className="text-xl text-gray-300 mt-4">
                    Una sesión de 30 minutos sin compromiso para identificar las oportunidades de mayor impacto en su negocio.
                </p>
            </div>
      
            <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-16 items-start">
                {/* Left Column: Benefits */}
                <div className="lg:col-span-2 space-y-8">
                    <h3 className="text-2xl font-bold text-white mb-6">¿Qué Obtendrá de esta Consulta?</h3>
                    <ul className="space-y-6">
                        <BulletPoint><strong className="text-white">Análisis de Oportunidades:</strong> Identificación de 2 a 3 áreas clave en su operación donde la IA puede generar el mayor retorno de la inversión.</BulletPoint>
                        <BulletPoint><strong className="text-white">Hoja de Ruta Preliminar:</strong> Un esquema de los primeros pasos recomendados para implementar una estrategia de IA exitosa.</BulletPoint>
                        <BulletPoint><strong className="text-white">Resolución de Dudas Estratégicas:</strong> Respuestas directas a sus preguntas sobre tecnología, implementación, costos y plazos.</BulletPoint>
                    </ul>
                    <motion.div 
                        className="mt-12 flex flex-col sm:flex-row items-center text-center sm:text-left gap-6 bg-blue-900/20 p-6 rounded-lg border border-blue-800/30"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="relative flex-shrink-0"><div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center shadow-lg"><UserIcon className="h-12 w-12 text-white" /></div><div className="absolute top-0 left-0 w-24 h-24 rounded-full bg-blue-400/30 animate-ping -z-10"></div></div>
                        <div>
                            <p className="font-bold text-white text-lg">Hablará directamente con Miguel Ibernón,</p>
                            <p className="text-blue-400 font-semibold mb-2">Director y Estratega Principal de MindFormAI.</p>
                            <p className="text-gray-400 italic text-sm">"Apasionado por ayudar a las empresas panameñas a convertirse en líderes de la industria a través de la tecnología."</p>
                        </div>
                    </motion.div>
                </div>
                
                {/* Right Column: Scheduler Form */}
                <div className="lg:col-span-3">
                    <div className="bg-gradient-to-br from-[#101c42] to-[#0a1024] p-8 rounded-lg border border-blue-800/40 shadow-2xl min-h-[500px]">
                        <AnimatePresence mode="wait">
                            {isSubmitted ? (
                                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="flex flex-col items-center justify-center text-center h-full">
                                    <CheckIcon className="h-16 w-16 text-green-400 mb-4" />
                                    <h3 className="text-2xl font-bold text-white mb-2">¡Cita Confirmada!</h3>
                                    <p className="text-gray-300">Gracias, {fullName}. Hemos agendado su consulta para el {formatDate(selectedDate)} a las {selectedTime}.</p>
                                    <p className="text-gray-400 mt-2">Nos pondremos en contacto con usted en breve al número {phone} para confirmar los detalles.</p>
                                    <button onClick={() => { setIsSubmitted(false); setSelectedDate(null); setSelectedTime(null); setFullName(''); setPhone(''); }} className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">Agendar otra cita</button>
                                </motion.div>
                            ) : (
                                <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <h3 className="text-xl font-bold text-center mb-4 text-blue-300">Complete los siguientes pasos:</h3>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        {/* Step 1 & 2: Date & Time */}
                                        <div>
                                            <p className="font-semibold text-white mb-2">1. Seleccione una fecha:</p>
                                            <Calendar selectedDate={selectedDate} onDateSelect={(date) => { setSelectedDate(date); setSelectedTime(null); }} />
                                            
                                            <AnimatePresence>
                                                {selectedDate && (
                                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4">
                                                        <p className="font-semibold text-white mb-2">2. Seleccione una hora:</p>
                                                        <div className="grid grid-cols-4 gap-2">
                                                            {timeSlots.map(slot => (
                                                                <button type="button" key={slot} onClick={() => setSelectedTime(slot)} className={`p-2 rounded-md text-sm transition-colors ${selectedTime === slot ? 'bg-blue-500 text-white font-bold' : 'bg-gray-700 hover:bg-gray-600'}`}>
                                                                    {slot}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Step 3: Info & Summary */}
                                        <div className="space-y-4">
                                            <p className="font-semibold text-white mb-2">3. Ingrese sus datos:</p>
                                            <div>
                                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">Nombre Completo</label>
                                                <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all" />
                                            </div>
                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Número de Teléfono</label>
                                                <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all" />
                                            </div>

                                            <div className="mt-4 p-4 bg-gray-900/50 border border-dashed border-gray-600 rounded-md space-y-2">
                                                <h4 className="font-bold text-white text-center">Resumen de la Cita</h4>
                                                <div className="text-sm text-gray-300"><span className="font-semibold text-gray-400 w-16 inline-block">Fecha:</span> {formatDate(selectedDate)}</div>
                                                <div className="text-sm text-gray-300"><span className="font-semibold text-gray-400 w-16 inline-block">Hora:</span> {selectedTime || 'No seleccionada'}</div>
                                                <div className="text-sm text-gray-300"><span className="font-semibold text-gray-400 w-16 inline-block">Nombre:</span> {fullName || '...'}</div>
                                                <div className="text-sm text-gray-300"><span className="font-semibold text-gray-400 w-16 inline-block">Teléfono:</span> {phone || '...'}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" disabled={!isFormComplete} className="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                                        Confirmar Cita
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Schedule;