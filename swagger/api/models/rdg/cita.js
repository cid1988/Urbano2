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

citaSchema.virtual('datosReunion', {
    ref: 'Reunion', // The model to use
    localField: 'idInstancia', // Find people where `localField`
    foreignField: '_id', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: true
  });

module.exports = mongoose.model('Cita', citaSchema, 'rdg.citas');