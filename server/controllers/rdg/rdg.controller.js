const Reunion = require('../../models/rdg/reunion');

const reunionCtrl = {};

reunionCtrl.getReuniones = async (req, res, next) => {
    try{
        const reuniones = await Reunion.find();
        res.json(reuniones);
    }catch(error){
        res.json(error);
    }
};

module.exports = reunionCtrl;