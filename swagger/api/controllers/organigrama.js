const Organigrama = require('../models/organigrama/organigrama');

async function getOrganigramaCompleto(req, res, next){
    try{
        Organigrama.find({}).populate('superiorInmediato').exec(function(err,data){
            if(err) res.status(500).json(err)
            else res.status(200).json(data)
        })
    }catch(error){
        res.status(500).json(error);
    }
};

async function getOrganigramaSimple(req, res, next){
    try{
        Organigrama.find({},['nombreCompleto','sigla']).exec(function(err,data){
            if(err) res.status(500).json(err)
            else res.status(200).json(data)
        })
    }catch(error){
        res.status(500).json(error);
    }
};

async function crearOrganigrama(req, res, next){
    const organigrama = new Organigrama(req.swagger.params.body.value);
    await organigrama.save();
    res.json({status: 'Reparticion creado'});
};

async function listarOrganigramaPorId(req, res, next){
    const organigrama = await Organigrama.findById(req.swagger.params.id.value)
    res.json(organigrama);
};

async function editarOrganigrama (req, res, next){
    for( prop in req.swagger.params.body.value){
        if(req.swagger.params.body.value[prop]==''){
            req.swagger.params.body.value[prop]=null
        }
    }
    const organigrama = new Organigrama(req.swagger.params.body.value);
    await Organigrama.findByIdAndUpdate(req.swagger.params.id.value, {$set: organigrama}, {new: true , strict: false});
    res.json({status: 'Contacto actualizado con exito'});
};

async function eliminarOrganigrama(req, res, next){
    await Organigrama.findByIdAndRemove(req.swagger.params.id.value);
    res.json({status: 'Reparticion borrado'});
};

module.exports = {
    getOrganigramaCompleto, getOrganigramaSimple, listarOrganigramaPorId, 
    crearOrganigrama, eliminarOrganigrama, editarOrganigrama} ;