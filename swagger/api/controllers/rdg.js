const Reunion = require('../models/rdg/reunion');
const SerieReunion = require('../models/rdg/serie');
const MaestroReunion = require('../models/rdg/maestro');
const TiposReunion = require('../models/rdg/tipo');
const CitaReunion = require('../models/rdg/cita');
const Contacto = require('../models/contacto/contacto');
const TemarioReunion = require('../models/rdg/temario');
const MinutaReunion = require('../models/rdg/minuta');

var ObjectId = require('mongoose').Types.ObjectId;

//Reuniones

async function getReuniones (req, res, next) {
    try{
        const reuniones = await Reunion.find({})
        .populate("_serie");
        res.json(reuniones);
    }catch(error){
        res.json(error);
    }
};
async function getReunionPorId(req, res, next){
    const reunion = await Reunion.findById(req.swagger.params.id.value).populate("_serie");;
    res.status(200).json(reunion);
};
async function createReunion (req, res, next) {
    const reunion = new Reunion(req.swagger.params.body.value);
    const cita = new CitaReunion();
    const temario = new TemarioReunion();
    await reunion.save();
    console.log(reunion)
    console.log(cita)
    console.log(temario)
    res.json({status: 'Reunion creada'});
};

async function updateReunion (req, res, next) {
    const reunion = req.swagger.params.body.value;
    await Reunion.findByIdAndUpdate(req.swagger.params.id.value, {$set: reunion}, {new: false});
    res.json({status: 'Reunion actualizada con exito'});
};

//Series

async function getSeries(req, res, next) {
    try{
        const series = await SerieReunion.find({
            $and: [
                {$or: [
                    {apagado: false},
                    {apagado: {$exists: false}}
                ]},{
                    nombre:{$ne:'Maestro'}
                }
                // {nombre: {$ne: "Maestro"}} Comentado para que puedan verse los maestros en la pantalla de configuracion de maestros
            ]
        })
        .populate('color')//Falta seleccionar el campo color
        res.json(series);
    }catch(error){
        res.json(error);
    }
};

//Series Maestros
async function getMaestros(req, res, next) {
    try{
        const series = await MaestroReunion.find({
            $and: [
                {$or: [
                    {apagado: false},
                    {apagado: {$exists: false}}
                ]},{
                    nombre:'Maestro'
                }
                // {nombre: {$ne: "Maestro"}} Comentado para que puedan verse los maestros en la pantalla de configuracion de maestros
            ]
        })
        .populate('color')//Falta seleccionar el campo color
        res.json(series);
    }catch(error){
        res.json(error);
    }
};

async function editMaestro(req,res,next){
    const serie = req.swagger.params.body.value
    await MaestroReunion.findByIdAndUpdate(req.swagger.params.id.value, 
        {$set: serie}, {new: true, strict: false}, function(err, data){
            if(err) res.status(500).json(err)
            else res.status(200).json(data)
    });
}
//Tipos
async function getTipos (req, res, next) {
    try{
        const tiposReunion = await TiposReunion.find();
        res.json(tiposReunion);
    }catch(error){
        res.json(error);
    }
};

//Citas

async function getCitas (req, res, next) {
    try{
        const citas = await CitaReunion.find().populate('datosReunion')
        res.status(200).json(citas);
    }catch(error){
        res.status(403).json(error);
    }
};
async function getCitasPorReunion (req, res, next) {
    try{
        const citas = await CitaReunion.find({idInstancia:req.swagger.params.id.value}).populate('datosReunion')
        res.status(200).json(citas);
    }catch(error){
        res.status(403).json(error);
    }
};
async function getCitaPorId(req, res, next){
    try{
        CitaReunion.findById(req.swagger.params.id.value).populate('datosReunion').exec(function(err ,data){
            if(err){
                res.status(403).json(err);
            }else{
                res.status(200).json(data);
            }
        });
    }catch(error){
        res.status(403).json(error);
    }
    
};

