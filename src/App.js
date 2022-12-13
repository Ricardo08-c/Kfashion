import './App.css';

import Historia from './static/Historia'
import Home from './Home'
import Organigrama from './static/Organigrama'
import Descripcion from './static/Descripcion'
import Faq from './static/Faq'
import Ubicacion from './static/Ubicacion'
import Catalogo from './dynamic/Catalogo';
import {Carrito,CatalogComponent} from './dynamic/Carrito';
import {Ordersreturn,a} from './authClient/Orders';
import Login from './dynamic/Login';
import Register from './dynamic/Register';
import Facturacion from './dynamic/Facturacion';
import Gestion from './dynamic/Gestion';
import Perfil from './dynamic/Perfil';
import PyR from './dynamic/PyR';
import {Promociones} from './dynamic/bannerPromociones';
import AP from './dynamic/AnunciosPromociones';

import FormularioContacto from './dynamic/FormularioContacto';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import GestionProductos from './dynamic/GestionProductos';
import EditProfile from './authClient/EditProfile';
import GestionPromociones from './dynamic/GestionPromociones';
import GestionOfertas from './dynamic/GestionOfertas';
import CancelarFactura from './dynamic/CancelarFactura';
import Reporte from './dynamic/GraphicsView';


function App() {
  return (
  <div className="App">
        <BrowserRouter> 
          <Routes> 
            <Route path='/Historia' element={<Historia/>} />
            <Route path='/Organigrama' element={<Organigrama/>} />
            <Route path='/Descripcion' element={<Descripcion/>} />
            <Route path='/Faq' element={<Faq/>} />
            <Route path='/Reporte' element={<Reporte/>} />
            <Route path='/PyR' element={<PyR/>} />
            <Route path='/Ubicacion' element={<Ubicacion/>} />
            <Route path='/Catalogo' element={<Catalogo/>} />
            <Route path='/Login' element={<Login/>} />
            <Route path='/Register' element={<Register/>} />
            <Route path='/CancelarFactura' element={<CancelarFactura/>} />
            <Route path='/Carrito' element={<Carrito/>} />
            <Route path='/Orders' element={<Ordersreturn/>} />
            <Route path='/Gestion' element={<Gestion/>} />
            <Route path='/Perfil' element={<Perfil/>} />
            <Route path='/PreguntasyRespuestas' element={<PyR/>} />
            <Route path='/FormularioContacto' element={<FormularioContacto/>} />
            <Route path='/bannerPromociones' element={<Promociones/>} />
            <Route path='/AnunciosPromociones' element={<AP/>} />
            <Route path='/Productos' element={<GestionProductos/>} />
            <Route path='/Perfil/Editar' element={<EditProfile/>} />
            <Route path='/Promociones' element={<GestionPromociones/>} />
            <Route path='/Ofertas' element={<GestionOfertas/>} />
            <Route path='/' element={<Home/>} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
