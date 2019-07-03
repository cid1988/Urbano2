const Reunion = require('../../models/rdg/reunion');
const Maestro = require('../../models/rdg/maestro');
const SerieReunion = require('../../models/rdg/serie');

var ObjectId = require('mongoose').Types.ObjectId;
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
        const series = await SerieReunion.find();
        res.json(series);
    }catch(error){
        res.json(error);
    }
};

module.exports = reunionCtrl;