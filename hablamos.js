
const form = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    nombre: form.nombre.value,
    email: form.email.value,
    mensaje: form.mensaje.value
  };

  try {
    const res = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      successMessage.style.display = "block";
      successMessage.style.opacity = "0";
      successMessage.style.animation = "fadeIn 0.5s forwards";

      form.reset();

      setTimeout(() => {
        successMessage.style.opacity = "0";
        setTimeout(() => {
          successMessage.style.display = "none";
        }, 500);
      }, 4000);

    } else {
      alert("Error al enviar el mensaje, prueba más tarde.");
    }
  } catch (err) {
    alert("No se pudo conectar con el servidor.");
    console.error(err);
  }
});
