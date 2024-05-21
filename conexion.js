const mongoose = require('mongoose');
//mongoose.connect("mongodb://127.0.0.1:27017/colegio").then(() => {
mongoose.connect("mongodb+srv://pruebasgreg12:XqWCS7l8q7wQwq6l@greg.gjszyys.mongodb.net/colegio").then(() => {

    console.log("Conectado a la base de datos");
}).catch((error) => {
    console.error("Error de conexion a la base de datos:", error);
});

module.exports = mongoose;

