import { useEffect, useState } from "react";
import "../App.css";
import Plantilla from "../static/Plantilla";
import perfilHombre from "../img/perfilHombre.jpg";
import perfilMujer from "../img/perfilMujer.png";
import React from "react";
//import { useNavigate } from "react-router";
/*
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
function Navigates() {
  const navigate = useNavigate();
  navigate("/Perfil");
}
*/
function getUserD() {
  //let  r= await fetchIP();
  //la ip
  //let data = r;
  if (localStorage.getItem("ipAdress") != null) {
    let json = JSON.parse(
      localStorage.getItem(localStorage.getItem("ipAdress"))
    );

    return json;
  }
  return "";
}
async function getUser() {
  //let  r= await fetchIP();
  //la ip
  //let data = r;
  if (localStorage.getItem("ipAdress") != null) {
    let json = JSON.parse(
      localStorage.getItem(localStorage.getItem("ipAdress"))
    );

    return json;
  }
  return "";
}

class ProfileComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: this.props.imgSrc,
      name: this.props.name,
      apellido: this.props.apellido,
      email: this.props.email,
      sexo: this.props.sexo,
      rol: this.props.rol,
      fechaNacimiento: this.props.fechaNacimiento,
      cedula: this.props.cedula,
    };
  }
  updateForm = (value) => {
    console.log(value);
    return this.setState((prev) => {
      return { ...prev, ...value };
    });
  };

  getUserActualAuthId = async (id) => {
    const res = await fetch("https://kfashionapi.onrender.com/get/users");
    if (res.ok) {
      let text = await res.json();
      console.log("json", text);

      let filteredUser = [];
      filteredUser = text.filter((user) => {
        return user._id === id;
      });
      return filteredUser[0];
    }
  };
  onSubmit = async (e) => {
    e.preventDefault();
    const newPerson = { ...this.state };

    // When a post request is sent to the create url, we'll add a new record to the database.
    let data = getUserD();
    // eslint-disable-next-line no-lone-blocks
    {
      newPerson._id = data._id;
      //validar si está vacío

      await fetch("https://kfashionapi.onrender.com/update/user", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
      }).catch((error) => {
        window.alert(error);
        return;
      });

      this.getUserActualAuthId(data._id).then((user) => {
        let ipAd = localStorage.getItem("ipAdress");
        localStorage.removeItem(localStorage.getItem("ipAdress"));
        console.log(user);
        localStorage.setItem(ipAd, JSON.stringify(user));
        window.location.href = "/Perfil";
      });
    }
  };
  formatDate = (date) => {
    if (date.split("-").length > 0) return date;
    const [day, month, year] = date.split("/");

    return year + "-" + month + "-" + day;
  };
  dateChanged = (e) => {
    console.log(e.target.value);
  };
  render() {
    return (
      <div style={{ minHeight: "100%" }} className="m-4">
        <img src={this.state.imgSrc} width="400" height={"300"} alt="Profile" />
        <div className="">
          <br></br>
          <br></br>
          <h4 style={{ display: "inline" }}>Nombre: </h4>

          <input
            onChange={(e) => this.updateForm({ name: e.target.value })}
            defaultValue={this.state.name}
            style={{ display: "inline" }}
          ></input>
          <br></br>
          <br></br>
          <h4 style={{ display: "inline" }}>Apellido: </h4>
          <input
            onChange={(e) => this.updateForm({ apellido: e.target.value })}
            defaultValue={this.state.apellido}
            style={{ display: "inline" }}
          ></input>
          <br></br>
          <br></br>
          <br />
          <div className="">
            <h4 style={{ display: "inline" }}>Correo: </h4>
            <input
              onChange={(e) => this.updateForm({ email: e.target.value })}
              defaultValue={this.state.email}
              style={{ minWidth: "30%", display: "inline" }}
            ></input>
            <br></br>
            <br></br>
            <h4 style={{ display: "inline" }}>Sexo: </h4>
            <div style={{ display: "inline" }} className="">
              <select
                onChange={(e) => this.updateForm({ sexo: e.target.value })}
                defaultValue={this.state.sexo}
                className="select"
              >
                <option value="F">Femenino</option>
                <option value="M">Masculino</option>
              </select>
            </div>
            <br></br>
            <br></br>

            <h4 style={{ display: "inline" }}>Fecha de nacimiento: </h4>

            <input
              onChange={(e) =>
                this.updateForm({ fechaNacimiento: e.target.value })
              }
              defaultValue={this.formatDate(this.state.fechaNacimiento)}
              type="date"
            />

            <br></br>
            <br></br>
            <h4 style={{ display: "inline" }}>Cédula: </h4>
            <input
              onChange={(e) => this.updateForm({ cedula: e.target.value })}
              defaultValue={this.state.cedula}
              style={{ display: "inline" }}
            ></input>
            <br></br>
            <br></br>
            <a
              href="/Perfil"
              style={{ display: "inline" }}
              className=" text-dark btn btn-secondary"
            >
              Cancelar
            </a>
            <li className="text-dark" style={{ opacity: 0, display: "inline" }}>
              {" "}
              --
            </li>
            <button
              style={{ display: "inline" }}
              onClick={this.onSubmit}
              className=" text-dark btn btn-secondary"
            >
              Guardar Cambios
            </button>
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
  if (persons.length === 0) {
    return (
      <div className="position-relative" style={{ minHeight: "100%" }}>
        <h2 className=" ">Cargando...</h2>
      </div>
    );
  }
  return persons.map((person) => person);
}

function EditProfile() {
  return <Plantilla sectionToDisplay={ProfileBuild()}></Plantilla>;
}

export default EditProfile;
