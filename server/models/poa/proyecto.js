const mongoose = require('mongoose');
const { Schema } = mongoose;

const proyectoSchema = new Schema({
    nombre: { type: String, required: false},
    codIdentificacion: { type: String, required: false},
    descripcion: { type: String, required: false}
},{
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});
module.exports = mongoose.model('Proyecto', proyectoSchema, 'poa.proyectos');