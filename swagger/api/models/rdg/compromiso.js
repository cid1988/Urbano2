const mongoose = require('mongoose');
const { Schema } = mongoose;

const compromisoSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    titulo:  { type: String },
    poa:  { type: String },
    fecha:  { type: String },
    responsables: [String],
    tarea:{ type: String },
    idReunion: { type: String },
    idSerie: { type: String },
    importante: {type: Boolean},
    proximaReunion: {type: Boolean},
    cumplido: {type: Boolean},
    cancelado: {type: Boolean}
},{
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});


module.exports = mongoose.model('Compromiso', compromisoSchema, 'rdg.compromisos');