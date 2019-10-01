const Organigrama = require('../models/organigrama/organigrama');



async function getOrganigrama(req, res, next){
    try{
        const organigrama = await Organigrama.find({},['nombreCompleto','sigla','superiorInmediato','nivel','categoria'])
        res.json(organigrama);
    }catch(error){
        res.json(error);
    }
};

async function crearOrganigrama(req, res, next){
    const organigrama = new Organigrama({
        categoria: req.swagger.params.body.value.categoria,
        nivel: req.swagger.params.body.value.nivel,
        nombreCompleto: req.swagger.params.body.value.nombreCompleto,
        nombreCortoJurisdiccion: req.swagger.params.body.value.nombreCortoJurisdiccion,
        nombreCortoOrganigrama: req.swagger.params.body.value.nombreCortoOrganigrama,
        superiorInmediato: req.swagger.params.body.value.superiorInmediato,
    });
    await organigrama.save();
    res.json({status: 'Reparticion creado'});
};

async function listarOrganigramaPorId(req, res, next){
    const organigrama = await Organigrama.findById(req.swagger.params.id.value)
    res.json(organigrama);
};

async function editarOrganigrama (req, res, next){
    const organigrama = new Organigrama({
        categoria: req.swagger.params.body.value.categoria,
        nivel: req.swagger.params.body.value.nivel,
        nombreCompleto: req.swagger.params.body.value.nombreCompleto,
        nombreCortoJurisdiccion: req.swagger.params.body.value.nombreCortoJurisdiccion,
        nombreCortoOrganigrama: req.swagger.params.body.value.nombreCortoOrganigrama,
        superiorInmediato: req.swagger.params.body.value.superiorInmediato,
    });
    await Organigrama.findByIdAndUpdate(req.swagger.params.id.value, {$set: organigrama}, {new: true});
    res.json({status: 'Contacto actualizado con exito'});
};

async function eliminarOrganigrama(req, res, next){
    await Organigrama.findByIdAndRemove(req.swagger.params.id.value);
    res.json({status: 'Reparticion borrado'});
};

module.exports = {getOrganigrama, crearOrganigrama, listarOrganigramaPorId, eliminarOrganigrama, editarOrganigrama} ;