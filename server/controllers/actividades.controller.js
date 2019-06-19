const Actividad = require('../models/actividad');
var ObjectId = require('mongoose').Types.ObjectId;

const actividadCtrl = {};

actividadCtrl.getActividades = async (req, res, next) => {
    const { _id } = req.body;
    console.log(_id)
    try{
        const actividades = await Actividad.find({idProyecto: ObjectId(_id)});
        res.json(actividades);
    }catch(error){
        res.json(error);
    }
};

module.exports = actividadCtrl;