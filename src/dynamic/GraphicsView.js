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

      options: {},
      ordersToDisplay: [],
      fechaini: "",
      fechafin: "",
      labels: [],
      map: [],
    };
  }

  mapOrdersByDate = (canceladas) => {
    let datamap = [];
    for (let i = 0; i < this.state.labels.length; i++) {
      let row = [];
      for (let j = 0; j < this.state.orders.length; j++) {
        if (
          new Date(this.state.orders[j].fecha).toLocaleDateString() ==
          this.state.labels[i]
        ) {
          if (canceladas) {
            if (this.state.orders[j].estado == "Cancelada") {
              row.push(this.state.orders[j]);
            }
          } else if (this.state.orders[j].estado == "Facturado") {
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
  takeOrdersUser = async () => {
    let url = "https://kfashion.cyclic.app/orders";
    let res = await fetch(url);

    if (res.ok) {
      let text = await res.json();

      this.state.labels = this.getLabels();
      let labels = this.state.labels;

      this.state.orders = text;

      let dataMap = this.mapOrdersByDate(false);
      let canceledDataMap = this.mapOrdersByDate(true);

      this.setState({
        data: {
          labels,
          datasets: [
            {
              label: "Cantidad de ventas por fecha",
              data: dataMap.map((a, i) => dataMap[i].length),
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },

            {
              label: "Cantidad de ventas canceladas por fecha",
              data: canceledDataMap.map((a, i) => canceledDataMap[i].length),
              backgroundColor: "rgba(207, 0, 15, 0.5)",
            },
          ],
        },
        options: {
          responsive: true,
          onClick: (event, element) => {
            if (element[0].datasetIndex == 0) {
              this.setOrdersToDisplay(dataMap[element[0].index]);
            } else {
              this.setOrdersToDisplay(canceledDataMap[element[0].index]);
            }
          },
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
    this.takeOrdersUser().then(() => {});

    this.forceUpdate();
  };
  displayDatesStart = (e) => {
    this.state.fechaini = e.target.value;
    this.takeOrdersUser().then(() => {});

    this.forceUpdate();
  };

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
        {this.state.orders.length != 0 ? (
          <div style={{ marginLeft: "10%", maxWidth: "80%" }}>
            <br></br>

            <div className="  form-group">
              <label
                style={{ display: "inline" }}
                className=""
                htmlFor="name"
              >
                Fecha de Inicio{" "}
              </label>
              <input
                style={{ maxWidth: "15%", display: "inline" }}
                type="date"
                className="form-control"
                id="name"
                onChange={this.displayDatesStart}
                class="form-control"
              />
              <li style={{ display: "inline", opacity: "0" }}>-----</li>
              <label
                style={{ display: "inline" }}
                className=""
                htmlFor="name"
              >
                Fecha Fin{" "}
              </label>
              <input
                style={{ maxWidth: "15%", display: "inline" }}
                type="date"
                className="form-control"
                id="name"
                onChange={this.displayDates}
                class="form-control"
              />
            </div>

            <Bar options={this.state.options} data={this.state.data} />
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
