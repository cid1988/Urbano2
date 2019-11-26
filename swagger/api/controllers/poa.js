const Etapa = require('../models/poa/etapa');
const Area = require('../models/poa/area');
const Actividad = require('../models/poa/actividad');
const ObjImpacto = require('../models/poa/objImpacto');
const Plan = require('../models/poa/plan');
const Proyecto = require('../models/poa/proyecto');
const Grupo = require('../models/poa/grupo');
const PrioridadMinisterial = require('../models/poa/prioridadMinisterial');
const CompromisoGobierno = require('../models/poa/compromisoGobierno');
var moment = require('moment')
var ObjectId = require('mongoose').Types.ObjectId;

//Actividades ----------------------------------------------------------------

async function getActividades (req, res, next){
    const idPlan  = req.swagger.params.idPlan.value;
    const idJurisdiccion = req.swagger.params.idJurisdiccion.value;
    const idObjImpacto = req.swagger.params.idObjImpacto.value;
    const idProyecto = req.swagger.params.idProyecto.value;
    const etapa = req.swagger.params.etapa.value;
    let query={
        $or:[
            {eliminado: {$exists:false}},
            {eliminado: false}
    ]}
    idPlan? query.idPlan = ObjectId(idPlan) : '';
    idJurisdiccion? query.idJurisdiccion = ObjectId(idJurisdiccion) : '';
    idObjImpacto? query.idObjImpacto = ObjectId(idObjImpacto) : '';
    idProyecto? query.idProyecto = ObjectId(idProyecto) : '';
    etapa? query.etapa = etapa : '';
    try{
        Actividad.find(query).exec(function(err,data){
            if(err) res.status(500).json(error);
            else{
                res.status(200).json(data);
            }
        });
    }catch(error){
        res.status(500).json(error);
    }
};

async function getActividadPorID (req, res, next){
    try{
        const actividad = await Actividad.findById(req.swagger.params.id.value)
        if(actividad.eliminado || actividad.eliminado==true){
            res.status(404).json({status:'Actividad Eliminada'});
        }else  res.status(200).json(actividad);
    }catch(error){
        res.status(500).json(error);
    }
};

function createActividad(req, res, next){
    try{
        const dato = req.swagger.params.body.value;
        if(dato.etapa == '') dato.etapa = null;
        dato.idPlan = ObjectId(dato.idPlan);
        dato.idObjImpacto = ObjectId(dato.idObjImpacto);
        dato.idJurisdiccion = ObjectId(dato.idJurisdiccion);
        dato.idProyecto = ObjectId(dato.idProyecto);
        dato.fechaActualizacion = new Date();
        dato.responsableDeCarga = req.token.username;
        dato.usuarioActualizacion = req.token.username;
        const actividad = new Actividad(dato);
        actividad.save().then(data=>{
            updatefechaInicioFinEtapa(data);
            res.status(200).json(data);
        }).catch(err => {
            res.status(500).json(err);
        })
    } catch(err){
        res.status(403).json(err);
    }
};

async function updateActividad (req, res, next){
    try{
        const data = req.swagger.params.body.value;
        data.idPlan = ObjectId(data.idPlan);
        data.idObjImpacto = ObjectId(data.idObjImpacto);
        data.idJurisdiccion = ObjectId(data.idJurisdiccion);
        data.idProyecto = ObjectId(data.idProyecto);
        data.fechaActualizacion = new Date();
        data.usuarioActualizacion = req.token.username;
        Actividad.findByIdAndUpdate(req.swagger.params.id.value, 
        {$set: data}, {new: true},function(err, data){
            if(err) res.status(500).json(err);
            else{
                updatefechaInicioFinEtapa(data)
                res.status(200).json(data);
            } 
        })
    } catch(error){
        res.status(500).json(error);
    }
};

/*async function deleteActividad(req, res, next){
    try{
        Actividad.findOneAndUpdate( 
            { _id: ObjectId(req.swagger.params.body.value.id)},  
            {  eliminado: true },
            { new: true ,strict: false} , function(err,data){
                if(err) res.status(500).json(err.message)
                else {
                    updatefechaInicioFinEtapa(data)
                    res.status(200).json(data)
                }
            }); // Make this update into an upsert
    } catch(error){
        res.status(500).json(error);
    }
};*/

//Areas
async function getAreas (req, res, next){
    const idPlan  = req.swagger.params.idPlan.value;
    let query={
        $or:[
            {eliminado: {$exists:false}},
            {eliminado: false}
    ]}
    idPlan? query.idPlan = ObjectId(idPlan)  : '';
    try{
        const areas = await Area.find(query);
        res.status(200).json(areas);
    }catch(error){
        res.status(500).json(error);
    }
};

