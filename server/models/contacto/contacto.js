const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactoSchema = new Schema({
    nombre: { type: String, required: false},
    segundoNombre: { type: String, required: false},
    apellido: { type: String, required: false },
},{
    versionKey: false
});

module.exports = mongoose.model('Contacto', contactoSchema, 'contactos');