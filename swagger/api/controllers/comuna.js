'use strict';
const Comuna = require('../models/comuna/comuna');

async function getComunas(req, res, next){
    try{
        Comuna.find({}).sort('numero').exec(function(err, contactos) {
            if(contactos)res.json(contactos);
            else console.log(err)
        });
    }catch(error){
        res.json(error);
    }
}

async function createComuna(req, res, next){
    const comuna = new Comuna(req.swagger.params.body.value);
    await comuna.save();
    res.json({status: 'Contacto creado'});
};

async function getComunaId(req, res, next){
    const comuna = await Comuna.findById(req.swagger.params.id.value);
    console.log(comuna)
    res.json(comuna);
};

async function editComuna (req, res, next){
    const comuna = req.swagger.params.body.value
    await Comuna.findByIdAndUpdate(req.swagger.params.id.value, {$set: comuna}, {new: true, strcit: false});
    res.json({status: 'Contacto actualizado con exito'});
};

/////////////////////////////////////////

async function deleteComuna(req, res, next){
    await Comuna.findByIdAndRemove(req.swagger.params.id.value);
    res.json({status: 'Contacto borrado'});
};
module.exports = {getComunas, getComunaId, createComuna, editComuna, deleteComuna}