//AVERIGUAR SI SE CREA AREA UNA VEZ QUE SE ALLA DEFINIDO EL PLAN

/*
async function createArea (req, res, next){
    // console.log(req.body)
    // await Area.insertMany(req.body.array).then(function(areas){
    //     console.log(areas);
    // });
    // res.json({status: 'Areas creadas con exito', data: areas});
};
//Obras
async function getObras (req, res, next){
    const { id } = req.body;
    try{
        const obras = await Obra.find({cargadaEnPOA: true, idProyecto: id});
        res.json(obras);
    }catch(error){
        res.json(error);
    }
};
*/

//Compromisos de Gobierno -----------------------------------------------------------------------

async function getCompromisosGobierno(req, res, next){
    try{
        CompromisoGobierno.find().exec(function(err, compromisos) {
            if(compromisos) res.status(200).json(compromisos);
            else res.status(500).json(err);
        });
    }catch(error){
        res.status(500).json(error);
    }
}

async function getCompromisosGobiernoPorID (req, res, next){
    try{
        const compromiso = await CompromisoGobierno.findById(req.swagger.params.id.value)
        res.status(200).json(compromiso);
    }catch(error){
        res.status(500).json(error);
    }
};

async function createCompromisosGobierno(req, res, next){
    const compromiso = new CompromisoGobierno(req.swagger.params.body.value);
    compromiso.save().then(data=>{
        res.status(200).json(data)
    }).catch(err => {
        res.status(500).json(err)
    })
};

async function updateCompromisosGobierno (req, res, next){
    try{
        const data= req.swagger.params.body.value;
        CompromisoGobierno.findByIdAndUpdate(req.swagger.params.id.value, 
        {$set: data}, {new: true, strict: false},function(err, data){
            if(err) res.status(500).json(err)
            else res.status(200).json(data)
        })
    } catch(error){
        res.status(500).json(error);
    }
};

//Etapas ------------------------------------------------------------------------

async function getEtapas(req, res, next){
    const idProyecto  = req.swagger.params.idProyecto.value;
    let query={
        $or:[
            {eliminado: {$exists:false}},
            {eliminado: false}
    ]}
    idProyecto? query.idProyecto = idProyecto : '';
    try{
        const etapas = await Etapa.find(query)
        .populate({ 
            path: 'actividades', 
            match : {
                $or:[
                    {eliminado: {$exists:false}},
                    {eliminado: false}
                ]
            }
        })
        res.status(200).json(etapas);
    }catch(error){
        res.status(500).json(error);
    }
};

async function getEtapaPorId(req, res, next){
    try{
        const etapa = await Etapa.findById(req.swagger.params.id.value)
        .populate({ 
            path: 'actividades', 
            match : {
                $or:[
                    {eliminado: {$exists:false}},
                    {eliminado: false}
                ]
            }
        });
        res.status(200).json(etapa);
    }catch(error){
        res.status(500).json(error);
    }
};

async function createEtapa(req, res, next){
    try{
        const etapa = new Etapa(req.swagger.params.body.value);
        etapa.save().then(data=>{
            res.status(200).json(data)
        }).catch(err => {
            res.status(500).json(err)
        })
    }catch(error){
        res.json(error);
    }
    
};

async function deleteEtapa(req, res, next){
    try{
        await Etapa.findOneAndUpdate( 
            { _id: ObjectId(req.swagger.params.body.value.id)},  
            {  eliminado: true },
            { new: true}, function(err,data){
                if(err) res.status(500).json(err.message)
                else res.status(200).json(data)
            }); // Make this update into an upsert
    } catch(error){
        res.status(403).json(error);
    }
};

async function updateEtapa (req, res, next){
    try{
        var data = req.swagger.params.body.value;
        Etapa.findByIdAndUpdate(req.swagger.params.id.value, {$set: data}, {new: true})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    } catch(error){
        res.json(error);
    }
};

//GRUPOS -----------------------------------------------------------------------

async function getGrupos(req, res, next){
    try{
        Grupo.find({}).sort('nombre').exec(function(err, grupos) {
            if(grupos) res.status(200).json(grupos);
            else res.status(500).json(err.message)
        });
    }catch(error){
        res.status(200).json(error.message);
    }
}

async function createGrupo(req, res, next){
    try{
        const grupo = new Grupo(req.swagger.params.body.value);
        grupos.save().then(data=>{
            res.status(200).json(data)})
        .catch(err => {
            res.status(500).json(err)
        })
    }catch(error){
        res.json(error);
    }
    
};

