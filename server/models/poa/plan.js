const mongoose = require('mongoose');
const { Schema } = mongoose;

const planSchema = new Schema({
    anio: { type: Number },
    etapa: { type: String },
    editable: { type: Boolean }
},{
    versionKey: false
});

module.exports = mongoose.model('Plan', planSchema, 'poa.planes');