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

const getDatesBetween = (startDate, endDate, includeEndDate) => {
  const dates = [];
  const currentDate = startDate;

  currentDate.setDate(currentDate.getDate() + 1);

  while (currentDate < endDate) {
    dates.push(new Date(currentDate).toLocaleDateString());
    currentDate.setDate(currentDate.getDate() + 1);
  }
  if (includeEndDate) dates.push(endDate.toLocaleDateString());
  endDate.setDate(endDate.getDate() + 1);
  dates.push(new Date(endDate).toLocaleDateString());
  return dates;
};
var searchArray = function(arr, regex) {
  var matches=[], i;
  
  for (i=0; i<arr.length; i++) {
    let nom  = arr[i].objUser[0].nombre + arr[i].objUser[0].apellido    
    if (nom.match(regex)) matches.push(arr[i]);
  }
  return matches;
};
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
      fechaini:"",
      fechafin:"",
      selects: "Todas",
      labels: [],
      oldOrders:[],
      statusOk:false
    };
  }

  mapOrdersByDate = (canceladas) => {
    let datamap = [];
    console.log(this.state.fechafin, this.state.fechaini,this.state.oldOrders)

    for (let i = 0; i < this.state.labels.length; i++) {
      let row = [];
      for (let j = 0; j < this.state.oldOrders.length; j++) {
        if (
          new Date(this.state.oldOrders[j].fecha).toLocaleDateString() ===
          this.state.labels[i]
        ) {
          if (canceladas) {
            if (this.state.oldOrders[j].estado === "Cancelada") {
              row.push(this.state.orders[j]);
            }
          } else  {
            row.push(this.state.oldOrders[j]);
          }
        }
      }
      datamap.push(row);
    }

    return datamap;
  };

  componentDidMount = () => {
    this.takeOrdersUser().then(() => {});
    

  };
  getLabels = () => {
    return getDatesBetween(
      new Date(this.state.fechaini),
      new Date(this.state.fechafin),
      true
    );
  };
  getDataOrders = () => {
    return this.state.orders;
  };
  displayDates = (e) => {
    this.state.fechafin = e.target.value;
    this.state.labels = this.getLabels();
    
      let ord  = this.mapOrdersByDate(false);
      console.log(ord)
      let newOrders =[]
      for (let i = 0 ; i < ord.length; i++){
        for (let j = 0 ; j < ord[i].length; j++){
          newOrders.push(ord[i][j])
        }

      }
      console.log(newOrders)
      if(this.state.fechaini!= "" && this.state.fechafin!= "" && this.state.orders!= newOrders){
        this.state.orders = newOrders      
        this.forceUpdate()
      }
      

    this.forceUpdate();
  };
  displayDatesStart = (e) => {
    this.state.fechaini = e.target.value;    
    this.state.labels = this.getLabels();
    
    let ord  = this.mapOrdersByDate(false);
    console.log(ord)
    let newOrders =[]
    for (let i = 0 ; i < ord.length; i++){
      for (let j = 0 ; j < ord[i].length; j++){
        newOrders.push(ord[i][j])
      }

    }
    console.log(newOrders)
    if(this.state.fechaini!= "" && this.state.fechafin!= "" && this.state.orders!= newOrders){
      this.state.orders = newOrders
    }
    this.forceUpdate();
  };

  componentDidUpdate() {
    if (
      this.props.dataToDisplay &&
      this.props.dataToDisplay !== this.state.orders
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
          id = {this.state.orders[i]._id}
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
    let url = "https://kfashionapi.onrender.com/orders";
    let res = await fetch(url);
    let userId = JSON.parse(
      localStorage.getItem(localStorage.getItem("ipAdress"))
    );
    if (res.ok) {
      let text = await res.json();

      //let userQuery = [];
      let filteredOrder = [];
      
      
      if (this.props.oneUser) {
        filteredOrder = text.filter((orders) => {
      
          return orders.user === userId._id;
        });
        
        this.setState({ orders: filteredOrder,oldOrders:filteredOrder });
      } else {       
        this.setState({ orders: text, oldOrders:text });
      }

      //buscar si hay una contraseña y el correo igual;
      this.state.statusOk = true;
    } else {
      return `HTTP error: ${res.status}`;
    }
  };
  filterByName = (e)=>{
    let val = e.target.value;
    let arr = searchArray(this.state.oldOrders,val);
    this.setState({orders:arr})

  }


  
  render() {
    let order1 = this.orders();
    
    let msgLoad = "Cargando...";
    
    if(this.state.statusOk){
      if(this.state.orders.length==0 && this.props.dataToDisplay.length<0){
        msgLoad = "No tienes órdenes realizadas"
      }
    }
    
    return (
      <div style={{ minHeight: "86%" }} className=" text-dark position-relative">
        <br></br>
        <h3 className="">Ordenes:</h3>
        <br></br>
        <h5 style={{ display: "inline", left: "10%" }} className="">
          Filtrar{" "}
        </h5>
        <div className="  form-group">
              <label style={{ display: "inline" }} className="" htmlFor="name">
                Fecha de Inicio{" "}
              </label>
              <input
                style={{ maxWidth: "15%", display: "inline" }}
                type="date"
                className="form-control"
                id="name"
                onChange={this.displayDatesStart}
              />
              <li style={{ display: "inline", opacity: "0" }}>-----</li>
              <label style={{ display: "inline" }} className="" htmlFor="name">
                Fecha Fin{" "}
              </label>
              <input
                style={{ maxWidth: "15%", display: "inline" }}
                type="date"
                className="form-control"
                id="name"
                
                onChange={this.displayDates}
              />
            </div>
            <br></br>
            {!this.props.oneUser ?
                 <input
                 style={{ maxWidth: "15%", display: "inline" }}
                 type="text"
                 className="form-control"
                 id="name"
                 placeholder="Filtrar por nombre de usuario"
                 onChange={this.filterByName}
               />
            :<></>}
        <br></br>
        <br></br>
        <br></br>
        {this.state.orders.length > 0 ? (
          <div>
            {order1            
              
              .map((filteredOrder) => (
                
                <div>
                  
                  <div>
                    <h5 className="">
                      {"Orden #" + filteredOrder.props.index}
                    </h5>
                    
                    <h5 className="">
                      {"Estado: " + filteredOrder.props.estado}
                    </h5>
                    {!this.props.oneUser ? (
                      <div>
                        <h5 className="">
                          {"Usuario que realiza la orden: " +
                            filteredOrder.props.objUser.nombre +
                            " " +
                            filteredOrder.props.objUser.apellido}
                        </h5>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <h5 className="">
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
        ) : 
        
          <h2 className="">{msgLoad}</h2>
        }
      </div>
    );
  }
}

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date,
      id : this.props.id,
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
      id: this.props.id,
      estado: "Cancelada",
      motivo: this.state.motivo,
    });
    
    

    await fetch("https://kfashionapi.onrender.com/update/order", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
    }).catch((error) => {
      window.alert(error);
      return;
    });
    alert("Cancelado");
    window.location.reload();
  };

  cancelarOrden = () => {
    this.cancelOnMoticaSide().then(()=>{})
  };

  render() {
    return (
      <div style={{ marginLeft: "15%", maxWidth: "70%" }}>
        <table className="table table-bordered border-dark">
          <thead className="thead-dark">
            <tr>
              <th className="" scope="col">
                Producto
              </th>
              <th className="" scope="col">
                Nombre
              </th>
              <th className="" scope="col">
                Descripcion
              </th>
              <th className="" scope="col">
                Precio unitario
              </th>
              <th className="" scope="col">
                Cantidad
              </th>
              <th className="" scope="col">
                Descuento
              </th>
              <th className="" scope="col">
                Total de precios unitarios
              </th>
            </tr>
          </thead>

          <tbody>
            {this.productsToCart().map((data) => data)}

            <tr className="border border-dark">
              {this.props.cancel && this.props.estado !== "Cancelada" ? (
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
              {this.props.cancel && this.props.estado !== "Cancelada" ? (
                <td>
                  <input
                    onChange={(e) => {
                      this.setState({ motivo: e.target.value });
                    }}
                    className="input"
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

              <td className="">{"TOTAL:  $" + this.state.totalSum}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export { Ordersreturn, Orders };
