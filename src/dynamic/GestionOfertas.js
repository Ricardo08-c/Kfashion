import { useEffect, useState } from "react";
import "../App.css";
import Plantilla from "../static/Plantilla";
import React from "react";

// Array donde se almacenan los banner
let array = [];

// Array donde se almacenan los productos
let arrayProducts = [];

// Componente banner con su respectivo MODAL y botones de eliminar y editar.

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

  // Remueve un banner por su id respectivo

  removeFromDatabase(idToRemove) {
    let json = JSON.stringify({ _id: idToRemove });
    console.log(json);
    fetch("https://kfashion.cyclic.app/remove/promotion", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
    }).catch((error) => {
      window.alert(error);
      return;
    });
    alert("Producto removido");
    window.location.reload();
  }

  // Actualiza la informaciòn de un banner siempre y cuando se hayan hecho cambios

  editPromocion = async (e) => {
    console.log("ID A EDITAR -> " + this.state.idObject);
    console.log("FECHA INICIO -> " + this.state.fechaInicio);
    console.log("FECHA FINAL -> " + this.state.fechaFinal);
    console.log("PRODUCTO -> " + this.state.producto);
    console.log("PORCENTAJE -> " + this.state.porcentaje);

    let json = JSON.stringify({
      id: this.state.idObject,
      fechaInicio: this.state.fechaInicio,
      fechaFinal: this.state.fechaFinal,
      producto: this.state.producto._id,
      porcentaje: parseInt(this.state.porcentaje),
      descripcion: this.state.descripcion,
    });

    await fetch("https://kfashion.cyclic.app/updatePromo", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
    }).catch((error) => {
      window.alert(error);
      return;
    });
    alert("Producto editado");
    window.location.reload();
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
            class="modal fade"
            id={"Promo" + this.props.idObject}
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Edicion de producto
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <label>Descripcion:{this.props.descripcion}</label>
                  <br />
                  <input onChange={this.changeDescripcion}></input>
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
                  <input onChange={this.changePorcentaje}></input>
                  <br />
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={this.editPromocion}
                    type="button"
                    data-bs-dismiss="modal"
                    class="btn btn-primary"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            {/* Article */}

            <article className="post">
              <div className="post-header">
                <img
                  src={this.props.producto.imgSrc}
                  className="img"
                  alt="..."
                />
              </div>
              <div className="post-body">
                <span>
                  {this.props.fechaInicio} al {this.props.fechaFinal}
                </span>
                <h2>{this.props.producto.name}</h2>
                <p> {this.props.descripcion}</p>
                <p> Descuento del {this.props.porcentaje}%</p>
                <a href="/Catalogo" className="post-link">
                  {" "}
                  Ver mas productos
                </a>
              </div>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target={"#" + "Promo" + this.props.idObject}
              >
                Editar
              </button>
              <span> </span>
              <button
                onClick={this.removePromocion}
                class="btn btn-danger"
                type="button"
              >
                Remover
              </button>
            </article>
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

  // Funcion para actualizar el state

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  useEffect(() => {
    getPromociones();
    getProducts();
  }, []);

  // Obtiene las promociones de la base de datos y las guarda en un arreglo de banner.

  async function getPromociones() {
    let url = "https://kfashion.cyclic.app/promociones";
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
          porcentaje={datos.porcentaje}
          producto={datos.producto[0]}
          productoNombre={datos.producto[0].nombre}
          descripcion={datos.descripcion}
          fechaInicio={datos.fechaInicio}
          fechaFinal={datos.fechaFinal}
          idObject={datos._id}
        />
      );
    }
    setPromos(array2);
  }

  // Registra una promocion siempre y cuando se cumplan las validaciones

  async function submitPromocion(e) {
    let ip = localStorage.getItem("ipAdress");

    let user = localStorage.getItem(ip);

    if (!user) {
      alert("Debes iniciar secion como empleado para gestionar productos");
      return;
    }

    if (!form.descripcion.length) {
      alert("Debes poner una descripcion a la promocion");
      return;
    }

    if (!form.fechaInicio.length) {
      alert("Debes poner una fecha inicial a la promocion");
      return;
    }

    if (!form.fechaFinal.length) {
      alert("Debes poner una fecha final a la promocion");
      return;
    }

    if (!form.producto.length) {
      alert("Debes asignarle un producto a la promocion");
      return;
    }

    if (!form.porcentaje.length) {
      alert("Debes poner un porcentaje a la promocion");
      return;
    } else {
      const newPromo = { ...form };
      newPromo.porcentaje = parseInt(newPromo.porcentaje);
      console.log(JSON.stringify(newPromo));
      await fetch("https://kfashion.cyclic.app/register/promotion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPromo),
      }).catch((error) => {
        window.alert(error);
        return;
      });

      alert("Oferta registrada");
      window.location.reload();
    }
  }

  // Obtiene los productos para ser agregados al dropdown

  async function getProducts() {
    let url = "https://kfashion.cyclic.app/products";
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
      array2.push(<option value={datos[0]}>{datos[5]}</option>);
    }
    setProducts(array2);
  }

  return (
    <div className="position-relative" style={{ minHeight: "100%" }}>
      <h2 className="text-white">Gestion de ofertas</h2>
      <div style={{ overflow: "hidden" }}>
        <form style={{ float: "none" }}>
          <div className="">
            <label className="text-white">Descripcion de la promocion</label>
            <br />
            <input
              value={form.descripcion}
              onChange={(e) => updateForm({ descripcion: e.target.value })}
            ></input>
            <br />
            <label className="text-white">Fecha Inicio</label>
            <br />
            <input
              type="date"
              value={form.fechaInicio}
              onChange={(e) => updateForm({ fechaInicio: e.target.value })}
            ></input>
            <br />
            <label className="text-white">Fecha Final</label>
            <br />
            <input
              type="date"
              value={form.fechaFinal}
              onChange={(e) => updateForm({ fechaFinal: e.target.value })}
            ></input>
            <br />
            <label className="text-white">Producto</label>
            <br />
            <select onChange={(e) => updateForm({ producto: e.target.value })}>
              {console.log("asd")}
              {console.log(products)}
              {products.map((product) => product)}
            </select>
            <br />
            <label className="text-white">Porcentaje</label>
            <br />
            <input
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
          class="modal"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body"></div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button type="button" class="btn btn-primary">
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <button onClick={submitPromocion} type="submit" class="btn btn-success">
        Agregar promocion
      </button>
      <br />
      <br></br>
      <h2 className="text-white">Visualizacion de ofertas actuales</h2>

      <div className="anuncioBody">
        <div className="post-list">
          <div className="content">{promos.map((promo) => promo)}</div>
        </div>
      </div>
    </div>
  );
}

function GestionOfertas() {
  return (
    <div>
      <Plantilla
        sectionToDisplay={<div style={{ minHeight: "100%" }}>{Gestion()}</div>}
      ></Plantilla>
    </div>
  );
}

export default GestionOfertas;
