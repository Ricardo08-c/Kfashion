import { useEffect, useState } from "react";
import "../App.css";
import Plantilla from "../static/Plantilla";
import perfilHombre from "../img/perfilHombre.jpg";
import perfilMujer from "../img/perfilMujer.png";
import React from "react";

async function fetchIP() {
  let url = "https://api.ipify.org?format=json";
  let res = await fetch(url);

  if (res.ok) {
    let text = await res.json();

    return text.ip;
  } else {
    return `HTTP error: ${res.status}`;
  }
}

async function getUser() {
  let r = await fetchIP();
  //la ip
  let data = r;
  if (localStorage.getItem(data) != null) {
    let json = JSON.parse(localStorage.getItem(data));

    return json;
  }
  return "";
}

class ProfileComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: "",
      name: "",
      apellido: "",
      email: "",
      sexo: "",
      rol: "",
      fechaNacimiento: "",
      cedula: "",
    };
  }
  render() {
    return (
      <div style={{ minHeight: "100%" }} className="m-4">
        <img src={this.props.imgSrc} width="400" height={"300"} alt="Profile" />
        <div className="text-success">
          <h2 className="card-title">
            {this.props.name} {this.props.apellido}
          </h2>
          <br />
          <div className="text-white">
            <h4>Correo: {this.props.email}</h4>
            <h4>Sexo: {this.props.sexo}</h4>
            <h4>Rol: {this.props.rol}</h4>
            <h4>Cedula: {this.props.cedula}</h4>
            <h4>Fecha de Nacimiento: {this.props.fechaNacimiento}</h4>
            <br></br>
            <a href="/Perfil/Editar" class="btn bg-secondary text-dark">
              Editar Perfil
            </a>
          </div>
        </div>
      </div>
    );
  }
}
function ProfileBuild() {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    getPerson();
  }, []);

  function getPerson() {
    getUser().then((currentUser) => {
      let perfil = [];
      //console.log(currentUser.sexo)

      if (currentUser.sexo === "F") {
        perfil.push(
          <ProfileComponent
            imgSrc={perfilMujer}
            name={currentUser.nombre}
            apellido={currentUser.apellido}
            email={currentUser.correo}
            sexo={currentUser.sexo}
            rol={currentUser.rol}
            fechaNacimiento={currentUser.fecha_nacimiento}
            cedula={currentUser.cedula}
          />
        );
      } else {
        perfil.push(
          <ProfileComponent
            imgSrc={perfilHombre}
            name={currentUser.nombre}
            apellido={currentUser.apellido}
            email={currentUser.correo}
            sexo={currentUser.sexo}
            rol={currentUser.rol}
            fechaNacimiento={currentUser.fecha_nacimiento}
            cedula={currentUser.cedula}
          />
        );
      }

      setPersons(perfil);
    });
  }
  if (persons.length == 0) {
    return (
      <div className="position-relative" style={{ minHeight: "100%" }}>
        <h2 className="text-white ">Cargando...</h2>
      </div>
    );
  }
  return persons.map((person) => person);
}

function Perfil() {
  return <Plantilla sectionToDisplay={ProfileBuild()}></Plantilla>;
}

export default Perfil;
