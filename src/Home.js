import { typeImplementation } from '@testing-library/user-event/dist/type/typeImplementation';
import './App.css';
import Plantilla from './static/Plantilla';

function Home() {



  return (

      <Plantilla sectionToDisplay  = {<div style = {{minHeight: "67%"}} className= "text-dark ">
        <div style = {{marginTop: "10%"}}>
        
      <h1 >¡Bienvenida a Kfashion!</h1>
      <h3>Venta de ropa en línea</h3>
      </div>
      <a href="/Catalogo" className="btn btn-default btn-lg bg-dark text-white">Visitar nuestro catálogo</a>
      
    </div>
  }>
      
      </Plantilla>
       
     



      






    



  );
}

export default Home;
