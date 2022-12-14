import React, { useState } from "react";
import { useNavigate } from "react-router";
import Plantilla from "../static/Plantilla";



let userQuery = [];

function Login1() {
  const [form, setForm] = useState({
    correo: "",
    contrasenha: "",
  });
  const navigate = useNavigate();

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
  

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.

    
      
      
      
      userQuery = [];
      let filteredUser = [];
      const res1 = await fetch("https://kfashionapi.onrender.com/validUser",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email:form.correo, password:form.contrasenha}),
      }).catch((error) => {
        window.alert(error);
        return;
      });
      
      let k = await res1.text()
      
      
      let jsoninfo=JSON.parse(k);
      if(jsoninfo.user==""){
        window.alert(jsoninfo.message);
        return
      } 
      window.alert(jsoninfo.message);
      
      
      filteredUser =jsoninfo.user
      
      
      

      //buscar si hay una contraseña y el correo igual;

      userQuery = [filteredUser];
      getUserFiltered();
    
    setForm({ correo: "", contrasenha: "" });
    //navigate("/Catalogo");
  }

  const getUserFiltered = () => {
    if (userQuery.length === 0) {
      alert("Usuario no registrado");
    } else {
      fetchIP().then((data) => {
        
        
        //var id = machineId.machineIdSync();
        //console.log(id); //=> ‘7f1d3f57-29ba-4a64-a0e5-b13a6b5e6d24’

        localStorage.setItem(data, JSON.stringify(userQuery[0]));
        localStorage.setItem("ipAdress", data);

        navigate("/");
      });
    }
  };
  // This following section will display the form that takes the input from the user.
  return (
    
    <div
      style={{ minHeight: "86%", maxWidth: "30%" }}
      className="position-relative alineadoCentroNonRel"
    >
      <h3>Iniciar Sesión</h3>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Correo</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.correo}
            onChange={(e) => updateForm({ correo: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Contraseña</label>
          <input
            secureTextEntry={true}
            type="password"
            className="form-control"
            value={form.contrasenha}
            onChange={(e) => updateForm({ contrasenha: e.target.value })}
          />
        </div>
        <br></br>
        <button className="btn btn-outline-secondary" onClick={onSubmit}>
          Confirmar
        </button>
      </form>
    </div>
  );
}
function Login() {
  return <Plantilla sectionToDisplay={Login1()}></Plantilla>;
}

export default Login;
