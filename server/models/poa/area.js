const mongoose = require('mongoose');
const { Schema } = mongoose;

const areaSchema = new Schema({
    nombre: { type: String, required: false}
},{
    versionKey: false
});

module.exports = mongoose.model('Area', areaSchema, 'poa.jurisdicciones');