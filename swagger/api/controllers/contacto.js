'use strict';
const Contacto = require('../models/contacto/contacto');

async function listarContactoPorId(req, res, next){
    try{
        Contacto.findById(req.swagger.params.id.value).exec(function(err, data){
            if(err) res.status(403).json(err)
            else  res.status(200).json(data);
        });
    }catch(error){
        res.status(403).json(error);
    }
};

async function listarContactos(req, res, next){
    try{
        Contacto.find({}).sort('apellidos').exec(function(err, contactos) {
            if(contactos) res.status(200).json(contactos);
            else console.log(err)
        });
    }catch(error){
        res.status(500).json(error);
    }
}
async function listarContactosSimple(req, res, next){
    try{
        Contacto.find({}).select(['nombre','apellidos','correos','area']).sort('apellidos').exec(function(err, contactos) {
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
module.exports = {
    listarContactos,eliminarContacto, crearContacto, listarContactoPorId, editarContacto,listarContactosSimple
}