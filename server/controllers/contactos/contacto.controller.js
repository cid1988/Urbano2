const Contacto = require('../../models/contacto/contacto');

const contactoCtrl = {};

contactoCtrl.getContacto = async (req, res, next) => {
    const { id } = req.params;
    const contacto = await Contacto.findById(id);
    res.json(contacto);
};

contactoCtrl.getContactos = async (req, res, next) => {
    try{
        const contactos = await Contacto.find();
        res.json(contactos);
    }catch(error){
        res.json(error);
    }
};

contactoCtrl.editContacto = async (req, res, next) => {
    const { id } = req.params;
    const contacto = {
        nombre: req.body.nombre,
        segundoNombre: req.body.segundoNombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        foto: req.body.foto
    };
    await Contacto.findByIdAndUpdate(id, {$set: contacto}, {new: true});
    res.json({status: 'Contacto actualizado con exito'});
};

contactoCtrl.crearContacto = async (req, res, next) => {
    const contacto = new Contacto({
        nombre: req.body.nombre,
        segundoNombre: req.body.segundoNombre,
        apellido: req.body.apellido,
        correo: req.body.correo
    });
    await contacto.save();
    res.json({status: 'Contacto creado'});
};

/////////////////////////////////////////

contactoCtrl.deleteContacto = async (req, res, next) => {
    await Contacto.findByIdAndRemove(req.params.id);
    res.json({status: 'Contacto borrado'});
};

module.exports = contactoCtrl;