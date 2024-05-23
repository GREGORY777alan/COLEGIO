
const express = require('express');
const userModel = require('../models/Activo');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './fotos/imagen'); 
    },
    filename: (req, file, cb) => {
      const fileName = `${file.originalname}`;
      cb(null, fileName);
    },
  });
  
  
  const upload = multer({ storage });

  router.use('/verfoto', express.static(path.join(__dirname, '../fotos/imagen')));

router.post("/create",upload.single('file'), async (req, res) => {
    req.body.nombre_activo = req.body.nombre_activo.toUpperCase();
    req.body.observacion = req.body.observacion.toUpperCase();
    console.log(req.body);
    const data = new userModel(req.body);
    await data.save();
    res.send({ success: true, message: "dato registrado" });

});



router.get("/", async (req, res) => {
    const data = await userModel.find({}).populate({
        path: 'idmateria',
        select: 'nombre_materia area',
        populate: [
            {path: 'idprofesor',select: 'ci nombre paterno materno celular direccion'},
        ]
        });
    res.json({ success: true, data: data });
    console.log(data);
});

// Actualizar

router.put("/update",upload.single('file'),async (req, res) => {   

   if (req.body.nombre_activo) {
    req.body.nombre_activo = req.body.nombre_activo.toUpperCase();
}
if (req.body.observacion ) {
    req.body.observacion  = req.body.observacion .toUpperCase();
}
    console.log(req.body);
    const { _id, ...rest } = req.body;
    console.log(rest);
    const data = await userModel.updateOne({ _id: _id }, rest);
    res.send({ success: true, message: "actualizado", data: data });
});

router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const data = await userModel.deleteOne({ _id: id });
    res.send({ success: true, message: "eliminado", data: data });
});

module.exports = router;