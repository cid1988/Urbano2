const mongoose = require('mongoose');
const { Schema } = mongoose;

const etapaSchema = new Schema({
    nombre: { type: String, required: false}
},{
    versionKey: false
});

module.exports = mongoose.model('Etapa', etapaSchema, 'poa.etapas');