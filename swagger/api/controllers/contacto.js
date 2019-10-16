'use strict';
const Contacto = require('../models/contacto/contacto');

async function listarContactoPorId(req, res, next){
    const contacto = await Contacto.findById(req.swagger.params.id.value);
    res.status(200).json(contacto);
};

async function listarContactos(req, res, next){
    console.log('OK')
    try{
        Contacto.find({}).sort('apellidos').exec(function(err, contactos) {
            if(contactos) res.status(200).json(contactos);
            else console.log(err)
        });
    }catch(error){
        res.status(500).json(error);
    }
}

async function editarContacto (req, res, next){
    const contacto = req.swagger.params.body.value
    await Contacto.findByIdAndUpdate(req.swagger.params.id.value, 
        {$set: contacto}, {new: true, strict: false}, function(err, data){
            if(err) res.status(500).json(err)
            else res.status(200).json(data)
        });
};

async function crearContacto(req, res, next){
    const contacto = new Contacto( req.swagger.params.body.value );
    await contacto.save();
    res.status(200).json({status: 'Contacto creado'});
};

/////////////////////////////////////////

async function eliminarContacto(req, res, next){
    await Contacto.findByIdAndRemove(req.swagger.params.id.value);
    res.status(200).json({status: 'Contacto borrado'});
};
module.exports = {listarContactos,eliminarContacto, crearContacto, listarContactoPorId, editarContacto}