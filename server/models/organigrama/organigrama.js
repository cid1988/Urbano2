const mongoose = require('mongoose');
const { Schema } = mongoose;

const organigramaSchema = new Schema({
    nombre: { type: String, required: false}
},{
    versionKey: false
});

module.exports = mongoose.model('Organigrama', organigramaSchema, 'organigrama');