const express = require("express");
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("./database");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 

// This section will help you get a list of all the records.
recordRoutes.get('/',(req,res) =>{
    res.send("Hello");
})
recordRoutes.get('/get/users', (req, res) =>{
  dbo.connection.useDb('MoticaDB').collection("Users").find({})
  .toArray(function (err, result) {
    if (err) throw err;
    res.json(result);
  });
  
});




// This section will help you get a list of all the products.
recordRoutes.get('/products', (req, res) =>{
  dbo.connection.useDb('MoticaDB').collection("Products").find({})
  .toArray(function (err, result) {
    if (err) throw err;
    res.json(result);
  });
  
});
/** var ObjectId = require('mongodb').ObjectId; 
var id = req.params.gonderi_id;       
var o_id = new ObjectId(id);
db.test.find({_id:o_id})
*/ 
recordRoutes.get('/preguntas', (req, res) =>{
  dbo.connection.useDb('MoticaDB').collection("Preguntas").aggregate(
    [{$lookup:{from :"Users",localField:"usuario",foreignField:"_id", as: "usuario"}}])
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });

}
);


recordRoutes.post('/update/user', (req, res) =>{
  var userid = req.body._id;
  var o_id = new ObjectId(userid);  
  let myobj = {
    nombre: req.body.name,        
    apellido: req.body.apellido,
    fecha_nacimiento: req.body.fechaNacimiento,
    correo: req.body.email,
    cedula : req.body.cedula,
    sexo : req.body.sexo,
    
    };
    console.log(o_id, myobj)
    
    
  dbo.connection.useDb('MoticaDB').collection("Users").updateOne({_id:o_id},{$set:{nombre: req.body.name,apellido : req.body.apellido,  fecha_nacimiento: req.body.fechaNacimiento,
    correo: req.body.email,
    cedula : req.body.cedula,
    sexo : req.body.sexo,
      }}, function (err, result) {
        if (err) console.log (err);
        res.json(result);
      });
  });


recordRoutes.post('/register/question', (req, res) =>{
  var userid = req.body.usuario;
  var o_id = new ObjectId(userid);  
  let myobj = {
      contenido:req.body.contenido,        
      usuario: o_id,
      respuesta:  req.body.respuesta
    };
    
  dbo.connection.useDb('MoticaDB').collection("Preguntas").insertOne(myobj, function (err, result) {
      if (err) console.log (err);
      res.json(result);
    });
});


recordRoutes.post('/register/order', (req, res) =>{
let prods = []

  for(let i = 0 ; i < req.body.products.length; i ++){
    prods.push([ObjectId(req.body.products[i][0]),req.body.products[i][1]])
  }
  
  
  let myobj = {

    
      user: ObjectId(req.body.user),
      //Esto aqui tiene que enviarse como lista    
      products: prods,
      total: req.body.total,
      timestamp: new Date()
    };
    
   
  dbo.connection.useDb('MoticaDB').collection("Orders").insertOne(myobj, function (err, result) {
      if (err) console.log (err);
      res.json(result);
    });
});


recordRoutes.get('/orders', (req, res) =>{
  
  
  
  
  dbo.connection.useDb('MoticaDB').collection("Orders").aggregate([    
    {$addFields:{adjustedProds:    
    {$map:{input:"$products",as:"prods",in:{$first: "$$prods"}}}}},
  {$lookup:{from:"Products",localField:"adjustedProds",foreignField:"_id",as :"ObjectProds"}},
  {$addFields:{cant:{$map:{input:"$products",as:"prods",in:{$last: "$$prods"}}}}},{
    $lookup:{from:"Users",localField:"user",foreignField:"_id",as:"objUser"}}])
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });

}
);

recordRoutes.post('/register/product', (req, res) =>{

  
  let myobj = {

    
      imgSrc: req.body.imgSrc,
      cantidad: req.body.cantidad,
      description: req.body.descripcion,
      estado: req.body.estado,
      nombre: req.body.nombre,
      precio: req.body.precio,
      categoria: req.body.categoria
    };
    
  dbo.connection.useDb('MoticaDB').collection("Products").insertOne(myobj, function (err, result) {
      if (err) console.log (err);
      res.json(result);
    });
});


