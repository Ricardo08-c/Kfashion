import { useEffect, useState } from "react";
import "../App.css";
import Plantilla from "../static/Plantilla";
import React from "react";
import FileBase64 from "react-file-base64";
// Array donde se almacenaran los productos
let array = [];
let categoriasActuales = [];

// Clase la cual mostrarà los productos con su respectivo MODAL y botones de editar y eliminar
class ProductRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: this.props.imgSrc,
      name: this.props.name,
      description: this.props.description,
      price: this.props.price,
      category: this.props.category,
      activo: this.props.activo,
      idObject: this.props.idObject,
      cantidad: this.props.cantidad,
    };
  }

  removeProduct = (e) => {
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
    fetch("https://kfashionapi.onrender.com/remove/product", {
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

  // Se capturan los datos del props, si son modificados se envia la peticion
  editProduct = async (e) => {
    console.log("ID A EDITAR -> " + this.state.idObject);
    console.log("IMAGEN -> " + this.state.imgSrc);
    console.log("NOMBRE -> " + this.state.name);
    console.log("DESCRIPCION -> " + this.state.description);
    console.log("PRECIO -> " + this.state.price);
    console.log("CATEGORIA -> " + this.state.category);
    console.log("ACTIVO -> " + this.state.activo);

    let json = JSON.stringify({
      id: this.state.idObject,
      imgSrc: this.state.imgSrc,
      name: this.state.name,
      description: this.state.description,
      price: parseInt(this.state.price),
      category: this.state.category,
      activo: this.state.activo,
      cantidad: parseInt(this.state.cantidad),
      descuento: 0,
    });

    await fetch("https://kfashionapi.onrender.com/updateProduct", {
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

  // Estas funciones son para actualizar el estado de los inputs

  changeName = (e) => {
    console.log("ID A EDITAR -> " + this.props.idObject);
    console.log(this.state.name);
    console.log("input->" + e.target.value);
    this.setState({ name: e.target.value });
  };

  changeQuantity = (e) => {
    console.log("ID A EDITAR -> " + this.props.idObject);
    console.log(this.state.cantidad);
    console.log("input->" + e.target.value);
    this.setState({ cantidad: e.target.value });
  };

  changePrice = (e) => {
    console.log("ID A EDITAR -> " + this.props.idObject);
    console.log(this.state.price);
    console.log("input->" + e.target.value);
    this.setState({ price: e.target.value });
  };

  changeCategory = (e) => {
    console.log("ID A EDITAR -> " + this.props.idObject);
    console.log(this.state.category);
    console.log("input->" + e.target.value);
    this.setState({ category: e.target.value });
  };

  changeDescription = (e) => {
    console.log("ID A EDITAR -> " + this.props.idObject);
    console.log(this.state.description);
    console.log("input->" + e.target.value);
    this.setState({ description: e.target.value });
  };

  changeUrl = (e) => {
    console.log("ID A EDITAR -> " + this.props.idObject);
    console.log(this.state.imgSrc);
    console.log("input->" + e.target);
    this.setState({ imgSrc: e.target });
  };

  render() {
    return (
      <div className="col">
        {this.props.activo === "activo" ? (
          <div className="card">
            {/* Modal */}

            <div
              className="modal fade"
              id={"Producto" + this.props.idObject}
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Edicion de producto
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    {console.log("ad->" + this.props.name)}
                    <label>Nombre</label>
                    <br />
                    <input
                      defaultValue={this.props.name}
                      onChange={this.changeName}
                    ></input>
                    <br />
                    <label>Precio</label>
                    <br />
                    <input
                      type="number"
                      defaultValue={this.props.price}
                      onChange={this.changePrice}
                    ></input>
                    <br />
                    <label>Categoria:{this.props.category}</label>
                    <br />
                    <select
                      className="form-control w-25"
                      aria-label="Default select example"
                      defaultValue={this.props.category}
                      style={{ position: "relative", left: "37%" }}
                      onChange={this.changeCategory}
                    >
                      {categoriasActuales}
                    </select>
                    <br />
                    <label>Cantidad</label>
                    <br />
                    <input
                      type="number"
                      defaultValue={this.props.cantidad}
                      onChange={this.changeQuantity}
                    ></input>
                    <br />
                    <label>Descripcion</label>
                    <br />
                    <input
                      defaultValue={this.props.description}
                      onChange={this.changeDescription}
                    ></input>
                    <br />
                    <label>Imagen</label>
                    <br />
                    <FileBase64
                      multiple={false}
                      onDone={({ base64 }) => this.setState({ imgSrc: base64 })}
                    />
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
                      onClick={this.editProduct}
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

            <img
              src={this.props.imgSrc}
              className="card-img-top"
              alt="..."
              width="75"
              height="150"
            />
            <div className="card-body">
              {/* Card */}

              <h5 className="card-title">{this.props.name}</h5>
              <p className="card-text">{this.props.description}</p>
              <h5>{"$" + this.props.price}</h5>
              <div className="d-grid gap-2 d-md-block">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target={"#Producto" + this.props.idObject}
                >
                  Editar
                </button>
                <span> </span>
                <button
                  onClick={this.removeProduct}
                  className="btn btn-danger"
                  type="button"
                >
                  Remover
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

function Gestion() {
  const [selects, setSelects] = useState();
  const [products, setProducts] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [form, setForm] = useState({
    nombre: "",
    categoria: "",
    descripcion: "",
    precio: "",
    imgSrc: "",
    cantidad: "",
    estado: "activo",
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
    getProducts();
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
      array2.push(<option>{datos.Categoria}</option>);
    }
    setCategorias(array2);
    categoriasActuales = array2;
  }

  // Obtiene todos los productos que posteriormente seràn cargados a un dropdown

  async function getProducts() {
    let url = "https://kfashionapi.onrender.com/products";
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
      let datos = Object.values(array1[i]);
      console.log(datos[0]);
      console.log("-ñ-ñ-ñ");
      console.log(categorias);
      array2.push(
        <ProductRow
          imgSrc={datos[1]}
          name={datos[5]}
          price={datos[6]}
          description={datos[3]}
          category={datos[7]}
          activo={"activo"}
          idObject={datos[0]}
          cantidad={datos[2]}
        />
      );
    }
    setProducts(array2);
  }

  // Agrega un nuevo producto siempre y cuando se cumplan las validaciones

  async function submitProduct(e) {
    let ip = localStorage.getItem("ipAdress");

    let user = localStorage.getItem(ip);

    console.log("ads");
    console.log(form.categoria);

    if (!user) {
      alert("Debes iniciar secion como empleado para gestionar productos");
      return;
    }

    if (!form.nombre.length) {
      alert("Debes poner una nombre a la producto");
      return;
    }

    if (!form.categoria.length) {
      alert("Debes poner una categoria al producto");
      return;
    }

    if (!form.descripcion.length) {
      alert("Debes poner una descripcion al producto");
      return;
    }

    if (!form.precio.length) {
      alert("Debes asignarle un precio al producto");
      return;
    }

    if (!form.imgSrc.length) {
      alert("Debes agregarle una imagen del producto");
      return;
    }

    if (!form.cantidad.length) {
      alert("Debes poner la cantidad en stock del producto");
      return;
    } else {
      const newProduct = { ...form };
      newProduct.precio = parseInt(newProduct.precio);
      newProduct.cantidad = parseInt(newProduct.cantidad);
      console.log(JSON.stringify(newProduct));
      await fetch("https://kfashionapi.onrender.com/register/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      }).catch((error) => {
        window.alert(error);
        return;
      });
      alert("Producto registrado");
      window.location.reload();
    }
  }

  return (
    <div className="position-relative" style={{ minHeight: "100%" }}>
      <h2 className="">Gestion de productos</h2>
      <div style={{ overflow: "hidden" }}>
        <form style={{ float: "none" }}>
          <div className="">
            <label className="">Nombre del producto</label>
            <br />
            <input
              value={form.nombre}
              onChange={(e) => updateForm({ nombre: e.target.value })}
            ></input>
            <br />

            <label className="">Categoria del producto</label>
            <br />
            <select
              value={selects}
              onChange={(e) => setSelects((form.categoria = e.target.value))}
              className="form-control w-25"
              style={{ position: "relative", left: "37%" }}
              aria-label="Default select example"
            >
              <option></option>
              {categorias}
            </select>

            <label className="">Descripcion del producto</label>
            <br />
            <input
              value={form.descripcion}
              onChange={(e) => updateForm({ descripcion: e.target.value })}
            ></input>
            <br />
            <label className="">Precio del producto</label>
            <br />
            <input
              value={form.precio}
              onChange={(e) => updateForm({ precio: e.target.value })}
            ></input>
            <br />
            <label className="">Imagen asociada al producto</label>
            <br />
            <FileBase64
              multiple={false}
              onDone={({ base64 }) => updateForm({ imgSrc: base64 })}
            />
            <br />
            <label className="">Cantidad en Stock del producto</label>
            <br />
            <input
              value={form.cantidad}
              onChange={(e) => updateForm({ cantidad: e.target.value })}
            ></input>
            <br />
          </div>
          <br />
          <div className="row row-cols-1 row-cols-md-2 row-cols-md-3 row-cols-md-4 row-cols-md-5 g-4">
            <ProductRow />
            <ProductRow />
            <ProductRow
              imgSrc={form.imgSrc}
              name={form.nombre}
              price={form.precio}
              description={form.descripcion}
              category={form.categoria}
              activo="activo"
            />
            <ProductRow />
            <ProductRow />
          </div>
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
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <button onClick={submitProduct} type="submit" className="btn btn-dark">
        Agregar producto
      </button>
      <br />
      <br></br>
      <h2 className="">Bùsqueda por nombre</h2>
      <input type="text" onChange={handleChange}></input>
      <div style={{ minHeight: "100%" }} className="m-4">
        <br></br>
        {console.log(products)}
        <div className="row row-cols-1 row-cols-md-2 row-cols-md-3 row-cols-md-4 row-cols-md-5 g-4">
          {products
            .filter((product) => product.props.name.includes(search))
            .map((filteredProduct) => filteredProduct)}
        </div>
      </div>
    </div>
  );
}

function GestionProductos() {
  return (
    <div>
      <Plantilla
        sectionToDisplay={<div style={{ minHeight: "100%" }}>{Gestion()}</div>}
      ></Plantilla>
    </div>
  );
}

export default GestionProductos;
