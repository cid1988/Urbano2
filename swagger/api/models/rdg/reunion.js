const mongoose = require('mongoose');
const { Schema } = mongoose;

const reunionSchema = new Schema({
    reunion: { type: String, ref: 'Serie' },
    fecha: {type: String},
    desdeHora: { type: String },
    hastaHora: { type: String },
    desdeDate: { type: Number },
    hastaDate: { type: Number },
    usuarioCreacion: { type: String },
    fechaCreacion: { type: String },
    usuarioModificacion: { type: String },
    fechaModificacion: { type: String },
    ubicacion: {
        nombre: { type: String }
    },
    version: { type: String }
},{
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

reunionSchema.virtual('title').get(function(){
    return this.reunion.nombre;
});

reunionSchema.virtual('start').get(function(){
    return this.desdeDate;
});

reunionSchema.virtual('end').get(function(){
    return this.hastaDate;
});


module.exports = mongoose.model('Reunion', reunionSchema, 'rdg.reuniones.instancias');