const mongoose = require('../conexion');

const schemaData = mongoose.Schema({
titulo_evento:String,
descripcion_evento:String,
foto_evento:String,
archivo_evento:String,
fecha_evento:Date,
idprofesor: { type: mongoose.Schema.Types.ObjectId, ref: 'profesor' }
});
const userModel = mongoose.model("evento", schemaData, "evento");
module.exports = userModel;