//Objectos Estrategicos -----------------------------------------------------------------------

async function getObjImpacto(req, res, next){
    const idPlan  = req.swagger.params.idPlan.value;
    let query={
        $or:[
            {eliminado: {$exists:false}},
            {eliminado: false}
        ]
    }
    idPlan? query.idPlan = ObjectId(idPlan) : '';
    try{
        ObjImpacto.find(query).exec(function(err, data) {
            if(data) res.status(200).json(data);
            else res.status(500).json(err.message)
        });
    }catch(error){
        res.json(error);
    }
}

async function getObjImpactoPorId(req, res, next){
    try{
        const objImpacto = await ObjImpacto.findById(req.swagger.params.id.value);
        res.status(200).json(objImpacto);
    }catch(error){
        res.status(500).json(error.message);
    }
};

async function createObjImpacto(req, res, next){
    try{
        const objImpacto = new ObjImpacto(req.swagger.params.body.value);
        objImpacto.idPlan= ObjectId(objImpacto.idPlan)
        objImpacto.save().then(data=>{
            res.status(200).json(data)})
        .catch(err => {
            res.status(500).json(err)
        })
    }catch(error){

    }
    
};

async function deleteObjImpacto(req, res, next){
    try{
        await ObjImpacto.findOneAndUpdate( 
            { _id: ObjectId(req.swagger.params.body.value.id)},  
            {  eliminado: true },
            { new: true, strict: false},function(err,data){
                if(err) res.status(500).json(err)
                else  res.status(200).json(data);
        }); // Make this update into an upsert
        res.status(200);
    } catch(error){
        res.json(error);
    }
};

async function updateObjImpacto (req, res, next){
    try{
        const objImpacto = req.swagger.params.body.value
        objImpacto.idPlan = ObjectId(objImpacto.idPlan)
        ObjImpacto.findByIdAndUpdate(req.swagger.params.id.value, {$set: objImpacto}, {new: true}).exec()
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(err => {
            return res.status(500).json(err)
        })
    } catch(error){
        return res.json(error);
    }
};

//Planes ----------------------------------------------------------------------

async function getPlanes (req, res, next){
    try{
        const planes = await Plan.find();
        res.status(200).json(planes);
    }catch(error){
        res.json(error);
    }
};

async function createPlan (req, res, next){
    const plan = new Plan({
        anio: req.swagger.params.body.value.anio,
        etapa: req.swagger.params.body.value.etapa,
        editable: req.swagger.params.body.value.editable
    });

    try{
        plan.save(function(err, plan){
            for (let i = 0; i < req.swagger.params.body.value.array.length; i++) {
                var a =req.swagger.params.body.value.array[i];
                a.idPlan = plan._id;
            }
            Area.insertMany(req.swagger.params.body.value.array).then(function(areas){
                res.json({"status":200});
            });
        })
    }catch(error){
        res.json({status: 'Se ha producido un error'});
    }
};

//Prioridad Ministerial ---------------------------------------------------------------

async function getPrioridadesMinisteriales(req, res, next){
    try{
        PrioridadMinisterial.find({}).sort('nombre').exec(function(err, prioridades) {
            if(prioridades) res.status(200).json(prioridades);
            else res.status(403).json(err);
        });
    }catch(error){
        res.json(error);
    }
}

async function createPrioridadMinisterial(req, res, next){
    try{
        const prioridades = new PrioridadMinisterial(req.swagger.params.body.value);
        prioridades.save().then(data=> res.status(200).json(data))
        .catch(err =>  res.status(500).json(err) );
    }catch(error){
        res.status(500).json(error);
    }
    
    res.json({status: 'Grupo de POA creado'});
};

//Proyectos -----------------------------------------------------------------------

async function getProyectoPorId (req, res, next){
    const id = req.swagger.params.id.value;
    try{
        const proyecto = await Proyecto.findById({ _id: ObjectId(id)});
        res.status(200).json(proyecto);
    }catch(error){
        res.json(error);
    }
};

