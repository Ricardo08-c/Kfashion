import { useEffect, useState } from "react";
import "../App.css";
import Plantilla from "../static/Plantilla";
import React from "react";

// Array donde se almacenaran los productos
let array = [];

class Direccion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      provincia: this.props.provincia,
      canton: this.props.canton,
      distrito: this.props.distrito,
      direccion: this.props.direccion,
      user: this.props.user,
      _id: this.props._id,
    };
  }

  removeDireccion = (e) => {
    console.log("----------");
    console.log("id = " + this.props.idObject);
    this.removeFromDatabase(this.props.idObject);
  };

  // Se remueve el producto por ID
  removeFromDatabase(idToRemove) {
    console.log("blabla");
    console.log("ID A REMOVER -> " + idToRemove);

    let json = JSON.stringify({ _id: idToRemove });
    console.log(json);
    fetch("https://kfashionapi.onrender.com/remove/direccion", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
    }).catch((error) => {
      window.alert(error);
      return;
    });
    alert("Direccion removida");
    window.location.reload();
  }

  // Se capturan los datos del props, si son modificados se envia la peticion
  editDireccion = async (e) => {
    console.log("MIERD");

    console.log(this.state.provincia);
    console.log(this.state.provincia);

    let json = JSON.stringify({
      provincia: this.state.provincia,
      canton: this.state.canton,
      distrito: this.state.distrito,
      direccion: this.state.direccion,
      user: this.state.user,
      id: this.props.idObject,
    });

    await fetch("https://kfashionapi.onrender.com/updateDireccion", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
    }).catch((error) => {
      window.alert(error);
      return;
    });
    window.location.reload();
  };

  changeProvincia = (e) => {
    this.setState({ provincia: e.target.value });
  };

  changeCanton = (e) => {
    this.setState({ canton: e.target.value });
  };

  changeDistrito = (e) => {
    this.setState({ distrito: e.target.value });
  };

  changeDireccion = (e) => {
    this.setState({ direccion: e.target.value });
  };

  render() {
    return (
      <div className="col">
        <div className="card">
          {/* Modal */}

          <div
            className="modal fade"
            id={"D" + this.props.idObject}
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Edicion de direccion
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <label>Provincia</label>
                  <br />
                  <input
                    defaultValue={this.props.provincia}
                    onChange={this.changeProvincia}
                  ></input>
                  <br />
                  <label>Canton</label>
                  <br />
                  <input
                    defaultValue={this.props.canton}
                    onChange={this.changeCanton}
                  ></input>
                  <br />
                  <label>Distrito</label>
                  <br />
                  <input
                    defaultValue={this.props.distrito}
                    onChange={this.changeDistrito}
                  ></input>
                  <br />
                  <label>Direccion</label>
                  <br />
                  <input
                    defaultValue={this.props.direccion}
                    onChange={this.changeDireccion}
                  ></input>
                  <br />
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
                    onClick={this.editDireccion}
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-primary"
                  >
                    Guardar cambios
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            {/* Card */}

            <h5 className="card-title">{this.props.provincia}</h5>
            <h5 className="card-title">{this.props.canton}</h5>
            <h5 className="card-title">{this.props.distrito}</h5>
            <h5 className="card-title">{this.props.direccion}</h5>
            <div className="d-grid gap-2 d-md-block">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target={"#D" + this.props.idObject}
              >
                Editar
              </button>
              <span> </span>
              <button
                onClick={this.removeDireccion}
                className="btn btn-danger"
                type="button"
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function Gestion() {
  const [selects, setSelects] = useState();
  const [direcciones, setDirecciones] = useState([]);

  let user = localStorage.getItem(localStorage.getItem("ipAdress")) || false;
  let userobj = JSON.parse(user);
  console.log(userobj._id);

  const [form, setForm] = useState({
    provincia: "",
    canton: "",
    distrito: "",
    direccion: "",
    usuario: userobj._id,
  });

  // Actualiza el estado del state

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function getDirecciones() {
    let url = "https://kfashionapi.onrender.com/get/direcciones";
    let res = await fetch(url);

    let user = localStorage.getItem(localStorage.getItem("ipAdress")) || false;
    let userobj = JSON.parse(user);
    console.log(userobj._id);

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
      if (userobj._id === datos.usuario) {
        array2.push(
          <Direccion
            provincia={datos.provincia}
            canton={datos.canton}
            distrito={datos.distrito}
            direccion={datos.direccion}
            user={userobj._id}
            idObject={datos._id}
          />
        );
      }
    }

    setDirecciones(array2);
    console.log(direcciones);
  }

  // Llama la funcion al renderizar la pagina

  useEffect(() => {
    getDirecciones();
  }, []);

  // Obtiene todos los productos que posteriormente seràn cargados a un dropdown

  // Agrega uja nueva direccion siempre y cuando se cumplan las validaciones

  async function submitDireccion(e) {
    let ip = localStorage.getItem("ipAdress");

    let user = localStorage.getItem(ip);

    if (!user) {
      alert("Debes iniciar secion como empleado para gestionar categorias");
      return;
    }

    if (!form.provincia.length) {
      alert("Debes poner una provincia a la dirección");
      return;
    }

    if (!form.canton.length) {
      alert("Debes poner una cantón a la dirección");
      return;
    }
    if (!form.distrito.length) {
      alert("Debes poner un distrito a la dirección");
      return;
    }
    if (!form.direccion.length) {
      alert("Debes poner una dirección");
      return;
    } else {
      const newDireccion = { ...form };
      console.log(JSON.stringify(newDireccion));
      await fetch("https://kfashionapi.onrender.com/register/direccion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDireccion),
      }).catch((error) => {
        window.alert(error);
        return;
      });
      alert("Dirección registrada");
      window.location.reload();
    }
  }

  return (
    <div className="position-relative" style={{ minHeight: "100%" }}>
      <h2 className="">Gestion de Direcciones</h2>
      <div style={{ overflow: "hidden" }}>
        <form style={{ float: "none" }}>
          <div className="">
            <label className="">Provincia</label>
            <br />
            <select
              value={form.provincia}
              onChange={(e) => updateForm({ provincia: e.target.value })}
            >
              <option></option>
              <option>San José</option>
              <option>Alajuela</option>
              <option>Cartago</option>
              <option>Heredia</option>
              <option>Guanacaste</option>
              <option>Puntarenas</option>
              <option>Limón</option>
            </select>
            <br></br>
            <label>Cantón</label>
            <br></br>
            <input
              value={form.canton}
              onChange={(e) => updateForm({ canton: e.target.value })}
            ></input>
            <br></br>
            <label>Distrito</label>
            <br></br>
            <input
              value={form.distrito}
              onChange={(e) => updateForm({ distrito: e.target.value })}
            ></input>
            <br></br>
            <label>Dirección</label>
            <br></br>
            <input
              value={form.direccion}
              onChange={(e) => updateForm({ direccion: e.target.value })}
            ></input>
            <br />
          </div>
        </form>
      </div>
      <br />
      <button onClick={submitDireccion} type="submit" className="btn btn-dark">
        Agregar Dirección
      </button>
      <br />
      <br />
      <div className="row row-cols-1 row-cols-md-2 row-cols-md-3 row-cols-md-4 row-cols-md-5 g-4">
        {direcciones}
      </div>
    </div>
  );
}

function GestionDirecciones() {
  return (
    <div>
      <Plantilla
        sectionToDisplay={<div style={{ minHeight: "100%" }}>{Gestion()}</div>}
      ></Plantilla>
    </div>
  );
}

export default GestionDirecciones;
