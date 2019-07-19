const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactoSchema = new Schema({
    nombre: { type: String, required: false},
    apellidos: { type: String, required: false}
},{
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

contactoSchema.virtual('nombreCompleto').get(function(){
    return this.apellidos + " " + this.nombre;
})

module.exports = mongoose.model('Contacto', contactoSchema, 'contactos');