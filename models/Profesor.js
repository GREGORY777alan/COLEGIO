const mongoose = require('../conexion');

const schemaData = mongoose.Schema({
    ci:Number,
    nombre: String,
    paterno: String,
    materno: String,
    celular: Number,
    direccion: String,
   
  
});

const userModel = mongoose.model("profesor", schemaData, "profesor");
module.exports = userModel;