import "../App.css";
import Plantilla from "../static/Plantilla";
import React from "react";
import { Bar } from "react-chartjs-2";
import { Orders } from "../authClient/Orders";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

class ReporteC extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      functionDisplay:this.takeOrdersUser,
      options: {},
      ordersToDisplay: [],
      fechaini: "",
      labelDisp:[],
      fechafin: "",
      labels: [],
      map: [],
      products:[]
    };
  }

  mapOrdersByDateAnd

  mapOrdersByDate = (canceladas) => {
    let datamap = [];
    for (let i = 0; i < this.state.labels.length; i++) {
      let row = [];
      for (let j = 0; j < this.state.orders.length; j++) {
        if (
          new Date(this.state.orders[j].fecha).toLocaleDateString() ===
          this.state.labels[i]
        ) {
          if (canceladas) {
            if (this.state.orders[j].estado === "Cancelada") {
              row.push(this.state.orders[j]);
            }
          } else if (this.state.orders[j].estado === "Facturado") {
            row.push(this.state.orders[j]);
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

  setOrdersToDisplay = (data) => {
    this.state.ordersToDisplay = data;
    this.state.map = [];
    this.setState({ ordersToDisplay: data });
  };

  getLabels = () => {
    return getDatesBetween(
      new Date(this.state.fechaini),
      new Date(this.state.fechafin),
      true
    );
  };
countProductsForOrder=()=>{
  
  let completeStatus = []
  
  this.state.products.forEach(product=>{
    let map = [];
    let totalTimesProd = 0
    this.state.labels.forEach( date=>{
      let row = [];
      this.state.orders.forEach(order=>{
        if(new Date(order.fecha).toLocaleDateString()==date){
          order.products.forEach(orderProduct=>{
                        
            if(orderProduct[0]==product._id){
              
              for(let i = 0 ;i < orderProduct[4]; i ++){
                row.push(product)
              }
              totalTimesProd+=orderProduct[4]
            }
          })
        }
      })    
      
      map.push(row)
    }) 
    
    completeStatus.push({product:product.description,mapper:map, totalProd:totalTimesProd});   
    
  })

  return completeStatus;
}
  cambiarProducts =async() =>{
    this.state.labels = this.getLabels();
    let labels = this.state.labels;
    
    let mapsStatus  = this.countProductsForOrder();
    
    let datasets = []
    console.log(mapsStatus)
    this.state.labelDisp=[]
    this.state.labelDisp.push(<br></br>)
    this.state.labelDisp.push(<h5>Información adicional:</h5>)
    this.state.labelDisp.push(<br></br>)
    this.state.labelDisp.push(
    <table className="table table-striped table-light">
      <thead >
        <tr>
          <th scope = "col" className="bg-dark text-white">
          Total de productos vendidos en el rango de fechas:
        </th>
        </tr>
        
        
      </thead>
      <tbody>
        {mapsStatus.map( set =>{
          return(
        <tr><td scope= "col">{set.product+": "+set.totalProd}</td></tr>
            )
        })}
      
      </tbody>
    </table>)
    
    mapsStatus.forEach( (set, i) =>{
      

      
      

      let rdn = Math.random()*i*10
      let rdn2 = Math.random() * i*i*100
      let rdn3 = Math.random() * i*1001
      let rdn4 = Math.random()
      

        datasets.push(
        {label:set.product,
          data:set.mapper.map(a=>a.length),
          backgroundColor: `rgba(${rdn2}, ${rdn3},${rdn},1)`
        })

    })
    this.setState({
      
      data: { 
        labels,
        datasets
      },
      options: {
        responsive: true,
        onClick: (event, element) => {
         
        },
        plugins: {
                  
         
          title: {
            display: true,
            text: "Gráfico de cantidad de productos vendidos por fecha"
          }
         
        },
      },
    });

  
  }
  takeOrdersUser = async () => {
    let ulrProducts = "https://kfashionapi.onrender.com/getProductsNoImage"
    let resProducts = await fetch(ulrProducts);
    if (resProducts.ok) {
      let text = await resProducts.json();
      this.state.products = text;
      
    }
    this.state.labelDisp=[]
    let url = "https://kfashionapi.onrender.com/simpleOrders";
    let res = await fetch(url);

    if (res.ok) {
      let text = await res.json();

      this.state.labels = this.getLabels();
      let labels = this.state.labels;

      this.state.orders = text;


      let dataMap = this.mapOrdersByDate(false);
      console.log(dataMap)
      let canceledDataMap = this.mapOrdersByDate(true);

      this.setState({
        data: { 
          labels,
          datasets: [
            {
              label: "Cantidad de órdenes por fecha",
              data: dataMap.map((a, i) => dataMap[i].length),
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },

            {
              label: "Canceladas",
              data: canceledDataMap.map((a, i) => canceledDataMap[i].length),
              backgroundColor: "rgba(207, 0, 15, 0.5)",
            },
          ],
        },
        options: {
          responsive: true,
          
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Gráfico de órdenes",
            },
          },
        },
      });

      //buscar si hay una contraseña y el correo igual;
    } else {
      return `HTTP error: ${res.status}`;
    }
  };

  displayDates = (e) => {
    this.state.fechafin = e.target.value;
    this.forceUpdate();
    this.state.functionDisplay().then(() => {});
    

    
  };
  displayDatesStart = (e) => {
    this.state.fechaini = e.target.value;
    this.forceUpdate();
    this.state.functionDisplay().then(() => {});


    
  };

  
    
    setReport=(value)=>{
      console.log(value)
      if(value=="PV"){

        this.cambiarProducts().then(()=>{});
        this.state.functionDisplay = this.cambiarProducts
        
      }
      if(value=="OR"){

        this.takeOrdersUser().then(()=>{});
        this.state.functionDisplay = this.takeOrdersUser
        
      }
      
    }
    render() {
      this.state.map.push(
        <Orders
          oneUser={false}
          cancel={false}
          dataToDisplay={this.state.ordersToDisplay}
        />
      );
    return (
      <div style={{ minHeight: "85%" }} className=" ">
        {this.state.orders.length !== 0 ? (
          <div style={{ marginLeft: "10%", maxWidth: "80%" }}>
            <br></br>
            <h2>Visualizar Reportes</h2>
              <select name="select" 
              onChange={(e) => this.setReport(e.target.value)}

              className="form-select" style={{ maxWidth: "20%" }}>
              
              <option value="OR">Órdenes realizadas</option>
              <option value="PV">Productos vendidos</option>
              
            </select>

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

            <Bar options={this.state.options} data={this.state.data} />

            {this.state.labelDisp}
          </div>
        ) : (
          <></>
        )}

        <div style={{ left: "10%" }}>
          {console.log(this.state.ordersToDisplay)}
          {this.state.ordersToDisplay.length > 0 ? this.state.map[0] : <></>}
        </div>
      </div>
    );
  }
}

function Reporte() {
  return <Plantilla sectionToDisplay={<ReporteC />}></Plantilla>;
}

export default Reporte;
