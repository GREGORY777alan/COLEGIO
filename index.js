const express = require('express');
const cors = require('cors');
const mongoose = require('./conexion');

const usuarioRutas = require('./route/usuariologinRuta');
const usuariocrudRutas = require('./route/usuarioRuta');
const profesorRutas = require('./route/profesorRuta');
const materiaRutas = require('./route/materiaRuta');
const eventoRutas = require('./route/eventoRuta');
const activoRutas = require('./route/activoRuta');
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Servidor en ejecución en el puerto", PORT);
});

app.use('/usuario', usuarioRutas);
app.use('/usuarioc', usuariocrudRutas);
app.use('/profesor', profesorRutas);
app.use('/materia', materiaRutas);
app.use('/evento', eventoRutas);
app.use('/activo', activoRutas);
