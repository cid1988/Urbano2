const Area = require('../models/area');
const areaCtrl = {};
var ObjectId = require('mongoose').Types.ObjectId;

areaCtrl.getAreas = async (req, res, next) => {
    try{
        const areas = await Area.find();
        res.json(areas);
    }catch(error){
        res.json(error);
    }
};

areaCtrl.getAreasPorPlan = async (req, res, next) => {
    const { _id } = req.body;
    try{
        const areas = await Area.find({idPlan: ObjectId(_id)});
        res.json(areas);
    }catch(error){
        res.json(error);
    }
};

module.exports = areaCtrl;