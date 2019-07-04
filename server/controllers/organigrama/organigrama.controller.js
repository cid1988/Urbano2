const Organigrama = require('../../models/organigrama/organigrama');

const organigramaCtrl = {};

organigramaCtrl.getOrganigrama = async (req, res, next) => {
    try{
        const organigrama = await Organigrama.find();
        res.json(organigrama);
    }catch(error){
        res.json(error);
    }
};

module.exports = organigramaCtrl;