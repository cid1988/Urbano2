const Proyecto = require('../models/proyecto');
const Etapa = require('../models/etapa');

var ObjectId = require('mongoose').Types.ObjectId;

const proyectoCtrl = {};

proyectoCtrl.getEtapas = async (req, res, next) => {
    const { id } = req.body;
    try{
        const proyectos = await Proyecto.find({idPlan: ObjectId(id)});
        res.json(proyectos);
    }catch(error){
        res.json(error);
    }
};

proyectoCtrl.getEtapasPorProyecto = async (req, res, next) => {
    const { id } = req.body;
    try{
        const etapas = await Etapa.find({idPlan: ObjectId(id)});
        res.json(etapas);
    }catch(error){
        res.json(error);
    }
};

module.exports = proyectoCtrl;