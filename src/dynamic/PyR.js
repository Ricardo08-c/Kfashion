import { useEffect, useState } from "react";
import "../App.css";
import Plantilla from "../static/Plantilla";
import React from "react";
// Array donde se almacenaran los productos
let array = [];

class PyRcomponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pregunta: "",
      respuesta: props.respuesta,
      usuarioPregunta: "",
      respuestaInput: "",
      idPregunta: "",
    };
  }
  submitAnswer = (e) => {
    this.submitAnswer2(this.state.respuestaInput, this.props.idPregunta, this);
  };

  async submitAnswer2(respuesta, questionId, comp) {
    let json = JSON.stringify({ preguntaId: questionId, respuesta: respuesta });

    await fetch("https://kfashionapi.onrender.com/question", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
    }).catch((error) => {
      window.alert(error);
      return;
    });
    comp.setState({ respuesta: comp.state.respuestaInput });
    window.location.reload();
  }

   submitDelete= async (e)   => {
    let questionId = this.props.idPregunta;;
    let json = JSON.stringify({ preguntaId: questionId});    
    await fetch("https://kfashionapi.onrender.com/deleteQuestion", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
    }).catch((error) => {
      window.alert(error);
      return;
    });
    window.alert("Eliminada");
    window.location.reload();
  }
  
  render() {
    let ip = localStorage.getItem("ipAdress");

    let user = localStorage.getItem(ip);
    let userobj = JSON.parse(user);
    
    return (
      <div className="col">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{this.props.usuarioPregunta + ":"}</h5>
            <p className="card-text">{this.props.pregunta}</p>
            {this.state.respuesta === "No contestada"  && userobj.rol=='EMP'?(
              <div>
                <button
                  onClick={this.submitAnswer}
                  className="btn btn-success"
                >
                  Responder
                </button>
                <li className="text-white">-</li>
                { userobj.rol=='EMP'?
                
                <button
                
                onClick={this.submitDelete}
                className="btn btn-danger"
              >
                Eliminar
              </button>
                :<></>}
                
                <li className="text-white">-</li>
                <input
                  value={this.state.respuestaInput}
                  onChange={(e) =>
                    this.setState({ respuestaInput: e.target.value })
                  }
                  type="text"
                  className=""
                ></input>
              </div>
            ) : (
              <div>
                <h6 className="card-title">{"Respuesta:"}</h6>
                <p className="card-text">{this.state.respuesta}</p>

                
               
                { userobj.rol=='EMP'?
                <div>
                  <input
                  value={this.state.respuestaInput}
                  onChange={(e) =>
                    this.setState({ respuestaInput: e.target.value })
                  }
                  type="text"
                  className=""
                ></input>
                 <li className="text-white">-</li>
                 <button
                
                onClick={this.submitAnswer}
                className="btn btn-primary"
              >
                Actualizar respuesta
              </button>
              <li className="text-white">-</li>
              <button
                
                onClick={this.submitDelete}
                className="btn btn-danger"
              >
                Eliminar
              </button>
                </div>
               
                :<></>}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function CatalogBuild() {
  const [preguntas, setPreguntas] = useState([]);
  const [form, setForm] = useState({
    pregunta: "",
  });
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  useEffect(() => {
    getPreguntas();
  }, []);

  async function getPreguntas() {
    let url = "https://kfashionapi.onrender.com/preguntas";
    let res = await fetch(url);

    if (res.ok) {
      let text = await res.json();
      array = [];
      array.push(text);
    } else {
      console.log(`HTTP error: ${res.status}`);
    }

    let array2 = [];
    let array1 = array[0];
    
    

    for (let i = 0; i < array1.length; i++) {
      let datos = array1[i];
      let respuesta = "No contestada";
      if (datos.respuesta !== "") {
        respuesta = datos.respuesta;
      }
      array2.push(
        <PyRcomponent
          usuarioPregunta={
            datos.usuario[0].nombre + " " + datos.usuario[0].apellido
          }
          pregunta={datos.contenido}
          respuesta={respuesta}
          idPregunta={datos._id}
        />
      );
    }
    setPreguntas(array2);
  }

  async function submitQuestion(e) {
    let ip = localStorage.getItem("ipAdress");

    let user = localStorage.getItem(ip);
    let userobj = JSON.parse(user);

    if (!user) {
      alert("Debes iniciar sesión para realizar una pregunta");
      return;
    }

    let newQuestion = {
      contenido: form.pregunta,
      usuario: userobj._id,
      respuesta: "",
    };
    await fetch("https://kfashionapi.onrender.com/register/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    }).catch((error) => {
      window.alert(error);
      return;
    });
    alert(
      "Pregunta registrada de parte de " +
        userobj.nombre +
        " " +
        userobj.apellido
    );
    getPreguntas();
  }

  //  if (preguntas.length === 0) return <h2 style = {{minHeight: "100%"}} className="text-white centrado">Cargando...</h2>
  return (
    <div style={{ minHeight: "100%" }} className="m-4">
      <br></br>

      <h2>Preguntas realizadas por usuarios:</h2>
      <br></br>
      <br></br>
      <div className="row row-cols-1 row-cols-md-2 row-cols-md-3 row-cols-md-4 row-cols-md-5 g-4">
        {preguntas.length === 0 ? (
          <h2 style={{ minHeight: "100%" }} className="text-white centrado">
            Cargando...
          </h2>
        ) : (
          preguntas
        )}
      </div>
      <br></br>
      <br></br>
      <h2>Realizar una nueva pregunta:</h2>
      <br></br>
      <br></br>
      <input
        style={{ minWidth: "40%" ,height:"200px"}}
        type="text"
        value={form.pregunta}        
        onChange={(e) => updateForm({ pregunta: e.target.value })}
      ></input>

      <br></br>
      <br></br>
      <button
        onClick={submitQuestion}
        className="btn btn-outline-dark bg-secondary"
      >
        Enviar
      </button>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}
function PyR() {
  return <Plantilla sectionToDisplay={CatalogBuild()}></Plantilla>;
}

export default PyR;