async function getArmarCita(req, res, next){
    try{
        const datosCita={
            idContactos:{
                para:[],
                cc:[],
                cco:[],
                exclusivos:[]
            },
            correos:{
                para:'',
                cc:'',
                cco:'',
                exclusivos:''
            },
            serie:{},
        }
        let query={};
        query={_id: ObjectId(req.swagger.params.id.value)}
        const serie = await traerSerie(query,['tipo','cita','nombre'])
        console.log(serie)
        datosCita.serie= serie;
        Array.prototype.push.apply(datosCita.idContactos.para,serie.cita.para); 
        Array.prototype.push.apply(datosCita.idContactos.cc,serie.cita.cc); 
        Array.prototype.push.apply(datosCita.idContactos.cco,serie.cita.cco); 
        Array.prototype.push.apply(datosCita.idContactos.exclusivos,serie.cita.exclusivos); 

        datosCita.correos.para+=await pushinfo(serie.cita.para)
        datosCita.correos.cc+=await pushinfo(serie.cita.cc)
        datosCita.correos.cco+= await pushinfo(serie.cita.cco)
        datosCita.correos.exclusivos+= await pushinfo(serie.cita.exclusivos)

        query={
            $and: [
                { tipo: serie.tipo },
                { nombre:'Maestro' }
            ]
        }

        const maestro = await traerMaestro(query,['cita']);
        Array.prototype.push.apply(datosCita.idContactos.para,maestro.cita.para); 
        Array.prototype.push.apply(datosCita.idContactos.cc,maestro.cita.cc); 
        Array.prototype.push.apply(datosCita.idContactos.cco,maestro.cita.cco); 
        Array.prototype.push.apply(datosCita.idContactos.exclusivos,maestro.cita.exclusivos); 
        datosCita.correos.para+= await pushinfo(maestro.cita.para)
        datosCita.correos.cc+= await pushinfo(maestro.cita.cc)
        datosCita.correos.cco+= await pushinfo(maestro.cita.cco)
        datosCita.correos.exclusivos+= await pushinfo(maestro.cita.exclusivos)
        res.status(200).json(datosCita)
    }catch(error){
        console.log(error)
        res.status(403).json(error);
    }
    


};

async function createCita (req, res, next) {
    const cita = new CitaReunion(req.swagger.params.body.value);
    await cita.save();
    res.json({status: 'Cita creada'});
};

/*
async function updateReunion (req, res, next) {
    const reunion = req.swagger.params.body.value;
    await Reunion.findByIdAndUpdate(req.swagger.params.id.value, {$set: reunion}, {new: false});
    res.json({status: 'Reunion actualizada con exito'});
};*/

//Temario
async function getTemarios (req, res, next) {
    try{
        const temarios = await TemarioReunion.find()
        res.json(temarios);
    }catch(error){
        res.json(error);
    }
};

async function getTemarioPorId(req, res, next){
    try{
        TemarioReunion.findById(req.swagger.params.id.value).exec(function(err ,data){
            if(err || data==null){
                res.status(403).json(err);
            }else{
                res.status(200).json(data);
            }
        });
    }catch(error){
        res.status(403).json(error);
    }
    
};

async function getTemarioPorReunion(req, res, next){
    try{
        TemarioReunion.findOne({instancia:req.swagger.params.id.value})
        .populate({
            path : '_datosReunion',
            populate : {
              path : '_serie'
            }
          }).exec(function(err ,data){
            if(err){
                res.status(403).json(err);
            }else{
                if(data==null){
                    res.status(200).json({});
                }else res.status(200).json(data);
            }
        });
    }catch(error){
        res.status(403).json(error);
    }
};

async function createTemario (req, res, next) {
    const temario = new TemarioReunion(req.swagger.params.body.value);
    await temario.save();
    res.status(200).json(temario);
};

