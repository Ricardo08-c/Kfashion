import React, { useState } from "react";
import Plantilla from "../static/Plantilla";
import emailjs from "@emailjs/browser";

//Formulario para ingresar nombre, apellido, correo y consulta para ser enviados por correo de contacto al cliente
function FormContacto() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    consulta: "",
  });

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  // Función para atrapar el evento del botón y enviar mail.
  async function onSubmit(e) {
    e.preventDefault();

    //Estableciendo los atributos del formulario
    setForm({ nombre: "", correo: "", consulta: "" });

    //Envío del email
    emailjs
      .send("service_rqo4y0f", "template_bh8z0v8", form, "OgiARypVGqnVEZeLu")
      .then((response) => {
        alert(
          "Su mensaje ha sido enviado con éxito, nuestro servicio al cliente se pondrá en contacto con usted al correo suministrado"
        );
        return console.log(response);
      })
      .catch((error) =>
        alert("error en el envío, verifique los datos y conexión")
      );
  }

  // This following section will display the form that takes the input from the user.
  return (
    //Información personal
    //Titulo
    <div
      className="position-relative alineadoCentroNonRel"
      style={{ minHeight: "100%", maxWidth: "30%" }}
    >
      <h2>Formulario de Contacto</h2>
      <li style={{ opacity: 0, display: "inline-block" }}>----</li>
      <form onSubmit={onSubmit}>
        {/*Mensaje instructivo*/}

        <label htmlFor="name">
          Ingrese su nombre, correo electrónico y su consulta o mensaje y le
          contestaremos desde nuestro correo de servicio al cliente tan pronto
          sea posible.
        </label>

        {/*Etiqueta para informacion personal*/}

        <h4 className="" htmlFor="name" style={{ left: "10%" }}>
          Información Personal{" "}
        </h4>

        {/*insercion de nombre*/}
        <div className="form-group" style={{ display: "inline" }}>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.nombre}
            onChange={(e) => updateForm({ nombre: e.target.value })}
          />
        </div>

        <div className="form-group">
          {/*insercion de correo*/}
          <label htmlFor="position">Correo</label>
          <input
            type="text"
            className="form-control"
            id="position"
            value={form.correo}
            onChange={(e) => updateForm({ correo: e.target.value })}
          />
        </div>

        <li style={{ opacity: 0, display: "inline-block" }}>----</li>

        {/*Título de mensaje o consulta */}
        <h4 className="" htmlFor="name" style={{ left: "10%" }}>
          Mensaje o consulta{" "}
        </h4>

        {/*Cuadro de texto para la consulta o mensaje ingresado por el usuario para ser enviado por correo*/}
        <div className="form-group">
          <label htmlFor="name">Introduzca su mensaje o consulta</label>
          <textarea
            type="text"
            className="form-control"
            id="mensaje"
            value={form.consulta}
            onChange={(e) => updateForm({ consulta: e.target.value })}
          />
        </div>
        <br></br>
        {/*Botón que maneja elmevento de enviar mail, si el mail es enviado correctamente limpia los campos*/}
        <button className="btn btn-dark" onClick={onSubmit}>
          Enviar Consulta
        </button>
      </form>
    </div>
  );
}
function FormularioContacto() {
  return <Plantilla sectionToDisplay={FormContacto()}></Plantilla>;
}
export default FormularioContacto;
