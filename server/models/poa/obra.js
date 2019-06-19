const mongoose = require('mongoose');
const { Schema } = mongoose;

const obraSchema = new Schema({
    nombre: { type: String, required: false}
},{
    versionKey: false
});

module.exports = mongoose.model('Obra', obraSchema, 'obras');