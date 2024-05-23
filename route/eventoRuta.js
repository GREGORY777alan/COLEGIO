const express = require('express');
const userModel = require('../models/Evento');
const router = express.Router();
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath;
        if (file.mimetype.startsWith('image/')) {
            uploadPath = './fotos/imagen';
        } else if (file.mimetype === 'application/pdf') {
            uploadPath = './archivos/pdf';
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const fileName = `${file.originalname}`;
        cb(null, fileName);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Tipo de archivo no permitido. Solo se permiten imágenes y PDFs.'), false);
    }
};

const upload = multer({ storage, fileFilter });
router.use('/verfoto', express.static(path.join(__dirname, '../fotos/imagen')));
router.use('/verpdf', express.static(path.join(__dirname, '../archivos/pdf')));

router.post("/create", upload.fields([{ name: 'foto_evento', maxCount: 1 }, { name: 'archivo_evento', maxCount: 1 }]), async (req, res) => {
    try {
        req.body.titulo_evento = req.body.titulo_evento.toUpperCase();
        req.body.descripcion_evento = req.body.descripcion_evento.toUpperCase();
        const data = new userModel(req.body);
        await data.save();
        res.send({ success: true, message: "dato registrado" });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const data = await userModel.find({}).populate({
            path: 'idprofesor',
        select: 'ci nombre paterno materno celular direccion',
        })
        res.json({ success: true, data: data });
        console.log(data);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});





// Actualizar
router.put("/update", upload.fields([{ name: 'foto_evento', maxCount: 1 }, { name: 'archivo_evento', maxCount: 1 }]), async (req, res) => {
    try {
        if (req.body.titulo_evento) {
            req.body.titulo_evento = req.body.titulo_evento.toUpperCase();
        }
        if (req.body.descripcion_evento) {
            req.body.descripcion_evento = req.body.descripcion_evento.toUpperCase();
        }
        const { _id, ...rest } = req.body;
        const data = await userModel.updateOne({ _id: _id }, rest);
        res.send({ success: true, message: "actualizado", data: data });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
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
