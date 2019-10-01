const mongoose = require('mongoose');
const { Schema } = mongoose;

const comunaSchema = new Schema({
    _id: { type: mongoose.ObjectId, required: true},
    altura: { type: String, required: false},
    barrios: { type: String, required: false},
    calle: { type: String, required: false},
    limites: { type: String, required: false},
    nombre: { type: String, required: false},
    numero: { type: Number, required: false},
    telefono: { type: String, required: false}
});


module.exports = mongoose.model('Comuna', comunaSchema, 'comunas');