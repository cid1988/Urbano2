const mongoose = require('mongoose');
const { Schema } = mongoose;

const organigramaSchema = new Schema({
    nombreCompleto: { type: String, required: false}
});

module.exports = mongoose.model('Organigrama', organigramaSchema, 'organigrama');