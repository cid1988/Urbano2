const mongoose = require('mongoose');
const { Schema } = mongoose;

const proyectoSchema = new Schema({
    nombre: { type: String, required: false},
    codIdentificacion: { type: String, required: false},
    descripcion: { type: String, required: false},
    anio: { type: Number },
    idJurisdiccion: { type: Schema.Types.ObjectId },
    idPlan: { type: Schema.Types.ObjectId }
},{
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

module.exports = mongoose.model('Proyecto', proyectoSchema, 'poa.proyectos');