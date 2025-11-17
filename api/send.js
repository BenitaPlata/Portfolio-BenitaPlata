import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ status: "error", message: "Method Not Allowed" });
  }

  const { nombre, email, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res
      .status(400)
      .json({ status: "error", message: "Todos los campos son obligatorios" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // tu correo, usando variable de entorno
      pass: process.env.EMAIL_PASS, // tu App Password, usando variable de entorno
    },
  });

  const mailOptions = {
    from: `"Portfolio de ${nombre}" <${process.env.EMAIL_USER}>`,
    replyTo: email,

    to: process.env.EMAIL_USER,
    subject: "Nuevo mensaje desde tu portfolio",
    text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje:\n${mensaje}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ status: "ok", message: "Correo enviado correctamente" });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    res
      .status(500)
      .json({ status: "error", message: "No se pudo enviar el correo" });
  }
}
