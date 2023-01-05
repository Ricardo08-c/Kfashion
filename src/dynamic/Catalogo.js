import { useEffect, useState } from "react";
import "../App.css";
import Plantilla from "../static/Plantilla";
import React from "react";
import { BannerBuild } from "./bannerPromociones";
// Array donde se almacenaran los productos
let array = [];

class CatalogComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      imgSrc: "",
      name: "",
      description: "",
      price: 0,
      category: "",
      catalogstate: "",
      descuento: 0,
    };
  }
  addToCart = (e) => {
    
    let obj = {
      id: this.props.id,
      imgSrc: this.props.imgSrc,
      name: this.props.name,
      description: this.props.description,
      price: this.props.price,
      category: this.props.category,
      timeout: "",
      descuento: this.props.descuento,
    };

    let products = JSON.parse(localStorage.getItem("Products")) || [];
    let found = false;
    let foundIndex = 0;

    for (let i = 0; i < products.length; i++) {
      console.log("ad");
      console.log(products[i].id);
      console.log(obj.id);
      console.log("ad");
      if (products[i].id === obj.id) {
        found = true;
        foundIndex = i;
        break;
      }
    }
    console.log("FOUND" + found);
    if (!found) {
      products.push({
        cantidad: 1,
        id: obj.id,
        
        name: obj.name,
        description: obj.description,
        price: obj.price,
        category: obj.category,
        descuento: obj.descuento,
      });
    } else {
      products[foundIndex].cantidad = products[foundIndex].cantidad + 1;
    }

    if (document.getElementById("pop").data) {
      clearTimeout(this.state.timeout);
      document.getElementById("pop").classList.toggle("show");
      document.getElementById("pop").data = false;
      console.log("Logger");
    } else {
      document.getElementById("pop").data = true;
      console.log("false");
    }
    document.getElementById("pop").classList.toggle("show");

    this.state.timeout = setTimeout(() => {
      document.getElementById("pop").classList.toggle("show");
      document.getElementById("pop").data = false;
    }, "1000");

    localStorage.setItem("Products", JSON.stringify(products));
    let productsa = JSON.parse(localStorage.getItem("Products")) || [];
    this.setState({ catalogstate: productsa });
    console.log("STATE", this.state.catalogstate);
    this.props.setCartState(this.state.catalogstate);
  };
  render() {
    return (
      <div className="col">
        <div className="card">
          <img
            src={this.props.imgSrc}
            className="card-img-top"
            alt="..."
            width="75"
            height="150"
          />
          <div className="card-body">
            <h5 className="card-title">{this.props.name}</h5>
            <p className="card-text">{this.props.description}</p>
            {this.props.descuento ? (
              <div>
                <h5>
                  <del>{"₡" + this.props.price}</del>
                </h5>
                <h5>
                  {"₡" +
                    (this.props.price -
                      this.props.price * (this.props.descuento / 100))}
                </h5>
                <h5>{this.props.descuento + "% OFF"}</h5>
              </div>
            ) : (
              <h5>{"₡" + this.props.price}</h5>
            )}

            <button onClick={this.addToCart} className="btn btn-secondary">
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function CatalogBuild() {
  const [selects, setSelects] = useState();
  const [selects2, setSelects2] = useState();
  const [search, setSearch] = useState();
  const [products, setProducts] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getProducts();
    getCategorias();
  }, []);

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
      let datos = array1[i];
      console.log("descuento" + datos);
      array2.push(
        <CatalogComponent
          setCartState={setCart}
          id={datos._id}
          imgSrc={datos.imgSrc}
          name={datos.nombre}
          price={datos.price}
          description={datos.description}
          category={datos.categoria}
          descuento={datos.descuento}
        />
      );
    }
    setProducts(array2);
  }

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
  }

  //if(products.length==0)return <div style = {{minHeight: "100%"}}><h2  className="text-white centrado">Cargando...</h2></div>
  return (
    <div>
      <div style={{ minHeight: "100%" }} className="m-4">
        {/*<h5 className="text-white">Se seleccionó: {selects}</h5>*/}
        <form>
          <div className="row">
            <div className="col">
              <tag>Buscar:</tag>
              <input
                type="text"
                className="form-control"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              ></input>
            </div>
            <div className="col">
              <tag>Categoría:</tag>
              <select
                value={selects}
                onChange={(e) => setSelects(e.target.value)}
                className="form-control"
                aria-label="Default select example"
              >
                <option defaultValue={selects}>Todo el cátalogo</option>
                {categorias}
              </select>
            </div>
            <div className="col">
              <tag>Filtro:</tag>
              <select
                value={selects2}
                onChange={(e) => setSelects2(e.target.value)}
                className="form-control"
                aria-label="Default select example"
              >
                <option defaultValue={selects2}>Todo el cátalogo</option>

                <option>A-Z</option>
                <option>Bajo a Alto</option>
                <option>Alto a Bajo</option>
              </select>
            </div>
          </div>
        </form>
        <br></br>

        <div className="row row-cols-1 row-cols-md-2 row-cols-md-3 row-cols-md-4 row-cols-md-5 g-4">
          {console.log(products)}
          {console.log(selects)}
          {products
            .filter(
              (product) =>
                product.props.category === selects ||
                selects === "Todo el cátalogo" ||
                selects === undefined
            )
            .filter(
              (product) =>
                search === undefined ||
                search === "" ||
                product.props.name.includes(search)
            )
            .map((filteredProduct) => filteredProduct)}
        </div>
      </div>
    </div>
  );
}
function Catalogo() {
  return (
    <div>
      <Plantilla
        sectionToDisplay={
          <div style={{ minHeight: "100%" }}>
            <div className="popup cop">
              <span className="popuptext" data={false} id="pop">
                Añadido al carrito
              </span>
            </div>

            {BannerBuild()}
            {CatalogBuild()}
          </div>
        }
      ></Plantilla>
    </div>
  );
}

export default Catalogo;
