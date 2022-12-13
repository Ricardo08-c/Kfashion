import '../App.css';
import Plantilla from './Plantilla';

function Descripcion(){
  return (
    <Plantilla sectionToDisplay = {DescripcionComp()}></Plantilla>
  )
}
function DescripcionComp() {

  return (
   


    <div style = {{minHeight: "86%"}}className="">
     <div className= "text-success position-relative backgroundDescription">
        <br/>
       <br/>
        <h1>Descripción del sitio</h1>
          <br/>
          <br/>
          <div className= "text-white position-relative parrafo">
          <p>Se conoce con el nombre de cannabis con sus variantes, sativa e índica, una planta, conocida en botánica como Cannabis sativa que ha sido utilizada desde la antigüedad por sus propiedades. La planta se ha usado y se usa actualmente con diferentes fines: recreativos, medicinales e industriales se puede utilizar para confeccionar ropa, cuerda, zapatos, papel y otros. <br/> Nuestra empresa se encarga de comerciar de forma legal el cannabis en todas sus formas aplicativas. Nuestro objetivo es dominar el mercado de dicho producto y polularizar su uso como cualquier otra droga recreativa anteriormente legalizada, con el fin de eliminar el tabú creado alrededor de este. Dicho objetivo también conlleva campañas de conscienciación sobre su uso.</p>
          </div>
        </div>
    </div>


        



  );
}

export default Descripcion;