async function getProyectos (req, res, next){
    const idPlan  = req.swagger.params.idPlan.value;
    const idJurisdiccion = req.swagger.params.idJurisdiccion.value;
    const idObjImpacto = req.swagger.params.idObjImpacto.value;
    const proyectoPadre = req.swagger.params.proyectoPadre.value;
    let query={
        $or:[
            {eliminado: {$exists:false}},
            {eliminado: false}
    ]}
    idPlan? query.idPlan = ObjectId(idPlan) : '';
    idJurisdiccion? query.idJurisdiccion = ObjectId(idJurisdiccion) : '';
    idObjImpacto? query.idObjImpacto = ObjectId(idObjImpacto) : '';
    proyectoPadre? query.proyectoPadre = proyectoPadre : '';
    //Traer los ids siempre del campo _id del objeto del plan y del area, si lo traigo de un campo guardado no funciona
    try{
        const proyectos = await Proyecto.find(query).select('nombre idPlan idJurisdiccion idObjImpacto hijos proyectoPadre')
        .populate('actividades')
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

async function updateProyecto (req, res, next){
    try{
        const proyecto = req.swagger.params.body.value;
        proyecto.idPlan= ObjectId(proyecto.idPlan)
        proyecto.idObjImpacto= ObjectId(proyecto.idObjImpacto)
        proyecto.idJurisdiccion= ObjectId(proyecto.idJurisdiccion)

        Proyecto.findByIdAndUpdate(req.swagger.params.id.value, {$set: proyecto}, {new: true, strict: false})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }catch(error){
        res.status(500).json(error);
    }
    
};

async function createProyecto (req, res, next){
    try{
        const proyecto = new Proyecto(req.swagger.params.body.value);
        proyecto.idPlan= ObjectId(proyecto.idPlan)
        proyecto.idObjImpacto= ObjectId(proyecto.idObjImpacto)
        proyecto.idJurisdiccion= ObjectId(proyecto.idJurisdiccion)
        proyecto.save().then(data=>{
            res.status(200).json(data)})
        .catch(err => {
            res.status(500).json(err)
        })
    }catch(error){
        res.status(500);
    }
};

async function deleteProyecto (req, res, next){
    try{
        Proyecto.findOneAndUpdate( 
            { _id: ObjectId(req.swagger.params.body.value.id)},  
            {  eliminado: true },
            { new: true, strict: false},function(err,data){
                if(err) res.status(500).json(err.message)
                else res.status(200).json(data);
            }); // Make this update into an upsert
    } catch(err){
        res.json(err.message);
    }
};


async function updatefechaInicioFinEtapa(actividad){
    if(actividad.etapa){
        var fechaInicio='';
        var fechaFin='';
        var etapa = await Etapa.findById({ _id: ObjectId(actividad.etapa)}).populate({ 
            path: 'actividades', 
            match : {
                $or:[
                    {eliminado: {$exists:false}},
                    {eliminado: false}
                ]
            }
        })
        for (let index = 0; index < etapa.actividades.length; index++) {
            if(etapa.actividades[index].fechas){
                var fecha = etapa.actividades[index].fechas.pop()
                if(fecha.fechaInicio){
                    if(fechaInicio==''){
                        fechaInicio=moment(fecha.fechaInicio,'DD/MM/YYYY').format('YYYY/MM/DD');
                    } 
                    else{
                        fecha.fechaInicio=moment(fecha.fechaInicio,'DD/MM/YYYY').format('YYYY/MM/DD');
                        if(moment(fecha.fechaInicio).isBefore(fechaInicio)){
                            fechaInicio = fecha.fechaInicio;
                        }
                    }
                }
                if(fecha.fechaFin){
                    if(fechaFin==''){
                        fechaFin=moment(fecha.fechaFin,'DD/MM/YYYY').format('YYYY/MM/DD')
                    } 
                    else{
                        fecha.fechaFin=moment(fecha.fechaFin,'DD/MM/YYYY').format('YYYY/MM/DD')
                        if(moment(fecha.fechaFin).isAfter(fechaFin)){
                            fechaFin = fecha.fechaFin;
                        }
                    }
                }
            }
        }
        etapa.fechaInicio=moment(fechaInicio).format('DD/MM/YYYY')
        etapa.fechaFin=moment(fechaFin).format('DD/MM/YYYY')
        etapa = new Etapa(etapa);
        etapa.save();
    }
}
module.exports = {
    //Actividades
    getActividades,getActividadPorID,createActividad,updateActividad,
    //Areas
    getAreas,
    //Compromisos Gobierno
    getCompromisosGobierno, getCompromisosGobiernoPorID, createCompromisosGobierno, updateCompromisosGobierno,
    //Etapa
    getEtapas,getEtapaPorId,createEtapa,updateEtapa,deleteEtapa,
    //Grupos
    getGrupos,createGrupo,
    //ObjImpacto
    getObjImpacto,getObjImpactoPorId,createObjImpacto,updateObjImpacto,deleteObjImpacto,
    //Planes,
    getPlanes,createPlan,
    //Prioridades Ministeriales
    getPrioridadesMinisteriales,createPrioridadMinisterial,
    //Proyectos
    getProyectos,getProyectoPorId,updateProyecto,createProyecto,deleteProyecto,
    
};
