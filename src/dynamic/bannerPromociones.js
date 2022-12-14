import { useEffect, useState } from "react";
import "../App.css";
import Plantilla from "../static/Plantilla";
import React from "react";

let array = [];

class BannerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      descripcion: "",
      fechaInicio: "",
      fechaFinal: "",
      producto: "",
      porcentaje: 0,
    };
  }
  render() {
    return (
      <div className="bannerAgrupacion">
        <div className="textoBanner">
          <p>
            {this.props.descripcion}: {this.props.producto},{" "}
            {this.props.porcentaje}% de descuento Válido desde{" "}
            {this.props.fechaInicio} hasta el {this.props.fechaFinal}
          </p>
        </div>
        <div className="botonBanner">
          <a href="/Catalogo" className="btn btn-secondary tamanho">
            Añadir al carrito
          </a>
        </div>
      </div>
    );
  }
}

function BannerBuild() {
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    getPromociones();
  }, []);

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
          producto={datos.producto[0].nombre}
          descripcion={datos.descripcion}
          fechaInicio={datos.fechaInicio}
          fechaFinal={datos.fechaFinal}
        />
      );
    }
    setPromos(array2);
  }
  if (promos.length === 0)
    return (
      <div className="position-relative" style={{ minHeight: "100%" }}>
        <h2 className=" ">Cargando...</h2>
      </div>
    );

  return (
    <div
      id="carouselExampleControls"
      className=" position-relative carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {promos.map((promo) => (
          <div className="carousel-item active">{promo}</div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

function Promociones() {
  return (
    <Plantilla
      sectionToDisplay={
        <div style={{ minHeight: "100%" }}> {BannerBuild()}</div>
      }
    ></Plantilla>
  );
}

export { Promociones, BannerBuild };
