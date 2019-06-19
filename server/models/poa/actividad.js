const mongoose = require('mongoose');
const { Schema } = mongoose;

const actividadSchema = new Schema({
    nombre: { type: String, required: false}
},{
    versionKey: false
});

module.exports = mongoose.model('Actividad', actividadSchema, 'poa.actividades');