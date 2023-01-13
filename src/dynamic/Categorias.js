import { useEffect, useState } from "react";
import "../App.css";
import Plantilla from "../static/Plantilla";
import React from "react";
import Swal from "sweetalert2";

// Array donde se almacenaran los productos
let array = [];

function Gestion() {
  const [selects, setSelects] = useState();
  const [categorias, setCategorias] = useState([]);

  const [form, setForm] = useState({
    nombre: "",
    nombreEdicion: "",
  });

  // Variables para el filtrado de busqueda por nombre

  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  // Actualiza el estado del state

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // Llama la funcion al renderizar la pagina

  useEffect(() => {
    getCategorias();
  }, []);

  async function getCategorias() {
    let url = "https://kfashionapi.onrender.com/get/categorias";

    let res = await fetch(url);

    if (res.ok) {
      let text = await res.json();
      array = [];
      array.push(text);
    } else {
      console.log(`HTTP error: ${res.status}`);
    }

    let array2 = [];
    let array1 = array[0];
    for (let i = 0; i < array1.length; i++) {
      let datos = array1[i];
      console.log(datos);
      array2.push(<option defaultValue={datos._id}>{datos.Categoria}</option>);
    }
    setCategorias(array2);
  }

  // Obtiene todos los productos que posteriormente seràn cargados a un dropdown

  // Agrega un nuevo producto siempre y cuando se cumplan las validaciones

  async function editCategoria() {
    if (!selects.length) {
      Swal.fire({
        title: "Gestión de Categorías",
        text: "No puedes dejar el campo vacío!",
        icon: "error",
      });
      return;
    }

    let idToRemove;
    for (var i = 0; i < categorias.length; i++) {
      if (selects === categorias[i]["props"]["children"])
        idToRemove = categorias[i]["props"]["defaultValue"];
    }
    console.log("ID A EDITAR -> " + idToRemove);
    console.log("asd -> " + form.nombreEdicion);

    let json = JSON.stringify({
      id: idToRemove,
      Categoria: form.nombreEdicion,
    });

    await fetch("https://kfashionapi.onrender.com/updateCategoria", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
    }).catch((error) => {
      window.alert(error);
      return;
    });
    Swal.fire({
      title: "Gestión de Categorías",
      text: "El nombre de la categoría fue actualizado con éxito!",
      icon: "success",
    }).then(function () {
      window.location.reload();
    });
  }

  async function removeCategoria() {
    console.log("blabla");
    console.log("ID A REMOVER -> " + selects);
    console.log("ID A REMOVER -> " + JSON.stringify(categorias));

    if (!form.nombreEdicion.length) {
      Swal.fire({
        title: "Gestión de Categorías",
        text: "Selecciona una categoría primero!",
        icon: "error",
      });
      return;
    }

    let idToRemove;
    for (var i = 0; i < categorias.length; i++) {
      if (selects === categorias[i]["props"]["children"])
        idToRemove = categorias[i]["props"]["defaultValue"];
    }

    let json = JSON.stringify({ _id: idToRemove });
    console.log(json);
    fetch("https://kfashionapi.onrender.com/remove/categoria", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
    }).catch((error) => {
      window.alert(error);
      return;
    });
    Swal.fire({
      title: "Gestión de Categorías",
      text: "La categoría fue removida con éxito!",
      icon: "success",
    }).then(function () {
      window.location.reload();
    });
  }

  async function submitCategoria(e) {
    let ip = localStorage.getItem("ipAdress");

    let user = localStorage.getItem(ip);

    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes iniciar sesión como empleado para gestionar categorías",
      });
      return;
    }

    if (!form.nombre.length) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes introducir un nombre a la categoría",
      });
      return;
    } else {
      const newCategoria = { ...form };
      console.log(JSON.stringify(newCategoria));
      await fetch("https://kfashionapi.onrender.com/register/categoria", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategoria),
      }).catch((error) => {
        window.alert(error);
        return;
      });
      Swal.fire({
        title: "Gestión de Categorías",
        text: "La categoría fue ingresada con éxito!",
        icon: "success",
      }).then(function () {
        window.location.reload();
      });
    }
  }

  return (
    <div className="position-relative" style={{ minHeight: "100%" }}>
      <h2 className="">Gestión de categorías</h2>
      <div style={{ overflow: "hidden" }}>
        <form style={{ float: "none" }}>
          <div className="">
            <label className="">Nombre de la categoría</label>
            <br />
            <input
              value={form.nombre}
              onChange={(e) => updateForm({ nombre: e.target.value })}
            ></input>
            <br />
          </div>
        </form>
      </div>
      <br />
      <button onClick={submitCategoria} type="submit" className="btn btn-dark">
        Agregar Categoría
      </button>
      <br />
      <br />
      <label>Editar categoría</label>
      <select
        value={selects}
        onChange={(e) => setSelects((form.nombreEdicion = e.target.value))}
        className="form-control w-25"
        style={{ position: "relative", left: "37%" }}
        aria-label="Default select example"
      >
        {categorias}
      </select>
      <br></br>
      <input
        className=""
        onChange={(e) => updateForm({ nombreEdicion: e.target.value })}
        value={form.nombreEdicion}
      ></input>
      <br></br>
      <br></br>
      <button onClick={editCategoria} type="submit" className="btn btn-primary">
        Guardar Cambios
      </button>
      <span>-</span>
      <button
        onClick={removeCategoria}
        type="submit"
        className="btn btn-danger"
      >
        Eliminar Categoría
      </button>
      <br></br>
    </div>
  );
}

function GestionCategorias() {
  return (
    <div>
      <Plantilla
        sectionToDisplay={<div style={{ minHeight: "100%" }}>{Gestion()}</div>}
      ></Plantilla>
    </div>
  );
}

export default GestionCategorias;
