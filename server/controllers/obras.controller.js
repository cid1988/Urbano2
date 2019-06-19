const Obra = require('../models/obra');
const obraCtrl = {};

obraCtrl.getObras = async (req, res, next) => {
    const { id } = req.body;
    try{
        const obras = await Obra.find({cargadaEnPOA: true, idProyecto: id});
        res.json(obras);
    }catch(error){
        res.json(error);
    }
};

module.exports = obraCtrl;