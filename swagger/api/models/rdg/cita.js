const mongoose = require('mongoose');
const { Schema } = mongoose;

const citaSchema = new Schema({
    para:  { type: String },
    cc:  { type: String },
    cco:  { type: String },
    exclusivos:  { type: String },
    usuario: { type: String },
    idInstancia: { type: String },
    asunto: { type: String },
    version: { type: String },
    mensajeHtml: { type: String },
    fecha: { type: String }
},{
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

module.exports = mongoose.model('Cita', citaSchema, 'rdg.citas');