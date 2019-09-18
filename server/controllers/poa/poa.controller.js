const Etapa = require('../../models/poa/etapa');
const Area = require('../../models/poa/area');
const Actividad = require('../../models/poa/actividad');
const Obra = require('../../models/poa/obra');
const Plan = require('../../models/poa/plan');
const Proyecto = require('../../models/poa/proyecto');

var ObjectId = require('mongoose').Types.ObjectId;

const poaCtrl = {};

//Etapas
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
    const { _id } = req.body;
    try{
        const etapas = await Etapa.find({idProyecto: _id, eliminado: {$exists: false}})
        .populate('actividades')
        .sort("orden");
        res.json(etapas);
    }catch(error){
        res.status(400).json(error);
    }
};

poaCtrl.guardarEtapa = async (req, res, next) => {
    const etapa = new Etapa({
        nombre: req.body.nombre,
        orden: req.body.orden,
        idProyecto: req.body.idProyecto
    });
    await etapa.save();
    res.json({status: 'Etapa creada'});
};

//Actividades
poaCtrl.getActividad = async (req, res, next) => {
    const { idActividad } = req.params;
    try{
        const actividad = await Actividad.findById(idActividad)
        res.json(actividad);
    }catch(error){
        res.json(error);
    }
};

poaCtrl.getActividades = async (req, res, next) => {
    try{
        const actividades = await Actividad.find();
        res.json(actividades);
    }catch(error){
        res.json(error);
    }
};

poaCtrl.getActividadesPorProyecto = async (req, res, next) => {
    const { _id } = req.body;
    try{
        const actividades = await Actividad.find({idProyecto: ObjectId(_id), eliminado: {$exists:false}, etapa: {$eq: null}})//Deberia ser eq o ne?
        .sort("codIdentificacion")
        .collation({locale: "en_US", numericOrdering: true});
        res.json(actividades);
    }catch(error){
        res.json(error);
    }
};

poaCtrl.getActividadesPorEtapa = async (req, res, next) => {
    const { _id } = req.body;
    try{
        const actividades = await Actividad.find({
            $and:[
                {eliminado: {$exists:false}},
                {etapa: ObjectId(_id).toString()}
            ]
        })
        res.json(actividades);
    }catch(error){
        res.json(error);
    }
};

poaCtrl.updateActividad = async (req, res, next) => {
    const { id } = req.body;
    const actividad = {
        nombre: req.body.nombre,
        codIdentificacion: req.body.codIdentificacion,
        predecesor: req.body.predecesor,
        etapa: req.body.etapa
    };
    await Actividad.findByIdAndUpdate(id, {$set: actividad}, {new: false});
    res.json({status: 'Actividad actualizada con exito'});
};

//Areas
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

poaCtrl.createAreas = async (req, res, next) => {
    // console.log(req.body)
    // await Area.insertMany(req.body.array).then(function(areas){
    //     console.log(areas);
    // });
    // res.json({status: 'Areas creadas con exito', data: areas});
};

//Obras
poaCtrl.getObras = async (req, res, next) => {
    const { id } = req.body;
    try{
        const obras = await Obra.find({cargadaEnPOA: true, idProyecto: id});
        res.json(obras);
    }catch(error){
        res.json(error);
    }
};

//Planes
poaCtrl.getPlanes = async (req, res, next) => {
    try{
        const planes = await Plan.find();
        res.json(planes);
    }catch(error){
        res.json(error);
    }
};

poaCtrl.createPlan = async (req, res, next) => {
    const plan = new Plan({
        anio: req.body.anio,
        etapa: req.body.etapa,
        editable: req.body.editable
    });

    try{
        await plan.save(function(err, plan){
            for (let i = 0; i < req.body.array.length; i++) {
                var a = req.body.array[i];
                a.idPlan = plan._id;
            }
            Area.insertMany(req.body.array).then(function(areas){
                res.json({"status":200});
            });
        })
    }catch(error){
        res.json({status: 'Se ha producido un error'});
    }
};

//Proyectos
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
    //Traer los ids siempre del campo _id del objeto del plan y del area, si lo traigo de un campo guardado no funciona
    console.log(req.body)
    try{
        const proyectos = await Proyecto.find({idPlan: ObjectId(idPlan), idJurisdiccion: ObjectId(idArea), eliminado: {$exists:false}})
        .sort({codIdentificacion: 1});
        console.log(proyectos)
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

poaCtrl.getProyectosHijos = async (req, res, next) => {
    const { idProyecto } = req.body;
    const { anio } = req.body;
    try{
        const proyectosHijos = await Proyecto.find({proyectoPadre: idProyecto, anio: anio})
        res.json(proyectosHijos);
    }catch(error){
        res.json(error);
    }
}

poaCtrl.updateProyecto = async (req, res, next) => {
    const { _id } = req.body;
    const proyecto = {
        nombre: req.body.nombre,
        codIdentificacion: req.body.codIdentificacion,
        descripcion: req.body.descripcion
    };
    await Proyecto.findByIdAndUpdate(_id, {$set: proyecto}, {new: false});
    res.json({status: 'Proyecto actualizado con exito'});
};

poaCtrl.createProyecto = async (req, res, next) => {
    const proyecto = new Proyecto({
        nombre: req.body.nombre,
        anio: req.body.anio,
        idJurisdiccion: req.body.idJurisdiccion,
        idPlan: req.body.idPlan
    });

    try{
        await proyecto.save();
        res.json({status: 'Proyecto creado con exito'});
    }catch(error){
        res.json({status: 'Se ha producido un error'});
    }
};

module.exports = poaCtrl;