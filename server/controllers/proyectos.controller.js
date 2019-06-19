const Proyecto = require('../models/proyecto');
const Etapa = require('../models/etapa');

var ObjectId = require('mongoose').Types.ObjectId;

const proyectoCtrl = {};

proyectoCtrl.getProyectos = async (req, res, next) => {
    const { idPlan } = req.body;
    const { idArea } = req.body;
    try{
        const proyectos = await Proyecto.find({idPlan: ObjectId(idPlan), idJurisdiccion: ObjectId(idArea)})
        .sort({codIdentificacion: 1});
        res.json(proyectos);
    }catch(error){
        res.json(error);
    }
    // const proyectos = await Proyectos.aggregate([
    //   {
    //     $lookup: {
    //       from: "Proyectos",
    //       localField: "_id",
    //       foreignField: "proyectoPadre",
    //       as: "hijos"
    //     }
    //   }
    // ])
    // res.json(proyectos)
};

proyectoCtrl.getEtapasPorProyecto = async (req, res, next) => {
    const { id } = req.body;
    try{
        const etapas = await Etapa.find({idPlan: ObjectId(id)});
        res.json(etapas);
    }catch(error){
        res.json(error);
    }
    // const proyectos = await Proyectos.aggregate([
    //   {
    //     $lookup: {
    //       from: "Proyectos",
    //       localField: "_id",
    //       foreignField: "proyectoPadre",
    //       as: "hijos"
    //     }
    //   }
    // ])
    // res.json(proyectos)
};

module.exports = proyectoCtrl;