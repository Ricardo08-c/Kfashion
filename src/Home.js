import { typeImplementation } from "@testing-library/user-event/dist/type/typeImplementation";
import "./App.css";
import Plantilla from "./static/Plantilla";

function Home() {
  return (
    <Plantilla
      sectionToDisplay={
        <div style={{ minHeight: "85%" }} className="text-dark ">
          <div style={{ marginTop: "10%" }}>
            <h1 className="text-white">¡Bienvenida a Kfashion!</h1>
            <h3 className="text-white">Venta de ropa en línea</h3>
          </div>
          <a
            href="/Catalogo"
            className="btn btn-default btn-lg bg-dark text-white"
          >
            Visitar nuestro catálogo
          </a>
        </div>
      }
    ></Plantilla>
  );
}

export default Home;
