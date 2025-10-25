import React, { useState } from 'react';

// Asegúrate de que este componente esté dentro de tu carpeta 'components'
const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  });
  const [status, setStatus] = useState(''); // '', 'enviando', 'exito', 'error'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('enviando');

    // IMPORTANTE: Reemplaza esta URL con la URL de tu API de Amplify
    // La encontrarás en la consola de Amplify después de desplegar.
    const apiUrl = 'https://5kzex040mb.execute-api.us-east-1.amazonaws.com/dev/contact';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('La respuesta del servidor no fue exitosa.');
      }

      setStatus('exito');
      setFormData({ nombre: '', email: '', telefono: '', mensaje: '' }); // Limpiar formulario
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setStatus('error');
    }
  };

  return (
    <section> {/* Reemplaza con tu estructura de sección */}
      <h2>Contacto</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre Completo" value={formData.nombre} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Correo Electrónico" value={formData.email} onChange={handleChange} required />
        <input type="tel" name="telefono" placeholder="Teléfono (Opcional)" value={formData.telefono} onChange={handleChange} />
        <textarea name="mensaje" placeholder="Mensaje" value={formData.mensaje} onChange={handleChange} required />

        <button type="submit" disabled={status === 'enviando'}>
          {status === 'enviando' ? 'Enviando...' : 'Enviar Mensaje'}
        </button>

        {status === 'exito' && <p style={{ color: 'green' }}>¡Mensaje enviado con éxito!</p>}
        {status === 'error' && <p style={{ color: 'red' }}>Hubo un error al enviar. Inténtalo de nuevo.</p>}
      </form>
    </section>
  );
};

export default Contact;