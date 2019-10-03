const Etapa = require('../models/poa/etapa');
const Area = require('../models/poa/area');
const Actividad = require('../models/poa/actividad');
const Obra = require('../models/poa/obra');
const Plan = require('../models/poa/plan');
const Proyecto = require('../models/poa/proyecto');
const Grupo = require('../models/poa/grupo');
const PrioridadMinisterial = require('../models/poa/prioridadMinisterial');

var ObjectId = require('mongoose').Types.ObjectId;

//Etapas
async function getEtapas(req, res, next){
    try{
        const etapas = await Etapa.find();
        res.json(etapas);
    }catch(error){
        res.json(error);
    }
};

async function getEtapaPorId(req, res, next){
    try{
        const etapa = await Etapa.findById(req.swagger.params.id.value);
        res.json(etapa);
    }catch(error){
        res.json(error);
    }
};

async function createEtapa(req, res, next){
    const etapa = new Etapa(req.swagger.params.body.value);
    await etapa.save();
    res.json({status: 'Contacto creado'});
};

async function deleteEtapa(req, res, next){
    console.log(req.swagger.params.body.value.id)
    try{
        await Etapa.findOneAndUpdate( 
            { _id: ObjectId(req.swagger.params.body.value.id)},  
            {  eliminado: true },
            { new: true, upsert: true, strict: false}); // Make this update into an upsert
        res.json({status: 'Etapa marcada como eliminada'});
    } catch(error){
        res.json(error);
    }
};

async function updateEtapa (req, res, next){
    console.log(req.swagger.params.body.value.id)
    try{
        await Etapa.findOneAndUpdate( 
            { _id: ObjectId(req.swagger.params.body.value.id)},  
            req.swagger.params.body.value,
            { new: true, upsert: true, strict: false}); // Make this update into an upsert
        res.json({status: 'Etapa marcada como eliminada'});
    } catch(error){
        res.json(error);
    }
};

async function getEtapasPorProyecto (req, res, next){
    const { id } = req.swagger.params.body.value;
    try{
        const etapas = await Etapa.find({idProyecto: id, eliminado: {$exists: false}})
        .populate('actividades')
        .sort("orden");
        res.json(etapas);
    }catch(error){
        res.status(400).json(error);
    }
};

 

//Actividades
async function getActividadPorID (req, res, next){
    try{
        const actividad = await Actividad.findById(req.swagger.params.id.value)
        res.json(actividad);
    }catch(error){
        res.json(error);
    }
};

async function getActividades (req, res, next){
    try{
        const actividades = await Actividad.find();
        res.json(actividades);
    }catch(error){
        res.json(error);
    }
};

async function createActividad(req, res, next){
    const actividad = new Actividad(req.swagger.params.body.value);
    await actividad.save();
    res.json({status: 'Actividad creada'});
};

async function updateActividad (req, res, next){
    try{
        await Actividad.findOneAndUpdate( 
            { _id: ObjectId(req.swagger.params.body.value.id)},  
            req.swagger.params.body.value,
            { new: true, upsert: true, strict: false}); // Make this update into an upsert
        res.json({status: 'Actividad actualizada'});
    } catch(error){
        res.json(error);
    }
};

async function deleteActividad(req, res, next){
    console.log(req.swagger.params.body.value.id)
    try{
        await Actividad.findOneAndUpdate( 
            { _id: ObjectId(req.swagger.params.body.value.id)},  
            {  eliminado: true },
            { new: true, upsert: true, strict: false}); // Make this update into an upsert
        res.json({status: 'Actividad marcada como eliminada'});
    } catch(error){
        res.json(error);
    }
};

async function getActividadesPorProyecto (req, res, next){
    console.log(req.swagger.params.body.value.id)
    const idProyecto = req.swagger.params.body.value.id;
    try{
        const actividades = await Actividad.find({
            $and:[
                { 
                    $or:[
                        {idProyecto: ObjectId(idProyecto)},
                        {idProyecto: idProyecto}
                    ]
                },
                {   eliminado: {$exists:false}  },
                {   etapa: {$eq: null}  } //Deberia ser eq o ne?
            ]
        })
        res.json(actividades);
    }catch(error){
        res.json(error);
    }
};

async function getActividadesPorEtapa (req, res, next){
    const { id } = req.swagger.params.body.value;
    try{
        const actividades = await Actividad.find({
            $and:[
                {eliminado: {$exists:false}},
                {
                    $or:[
                        {etapa: id},
                        {etapa: ObjectId(id)}
                    ]
                }
            ]
        })
        res.json(actividades);
    }catch(error){
        res.json(error);
    }
};



//Areas
async function getAreas (req, res, next){
    const idPlan  = req.swagger.params.idPlan.value;
    let query={}
    idPlan? query.idPlan = idPlan : '';
    try{
        const areas = await Area.find(query);
        res.json(areas);
    }catch(error){
        res.json(error);
    }
};

