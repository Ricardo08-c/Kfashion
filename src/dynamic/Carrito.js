import React from "react";
import "../App.css";

import Plantilla from "../static/Plantilla";

let array = [];

class CatalogComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      imgSrc: this.props.imgSrc,
      name: this.props.name,
      description: "",
      price: this.props.price,
      category: "",
      cantidad: this.props.cantidad,
      sumTotal: this.props.sumTotal,
      functionAlter: this.props.functionAlter,
      editable: this.props.editable,
      descuento: this.props.descuento,
    };
  }

  removeOneItem = (e) => {
    let products = JSON.parse(localStorage.getItem("Products")) || [];

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === this.props.id) {
        if (products[i].cantidad - 1 === 0) {
          products[i].cantidad = products[i].cantidad - 1;
          products.splice(i, 1);

          localStorage.setItem("Products", JSON.stringify(products));

          this.state.functionAlter();
          return;
        }

        products[i].cantidad = products[i].cantidad - 1;
        break;
      }
    }

    // this.state.cantidad=this.state.cantidad-1;

    localStorage.setItem("Products", JSON.stringify(products));

    this.state.functionAlter();
  };

  totalPrecioCalc = () => {
    let products = JSON.parse(localStorage.getItem("Products")) || [];
    let suma = 0;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === this.state.id) {
        for (let j = 0; j < products[i].cantidad; j++) {
          console.log("descuento->" + products[i].descuento);
          if (products[i].descuento > 0) {
            let descuento = products[i].price * (products[i].descuento / 100);
            suma = suma + descuento;
          } else {
            suma = suma + products[i].price;
          }
        }
      }
    }
    this.setState({ totalPrecioProducto: suma });
  };
  addOneItem = (e) => {
    let products = JSON.parse(localStorage.getItem("Products")) || [];

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === this.props.id) {
        products[i].cantidad = products[i].cantidad + 1;

        break;
      }
    }
    //this.state.cantidad = this.state.cantidad+1

    localStorage.setItem("Products", JSON.stringify(products));

    this.state.functionAlter();
  };

  render() {
    return (
      <tr class="bg-white">
        <td scope="col">
          <img src={this.props.imgSrc} alt="..." width="100" height="100" />
        </td>
        <td>{this.props.name}</td>
        <td>{this.props.description}</td>
        <td>{"$" + this.props.price}</td>
        {this.props.editable ? (
          <td
            style={{ width: "14%", minWidth: "15%", maxWidth: "15%" }}
            class="col"
          >
            <button
              style={{ display: "inline" }}
              onClick={this.removeOneItem}
              className="btn btn-secondary"
            >
              -
            </button>
            <li style={{ display: "inline" }} class="text-white">
              --
            </li>

            {this.props.cantidad}

            <li style={{ display: "inline" }} class="text-white">
              --
            </li>
            <button
              style={{ display: "inline" }}
              onClick={this.addOneItem}
              className="btn btn-secondary"
            >
              +
            </button>
          </td>
        ) : (
          <td>{this.props.cantidad}</td>
        )}

        <td>{this.props.descuento + "%"}</td>
        <td>{"$" + this.props.sumTotal}</td>
      </tr>
    );
  }
}

function RegistrarVenta(newOrder) {
  
  var soap = require("soap-everywhere");
  var url = "https://mora.tk/service/xml/facturar.php?wsdl";

  //var item1 = [codigo-int, descripcion-string, cantidad-int, unitario-float, categoria-int]
  //'var item2 = [codigo-int, descripcion-string, cantidad-int, unitario-float, categoria-int]
  //var listaItems = [item1, item2]
  //var factura = [numFactura-int, fecha-date, hora-time, subtotal-float, total-float, listaItems]

  var args = {
    empresa: "Motica",
    tienda: "Limon",
    llave: "a29ba73fcae98e4f17a41d73db607395",
    factura: newOrder.numFactura,
  };

  soap.createClient(url, function (err, client) {
    console.log(client, "CLIENT  ");
    client.RegistrarVenta(args, function (err, result) {
      console.log(result);
    });
  });
}

async function addToCart(subtotal) {
  let user = localStorage.getItem(localStorage.getItem("ipAdress")) || false;
  let userobj = JSON.parse(user);
  let products = JSON.parse(localStorage.getItem("Products")) || [];
  let arrayProds = [];
  let listaItems = [];
  for (let i = 0; i < products.length; i++) {
    arrayProds.push([products[i].id, products[i].cantidad]);
    console.log(products[i].descuento);
    let categoria = 0;
    if (products[i].descuento === 0) {
      categoria = 3;
    }

    if (products[i].descuento > 0 && products[i].descuento <= 5) {
      categoria = 2;
    }

    if (products[i].descuento > 5 && products[i].descuento <= 20) {
      categoria = 1;
    }

    if (products[i].descuento > 20) {
      categoria = 0;
    }

    listaItems.push([
      Object(products[i].id),
      products[i].name,
      products[i].cantidad,
      products[i].price,
      categoria,
    ]);
  }

  let url = "https://kfashion.cyclic.app/numFactura";
  let res = await fetch(url);
  if (res.ok) {
    let text = await res.json();
    array = [];
    array.push(text);
  } else {
    console.log(`HTTP error: ${res.status}`);
  }
  let array1 = array[0];
  let numFactura = array1[0].numFactura;

  // Order nuevo
  numFactura = numFactura + 1;
  console.log("asddas");
  console.log(numFactura);
  let total = subtotal + subtotal * (13 / 100); //SE LE APLICA EL IVA
  let newOrder2 = {
    user: userobj._id,
    numFactura,
    subtotal,
    total,
    listaItems,
  };

  // Registrar factura electronica

  RegistrarVenta(newOrder2);
  console.log(listaItems);

  console.log("order:", newOrder2);

  await fetch("https://kfashion.cyclic.app/register/order2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newOrder2),
  }).catch((error) => {
    window.alert(error);
    return;
  });
}

