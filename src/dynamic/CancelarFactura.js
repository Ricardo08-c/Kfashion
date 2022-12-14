import "../App.css";
import Plantilla from "../static/Plantilla";
import React from "react";
import { Orders } from "../authClient/Orders";

class CancelarFacturacion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let a = (
      <Orders oneUser={false} dataToDisplay={false} cancel={true}></Orders>
    );
    console.log(a.props);
    return (
      <div style={{ minHeight: "85%" }} className="text-white ">
        <div style={{ left: "10%" }}></div>
        {a}
      </div>
    );
  }
}

function CancelarFactura() {
  return <Plantilla sectionToDisplay={<CancelarFacturacion />}></Plantilla>;
}

export default CancelarFactura;
