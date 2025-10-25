const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const { Resend } = require('resend');

const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/contact', async (req, res) => {
  const { nombre, email, telefono, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: 'Faltan campos requeridos.' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'MindFormAI Contact Form <onboarding@resend.dev>', // Este remitente es de Resend
      to: ['mindformm.ai@gmail.com'], // Tu correo de destino
      subject: `Nuevo Mensaje de Contacto de ${nombre}`,
      html: `
        <h1>Nuevo mensaje desde la web</h1>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono || 'No proporcionado'}</p>
        <hr>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `,
    });

    if (error) {
      console.error({ error });
      return res.status(500).json({ error: 'Error al enviar el correo.' });
    }

    res.status(200).json({ success: true, message: '¡Correo enviado con éxito!' });
  } catch (exception) {
    console.error(exception);
    res.status(500).json({ error: 'Ocurrió un error inesperado.' });
  }
});

module.exports = app;