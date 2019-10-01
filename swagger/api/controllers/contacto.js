'use strict';
const Contacto = require('../models/contacto/contacto');

async function listarContactoPorId(req, res, next){
    const contacto = await Contacto.findById(req.swagger.params.id.value);
    res.json(contacto);
};

async function listarContactos(req, res, next){
    try{
        Contacto.find({}).sort('apellidos').exec(function(err, contactos) {
            if(contactos)res.json(contactos);
            else console.log(err)
        });
    }catch(error){
        res.json(error);
    }
}

async function editarContacto (req, res, next){
    const contacto = {
        nombre: req.swagger.params.body.value.nombre,
        apellidos: req.swagger.params.body.value.apellidos,
    };
    await Contacto.findByIdAndUpdate(req.swagger.params.id.value, {$set: contacto}, {new: true});
    res.json({status: 'Contacto actualizado con exito'});
};

async function crearContacto(req, res, next){
    const contacto = new Contacto({
        nombre: req.swagger.params.body.value.nombre,
        apellidos: req.swagger.params.body.value.apellidos,
    });
    await contacto.save();
    res.json({status: 'Contacto creado'});
};

/////////////////////////////////////////

async function eliminarContacto(req, res, next){
    await Contacto.findByIdAndRemove(req.swagger.params.id.value);
    res.json({status: 'Contacto borrado'});
};
module.exports = {listarContactos,eliminarContacto, crearContacto, listarContactoPorId, editarContacto}