import '../App.css';
import Plantilla from './Plantilla';

/*Esta es la página encargada de desplegar el organigrama de la empresa con forma de esquema */
function Organigrama(){
  return (
    <Plantilla sectionToDisplay = {OrganigramaComp()}></Plantilla>

  )
}
function OrganigramaComp() {

  return (
   
      
      
   
     <div style = {{minHeight: "86%"}} className="orcontainer overflow-auto "> 
      <h1 className="level-1 rectangle">Presidencia: Brandon Redondo / Ricardo Soto</h1>
        <ol className="level-2-wrapper">
              <li>
                <h2 className="level-2 rectangle">Marketing: Cristopher Zúñiga</h2>
              </li>
              <li>
                <h2 className="level-2 rectangle">Ventas: Fabián Villalobos</h2>
              </li>
            </ol>
            <ol className="level-2-wrapper">
          <li>
          ...
              <ol className="level-3-wrapper">
                  <li>
                      <h3 className="level-3 rectangle">Innovación: Minion1</h3>
                  </li>
                  <li>
                      <h3 className="level-3 rectangle">Redes: Minion2</h3>
                  </li>
              </ol>
          </li>
          <li>
          ...
              <ol className="level-3-wrapper">
                  <li>
                      <h3 className="level-3 rectangle">Envíos: Jordano Escalante</h3>
                  </li>
                  <li>
                      <h3 className="level-3 rectangle">Entregas:Jordano Esc</h3>
                  </li>
              </ol>
          </li>
      </ol>
     </div>
       
    
  );
}

export default Organigrama;