async function updateTemario (req, res, next) {
    const temario = req.swagger.params.body.value;
    await TemarioReunion.findByIdAndUpdate(req.swagger.params.id.value, {$set: temario}, {new: false});
    res.json({status: 'Temario actualizada con exito'});
};

//MInutas
async function getMinutaPorId(req, res, next){
    try{
        MinutaReunion.findById(req.swagger.params.id.value).exec(function(err ,data){
            if(err || data==null){
                res.status(403).json(err);
            }else{
                res.status(200).json(data);
            }
        });
    }catch(error){
        res.status(403).json(error);
    }
    
};
async function getMinutaPorReunion(req, res, next){
    try{
        MinutaReunion.findOne({instancia:req.swagger.params.id.value}).exec(function(err ,data){
            if(err ){
                res.status(403).json(err);
                console.log(err)
            }else{
                res.status(200).json(data);
                console.log(data)
            }
        });
    }catch(error){
        res.status(403).json(error);
    }
    
};
async function updateMinuta (req, res, next) {
    const minuta = req.swagger.params.body.value;
    await MinutaReunion.findByIdAndUpdate(req.swagger.params.id.value, {$set: minuta}, {new: false});
    res.json({status: 'Temario actualizada con exito'});
};
async function createMinuta (req, res, next) {
    const minuta = new MinutaReunion(req.swagger.params.body.value);
    await minuta.save();
    res.json({status: 'Temario actualizada con exito'});
};

//Compromisos
async function getCompromisosPorSerie(req, res, next){
    try{
        const minutaConCompromisos=[]
        MinutaReunion.find({ $where: "this.compromisos.length > 1" }).select(['compromisos','instancia'])
        .populate('_datosReunion').exec(function(err ,data){
            if(err){
                res.status(403).json(err);
            }else{
                console.log(data.length)
                for (let index = 0; index < data.length; index++) {
                    if(data[index]._datosReunion.reunion == req.swagger.params.id.value){
                        minutaConCompromisos.push(data[index])
                    }
                }
                res.status(200).json(minutaConCompromisos);
            }
        });
    }catch(error){
        console.log(error)
        res.status(403).json(error);
    }
    
};



//Funciones 

async function traerReunion(query,seleccion){
    const data = await Reunion.findOne(query).select(seleccion).populate('_serie');
    return data
}
async function traerSerie(query,seleccion){
    const data = await SerieReunion.findOne(query).select(seleccion).populate('color');
    return data
}
async function traerMaestro(query,seleccion){
    const data = await MaestroReunion.findOne(query).select(seleccion);
    return data
}
async function traerContacto(query,seleccion){
    await Contacto.findOne(query).select(seleccion).exec(function(err,data){
        if(err) return ''
        else return data;
    });
}
async function pushinfo(array){
    var lista=''
    for (let index = 0; index < array.length; index++) {
        query={ _id: ObjectId(array[index].contactoId)}
        var contacto = await traerContacto(query,['correos'])
        if(contacto && contacto.correos){
            var correo=''
            for (let c = 0; c < contacto.correos.length; c++) {
                if(contacto.correos[c].checked){
                    correo=contacto.correos[c].valor
                    break
                }else{
                    if(contacto.correos[c].nombre == "Email oficial"){
                        correo=contacto.correos[c].valor
                    }
                }
            }
            lista+=correo+',';
        }
    }
    return lista;
}


module.exports = {
    //Series de Reunion
    getSeries,
    //Serie de Reunino - Maestros
    getMaestros,editMaestro,
    //Reunion
    getReuniones,getReunionPorId,createReunion,updateReunion,
    //Tipo de Reunion
    getTipos,
    //Minuta de Reunion
    getMinutaPorId,getMinutaPorReunion,updateMinuta,createMinuta,
    //Temario de Reunion
    getTemarios,getTemarioPorId,getTemarioPorReunion,createTemario,updateTemario,
    //Citas de Reunion
    getCitas,getCitaPorId,getArmarCita,getCitasPorReunion,createCita,
    //Compromisos
    getCompromisosPorSerie
};