recordRoutes.get('/promociones', (req, res) =>{
  dbo.connection.useDb('MoticaDB').collection("Promocion").aggregate(
    [{$lookup:{from :"Products",localField:"producto",foreignField:"_id", as: "producto"}}])
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });

}
);
 







recordRoutes.post('/question', (req, res) =>{  
    
  dbo.connection.useDb('MoticaDB').collection("Preguntas")
  .updateOne({_id: ObjectId(req.body.preguntaId)},{$set:{respuesta:req.body.respuesta}}, function(err,result){
    if (err) console.log (err);
    res.json(result);
  })

});




recordRoutes.post('/updateProduct', (req, res) =>{  
  
  console.log(req.body.id)
  
  dbo.connection.useDb('MoticaDB').collection("Products")
  .updateOne({_id: ObjectId(req.body.id)},{$set:
    {
      imgSrc:req.body.imgSrc,
      nombre: req.body.name,
      description: req.body.description,
      estado: req.body.activo,
      nombre: req.body.name,
      price: req.body.price,
      categoria: req.body.category,
      cantidad: req.body.cantidad
    }}, function(err,result){
    if (err) console.log (err);
    res.json(result);
  })

});


recordRoutes.delete('/remove/product', (req, res) => {

  console.log(req.body._id)
  dbo.connection.useDb('MoticaDB').collection("Products").deleteOne({_id: ObjectId(req.body._id)}, function (err, result) {
    
      if (err) console.log (err);
      res.json(result);
    });
  });







recordRoutes.post('/add/user', (req, res) =>{
    let myobj = {
        nombre: req.body.nombre,        
        apellido: req.body.apellido,
        fecha_nacimiento: req.body.fecha_nacimiento,
        correo: req.body.correo,
        contrasenha : req.body.contrasenha,
        cedula : req.body.cedula,
        sexo : req.body.sexo,
        rol : req.body.rol
      };
      
    dbo.connection.useDb('MoticaDB').collection("Users").insertOne(myobj, function (err, result) {
        if (err) console.log (err);
        res.json(result);
      });
});

recordRoutes.get('/promociones', (req, res) =>{
  dbo.connection.useDb('MoticaDB').collection("Promocion").aggregate(
    [{$lookup:{from :"Products",localField:"producto",foreignField:"_id", as: "producto"}}])
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });

}
);
 



recordRoutes.post('/register/promotion', (req, res) =>{

  
  let myobj = {
      descripcion: req.body.descripcion,
      fechaInicio: req.body.fechaInicio,
      fechaFinal: req.body.fechaFinal,
      producto: ObjectId(req.body.producto),
      porcentaje: req.body.porcentaje
    };
    
  dbo.connection.useDb('MoticaDB').collection("Promocion").insertOne(myobj, function (err, result) {
      if (err) console.log (err);
      res.json(result);
    });
});



recordRoutes.delete('/remove/promotion', (req, res) => {

  console.log(req.body._id)
  dbo.connection.useDb('MoticaDB').collection("Promocion").deleteOne({_id: ObjectId(req.body._id)}, function (err, result) {
    
      if (err) console.log (err);
      res.json(result);
    });
  });


 
recordRoutes.post('/updatePromo', (req, res) =>{  

  console.log(req.body.id)
  
  dbo.connection.useDb('MoticaDB').collection("Promocion")
  .updateOne({_id: ObjectId(req.body.id)},{$set:
    {
      fechaInicio:req.body.fechaInicio,
      fechaFinal: req.body.fechaFinal,
      porcentaje: req.body.porcentaje,
      descripcion: req.body.descripcion

    }}, function(err,result){
    if (err) console.log (err);
    res.json(result);
  })

});









module.exports = recordRoutes;