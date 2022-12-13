import '../App.css';
import Plantilla from './Plantilla';
function Historia(){
  return (
    <Plantilla sectionToDisplay = {HistoriaComp()}></Plantilla>
  )
}
function HistoriaComp() {

  return (
    
      
      
      <div style = {{minHeight: "86%"}}>
      <div className= "text-success position-relative backgroundDescription">
          <br/>
        <br/>
          <h1>Nuestra Historia</h1>
            <br/>
            <br/>
            <div className= "text-white position-relative parrafo">
            <p>
            Motica se fundó en el año 2022 con el fin de impulsar, modernizar y popularizar el
          negocio de las ventas de cannabis y sus productos derivados. 
          Iniciamos lanzando nuestros primeros productos prácticamente solo enfocados en el consumo de forma
          tradicional, pero hoy en día somos los más grandes distribuidores de todo tipo de
          productos derivados del cannabis, nuestra empreza va desde la gastronomía hasta el
          uso medicinal y por supuesto su forma más básica, el consumo tradicional de puros.
          Esta empresa en poco tiempo se ha consolidado como la más importante vendedora
          del país y ha colaborado con la educación sobre el consumo adecuado y responsable
          de nuestro producto, asi como el combate contra el tabú formado alrededor de este.
            </p>
            </div>
          </div>
      </div> 

  
     

  );
}

export default Historia;