import '../App.css';
import Plantilla from './Plantilla.js'
import React from 'react';

class FAQFormat extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      pregunta: "",
      respuesta: ""
    };
  }
  render(){
    return (
      <div >
      <div className= "verticalLine bg-dark"></div>
        <div  style ={{left:"1.5%"}} className= " alineadoIzquierda  text-white position-relative">        
          <div className= " bg-gradient text-success"> 
            <h2 className= "izquierda inline position-relative text-success">P.</h2>   
            <p className= " inlinePar position-absolute  "> {this.props.pregunta}
            </p>                     
          </div>
          <div className= "  position-relative"> 
            <h2 className= "izquierda inline position-relative ">R.</h2>   
            <p className= " inlinePar position-absolute  "> {this.props.respuesta}
            </p>                     
          </div>                                    
        </div>
        </div>
    ) 
  }




}
function Faq(){
  
  return (
    <Plantilla sectionToDisplay = {FaqRender()}></Plantilla>
    
  )
}
function FaqRender() {
  return (


    

      <div style = {{top:"3%", minHeight:"100%"}} className= "position-relative">
      <div className= " alineadoCentro text-success position-relative">
        <h1>Preguntas Frecuentes</h1>        
        
      </div>      
      <div  style = {{minHeight:"100%"}}className= "overflow-auto position-relative">
        {/*Espaciado entre preguntas*/}
        
        
        {/*Este es el formato de las preguntas frecuentes,*/}
        
        <FAQFormat pregunta = {"¿Los productos cannábicos vendidos son legales?"} respuesta = {"Si, nuestros productos son comercializados bajo la legislación de la república de Costa Rica."}/>
        <FAQFormat pregunta = {"¿Solo realizan envíos a Costa Rica?"} respuesta = {"Realizamos envíos a países donde la legislación permita el consumo de nuestros productos."}></FAQFormat>
        <FAQFormat pregunta = {"¿Los productos no son dañinos para la salud?"} respuesta = {"El abuso de productos puede ser perjudicial, es por eso que se deben consumir responsablemente."}></FAQFormat>
        <FAQFormat pregunta = {"¿Como es un helado cannábico?"} respuesta = {"Increíble."}></FAQFormat>
        <FAQFormat pregunta = {"¿Venderan productos de otras empresas?"} respuesta = {"Algunos productos son brindados de empresas como POPS, Gallito, entre otras."}></FAQFormat>        
        <FAQFormat pregunta = {"¿Toppings para el helado cannábico?"} respuesta = {"Macadamia, chocolate, almendras y ganas de volar."}></FAQFormat>
        
        

        
        
        
      </div>
      </div>      
              


      



    


    



  )
}

export default Faq;
