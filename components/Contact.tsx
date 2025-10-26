import React, { useState } from 'react';
// Corregido: Se usa una ruta absoluta desde la raíz del proyecto para mayor consistencia
import { MailIcon, PhoneIcon, MapPinIcon } from '/Users/anibaljoseph/Desktop/mindformai_website/components/Icons.tsx'; 

// --- Componente de Info (Tu código original) ---
const ContactInfoItem: React.FC<{ icon: React.ReactNode; title: string; value: string; href?: string }> = ({ icon, title, value, href }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 mt-1 text-blue-400">{icon}</div>
        <div>
            <h4 className="font-bold text-white">{title}</h4>
            <a href={href || '#'} className={`text-gray-300 hover:text-white ${href ? 'cursor-pointer' : 'cursor-default'}`}>{value}</a>
        </div>
    </div>
);

// --- Componente Principal de Contacto (Tu diseño + Nueva lógica) ---
const Contact: React.FC = () => {
    // Estados para manejar el formulario
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'enviando' | 'exito' | 'error'>('idle');

    // Manejador para actualizar el estado con lo que escribe el usuario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    // Manejador para enviar el formulario a AWS
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('enviando');

        // ====================================================================
        // !! IMPORTANTE !!
        // Pega aquí la URL de tu API de Amplify. Asegúrate de que sea la correcta.
        // ====================================================================
        const apiUrl = 'https://5kzex040mb.execute-api.us-east-1.amazonaws.com/dev/contact'; // <-- USA TU URL

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: formData.name,
                    email: formData.email,
                    telefono: formData.phone,
                    mensaje: formData.message,
                }),
            });

            if (!response.ok) {
                throw new Error('La respuesta del servidor no fue exitosa.');
            }

            setStatus('exito');
            setFormData({ name: '', email: '', phone: '', message: '' }); 
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            setStatus('error');
        }
    };

    // --- Tu Diseño Original ---
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
                {/* Columna Izquierda: Información de Contacto */}
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
                        value="+507 6540-2364"
                        href="tel:+50765402364"
                    />
                    <ContactInfoItem 
                        icon={<MapPinIcon className="h-6 w-6" />}
                        title="Ubicación"
                        value="Ciudad de Panamá, Panamá"
                    />
                </div>
                
                {/* Columna Derecha: Formulario (con campos conectados) */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                     <div className="relative group">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Nombre Completo</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={formData.name}
                            onChange={handleChange}
                            required 
                            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                            Ingrese su nombre y apellido.
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
                        </div>
                    </div>
                    <div className="relative group">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Correo Electrónico</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange}
                            required 
                            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                            Usaremos este correo para responderle.
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
                        </div>
                    </div>
                    <div className="relative group">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">Teléfono <span className="text-gray-500">(Opcional)</span></label>
                        <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                            Opcional, pero útil para un contacto más rápido.
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
                        </div>
                    </div>
                    <div className="relative group">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Mensaje</label>
                        <textarea 
                            id="message" 
                            name="message" 
                            rows={4} 
                            value={formData.message}
                            onChange={handleChange}
                            required 
                            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none"></textarea>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                            Describa su consulta o el proyecto que tiene en mente.
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className={`w-full text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 ${
                            status === 'enviando' 
                                ? 'bg-gray-500 cursor-not-allowed' 
                                : 'bg-blue-500 hover:bg-blue-600 hover:scale-105'
                        }`}
                        disabled={status === 'enviando'}
                    >
                        {status === 'enviando' ? 'Enviando...' : 'Enviar Mensaje'}
                    </button>

                    {/* Mensajes de estado para el usuario */}
                    {status === 'exito' && (
                        <p className="text-green-400 text-center font-medium">
                            ¡Mensaje enviado con éxito! Gracias por contactarnos.
                        </p>
                    )}
                    {status === 'error' && (
                        <p className="text-red-400 text-center font-medium">
                            Hubo un error al enviar el mensaje. Por favor, intente de nuevo.
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
};

export default Contact;