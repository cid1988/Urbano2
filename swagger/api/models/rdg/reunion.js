const mongoose = require('mongoose');
const { Schema } = mongoose;

const reunionSchema = new Schema({
    nombre: { type: String, required: false },
    reunion: { type: Schema.Types.ObjectId, ref: 'Maestro' },
    desdeDate: { type: Number },
    hastaDate: { type: Number }
},{
    versionKey: false,
    strict: false
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

reunionSchema.set('toJSON', {getters: true, virtuals: true});

module.exports = mongoose.model('Reunion', reunionSchema, 'rdg.reuniones.instancias');