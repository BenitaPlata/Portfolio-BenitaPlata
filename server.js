// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

// --- MIDDLEWARES ---
app.use(cors()); // permite solicitudes desde el navegador
app.use(express.json()); // para recibir JSON
app.use(express.urlencoded({ extended: true })); // para recibir formularios HTML

// --- RUTA POST PARA ENVIAR FORMULARIO ---
app.post("/send", async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ status: "error", message: "Todos los campos son obligatorios" });
  }

  // --- CONFIGURAR TRANSPORTER ---
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "itaplata.n@gmail.com",       // Tu correo real
      pass: "bhdv jqwx qbns phhh",     // App Password de 16 caracteres de Gmail
    },
  });

  const mailOptions = {
    from: email,                         // correo del remitente (usuario que completa el formulario)
    to: "tucorreo@gmail.com",            // tu correo donde recibirás los mensajes
    subject: "Nuevo mensaje desde tu portfolio",
    text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje:\n${mensaje}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ status: "ok", message: "Correo enviado correctamente" });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    res.status(500).json({ status: "error", message: "No se pudo enviar el correo" });
  }
});

// --- INICIAR SERVIDOR ---
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
