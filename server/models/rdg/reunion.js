const mongoose = require('mongoose');
const { Schema } = mongoose;

const reunionSchema = new Schema({
    nombre: { type: String, required: false}
},{
    versionKey: false
});

module.exports = mongoose.model('Reunion', reunionSchema, 'rdg.reuniones.instancias');