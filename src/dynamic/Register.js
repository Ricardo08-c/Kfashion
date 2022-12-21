import React, { useState } from "react";
import { useNavigate } from "react-router";
import Plantilla from "../static/Plantilla";

function Facturacion1() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
    correo: "",
    contrasenha: "",
    cedula: "",
    sexo: "M",
    rol: "EMP",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };
    //validar si está vacío

    await fetch("https://kfashion.cyclic.app/add/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({
      nombre: "",
      apellido: "",
      fecha_nacimiento: "",
      correo: "",
      contrasenha: "",
      cedula: "",
      sexo: "M",
      rol: "EMP",
    });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div
      className="position-relative alineadoCentroNonRel"
      style={{ minHeight: "100%", maxWidth: "30%" }}
    >
      <h2 className="">Registrar Usuario</h2>
      <li style={{ opacity:0,display: "inline-block" }}>----</li>
      <form onSubmit={onSubmit}>
        <h4 className="" htmlFor="name" style={{ left: "10%" }}>
          Información Personal{" "}
        </h4>

        <div className="form-group" style={{ display: "inline-block" }}>
          <label className="" htmlFor="name">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.nombre}
            onChange={(e) => updateForm({ nombre: e.target.value })}
          />
        </div>
        <li style={{opacity:0, display: "inline-block" }}>----</li>

        <div className="form-group" style={{ display: "inline-block" }}>
          <label className="" htmlFor="name">
            Apellido
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.apellido}
            onChange={(e) => updateForm({ apellido: e.target.value })}
          />
        </div>
        <li style={{ opacity:0,display: "inline-block" }}>----</li>
        <div className="form-group">
          <label className="" htmlFor="name">
            Cédula
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.cedula}
            onChange={(e) => updateForm({ cedula: e.target.value })}
          />
        </div>

        <div className="  form-group">
          <label className="" htmlFor="name">
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            className="form-control"
            id="name"
            value={form.fecha_nacimiento}
            onChange={(e) => updateForm({ fecha_nacimiento: e.target.value })}
            class="form-control"
          />
        </div>
        <div className="form-group">
          <label className="" htmlFor="name">
            Sexo
          </label>
          <select
            className="form-select"
            value={form.sexo}
            onChange={(e) => updateForm({ sexo: e.target.value })}
          >
            <option value="F">Femenino</option>
            <option value="M">Masculino</option>
          </select>
        </div>
        <li style = {{opacity:0}}>----</li>
        <h4 className="" htmlFor="name" style={{ left: "10%" }}>
          Información para la cuenta{" "}
        </h4>
        <div className="form-group">
          <label className="" htmlFor="position">
            Correo
          </label>
          <input
            type="text"
            className="form-control"
            id="position"
            value={form.correo}
            onChange={(e) => updateForm({ correo: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="" htmlFor="name">
            Contraseña
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.contrasenha}
            onChange={(e) => updateForm({ contrasenha: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="" htmlFor="name">
            Rol
          </label>
          <select
            className="form-select"
            value={form.rol}
            onChange={(e) => updateForm({ rol: e.target.value })}
          >
            <option value="EMP">Empresa</option>
            <option value="CL">Cliente</option>
          </select>
        </div>
        <br></br>
        <button
          className="btn  btn-outline-secondary"
          onClick={onSubmit}
        >
          Registrar
        </button>
      </form>
    </div>
  );
}
function Facturacion() {
  return <Plantilla sectionToDisplay={Facturacion1()}></Plantilla>;
}

export default Facturacion;
