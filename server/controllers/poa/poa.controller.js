const Etapa = require('../../models/poa/etapa');
const Area = require('../../models/poa/area');
const Actividad = require('../../models/poa/actividad');
const Obra = require('../../models/poa/obra');
const Plan = require('../../models/poa/plan');
const Proyecto = require('../../models/poa/proyecto');

var ObjectId = require('mongoose').Types.ObjectId;

const poaCtrl = {};

poaCtrl.getEtapas = async (req, res, next) => {
    const { id } = req.body;
    try{
        const proyectos = await Proyecto.find({idPlan: ObjectId(id)});
        res.json(proyectos);
    }catch(error){
        res.json(error);
    }
};

poaCtrl.getEtapasPorProyecto = async (req, res, next) => {
    const { id } = req.body;
    try{
        const etapas = await Etapa.find({idPlan: ObjectId(id)});
        res.json(etapas);
    }catch(error){
        res.json(error);
    }
};

poaCtrl.getAreas = async (req, res, next) => {
    try{
        const areas = await Area.find();
        res.json(areas);
    }catch(error){
        res.json(error);
    }
};

poaCtrl.getAreasPorPlan = async (req, res, next) => {
    const { _id } = req.body;
    try{
        const areas = await Area.find({idPlan: ObjectId(_id)});
        res.json(areas);
    }catch(error){
        res.json(error);
    }
};

poaCtrl.getActividades = async (req, res, next) => {
    const { _id } = req.body;
    try{
        const actividades = await Actividad.find({idProyecto: ObjectId(_id)});
        res.json(actividades);
    }catch(error){
        res.json(error);
    }
};

poaCtrl.getObras = async (req, res, next) => {
    const { id } = req.body;
    try{
        const obras = await Obra.find({cargadaEnPOA: true, idProyecto: id});
        res.json(obras);
    }catch(error){
        res.json(error);
    }
};

poaCtrl.getPlanes = async (req, res, next) => {
    try{
        const planes = await Plan.find();
        res.json(planes);
    }catch(error){
        res.json(error);
    }
};

poaCtrl.getProyectoPorId = async (req, res, next) => {
    const { _id } = req.body;
    try{
        const proyecto = await Proyecto.findById({_id: ObjectId(_id)});
        res.send(proyecto);
    }catch(error){
        res.json(error);
    }
};

poaCtrl.getProyectos = async (req, res, next) => {
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

poaCtrl.getEtapasPorProyecto = async (req, res, next) => {
    const { id } = req.body;
    try{
        const etapas = await Etapa.find({idPlan: ObjectId(id)});
        res.json(etapas);
    }catch(error){
        res.json(error);
    }
};

module.exports = poaCtrl;