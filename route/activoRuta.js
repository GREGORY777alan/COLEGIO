
const express = require('express');
const userModel = require('../models/Activo');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'file') { // Verifica si el archivo es una foto o un PDF
            cb(null, './fotos/imagen'); // Si es una foto, guárdala en la carpeta de fotos
        } else {
            cb(null, './fotos/pdf'); // Si es un PDF, guárdalo en la carpeta de PDFs
        }
    },
    filename: (req, file, cb) => {
        const fileName = `${file.originalname}`;
        cb(null, fileName);
    },
});

const upload = multer({ storage });

router.use('/verfoto', express.static(path.join(__dirname, '../fotos/imagen')));
router.use('/verpdf', express.static(path.join(__dirname, '../fotos/pdf')));

router.post("/create", upload.fields([{ name: 'file', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), async (req, res) => {
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

router.put("/update", async (req, res) => {   
    const { _id, ...rest } = req.body;
    const data = await userModel.updateOne({ _id: _id }, rest);
    res.send({ success: true, message: "actualizado", data: data });
});

router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const data = await userModel.deleteOne({ _id: id });
    res.send({ success: true, message: "eliminado", data: data });
});

module.exports = router;