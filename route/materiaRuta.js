const express = require('express');
const userModel = require('../models/Materia');
const router = express.Router();


router.get("/", async (req, res) => {
    const data = await userModel.find({}).populate({
        path: 'idprofesor',
        select: 'ci nombre paterno materno celular direccion',
        })
    res.json({ success: true, data: data });
    console.log(data);
});

router.post("/create", async (req, res) => {

    const data = new userModel(req.body);
    await data.save();
    res.send({ success: true, message: "dato registrado" });
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