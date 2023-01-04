import "./App.css";
import Home from "./Home";
import Catalogo from "./dynamic/Catalogo";
import { Carrito } from "./dynamic/Carrito";
import { Ordersreturn } from "./authClient/Orders";
import Login from "./dynamic/Login";
import Register from "./dynamic/Register";
import Perfil from "./dynamic/Perfil";
import PyR from "./dynamic/PyR";
import { Promociones } from "./dynamic/bannerPromociones";
import AP from "./dynamic/AnunciosPromociones";
import FormularioContacto from "./dynamic/FormularioContacto";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GestionProductos from "./dynamic/GestionProductos";
import EditProfile from "./authClient/EditProfile";
import GestionPromociones from "./dynamic/GestionPromociones";
import GestionOfertas from "./dynamic/GestionOfertas";
import CancelarFactura from "./dynamic/CancelarFactura";
import Reporte from "./dynamic/GraphicsView";
import DynamicOrder from "./dynamic/dynamicorder";
import GestionCategorias from "./dynamic/Categorias";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Reporte" element={<Reporte />} />
          <Route path="/PyR" element={<PyR />} />
          <Route path="/Catalogo" element={<Catalogo />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/CancelarFactura" element={<CancelarFactura />} />
          <Route path="/Carrito" element={<Carrito />} />
          <Route path="/Orders" element={<Ordersreturn />} />
          <Route path="/Perfil" element={<Perfil />} />
          <Route path="/DynamicOrder:id" element={<DynamicOrder />} />
          <Route path="/PreguntasyRespuestas" element={<PyR />} />
          <Route path="/FormularioContacto" element={<FormularioContacto />} />
          <Route path="/bannerPromociones" element={<Promociones />} />
          <Route path="/AnunciosPromociones" element={<AP />} />
          <Route path="/Productos" element={<GestionProductos />} />
          <Route path="/Perfil/Editar" element={<EditProfile />} />
          <Route path="/Promociones" element={<GestionPromociones />} />
          <Route path="/Ofertas" element={<GestionOfertas />} />
          <Route path="/Categorias" element={<GestionCategorias />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
