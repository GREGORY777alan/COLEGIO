const mongoose = require('../conexion');

const schemaData = mongoose.Schema({
  
nombre_materia:String,
area:String,
idprofesor: { type: mongoose.Schema.Types.ObjectId, ref: 'profesor' }
});

const userModel = mongoose.model("materia", schemaData, "materia");
module.exports = userModel;