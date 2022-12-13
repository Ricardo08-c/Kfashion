import { useEffect, useState } from 'react';
import '../App.css';
import Plantilla from '../static/Plantilla';
import React from 'react';


let array = []

class BannerComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      descripcion: "",
      fechaInicio: "",
      fechaFinal: "",
      producto: "",
      procentaje: 0,
      img: "",
    };
  }
  render(){
    return (
          <article className="post">
            <div className="post-header">
              <img src={this.props.img} className="img" alt="..."/>
            </div>     
            <div className="post-body">
              <span>{this.props.fechaInicio} al {this.props.fechaFinal}</span>
              <h2>{this.props.producto}</h2>
              <p> {this.props.descripcion}</p>
              <p> Descuento del {this.props.porcentaje}%</p>
              <a href="/Catalogo" className="post-link"> Ver mas productos</a>
            </div>
          </article>   
    )
  }
}


function BannerBuild(){
  const [promos, setPromos] = useState([]);
  useEffect(() => {
    getPromociones()
  }, [])

  async function getPromociones() {
    let url = "http://localhost:4002/promociones";
    let res = await fetch(url);
    if (res.ok) {
        let text = await res.json();
        array = []
        array.push(text)      
    } else {
        console.log(`HTTP error: ${res.status}`);
    }
    let array2 = []
    let array1 = array[0]
    
    for (let i = 0; i < array1.length; i++) {
      let datos = (array1[i])
      array2.push(<BannerComponent porcentaje={datos.porcentaje} producto={datos.producto[0].nombre} descripcion={datos.descripcion} fechaInicio={datos.fechaInicio} fechaFinal={datos.fechaFinal} img={datos.producto[0].imgSrc}/>)
    }
    setPromos(array2)

  }
    
  return (
      <body className="anuncioBody"> 
        <section className="post-list"> 
          <div className="content">
            {promos.map(promo => (
              promo))}
          </div>
        </section>
      </body>
  )
}

function AnuncioPromociones() {
  return (
   <Plantilla sectionToDisplay = {BannerBuild()}></Plantilla>
  );
}

export default AnuncioPromociones;

