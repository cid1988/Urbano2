const Plan = require('../models/plan');

const planCtrl = {};

planCtrl.getPlanes = async (req, res, next) => {
    try{
        const planes = await Plan.find();
        res.json(planes);
    }catch(error){
        res.json(error);
    }
};

module.exports = planCtrl;