class Carrito extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productsA: [],
      totalSum: 0,
      cartConfirmed: false,
      editable: this.props.editable,
    };
    this.change();
  }

  productsToCart = () => {
    let k = [];

    //let products  =JSON.parse(localStorage.getItem('Products')) || [];
    let sum = 0;
    for (let i = 0; i < this.state.productsA.length; i++) {
      sum = 0;
      for (let j = 0; j < this.state.productsA[i].cantidad; j++) {
        if (this.state.productsA[i].descuento > 0) {
          let descuento =
            this.state.productsA[i].price *
            (this.state.productsA[i].descuento / 100);
          sum = sum + this.state.productsA[i].price - descuento;
        } else {
          sum = sum + this.state.productsA[i].price;
        }
      }
      let datos = this.state.productsA[i];

      k.push(
        <CatalogComponent
          editable={!this.state.cartConfirmed}
          sumTotal={sum}
          functionAlter={this.change}
          cantidad={datos.cantidad}
          id={datos.id}
          imgSrc={datos.imgSrc}
          name={datos.name}
          price={datos.price}
          description={datos.description}
          category={datos.category}
          descuento={datos.descuento}
        />
      );
    }

    return k;
  };

  change = () => {
    let products = JSON.parse(localStorage.getItem("Products")) || [];
    this.setState({ productsA: products });

    let sum = 0;

    for (let i = 0; i < products.length; i++) {
      let datos = products[i];

      for (let j = 0; j < datos.cantidad; j++) {
        if (products[i].descuento > 0) {
          let descuento = products[i].price * (products[i].descuento / 100);
          sum = sum + products[i].price - descuento;
        } else {
          sum = sum + products[i].price;
        }
      }
    }
    if (sum != this.state.totalSum) {
      this.state.totalSum = sum;
    }
  };
  componentDidMount() {
    let products = JSON.parse(localStorage.getItem("Products")) || [];

    if (JSON.stringify(products) !== JSON.stringify(this.state.productsA)) {
      this.setState({ productsA: products });
    }
  }
  authorizeCart = () => {
    let user = localStorage.getItem(localStorage.getItem("ipAdress")) || false;
    if (!user) {
      alert(
        "Lo sentimos :(\nPorfavor inicie sesión para continuar con la compra"
      );
      return;
    }
    this.setState({ cartConfirmed: !this.state.cartConfirmed });
  };

  confirmOrder = () => {
    addToCart(this.state.totalSum).then(
      alert(
        "Tu orden se ha registrado correctamente",
        this.setState({ cartConfirmed: !this.state.cartConfirmed }),
        localStorage.removeItem("Products")
      )
    );
    window.location.reload();
  };

  render() {
    let editable = this.state.editable || true;
    return (
      <Plantilla
        sectionToDisplay={
          <div style={{ minHeight: "86%" }}>
            {this.state.totalSum != 0 ? (
              <div style={{ minHeight: "86%" }} className="position-relative">
                <br></br>
                <h2 >Resumen del carrito de compras:</h2>
                <br></br>

                <div style={{ marginLeft: "15%", maxWidth: "70%" }}>
                  <table class="table table-bordered">
                    <thead class="thead-dark">
                      <tr>
                        <th  scope="col">
                          Producto
                        </th>
                        <th  scope="col">
                          Nombre
                        </th>
                        <th  scope="col">
                          Descripcion
                        </th>
                        <th  scope="col">
                          Precio unitario
                        </th>
                        <th  scope="col">
                          Cantidad
                        </th>
                        <th c scope="col">
                          Descuento
                        </th>
                        <th scope="col">
                          Total de precios unitarios
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {this.productsToCart().map((data) => data)}

                      <tr class="">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td >
                          {"TOTAL:  $" + this.state.totalSum}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {editable ? (
                  <div>
                    {this.state.cartConfirmed ? (
                      <div>
                        <button
                          style={{ display: "inline" }}
                          onClick={this.authorizeCart}
                          className=" text-dark btn btn-secondary"
                        >
                          Continuar editando +
                        </button>
                        <li class="text-dark" style={{ opacity:0,display: "inline" }}>
                          {" "}
                          --
                        </li>
                        <button
                          style={{ display: "inline" }}
                          onClick={this.confirmOrder}
                          className=" text-dark btn btn-secondary"
                        >
                          Confirmar orden de compra definitiva
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          onClick={this.authorizeCart}
                          className=" text-dark btn btn-secondary"
                        >
                          Confirmar productos
                        </button>
                      </div>
                    )}

                    <br></br>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <div style={{ minHeight: "100%" }} className="position-relative">
                <br></br>
                <h2 >
                  Ups.. parece que no tienes productos añadidos en el carrito
                </h2>
                <br></br>
                <a className=" btn bg-secondary text-white" href="/Catalogo">
                  {" "}
                  Ir al catálogo
                </a>
              </div>
            )}
          </div>
        }
      >
        {" "}
      </Plantilla>
    );
  }
}

export { CatalogComponent, Carrito };
