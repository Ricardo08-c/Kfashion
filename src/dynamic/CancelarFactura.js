import { useEffect, useState } from 'react';
import '../App.css';
import Plantilla from '../static/Plantilla';
import perfilHombre from '../img/perfilHombre.jpg'
import perfilMujer from '../img/perfilMujer.png'
import React from 'react';
import {a,Orders} from '../authClient/Orders';


class CancelarFacturacion extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        
        };       
        
      }
      
      
      
      render(){
        let a =  <Orders oneUser ={false} dataToDisplay = {false}cancel = {true}></Orders>
        console.log(a.props)
        return(
            <div style = {{minHeight: "85%"}} className= "text-white ">
            

                <div style = {{left: "10%"}}>
                    
                
                
                </div>
                {a}
                
                
                
                 
                </div>
        )
      }

}

function CancelarFactura() {
  return (
   <Plantilla sectionToDisplay = {<CancelarFacturacion/>}></Plantilla>
  );
}

export default CancelarFactura;