const Reunion = require('../models/rdg/reunion');
const SerieReunion = require('../models/rdg/serie');
const TiposReunion = require('../models/rdg/tipo');

async function getInstancias (req, res, next) {
    try{
        const reuniones = await Reunion.find({})
        .populate("reunion");
        res.json(reuniones);
    }catch(error){
        res.json(error);
    }
};

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

async function getTipos (req, res, next) {
    try{
        const tiposReunion = await TiposReunion.find();
        res.json(tiposReunion);
    }catch(error){
        res.json(error);
    }
};

async function crearReunion (req, res, next) {
    const reunion = new Reunion({
        desdeDate: req.body.desdeDate,
        hastaDate: req.body.hastaDate,
        reunion: req.body.reunion.toString(),
        desdeHora: req.body.desdeHora,
        hastaHora: req.body.hastaHora,
        fecha: req.body.fecha
    });
    await reunion.save();
    res.json({status: 'Reunion creada'});
};

async function updateReunion (req, res, next) {
    const { id } = req.body;
    const reunion = {
        desdeDate: req.body.desdeDate,
        hastaDate: req.body.hastaDate,
        reunion: req.body.reunion.toString(),
        desdeHora: req.body.desdeHora,
        hastaHora: req.body.hastaHora,
        fecha: req.body.fecha
    };
    await Reunion.findByIdAndUpdate(id, {$set: reunion}, {new: false});
    res.json({status: 'Reunion actualizada con exito'});
};

module.exports = {
    //Series de Reunion
    getSeries,
    //Serie de Reunino - Maestros
    getMaestros,
    //Instancia de Reunion
    getInstancias,
    //Tipo de Reunion
    getTipos,
    //Minuta de Reunion
    //getMinutas
};