const mongoose = require('mongoose');
const { Schema } = mongoose;

const planSchema = new Schema({
    anio: { type: Number },
    etapa: { type: String },
    editable: { type: Boolean },
    creadoPor:  { type: String },
    modificadoPor: { type: String },
    apagado: { type: Boolean },
},{
    versionKey: false
});

module.exports = mongoose.model('Plan', planSchema, 'poa.planes');