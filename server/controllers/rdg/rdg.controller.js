const Reunion = require('../../models/rdg/reunion');
const Maestro = require('../../models/rdg/maestro');
const SerieReunion = require('../../models/rdg/serie');
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
mongoose.set('useFindAndModify', false);

const reunionCtrl = {};

reunionCtrl.getReuniones = async (req, res, next) => {
    try{
        const reuniones = await Reunion.find({})
        .populate("reunion");
        res.json(reuniones);
    }catch(error){
        res.json(error);
    }
};

reunionCtrl.getMaestroPorReunion = async (req, res, next) => {
    const { idReunion } = req.params;
    try{
        const maestro = await Maestro.findById(idReunion).select("nombre");
        res.json(maestro);
    }catch(error){
        res.json(error);
    }
};

reunionCtrl.getSeriesReuniones = async (req, res, next) => {
    try{
        const series = await SerieReunion.find({
            $and: [
                {$or: [
                    {apagado: false},
                    {apagado: {$exists: false}}
                ]},
                {nombre: {$ne: "Maestro"}}
            ]
        });
        res.json(series);
    }catch(error){
        res.json(error);
    }
};

reunionCtrl.crearReunion = async (req, res, next) => {
    const reunion = new Reunion({
        desdeDate: req.body.desdeDate,
        hastaDate: req.body.hastaDate,
        reunion: "58c2c4446a6764230be82957",
        desdeHora: "10",
        hastaHora: "11",
        fecha: "15/07/2019"
    });
    await reunion.save();
    res.json({status: 'Reunion creada'});
};

reunionCtrl.updateReunion = async (req, res, next) => {
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

module.exports = reunionCtrl;