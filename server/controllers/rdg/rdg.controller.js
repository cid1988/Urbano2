const Reunion = require('../../models/rdg/reunion');
const SerieReunion = require('../../models/rdg/serie');

const reunionCtrl = {};

reunionCtrl.getReuniones = async (req, res, next) => {
    try{
        const reuniones = await Reunion.find();
        res.json(reuniones);
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