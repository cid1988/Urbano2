const Reunion = require('../models/rdg/reunion');
const SerieReunion = require('../models/rdg/serie');
const TiposReunion = require('../models/rdg/tipo');
const CitaReunion = require('../models/rdg/cita');

//Reuniones

async function getReuniones (req, res, next) {
    try{
        const reuniones = await Reunion.find({})
        .populate("reunion");
        res.json(reuniones);
    }catch(error){
        res.json(error);
    }
};
async function getReunionPorId(req, res, next){
    const reunion = await Reunion.findById(req.swagger.params.id.value);
    res.status(200).json(reunion);
};
async function createReunion (req, res, next) {
    const reunion = new Reunion(req.swagger.params.body.value);
    await reunion.save();
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
        const series = await SerieReunion.find({
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
    await SerieReunion.findByIdAndUpdate(req.swagger.params.id.value, 
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
        const citas = await CitaReunion.find({})
        res.json(citas);
    }catch(error){
        res.json(error);
    }
};
async function getCitaPorId(req, res, next){
    const cita = await CitaReunion.findById(req.swagger.params.id.value);
    res.status(200).json(cita);
};
async function createReunion (req, res, next) {
    const reunion = new Reunion(req.swagger.params.body.value);
    await reunion.save();
    res.json({status: 'Reunion creada'});
};

async function updateReunion (req, res, next) {
    const reunion = req.swagger.params.body.value;
    await Reunion.findByIdAndUpdate(req.swagger.params.id.value, {$set: reunion}, {new: false});
    res.json({status: 'Reunion actualizada con exito'});
};





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
    //getMinutas
    //Citas de Reunion
    getCitas,getCitaPorId
};