import React from 'react';
import { MailIcon, PhoneIcon, MapPinIcon } from './Icons';

const ContactInfoItem: React.FC<{ icon: React.ReactNode; title: string; value: string; href?: string }> = ({ icon, title, value, href }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 mt-1 text-blue-400">{icon}</div>
        <div>
            <h4 className="font-bold text-white">{title}</h4>
            <a href={href || '#'} className={`text-gray-300 hover:text-white ${href ? 'cursor-pointer' : 'cursor-default'}`}>{value}</a>
        </div>
    </div>
);

const Contact: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí se podría agregar la lógica para enviar el formulario
        alert('Gracias por su mensaje. Nos pondremos en contacto con usted en breve.');
    };

    return (
        <section className="py-20 mt-10 w-full">
            <div className="text-center max-w-4xl mx-auto mb-16">
                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500">
                    Contáctenos
                </h2>
                <p className="text-xl text-gray-300 mt-4">
                    ¿Tiene alguna pregunta o desea iniciar un proyecto? Estamos aquí para ayudarle.
                </p>
            </div>
            
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start bg-gradient-to-br from-[#101c42] to-[#0a1024] p-8 sm:p-12 rounded-lg border border-blue-800/40 shadow-2xl">
                {/* Left Column: Contact Info */}
                <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Información de Contacto</h3>
                    <ContactInfoItem 
                        icon={<MailIcon className="h-6 w-6" />}
                        title="Correo Electrónico"
                        value="mindformm.ai@gmail.com"
                        href="mailto:mindformm.ai@gmail.com"
                    />
                    <ContactInfoItem 
                        icon={<PhoneIcon className="h-6 w-6" />}
                        title="Teléfono"
                        value="+507 123-4567"
                        href="tel:+5071234567"
                    />
                    <ContactInfoItem 
                        icon={<MapPinIcon className="h-6 w-6" />}
                        title="Ubicación"
                        value="Ciudad de Panamá, Panamá"
                    />
                </div>
                
                {/* Right Column: Contact Form */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                     <div className="relative group">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Nombre Completo</label>
                        <input type="text" id="name" name="name" required className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                            Ingrese su nombre y apellido.
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
                        </div>
                    </div>
                    <div className="relative group">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Correo Electrónico</label>
                        <input type="email" id="email" name="email" required className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                            Usaremos este correo para responderle.
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
                        </div>
                    </div>
                    <div className="relative group">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">Teléfono <span className="text-gray-500">(Opcional)</span></label>
                        <input type="tel" id="phone" name="phone" className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                            Opcional, pero útil para un contacto más rápido.
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
                        </div>
                    </div>
                    <div className="relative group">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Mensaje</label>
                        <textarea id="message" name="message" rows={4} required className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none"></textarea>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                            Describa su consulta o el proyecto que tiene en mente.
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-transform duration-200 hover:scale-105">
                        Enviar Mensaje
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;