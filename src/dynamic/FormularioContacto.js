import React, { useState } from "react";
import Plantilla from "../static/Plantilla";
import emailjs from '@emailjs/browser';

//Formulario para ingresar nombre, apellido, correo y consulta para ser enviados por correo de contacto al cliente
function FormContacto() {
 const [form, setForm] = useState({
    nombre: "",
    correo: "",
    consulta : ""    

 });
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 // Función para atrapar el evento del botón y enviar mail.
 async function onSubmit(e) {
  e.preventDefault();

  //Estableciendo los atributos del formulario
  setForm({ nombre: "",correo:"", consulta:""});
 
  //Envío del email
  emailjs.send('service_tq3ttkq','template_yjfa0rds',form,'V--4VgXlzsCb2jC1p')
  .then(response=>{
    alert('Su mensaje ha sido enviado con éxito, nuestro servicio al cliente se pondrá en contacto con usted al correo suministrado')
    return console.log(response);
  })
  .catch(error=>alert('error en el envío, verifique los datos y conexión'))
}


 // This following section will display the form that takes the input from the user.
 return (
  //Información personal
  //Titulo
   <div  className= "position-relative alineadoCentroNonRel" style = {{minHeight:"100%",maxWidth:"30%"}}>
     <h2 className= "text-white">Formulario de Contacto</h2>
     <li style = {{display:"inline-block"}}>----</li>
     <form onSubmit={onSubmit}>

      {/*Mensaje instructivo*/}
     <label className= "text-white"htmlFor="name">Ingrese su nombre, correo electrónico y su consulta o mensaje y le contestaremos desde nuestro correo de servicio al cliente tan pronto sea posible.</label>

     {/*Etiqueta para informacion personal*/}
     <h4 className= "text-success"htmlFor="name" style = {{left:"10%"}}>Información Personal </h4>

        {/*insercion de nombre*/}
       <div className="form-group" style = {{display:"inline"}}>
         <label className= "text-white"htmlFor="name">Nombre</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.nombre}
           onChange={(e) => updateForm({ nombre: e.target.value })}
         />
       </div>

       <div className="form-group">
        
        {/*insercion de correo*/}
         <label className= "text-white"htmlFor="position">Correo</label>
         <input
           type="text"
           className="form-control"
           id="position"
           value={form.correo}
           onChange={(e) => updateForm({ correo: e.target.value })}
         />
       </div>
       
       <li style = {{display:"inline-block"}}>----</li>

        {/*Título de mensaje o consulta */}        
       <h4 className= "text-success"htmlFor="name" style = {{left:"10%"}}>Mensaje o consulta </h4>
       
       
       {/*Cuadro de texto para la consulta o mensaje ingresado por el usuario para ser enviado por correo*/}
       <div className="form-group">
         <label className= "text-white"htmlFor="name">Introduzca su mensaje o consulta</label>
         <textarea
           type="text"
           className="form-control"
           id="mensaje"
           value={form.consulta}
           onChange={(e) => updateForm({ consulta: e.target.value })}
         />
       </div>

        {/*Botón que maneja elmevento de enviar mail, si el mail es enviado correctamente limpia los campos*/}      
       <button className= "btn text-white btn-outline-secondary" onClick= {onSubmit}>Enviar Consulta</button>
     </form>
   </div>
 );
}
function FormularioContacto() {
  return (

<Plantilla sectionToDisplay = {FormContacto()}></Plantilla>
  );
}
export default FormularioContacto;