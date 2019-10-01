const mongoose = require('mongoose');
const { Schema } = mongoose;

const prioridadMinisterialSchema = new Schema({
    nombre: { type: String, required: false},
},{
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});

module.exports = mongoose.model('PrioridadMinisterial', prioridadMinisterialSchema, 'poa.prioridadMinisterial');