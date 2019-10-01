const mongoose = require('mongoose');
const { Schema } = mongoose;

const areaSchema = new Schema({
    nombre: { type: String, required: false},
    anio: { type: Number},
    idOrganigrama: { type: String },
    idPlan: { type: Schema.Types.ObjectId}
},{
    versionKey: false
});

module.exports = mongoose.model('Area', areaSchema, 'poa.jurisdicciones');