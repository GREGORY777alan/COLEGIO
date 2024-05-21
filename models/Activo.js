
const mongoose = require('../conexion');

const schemaData = mongoose.Schema({
codigo_activo:String,
nombre_activo:String,
tipo_activo:String,
cantidad:Number,
precio_unitario:Number,
fecha_registro:Date,
estado_activo:String,
foto_activo:String,
observacion:String,
idmateria: { type: mongoose.Schema.Types.ObjectId, ref: 'materia' }
});

const userModel = mongoose.model("activo", schemaData, "activo");
module.exports = userModel;