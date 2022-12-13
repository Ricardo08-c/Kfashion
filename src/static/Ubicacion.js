import '../App.css';
import Plantilla from './Plantilla';


function Ubicacion(){
  return (
    <Plantilla sectionToDisplay = {Ubicacioncomp()}></Plantilla>
  ) 
}
  
function Ubicacioncomp() {
  
  return (
    /*En el siguiente bloque nav se habilita los enlaces de las funcionalidades de la aplicación, como el inicio de sesión, carrito, tienda, etc.*/
    <div style = {{minHeight: "86%"}}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" 
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" 
        crossorigin="anonymous">
      </link> 
      

    {/*Bloque con la configuracion de la pagina ubicacion*/}
    {/*Contenedor de 2 div que estan se reparten el ancho de la pantalla*/}
    <div className="row no-gutters">
      <div className="col no-gutters">
        {/*Contenedor de la izquierda que contiene el googlemaps*/}
        <div className="leftside d-flex justify-content-end align-items-center"> 
          <iframe title="map" className="responsive-iframe" width="70%" height="70%" id="gmap_canvas" 
          src="https://maps.google.com/maps?q=Tecnologico%20de%20Costa%20Rica,Lim%C3%B3n,Costa%20Rica&t=&z=15&ie=UTF8&iwloc=&output=embed" 
          frameborder="0" scrolling="no" marginheight="0" marginwidth="0"  ></iframe>
        </div>
      </div>

      
      <div className="col no-gutters">
        {/*Contenedor de la derecha que contiene el un informationbox*/}
        <div className= "rightside d-flex justify-content-start align-items-center "> 
          {/*Contenedor conocido como InformationBox, posee todo el texto relacionado con la informacion de ubicación.*/}
          <div className="informationBox"> 
            <br></br>
            <h1 className="TituloLocation text-center fw-bold fst-italic">Estamos aqui para usted</h1>
            <p className="parrafoLocation text-start fst-normal ml-4">Nos encargamos de cualquier duda que tenga de nuestros productos.</p>
           

            <p className="parrafoLocation text-start fw-bold fst-italic ml-1">Nuestros horarios de atención son:</p>
            <p className="parrafoLocation text-start fst-italic ml-4">Lunes - Viernes</p> 
            <p className="parrafoLocation text-start fst-italic ml-4">10:00 am - 05:00 pm</p>
             

            <p className="parrafoLocation text-start fw-bold fst-italic ml-2 ">Oficinas</p>
            <p className="parrafoLocation text-start fw-normal fst-normal ml-4">Barrio Cerro Mocho frente al Colegio Diurno . 159-7050 Cartago. Limón. Limón.</p>
            
            
            <p className="parrafoLocation text-start fw-bold fst-italic ml-2 ">Número de télefono </p>
            <p className="parrafoLocation text-start fw-normal fst-normal ml-4">+506 8974-2465</p>

            <p className="parrafoLocation text-start fw-bold fst-italic ml-2 ">Correo Electrónico </p>
            <p className="parrafoLocation text-start fw-normal fst-normal ml-4">info@moTica.com</p>
            
           </div>
         </div>
       </div>
     </div>
      
      {/*En el siguiente bloque section se habilitan los enlaces a las demás secciones de información estática de la app.*/}
     

    </div>

  );
}

export default Ubicacion;