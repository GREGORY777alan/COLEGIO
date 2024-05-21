const express = require('express');
const userModel = require('../models/Usuario');
const bcrypt=require('bcrypt')
const router = express.Router();
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './fotos/usuario'); 
    },
    filename: (req, file, cb) => {
      const fileName = `${file.originalname}`;
      cb(null, fileName);
    },
  });
  
  const upload = multer({ storage });
  router.use('/verfotousuario', express.static(path.join(__dirname, '../fotos/usuario')));
// Listar

router.get("/", async (req, res) => {
    const data = await userModel.find({}).populate({
        path: 'idprofesor',
        select: 'ci nombre paterno materno celular direccion',
        })
    res.json({ success: true, data: data });
    console.log(data);
});

// Crear
router.post("/create", async (req, res) => {
    try {
   
        const { password, ...otrosDatos } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); 
        const data = new userModel({ password: hashedPassword, ...otrosDatos });
        await data.save(); 
        res.send({ success: true, message: "dato registrado" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Error al registrar el dato" });
    }
});

 
// Actualizar
router.put("/update", upload.single('file'), async (req, res) => {
    try {
 
        const { _id, password, ...rest } = req.body;
        if (password && password.length < 40) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const data = await userModel.updateOne({ _id: _id }, { ...rest, password: hashedPassword });
            
            res.send({ success: true, message: "actualizado", data: data });
        } else {
            const data = await userModel.updateOne({ _id: _id }, rest);
            res.send({ success: true, message: "actualizado", data: data });
        }
    } catch (error) {
        res.status(500).send({ success: false, message: "Error interno del servidor" });
    }
});


// Eliminar
router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const data = await userModel.deleteOne({ _id: id });
    res.send({ success: true, message: "eliminado", data: data });
});


module.exports = router;
