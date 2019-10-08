const mongoose = require('mongoose');
const { Schema } = mongoose;

const organigramaSchema = new Schema({
    categoria: { type: String, required: false},
    nivel: { type: String, required: true},
    nombreCompleto: { type: String, required: true},
    nombreCortoJurisdiccion: { type: String, required: false},
    nombreCortoOrganigrama: { type: String, required: false},
    sigla: { type: String, required: false},
    superiorInmediato: { type: String , ref: 'Organigrama'}
},{
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});



module.exports = mongoose.model('Organigrama', organigramaSchema, 'organigrama');