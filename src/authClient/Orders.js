import React from "react";
import "../App.css";

import Plantilla from "../static/Plantilla";

import { CatalogComponent } from "../dynamic/Carrito";
function dateDif(a, b) {
  const date1 = a;
  const date2 = b;

  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function Ordersreturn() {
  return (
    <Plantilla
      sectionToDisplay={<Orders dataToDisplay={false} oneUser={true}></Orders>}
    ></Plantilla>
  );
}

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oneUser: this.props.oneUser,
      orders: [],
      selects: "Todas",
    };
  }

  getDataOrders = () => {
    return this.state.orders;
  };
  componentDidUpdate() {
    if (
      this.props.dataToDisplay &&
      this.props.dataToDisplay != this.state.orders
    ) {
      this.state.orders = this.props.dataToDisplay;

      this.forceUpdate();
      console.log(this.orders());
    }
  }
  componentDidMount() {
    if (!this.props.dataToDisplay) {
      this.takeOrdersUser().then((data) => {});
    } else {
      console.log(this.props.dataToDisplay);
      this.setState({ orders: this.props.dataToDisplay });
    }
  }
  setSelects = (e) => {
    this.setState({ selects: e.target.value });
  };
  orders = () => {
    let k = [];

    //let products  =JSON.parse(localStorage.getItem('Products')) || [];

    for (let i = 0; i < this.state.orders.length; i++) {
      let prods = [];
      for (let j = 0; j < this.state.orders[i].ObjectProds.length; j++) {
        let cantidad = this.state.orders[i].cant[j];
        let obj = this.state.orders[i].ObjectProds[j];

        obj.cantidad = cantidad;
        prods.push(obj);
      }
      let ts = this.state.orders[i].fecha || this.state.orders[i].fecha;
      let date = new Date(ts);

      k.push(
        <Order
          estado={this.state.orders[i].estado}
          cancel={this.props.cancel}
          objUser={this.state.orders[i].objUser[0]}
          numFactura={this.state.orders[i].numFactura}
          index={i + 1}
          productsA={prods}
          fecha={date.toLocaleDateString()}
          date={date}
          hora={date.toLocaleTimeString()}
          dia={date.getDate()}
          mes={date.getMonth()}
        />
      );
    }

    return k;
  };

  takeOrdersUser = async () => {
    let url = "https://kfashion.cyclic.app/orders";
    let res = await fetch(url);
    let userId = JSON.parse(
      localStorage.getItem(localStorage.getItem("ipAdress"))
    );
    if (res.ok) {
      let text = await res.json();

      let userQuery = [];
      let filteredOrder = [];
      if (this.props.oneUser) {
        filteredOrder = text.filter((orders) => {
          return orders.user === userId._id;
        });
        this.setState({ orders: filteredOrder });
      } else {
        this.setState({ orders: text });
      }

      //buscar si hay una contraseña y el correo igual;
    } else {
      return `HTTP error: ${res.status}`;
    }
  };
  render() {
    let order1 = this.orders();
    return (
      <div style={{ minHeight: "86%" }} className=" position-relative">
        <br></br>
        <h3 class="">Ordenes:</h3>
        <br></br>
        <h5 style={{ display: "inline", left: "10%" }} class="">
          Filtrar{" "}
        </h5>
        <select
          style={{ display: "inline", maxWidth: "15%" }}
          value={this.state.selects}
          onChange={this.setSelects}
          className="form-select"
        >
          <option defaultValue={this.state.selects}>Todas</option>

          <option>Últimos 2 días</option>
          <option>Últimos 5 días</option>
          <option>Últimos 30 días</option>
        </select>
        <br></br>
        <br></br>
        <br></br>
        {this.state.orders.length > 0 ? (
          <div>
            {order1
              .filter(
                (order) =>
                  (dateDif(order.props.date, new Date()) <= 2 &&
                    this.state.selects == "Últimos 2 días") ||
                  (dateDif(order.props.date, new Date()) <= 5 &&
                    this.state.selects == "Últimos 5 días") ||
                  (dateDif(order.props.date, new Date()) <= 30 &&
                    this.state.selects == "Últimos 30 días") ||
                  this.state.selects === "Todas"
              )
              .map((filteredOrder) => (
                <div>
                  <div>
                    <h5 class="">
                      {"Orden #" + filteredOrder.props.index}
                    </h5>
                    <h5 class="">
                      {"Numero de factura: " + filteredOrder.props.numFactura}
                    </h5>
                    <h5 class="">
                      {"Estado: " + filteredOrder.props.estado}
                    </h5>
                    {!this.props.oneUser ? (
                      <div>
                        <h5 class="">
                          {"Usuario que realiza la orden: " +
                            filteredOrder.props.objUser.nombre +
                            " " +
                            filteredOrder.props.objUser.apellido}
                        </h5>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <h5 class="">
                      {"Fecha en que se realizó la orden:  " +
                        filteredOrder.props.fecha +
                        ",   a las " +
                        filteredOrder.props.hora}
                    </h5>

                    {filteredOrder}
                  </div>
                  <br></br>
                  <br></br>
                </div>
              ))}
          </div>
        ) : (
          <h2 class="">Cargando...</h2>
        )}
      </div>
    );
  }
}

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date,
      productsA: this.props.productsA,
      totalSum: 0,
      dia: this.props.dia,
      numFactura: this.props.numFactura,
      mes: this.props.mes,
      motivo: "",
    };
  }

  productsToCart = () => {
    let k = [];

    //let products  =JSON.parse(localStorage.getItem('Products')) || [];

    let sum = 0;
    this.state.totalSum = 0;
    for (let i = 0; i < this.props.productsA.length; i++) {
      sum = 0;
      for (let j = 0; j < this.props.productsA[i].cantidad; j++) {
        if (this.props.productsA[i].descuento > 0) {
          let descuento =
            this.props.productsA[i].price *
            (this.props.productsA[i].descuento / 100);
          sum = sum + this.props.productsA[i].price - descuento;
        } else {
          sum = sum + this.props.productsA[i].price;
        }
      }
      let datos = this.props.productsA[i];

      let precio = datos.precio || datos.price;

      k.push(
        <CatalogComponent
          editable={false}
          sumTotal={sum}
          cantidad={datos.cantidad}
          id={datos.id}
          imgSrc={datos.imgSrc}
          name={datos.nombre}
          price={precio}
          description={datos.description}
          category={datos.category}
          descuento={datos.descuento}
        />
      );
      this.state.totalSum += sum;
    }

    return k;
  };

  cancelOnMoticaSide = async () => {
    let json = JSON.stringify({
      numFactura: this.state.numFactura,
      estado: "Cancelada",
      motivo: this.state.motivo,
    });

    await fetch("https://kfashion.cyclic.app/update/order", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
    }).catch((error) => {
      window.alert(error);
      return;
    });
    alert("OrderUpdated");
    window.location.reload();
  };

  cancelarOrden = () => {
    var soap = require("soap-everywhere");
    var url = "https://mora.tk/service/xml/facturar.php?wsdl";

    //var item1 = [codigo-int, descripcion-string, cantidad-int, unitario-float, categoria-int]
    //'var item2 = [codigo-int, descripcion-string, cantidad-int, unitario-float, categoria-int]
    //var listaItems = [item1, item2]
    //var factura = [numFactura-int, fecha-date, hora-time, subtotal-float, total-float, listaItems]
    this.cancelOnMoticaSide();
    return;
    var args = {
      empresa: "Motica",
      tienda: "Limon",
      llave: "a29ba73fcae98e4f17a41d73db607395",
      factura: this.state.numFactura,
      motivo: this.state.motivo,
    };

    soap.createClient(url, function (err, client) {
      client.CancelarVenta(args, function (err, result) {
        console.log(result);
      });
    });
  };

  render() {
    return (
      <div style={{ marginLeft: "15%", maxWidth: "70%" }}>
        <table class="table table-bordered border-dark">
          <thead class="thead-dark">
            <tr>
              <th class="" scope="col">
                Producto
              </th>
              <th class="" scope="col">
                Nombre
              </th>
              <th class="" scope="col">
                Descripcion
              </th>
              <th class="" scope="col">
                Precio unitario
              </th>
              <th class="" scope="col">
                Cantidad
              </th>
              <th class="" scope="col">
                Descuento
              </th>
              <th class="" scope="col">
                Total de precios unitarios
              </th>
            </tr>
          </thead>

          <tbody>
            {this.productsToCart().map((data) => data)}

            <tr class="border border-dark">
              {this.props.cancel && this.props.estado != "Cancelada" ? (
                <td>
                  <button
                    onClick={this.cancelarOrden}
                    className="btn btn-secondary"
                  >
                    Cancelar Orden
                  </button>
                </td>
              ) : (
                <td></td>
              )}
              {this.props.cancel && this.props.estado != "Cancelada" ? (
                <td>
                  <input
                    onChange={(e) => {
                      this.setState({ motivo: e.target.value });
                    }}
                    class="input"
                    type={"text"}
                    placeholder="Motivo"
                  ></input>
                </td>
              ) : (
                <td></td>
              )}

              <td></td>
              <td></td>
              <td></td>
              <td></td>

              <td class="">{"TOTAL:  $" + this.state.totalSum}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export { Ordersreturn, Orders };