async function getAreasPorPlan (req, res, next){
    const { id } = req.swagger.params.body.value;
    console.log(id)
    try{
        const areas = await Area.find({idPlan: ObjectId(id)});
        res.json(areas);
    }catch(error){
        res.json(error);
    }
};


//AVERIGUAR SI SE CREA AREA UNA VEZ QUE SE ALLA DEFINIDO EL PLAN

async function createArea (req, res, next){
    // console.log(req.body)
    // await Area.insertMany(req.body.array).then(function(areas){
    //     console.log(areas);
    // });
    // res.json({status: 'Areas creadas con exito', data: areas});
};

/*
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


//Planes
async function getPlanes (req, res, next){
    try{
        const planes = await Plan.find();
        res.json(planes);
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
        await plan.save(function(err, plan){
            for (let i = 0; i < req.swagger.params.body.value.array.length; i++) {
                var a =req.swagger.params.body.value.array[i];
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

async function getProyectoPorId (req, res, next){
    const id = req.swagger.params.id.value;
    try{
        const proyecto = await Proyecto.findById({ _id: ObjectId(id)});
        res.send(proyecto);
    }catch(error){
        res.json(error);
    }
};

async function getProyectos (req, res, next){
    const idPlan  = req.swagger.params.idPlan.value;
    const idJurisdiccion = req.swagger.params.idJurisdiccion.value;
    const idObjImpacto = req.swagger.params.idObjImpacto.value;
    const proyectoPadre = req.swagger.params.proyectoPadre.value;
    let query={}
    idPlan? query.idPlan = idPlan : '';
    idJurisdiccion? query.idJurisdiccion = idJurisdiccion : '';
    idObjImpacto? query.idObjImpacto = idObjImpacto : '';
    proyectoPadre? query.proyectoPadre = proyectoPadre : '';
    query.eliminado = {$exists:false}
    //Traer los ids siempre del campo _id del objeto del plan y del area, si lo traigo de un campo guardado no funciona
    try{
        const proyectos = await Proyecto.find(query).sort({codIdentificacion: 1});
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


/* SE PUEDE REMPLAZAR CON EL QUERY DE ARRIBA*/
async function getProyectosHijos (req, res, next){
    const { idProyecto } = req.swagger.params.body.value;
    const { anio } = req.swagger.params.body.value;
    try{
        const proyectosHijos = await Proyecto.find({proyectoPadre: idProyecto, anio: anio})
        res.json(proyectosHijos);
    }catch(error){
        res.json(error);
    }
}

async function updateProyecto (req, res, next){
    const { _id } = req.swagger.params.body.value;
    await Proyecto.findByIdAndUpdate(_id, {$set: req.swagger.params.body.value}, {new: false});
    res.json({status: 'Proyecto actualizado con exito'});
};

async function createProyecto (req, res, next){
    const proyecto = new Proyecto(req.swagger.params.body.value);
    try{
        await proyecto.save();
        res.json({status: 'Proyecto creado con exito'});
    }catch(error){
        res.json({status: 'Se ha producido un error'});
    }
};

//GRUPOS -----------------------------------------------------------------------

async function getGrupos(req, res, next){
    try{
        Grupo.find({}).sort('nombre').exec(function(err, grupos) {
            if(grupos)res.json(grupos);
            else console.log(err)
        });
    }catch(error){
        res.json(error);
    }
}

async function createGrupo(req, res, next){
    const grupo = new Grupo(req.swagger.params.body.value);
    await grupo.save();
    res.json({status: 'Grupo de POA creado'});
};

//Prioridad Ministerial ---------------------------------------------------------------

async function getPrioridadesMinisteriales(req, res, next){
    try{
        PrioridadMinisterial.find({}).sort('nombre').exec(function(err, prioridades) {
            if(prioridades)res.json(prioridades);
            else console.log(err)
        });
    }catch(error){
        res.json(error);
    }
}

async function createPrioridadMinisterial(req, res, next){
    const prioridades = new PrioridadMinisterial(req.swagger.params.body.value);
    await prioridades.save();
    res.json({status: 'Grupo de POA creado'});
};

module.exports = {
    //Grupos
    getGrupos,createGrupo,
    //Prioridades Ministeriales
    getPrioridadesMinisteriales,createPrioridadMinisterial,
    //Etapa
    getEtapas,getEtapaPorId,getEtapasPorProyecto,createEtapa,updateEtapa,deleteEtapa,
    //Actividades
    getActividadPorID,getActividades,deleteActividad,updateActividad,createActividad,getActividadesPorEtapa,getActividadesPorProyecto,
    //Areas
    getAreas,getAreasPorPlan,createArea,
    //Obras
    //getObras,
    //Planes,
    getPlanes,createPlan,
    //Proyectos
    getProyectos,getProyectosHijos,getProyectoPorId,updateProyecto,createProyecto
    
};
