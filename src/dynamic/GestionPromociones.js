import { useEffect, useState } from "react";
import "../App.css";
import Plantilla from "../static/Plantilla";
import React from "react";
import Swal from "sweetalert2";

// Arreglo donde se almacena temporalmentelas promos
let array = [];

// Arreglo donde se almacena temporalmente los productos
let arrayProducts = [];

class BannerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fechaInicio: this.props.fechaInicio,
      fechaFinal: this.props.fechaFinal,
      descripcion: this.props.descripcion,
      producto: this.props.producto,
      porcentaje: this.props.porcentaje,
      idObject: this.props.idObject,
    };
  }

  removePromocion = (e) => {
    console.log("----------");
    console.log("id = " + this.props.idObject);
    this.removeFromDatabase(this.props.idObject);
  };

  // Remueve una promocion por el id asignado a la promo en cada banner

  removeFromDatabase(idToRemove) {
    console.log(this.state.producto._id);
    let json = JSON.stringify({
      _id: idToRemove,
      producto: this.state.producto._id,
    });
    console.log(json);
    fetch("https://kfashionapi.onrender.com/remove/promotion", {
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
      title: "Gestión de Promociones",
      text: "La promoción fue removida con éxito!",
      icon: "success",
    }).then(function () {
      window.location.reload();
    });
  }

  // Actualiza una promocion siempre y cuando hayan hecho cambios.
  editPromocion = async (e) => {
    console.log("ID A EDITAR -> " + this.state.idObject);
    console.log("FECHA INICIO -> " + this.state.fechaInicio);
    console.log("FECHA FINAL -> " + this.state.fechaFinal);
    console.log("PRODUCTO -> " + this.state.producto._id);
    console.log("PORCENTAJE -> " + this.state.porcentaje);

    let json = JSON.stringify({
      id: this.state.idObject,
      fechaInicio: this.state.fechaInicio,
      fechaFinal: this.state.fechaFinal,
      producto: this.state.producto._id,
      porcentaje: parseInt(this.state.porcentaje),
      descripcion: this.state.descripcion,
    });

    await fetch("https://kfashionapi.onrender.com/updatePromo", {
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
      title: "Gestión de Promociones",
      text: "La promoción fue actualizada con éxito!",
      icon: "success",
    }).then(function () {
      window.location.reload();
    });
  };

  // Funciones para actualizar el state.

  changeDescripcion = (e) => {
    console.log("ID A EDITAR -> " + this.props.idObject);
    console.log(this.state.descripcion);
    console.log("input->" + e.target.value);
    this.setState({ descripcion: e.target.value });
  };

  changeFechaInicio = (e) => {
    console.log("ID A EDITAR -> " + this.props.idObject);
    console.log(this.state.fechaInicio);
    console.log("input->" + e.target.value);
    this.setState({ fechaInicio: e.target.value });
  };

  changeFechaFinal = (e) => {
    console.log("ID A EDITAR -> " + this.props.idObject);
    console.log(this.state.fechaFinal);
    console.log("input->" + e.target.value);
    this.setState({ fechaFinal: e.target.value });
  };

  changeProducto = (e) => {
    console.log("ID A EDITAR -> " + this.props.idObject);
    console.log(this.state.producto);
    console.log("input->" + e.target.value);
    this.setState({ producto: e.target.value });
  };

  changePorcentaje = (e) => {
    console.log("ID A EDITAR -> " + this.props.idObject);
    console.log(this.state.porcentaje);
    console.log("input->" + e.target.value);
    this.setState({ porcentaje: e.target.value });
  };

  render() {
    return (
      <div>
        <div>
          {/* Modal */}

          <div
            className="modal fade"
            id={"Promo" + this.props.idObject}
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Edición de promoción
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <label>Descripción</label>
                  <br />
                  <input
                    defaultValue={this.props.descripcion}
                    onChange={this.changeDescripcion}
                  ></input>
                  <br />
                  <label>Fecha Inicio:{this.props.fechaInicio}</label>
                  <br />
                  <input type="date" onChange={this.changeFechaInicio}></input>
                  <br />
                  <label>Fecha Final:{this.props.fechaFinal}</label>
                  <br />
                  <input type="date" onChange={this.changeFechaFinal}></input>
                  <br />
                  <label>Porcentaje:{this.props.porcentaje}</label>
                  <br />
                  <input
                    type="number"
                    min="1"
                    max="99"
                    onChange={this.changePorcentaje}
                  ></input>
                  <br />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={this.editPromocion}
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-primary"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            {/* Banner */}

            <div className="bannerAgrupacion">
              <div className="textoBanner">
                <p>
                  {this.props.descripcion}: {this.props.productoNombre},
                  {this.props.descripcionProducto}
                  {": "}
                  {this.props.porcentaje}% de descuento Válido desde{" "}
                  {this.props.fechaInicio} hasta el {this.props.fechaFinal}
                </p>
              </div>
              <div className="botonBanner">
                <a href="/Catalogo" className="btn btn-secondary tamanho">
                  Añadir al carrito
                </a>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target={"#" + "Promo" + this.props.idObject}
            >
              Editar
            </button>
            <span> </span>
            <button
              onClick={this.removePromocion}
              className="btn btn-danger"
              type="button"
            >
              Remover
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function Gestion() {
  const [promos, setPromos] = useState([]);
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    descripcion: "",
    fechaInicio: "",
    fechaFinal: "",
    producto: "",
    porcentaje: "",
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  useEffect(() => {
    getPromociones();
    getProducts();
  }, []);

  // Obtiene las promociones de la BD y se carga a un arreglo de banners

  async function getPromociones() {
    let url = "https://kfashionapi.onrender.com/promociones";
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
    console.log(array1);

    for (let i = 0; i < array1.length; i++) {
      let datos = array1[i];
      array2.push(
        <BannerComponent
          porcentaje={datos.producto[0].descuento}
          producto={datos.producto[0]}
          productoNombre={datos.producto[0].nombre}
          descripcionProducto={datos.producto[0].description}
          descripcion={datos.descripcion}
          fechaInicio={datos.fechaInicio}
          fechaFinal={datos.fechaFinal}
          idObject={datos._id}
        />
      );
    }
    setPromos(array2);
  }

  // Se registra una promocion siempre y cuando se cumplan las validaciones

  async function submitPromocion(e) {
    let ip = localStorage.getItem("ipAdress");

    let user = localStorage.getItem(ip);

    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes iniciar sesión como empleado para gestionar promociones",
      });
      return;
    }

    if (!form.descripcion.length) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes poner una descripción a la promoción",
      });
      return;
    }

    if (!form.fechaInicio.length) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes poner una fecha inicial a la promoción",
      });
      return;
    }

    if (!form.fechaFinal.length) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes poner una fecha final a la promoción",
      });
      return;
    }

    if (!form.producto.length) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes asignarle un producto a la promoción",
      });
      return;
    }

    if (!form.porcentaje.length) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes poner asignarle un porcentaje de descuento a la promoción",
      });
      return;
    } else {
      const newPromo = { ...form };
      newPromo.porcentaje = parseInt(newPromo.porcentaje);
      console.log(JSON.stringify(newPromo));
      await fetch("https://kfashionapi.onrender.com/register/promotion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPromo),
      }).catch((error) => {
        window.alert(error);
        return;
      });

      Swal.fire({
        title: "Gestión de Promociones",
        text: "La promoción fue agregada con éxito!",
        icon: "success",
      }).then(function () {
        window.location.reload();
      });
    }
  }

  // Obtienes los productos de la BD para ser cargados a un dropdown

  async function getProducts() {
    let url = "https://kfashionapi.onrender.com/products";
    let res = await fetch(url);

    if (res.ok) {
      let text = await res.json();
      arrayProducts = [];
      arrayProducts.push(text);
    } else {
      console.log(`HTTP error: ${res.status}`);
    }

    let array2 = [];
    let array1 = arrayProducts[0];
    for (let i = 0; i < array1.length; i++) {
      let datos = Object.values(array1[i]);
      console.log(datos[0]);
      array2.push(
        <option value={datos[0]}>
          {datos[5]}-{datos[3]}
        </option>
      );
    }
    setProducts(array2);
  }

  return (
    <div className="position-relative" style={{ minHeight: "100%" }}>
      <h2 className="">Gestión de promociones</h2>
      <div style={{ overflow: "hidden" }}>
        <form style={{ float: "none" }}>
          <div className="">
            <label className="">Descripción de la promoción</label>
            <br />
            <input
              value={form.descripcion}
              onChange={(e) => updateForm({ descripcion: e.target.value })}
            ></input>
            <br />
            <label className="">Fecha Inicio</label>
            <br />
            <input
              type="date"
              value={form.fechaInicio}
              onChange={(e) => updateForm({ fechaInicio: e.target.value })}
            ></input>
            <br />
            <label className="">Fecha Final</label>
            <br />
            <input
              type="date"
              value={form.fechaFinal}
              onChange={(e) => updateForm({ fechaFinal: e.target.value })}
            ></input>
            <br />
            <label className="">Producto</label>
            <br />
            <select onChange={(e) => updateForm({ producto: e.target.value })}>
              {console.log("asd")}
              {console.log(products)}
              <option></option>
              {products.map((product) => product)}
            </select>
            <br />
            <label className="">Porcentaje</label>
            <br />
            <input
              type="number"
              min="1"
              max="99"
              value={form.porcentaje}
              onChange={(e) => updateForm({ porcentaje: e.target.value })}
            ></input>
            <br />
          </div>
          <br />
          {/*
                <div>
                <BannerComponent porcentaje={form.porcentaje} producto={form.producto} descripcion={form.descripcion} fechaInicio={form.fechaInicio} fechaFinal={form.fechaFinal}/>
                </div>
                    */}
        </form>

        <div
          className="modal"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body"></div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button type="button" className="btn btn-primary">
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <button onClick={submitPromocion} type="submit" className="btn btn-dark">
        Agregar promocion
      </button>
      <br />
      <br></br>
      <h2 className="">Visualizacion de promociones actuales</h2>
      <div
        id="carouselExampleControls"
        className=" position-relative carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {promos.map((promo) => (
            <div className="carousel-item active">{promo}</div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

function GestionPromociones() {
  return (
    <div>
      <Plantilla
        sectionToDisplay={<div style={{ minHeight: "100%" }}>{Gestion()}</div>}
      ></Plantilla>
    </div>
  );
}

export default GestionPromociones;
