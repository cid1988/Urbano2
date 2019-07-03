const mongoose = require('mongoose');
const { Schema } = mongoose;

const maestroReunionSchema = new Schema({
    nombre: { type: String, required: false}
},{
    versionKey: false,
    strict: false
})

module.exports = mongoose.model('Maestro', maestroReunionSchema, 'rdg.reuniones');